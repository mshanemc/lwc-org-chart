public with sharing class orgChartQueries {
    
    @AuraEnabled(cacheable=true)
    public static list<user> getReportIds(id userId) {
        return [select id, Name, MediumPhotoUrl from user where ManagerId =: userid];
    }

    @AuraEnabled(cacheable=true)
    public static list<user> searchUsers(string searchString) {
        string sosl = 'find \''  + searchString + '\' in ALL FIELDS returning User(Name, Title)';
        List<List <sObject>> results = search.query(sosl);
        return results[0];
    }
}