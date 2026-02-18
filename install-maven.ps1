# Maven Installation Script for Windows
# Run this script in PowerShell (no admin required)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Maven Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Maven is already installed
Write-Host "Checking if Maven is already installed..." -ForegroundColor Yellow
$mavenCheck = Get-Command mvn -ErrorAction SilentlyContinue

if ($mavenCheck) {
    Write-Host "Maven is already installed!" -ForegroundColor Green
    mvn -version
    exit 0
}

Write-Host "Maven not found. Starting installation..." -ForegroundColor Yellow
Write-Host ""

# Define paths
$mavenVersion = "3.9.9"
$mavenUrl = "https://archive.apache.org/dist/maven/maven-3/$mavenVersion/binaries/apache-maven-$mavenVersion-bin.zip"
$downloadPath = "$env:TEMP\apache-maven.zip"
$installPath = "$env:USERPROFILE\apache-maven"

Write-Host "Download URL: $mavenUrl" -ForegroundColor Gray
Write-Host "Install Path: $installPath" -ForegroundColor Gray
Write-Host ""

# Download Maven
Write-Host "Downloading Maven $mavenVersion..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $mavenUrl -OutFile $downloadPath -UseBasicParsing
    Write-Host "Download completed!" -ForegroundColor Green
} catch {
    Write-Host "Error downloading Maven: $_" -ForegroundColor Red
    exit 1
}

# Extract Maven
Write-Host "Extracting Maven..." -ForegroundColor Yellow
try {
    if (Test-Path $installPath) {
        Remove-Item -Path $installPath -Recurse -Force
    }
    
    Expand-Archive -Path $downloadPath -DestinationPath $env:USERPROFILE -Force
    Rename-Item -Path "$env:USERPROFILE\apache-maven-$mavenVersion" -NewName "apache-maven"
    Write-Host "Extraction completed!" -ForegroundColor Green
} catch {
    Write-Host "Error extracting Maven: $_" -ForegroundColor Red
    exit 1
}

# Add to PATH for current session
$env:Path += ";$installPath\bin"

# Add to PATH permanently (User level - no admin required)
Write-Host "Adding Maven to PATH..." -ForegroundColor Yellow
try {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($currentPath -notlike "*$installPath\bin*") {
        [Environment]::SetEnvironmentVariable(
            "Path",
            "$currentPath;$installPath\bin",
            "User"
        )
        Write-Host "Maven added to PATH!" -ForegroundColor Green
    }
} catch {
    Write-Host "Error adding to PATH: $_" -ForegroundColor Red
    Write-Host "You may need to add manually: $installPath\bin" -ForegroundColor Yellow
}

# Set MAVEN_HOME
Write-Host "Setting MAVEN_HOME..." -ForegroundColor Yellow
try {
    [Environment]::SetEnvironmentVariable("MAVEN_HOME", $installPath, "User")
    $env:MAVEN_HOME = $installPath
    Write-Host "MAVEN_HOME set!" -ForegroundColor Green
} catch {
    Write-Host "Error setting MAVEN_HOME: $_" -ForegroundColor Red
}

# Clean up
Remove-Item -Path $downloadPath -Force

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Maven Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Maven installed at: $installPath" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Close and reopen your terminal/PowerShell" -ForegroundColor Yellow
Write-Host "Then verify installation with: mvn -version" -ForegroundColor Yellow
Write-Host ""
Write-Host "After reopening terminal, run:" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  mvn spring-boot:run" -ForegroundColor White
Write-Host ""

# Try to verify in current session
Write-Host "Verifying installation in current session..." -ForegroundColor Yellow
& "$installPath\bin\mvn.cmd" -version

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
