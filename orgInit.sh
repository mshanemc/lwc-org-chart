sfdx shane:org:create -f config/project-scratch-def.json -d 1 -s -o org.chart --userprefix lwc
sfdx force:source:push
sfdx force:user:permset:assign -n OrgChart
sfdx force:user:create Firstname=Report Lastname=One IsActive=false Title=Developer MobilePhone=8324728021
sfdx force:user:create Firstname=Report Lastname=Two IsActive=false Title=Developer MobilePhone=8324728021
sfdx force:user:create Firstname=Report Lastname=Three IsActive=false Title=Developer MobilePhone=8324728021
sfdx force:user:create Firstname=Report Lastname=Four IsActive=false Title=Developer MobilePhone=8324728021
sfdx force:user:create Firstname=Report Lastname=Five IsActive=false Title=Developer MobilePhone=8324728021
sfdx force:user:create Firstname=Sir Lastname=Boss IsActive=false Title=CEO MobilePhone=8324728021
sfdx force:apex:execute -f scripts/setup.cls
sfdx shane:user:password:set -g User -l User -p sfdx1234
sfdx shane:user:allPhotos
sfdx shane:org:reauth -r
sfdx force:org:open -p /lightning/n/Org_Chart