public with sharing class DeleteAccount {   
    
 
    @AuraEnabled(cacheable=true)
    public static list<account> getAccountList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
    
      
        list<account> accountListRecord = new list<account>();
     
   
        for(account accObj : [Select id,  Name,Phone, Website FROM Account
                            WHERE name LIKE : searchKeyword]){
           accountListRecord.add(accObj);
        }
        
         if(accountListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return accountListRecord;
    }
  
       @AuraEnabled(cacheable=false)
       public static List<Account> fetchAccountRecord(){
           List<Account> accList = [Select Id, Name,Phone, Website FROM Account Order By createdDate desc LIMIT 5];
           return accList;
       }
   
       @AuraEnabled
       public static List<Account> deleteMultipleAccountRecord(List<String> accObj){
           List<Account> accObjItem = new   List<Account>();
         List<Account> accObjList = [Select Id, Name  From Account Where Id IN:accObj];
         for(Account acc:accObjList){
           accObjItem.add(acc);
         }
         if(accObjItem.size()>0){
             try{
               delete accObjItem;           
             }
             catch (Exception exp) {
               throw new AuraHandledException(exp.getMessage());
           }
         }
         return fetchAccountRecord();
       }
   
   }