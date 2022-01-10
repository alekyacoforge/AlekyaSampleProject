/**************************************************************************
* Date     Author      Version     Description
* ************************************************************************
* 
**************************************************************************/
public with sharing class Dynamicquery {
    
    @AuraEnabled(cacheable=true)
    public static String fetchQueryString(String filterValues, String objectName){
        if(!String.isEmpty(filterValues )&& !String.isEmpty(objectName) )
         
        {
            System.debug('filterValues'+filterValues);
            List <String> validationChecker = new List<String>();
            Map<String, Schema.SObjectType> sObjectMap = Schema.getGlobalDescribe();
            Schema.SObjectType sObjectTypeInstance = sObjectMap.get(objectName);
            for(SObjectField field: sObjectTypeInstance.getDescribe().fields.getMap().values())
            {
                DescribeFieldResult des = field.getDescribe();
                System.debug('Field Name is : '+des.getName()+' Field Type is : '+des.getType());
                if(String.valueOf(des.getType())  != 'EMAIL' && String.valueOf(des.getType()) !='STRING')
                {
                    validationChecker.add(des.getName());
                }
            }
            
            
            String columnsName = FieldSetFieldsGetter.getFields(objectName);

            //creating dynamic query using object parameter and metadata columns
            String query = ' Select '+columnsName+ ' From '+ objectName +' Where  ';
            
            System.debug('result'+filterValues);
            Map<String, Object> myMaps = (Map<String, Object>) JSON.deserializeUntyped(filterValues);
            
            boolean isAddedFirstFilter = false;
            for(String key : myMaps.keyset()) {
                system.debug('key value::' + key);
                
                
                if(myMaps.get(key) != null){  
                    
                    if(!isAddedFirstFilter){
                        
                        if( validationChecker.contains(key)){
                            query = query + key + ' = ' + myMaps.get(key);
                        }
                        else{
                            query = query + key + ' like \'%' + myMaps.get(key) + '%\'';
                        }
                        isAddedFirstFilter = true;
                    }
                    else{
                        if( validationChecker.contains(key)){
                            query = query + ' and '+ key + ' = ' + myMaps.get(key);
                        }
                        else
                        {
                            
                            query = query +' and '+ key + ' LIKE \'%'  + myMaps.get(key) + '%\'';
                            
                        }
                        
                    }
                    
                    
                    
                    
                }
                
            }
            
            List<sObject> sobjList = Database.query(query);
            System.debug(query);
            
            return query;
        }
       return null;
    
    }
    
}