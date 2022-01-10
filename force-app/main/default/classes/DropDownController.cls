public with sharing class DropDownController {
    @AuraEnabled(Cacheable=true)
    public static List<Contact> selectedOption(integer recordSize, String lineToQuery){
      system.debug('record size:::'+recordSize);
      String queryString=lineToQuery+' limit '+recordSize;
      List<SObject> sobjList = Database.query(queryString);
      return sobjList;
       
}
@AuraEnabled(Cacheable=true)
public static String getColunnsAndData(String currentObjectName,String searchQuery,Integer recordSize)
{
  Dynamic_Search_Setting__mdt dsc=FieldSetControllerCheck.getMetaConfig(currentObjectName);
  Map<String, String> returnMap = new Map<String,String>();
  if(!String.isEmpty(currentObjectName) && !String.isEmpty(dsc.Result_Fieldset__c))
    {
      SObject sObj = (SObject)(Type.forName('Schema.'+ currentObjectName).newInstance());
      List<Schema.FieldSetMember> lstFSMember = 
            sObj.getSObjectType().getDescribe().fieldSets.getMap().get(dsc.Result_Fieldset__c).getFields();
            returnMap.put('Field_List', JSON.serialize(lstFSMember));
    
    }
    if(!String.isEmpty(searchQuery))
    {
      String queryTo=searchQuery+' Limit '+String.valueOf(recordSize);
      List<SObject> lstRecords = Database.query(queryTo);
      returnMap.put('RECORD_LIST', JSON.serialize(lstRecords));
    }

    return JSON.serialize(returnMap);

}




@AuraEnabled(Cacheable=true)
 public static ResultWrapper searchController(String query,Integer maxRecords)
 {
   
 
       ResultWrapper resultWrapper = new ResultWrapper();
       List<SObject> sobjList=new List<SObject>();
       if(!String.isEmpty(query))
       {
         sobjList = Database.query(query);
       }
         
         
      // condition used for not fetch more than 100 comapring with size 
        if(sobjList.size()<=maxRecords){
         
          resultWrapper.success = true;
          resultWrapper.SuccessMsg = '100 records succufully fetched';
          resultWrapper.records=sobjList;
          resultWrapper.listSize = sobjList.size();
           }
  
          else {
  
              resultWrapper.success=false;
              //resultWrapper.errorMsg =  System.Label.CustomLabelForErrorMessage;
  
            
              } 
              return resultWrapper;
        }
      
      
      
      
     
  
  }