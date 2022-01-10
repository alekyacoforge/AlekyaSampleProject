public with sharing class DeleteContact {   
    
 
    @AuraEnabled(cacheable=true)
    public static list<contact> getContactList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
    
      
        list<contact> contactListRecord = new list<contact>();
     
   
        for(contact conObj : [Select id,Name,Email,FirstName,LastName,Phone
                            From Contact
                            WHERE name LIKE : searchKeyword]){
           contactListRecord.add(conObj);
        }
        
         if(contactListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return contactListRecord;
    }
  
       @AuraEnabled(cacheable=false)
       public static List<Contact> fetchContactRecord(){
           List<Contact> conList = [Select Id, FirstName, LastName, Email, Phone From Contact Order By createdDate desc LIMIT 5];
           return conList;
       }
   
       @AuraEnabled
       public static List<Contact> deleteMultipleContactRecord(List<String> conObj){
           List<Contact> conObjItem = new   List<Contact>();
         List<Contact> conObjList = [Select Id, Name  From Contact Where Id IN:conObj];
         for(Contact con:conObjList){
           conObjItem.add(con);
         }
         if(conObjItem.size()>0){
             try{
               delete conObjItem;           
             }
             catch (Exception exp) {
               throw new AuraHandledException(exp.getMessage());
           }
         }
         return fetchContactRecord();
       }
   
   }