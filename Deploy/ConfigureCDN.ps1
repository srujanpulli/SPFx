# the path here may need to change if you used e.g. C:\Lib.. 
Add-Type -Path "C:\Program Files\SharePoint Online Management Shell\Microsoft.Online.SharePoint.PowerShell\Microsoft.SharePoint.Client.dll" 
Add-Type -Path "C:\Program Files\SharePoint Online Management Shell\Microsoft.Online.SharePoint.PowerShell\Microsoft.SharePoint.Client.Runtime.dll"

#Update tenant
$orgName="SPTenant"

Connect-SPOService -Url https://$orgName-admin.sharepoint.com #This will prompt you to login


#Enable Private CDN
Set-SPOTenantCdnEnabled -CdnType private -Enable $true

#Configure CDN library
Add-SPOTenantCdnOrigin -CdnType Private -OriginUrl sites/cdn/SiteAssets

#[Optional] Retrieve configurations
Get-SPOTenantCdnEnabled -CdnType Private
Get-SPOTenantCdnOrigins -CdnType Private
