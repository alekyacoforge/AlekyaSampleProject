public with sharing class ContactsController {
    

   /* public static List< Contact> findContacts(){
        return[select Id, Name, Email, Phone, Level__c FROM Contact LIMIT 10];
    }*/
    @AuraEnabled
    public static List< Contact> fetchFewContacts(){
        return[select Id, Name, Phone, Email FROM Contact LIMIT 5];
    }
}