public with sharing class AccountManager {
    public static String searchkeys;
    public static String sortBys;
    public static String sortDirections;
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchkey, String sortBy, String sortDirection)
    {
        searchkeys=searchkey;
        sortBys=sortBy;
        sortDirections=sortDirection;
        String query = 'select Id,Name,Phone,Website FROM Account';
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            query += ' WHERE Name LIKE :key';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        return Database.query( query );
        //return [select Id,Name,Phone,Website FROM Account];
    }
    @AuraEnabled
    public static List<Account> upateAccounts(String accId){
        System.debug('Account Id to update is : '+accId);
        Account acc=[select Id,Name,Phone,Website FROM Account where Id=:accId];
        acc.Name='Test Name';
        try {
            update acc;
        } 
        catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        }
        System.debug('searchkeys : '+searchkeys);
        System.debug('sortBys : '+sortBys);
        System.debug('sortDirections : '+sortDirections);
        return getAccounts(searchkeys, sortBys, sortDirections);
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name,Phone
            FROM Account];
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