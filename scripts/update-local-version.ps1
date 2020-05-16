$oldVersion = (Get-Content package.json) -join "`n" | ConvertFrom-Json | Select -ExpandProperty "version"
$oldDate = ($oldVersion -split "-")[0]
$oldPatch = [int]::Parse(($oldVersion -split "-")[1])

$newDate = Get-Date -Format yy.MM.dd
$newPatch = 0

if($oldDate -eq $newDate) {
    $newPatch = $oldPatch + 1
}

# Update README.md

$oldVersionMd = "$oldDate--$oldPatch"
$newVersionMd = "$newDate--$newPatch"

(Get-Content README.md) -replace $oldVersionMd, $newVersionMd | Out-File -encoding ASCII README.md

git add README.md

# Update package.json & package-lock.json

$oldVersionJson = "$oldDate-$oldPatch"
$newVersionJson = "$newDate-$newPatch"

(Get-Content package.json) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII package.json
(Get-Content package-lock.json) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII package-lock.json
(Get-Content src\version.json) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII src\version.json

git add package.json
git add package-lock.json
git add src\version.json

git commit -m "[script][version] bumps version to $newVersionJson"
