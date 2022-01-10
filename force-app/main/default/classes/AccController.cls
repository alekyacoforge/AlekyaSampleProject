public with sharing class AccController {
    
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name,Phone
            FROM Account Limit 10];
    }
    @AuraEnabled
   public static List<Account> updateRecord(String accId,String pNumber)
   {
        Account acc=[select Id,Name,Phone from Account where Id=:accId];
        acc.Phone=pNumber;
        try{
            update acc;
        }
        catch (Exception e) {
            System.debug('unable to update the record due to'+e.getMessage());
        }
        return getAccountList();
   }

   @AuraEnabled(cacheable=true)
   public static List<Contact> getContacts(String accIds)
   {
      list<Id> idsList=accIds.split(',');
      System.debug('Ids in list is : '+ idsList);
      Set<Id> idsSet=new Set<Id>(idsList);
      System.debug('Ids in the set is : '+idsSet );
      List<Contact> allCons=new List<Contact>();
      for(Contact con :[SELECT Id,Account.Name,Name,AccountId,Title,Email,Phone FROM Contact WHERE AccountId IN :idsSet] )
      {
        allCons.add(con);
      }

      
      System.debug('Returned Contacts ; '+ allCons);
      return allCons;
   }

}