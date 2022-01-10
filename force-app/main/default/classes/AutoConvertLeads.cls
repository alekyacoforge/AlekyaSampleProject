Public class AutoConvertLeads
{     @InvocableMethod  
    public static List<Id> LeadAssign(List<Id> LeadIds)  
    {        
        List<Id> leadConversionResult = new List<Id>();
        //LeadStatus CLeadStatus= [SELECT Id, MasterLabel FROM LeadStatus where Id IN : LeadIds];    
        List<Database.LeadConvert> MassLeadconvert = new List<Database.LeadConvert>();    
        for(id currentlead: LeadIds){  
            System.debug('currentlead::'+ currentlead);
            Database.LeadConvert Leadconvert = new Database.LeadConvert();    
            Leadconvert.setLeadId(currentlead);                              
            Leadconvert.setConvertedStatus('Closed - Converted');            
           Leadconvert.setDoNotCreateOpportunity(False); //Remove this line if you want to create an opportunity from Lead Conversion  
            MassLeadconvert.add(Leadconvert);    
        }                  
        if (!MassLeadconvert.isEmpty())
        {            
            List<Database.LeadConvertResult> lcr = Database.convertLead(MassLeadconvert);
            System.debug('lcr:' + lcr);
            if(lcr[0].isSuccess()){
                leadConversionResult.add(lcr[0].getAccountId());
                //leadConversionResult.add(lcr[0].getContactId());
                //leadConversionResult.add(lcr[0].getOpportunityId());
            }
            System.debug('Closed - Converted');
            System.debug('leadConversionResult>>' + leadConversionResult);
            return leadConversionResult;
        }
        return leadConversionResult;
    }
}