public with sharing class OpportunityController {
    @AuraEnabled
    public static List<Opportunity> fetchOpportunities(){
        return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 10];
    } 
    @AuraEnabled
    public static List<Opportunity> fetchOpportunitiesByName(String oppName){
        if(oppName != null || oppName != ''){
         String tempOppName = '%'+oppName+'%';
         return [SELECT Id, Name, StageName, Type FROM Opportunity WHERE Name LIKE :tempOppName];
        }
        else{
            return null;
        }
    }
 
    @AuraEnabled
    public static List<Opportunity> fetchTwoOpps(){
     return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 2];
    }
 }