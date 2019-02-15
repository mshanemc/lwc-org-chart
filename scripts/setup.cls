user main = [select title, managerId, MobilePhone from user where firstname = 'User' and lastname = 'User'];
user integ = [select id, title, MobilePhone, managerId from user where firstname = 'Integration' and lastname = 'User'];
user sec = [select id, title, ManagerId, MobilePhone from user where firstname = 'Security' and lastname = 'User'];
user ceo = [select id, title, MobilePhone from user where firstname = 'Sir' and lastname = 'Boss'];

main.managerId = integ.id;
main.mobilePhone = '8324728021';
integ.managerId = sec.id;
integ.title = 'VP of Integration';
integ.MobilePhone = '8324728021';
main.title = 'General Manager';
sec.title = 'CIO';
sec.MobilePhone = '8324728021';
sec.ManagerId = ceo.Id;

update main;
update integ;
update sec;

list<user> reports = [select managerId from user where FirstName = 'Report'];
for (user u:reports){
    u.ManagerId = main.id;
}
update reports;