public with sharing class FieldSetFieldsGetter 
{
    public static String getFields(String objAPIName)
    {
        String fieldsString='';
        Map<String, String> returnMap = new Map<String,String>();
        if(!String.isEmpty(objAPIName))
        {
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            Map<String, Schema.SObjectField> fieldMap = schemaMap.get(objAPIName).getDescribe().fields.getMap();
            Integer sizeOfSet=fieldMap.size();
            Integer counter=0;
            
            for(String fName : fieldMap.keyset()) 
            {
                
                counter=counter+1;
                if(counter == sizeOfSet)
                {
                    fieldsString= fieldsString+fName;
                    
                }
                else {
                    fieldsString= fieldsString+fName+','; 
                    
                }
                
                
                
                
                
            }
    }
    System.debug('Fields String is : '+fieldsString);
    return fieldsString;
}

@AuraEnabled(cacheable=true)
    public static string getObjectLabel(String objApiName)
    {
        Map<String, SObjectType> sObjects = Schema.getGlobalDescribe();
        return sObjects.get(objApiName).getDescribe().getLabel();
    }


}