public with sharing class ApplicationNumber {
    
    
        @AuraEnabled(cacheable=true)
        public static   String getContacts(String ApplicationNo) {
            Contact c =[Select Id from Contact where Application_Number__c=:ApplicationNo];
            String retId=String.valueOf(c.Id);
            return retId;
        
}
}