public with sharing class AccountController {
    
    
    @AuraEnabled
    public static List<Account> getAccountsByIndustryOrName(String industry, String accountName){
        String query = 'SELECT Id, Name, Phone, Website, AnnualRevenue, Industry FROM Account WHERE';
        if(!String.isEmpty(industry)){//if industy is not empty will perform this
            query = query + ' Industry=\'' + String.escapeSingleQuotes(industry) + '\'';
            if(!String.isEmpty(accountName)){// if accountName is not empty
                query = query + ' AND Name LIKE \'%' + String.escapeSingleQuotes(accountName) + '%\'';
            }
        }
        else if(!String.isEmpty(accountName)){
            query = query + ' Name LIKE \'%' + String.escapeSingleQuotes(accountName) + '%\'';
        }
        System.debug(query);
        List<Account> records = Database.query(query);
        System.debug(records);
        return records;
    }
    @AuraEnabled(cacheable=true)
        public static List<account>  getAccountList(){
        return [SELECT Id, Name,Phone,Website FROM Account LIMIT 10];
    }
    

    
 


}