public with sharing class ContactController {
    @AuraEnabled
    
    /*public static List<Contacts> findContacts(){
        return[select Id, Name, Phone, Email FROM Contact LIMIT 10];
        }*/
        public static List<Contact> fetchFewContacts(){
            return [ SELECT Id, Name, Phone, Email FROM Contact LIMIT 5];
        }

        @AuraEnabled
        
        public static List<Contact> getContactList(String inputName){
            return[select Id, Name, Phone, Email FROM Contact LIMIT 10];
            
    }
}