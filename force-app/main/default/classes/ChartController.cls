public with sharing class ChartController {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getOpportunities(){
        return [SELECT COUNT(Id) Total, StageName FROM Opportunity GROUP BY StageName];
    }
}