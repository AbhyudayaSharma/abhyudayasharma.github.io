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

Compress-Archive -Path $BUILD_DIRECTORY -DestinationPath $ZIPPED_ARCHIVE -CompressionLevel Optimal
$session = New-PSSession -HostName $SSH_HOST -UserName $SSH_USER -SSHTransport -KeyFilePath $KEY_FILE
try {
  Copy-Item -Path $ZIPPED_ARCHIVE -Destination $REMOTE_ZIPPED_ARCHIVE -ToSession $session
  Write-Output 'Copied build artifacts successfully!'
} catch {
  throw $_
} finally {
  Remove-PSSession $session
}
