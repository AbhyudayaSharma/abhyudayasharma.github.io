$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$SSH_USER = 'deploy-bot'
$SSH_HOST = 'abhyudaya.dev'
$SSH_DIRECTORY = '~/.ssh'
$KEY_FILE = Join-Path $SSH_DIRECTORY 'id_25519'
$KNOWN_HOSTS_FILE = Join-Path $SSH_DIRECTORY 'known_hosts'
$BUILD_DIRECTORY = './build'

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

Compress-Archive -Path $BUILD_DIRECTORY -DestinationPath ./build.zip -CompressionLevel Optimal -Verbose
scp ./build.zip "${SSH_USER}@${SSH_HOST}:~/build.zip"
if ($LASTEXITCODE -ne 0) {
  throw 'scp failed'
}
