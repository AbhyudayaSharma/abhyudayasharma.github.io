$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$SSH_USER = 'deploy-bot'
$SSH_HOST = 'abhyudaya.dev'
$SSH_DIRECTORY = '~/.ssh'
$KEY_FILE = Join-Path $SSH_DIRECTORY 'id_ed25519'
$KNOWN_HOSTS_FILE = Join-Path $SSH_DIRECTORY 'known_hosts'
$BUILD_DIRECTORY = './build'
$ZIPPED_ARCHIVE = './build.zip'
$REMOTE_ZIPPED_ARCHIVE = "/home/$SSH_USER/build.zip"
$REMOTE_NGINX_ROOT = "/home/$SSH_USER/abhyudaya.dev"

if ([string]::IsNullOrWhiteSpace($env:SSH_KEY) -or [string]::IsNullOrWhiteSpace($env:SSH_KNOWN_HOSTS)) {
  throw 'Environment variables SSH_KEY or SSH_KNOWN_HOSTS not set'
}

New-Item -Type Directory -Path $SSH_DIRECTORY | Out-Null
$env:SSH_KNOWN_HOSTS | Out-File -Encoding utf8 -FilePath $KNOWN_HOSTS_FILE -NoClobber
$env:SSH_KEY | Out-File -Encoding utf8 -FilePath $KEY_FILE -NoClobber
chmod 0600 $KEY_FILE
if ($LASTEXITCODE -ne 0) {
  throw 'chmod private key failed'
}

Compress-Archive -Path "$BUILD_DIRECTORY/*" -DestinationPath $ZIPPED_ARCHIVE -CompressionLevel Optimal
$session = New-PSSession -HostName $SSH_HOST -UserName $SSH_USER -SSHTransport -KeyFilePath $KEY_FILE
try {
  Copy-Item -Path $ZIPPED_ARCHIVE -Destination $REMOTE_ZIPPED_ARCHIVE -ToSession $session
  Write-Output 'Copied build artifacts successfully!'
  Invoke-Command -Session $session -ScriptBlock {
    $ErrorActionPreference = 'Stop'
    Set-StrictMode -Version Latest

    Expand-Archive -Path $Using:REMOTE_ZIPPED_ARCHIVE -DestinationPath $Using:BUILD_DIRECTORY -Force
    chmod -R +r $Using:BUILD_DIRECTORY
    if ($LASTEXITCODE -ne 0) {
      throw 'chmod of unzipped directory failed'
    }

    Get-Command 'exchange' | Out-Null # exchange: https://github.com/AbhyudayaSharma/exchange
    exchange $Using:BUILD_DIRECTORY $using:REMOTE_NGINX_ROOT
    if ($LASTEXITCODE -ne 0) {
      throw 'Directory exchange failed'
    }

    # Nginx restart is necessary for clearing file descriptor cache
    sudo service nginx restart
    if ($LASTEXITCODE -ne 0) {
      throw 'Restarting nginx failed'
    }

    Remove-Item -Recurse -Force $Using:BUILD_DIRECTORY, $Using:REMOTE_ZIPPED_ARCHIVE
  }

  Invoke-WebRequest -Uri 'https://abhyudaya.dev/' -MaximumRetryCount 1 -MaximumRedirection 0
  Write-Host "Successfully deployed revision $(git rev-parse HEAD)!"
} catch {
  throw $_
} finally {
  Remove-PSSession $session
}
