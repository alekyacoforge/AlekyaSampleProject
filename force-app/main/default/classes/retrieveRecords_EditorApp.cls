public with sharing class retrieveRecords_EditorApp {
    @AuraEnabled
    public static list<Account> fetchAccounts(){
        //set<id> accIdSet = new set<id>{'0019000000ld6L9AAI','0019000000ld6LEAAY','0019000000ld6LGAAY','0019000000ld6LFAAY','0019000000ld6LDAAY'};
        list<Account> accountReturnList = [SELECT Id, Name,Website, Phone, Industry  FROM Account LIMIT 5];
        return accountReturnList;
    }

    @AuraEnabled
    public static list<Contact> fetchContacts(){
        //set<Id> contactIdSet = new set<id>{'0039000000ms6CbAAI','0039000000ms6CkAAI','0039000000ms6ChAAI','0039000000ms6ClAAI','0039000000ms6CgAAI'};
        list<Contact> contactReturnList = [SELECT Id, Name,Phone,Title, Email FROM Contact LIMIT 5];
        return contactReturnList;
    }

    public static List<Opportunity> fetchOpportunities(){
        return null;
    }
}