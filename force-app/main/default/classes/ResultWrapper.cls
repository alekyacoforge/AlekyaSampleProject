public with sharing class ResultWrapper
{
    @AuraEnabled
    public Boolean success {get; set;}
    @AuraEnabled
    public String SuccessMsg {get; set;}
    @AuraEnabled
    public String errorMsg {get; set;}
    @AuraEnabled
    public Integer listSize{get; set;}
    @AuraEnabled
    public List<Sobject> records{get; set;}
    //contructor in success Initialization false
    public ResultWrapper(){

        success = false;
    }


}