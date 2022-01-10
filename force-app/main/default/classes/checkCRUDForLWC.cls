public class checkCRUDForLWC {
    @AuraEnabled
    public static Account createAccountRecord(string accName){
        Account acc = new Account();
        acc.name=accName;
        if(isCreateable('Account')==true){
            insert acc;
            return acc;
        }
        return null;
    }
    public static Boolean isCreateable(String sObjectType){
        SObjectType schemaType = Schema.getGlobalDescribe().get(sObjectType);
        return schemaType.getDescribe().isCreateable();
    }
}