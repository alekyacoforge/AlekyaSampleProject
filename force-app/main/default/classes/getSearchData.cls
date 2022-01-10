public with sharing class getSearchData {

    @AuraEnabled(cacheable=true)
    public static list<Contact> getContactList(string searchKey){
        list<Contact> getobjs = Database.query('SELECT Id, Name ,phone,postalCode,birthDate from Contact WHERE Name = :searchKey');

        return getobjs;


    }}




//     @AuraEnabled(cacheable=true)
//     public static list<String> getSearchdataRecords(){
//     list<String> getobjs = new list<String>();
//     for(Contact con :[SELECT Id, Name ,phone,postalCode,birthDate from Contact] )
//           {
//             getobjs.add(con);
//           }
//     System.debug('Returned Contacts ; '+ getobjs);
//     return getobjs;
//     }
    
//     @AuraEnabled(cacheable=true)
// public static list<Contact> getContactRecords(String jsonString){
// system.debug('String::'+jsonString);
// contact con = new Contact();
// return jsonString;
// }
    

// @AuraEnabled(cacheable=true)
// public static list<contact> getContactList(string searchKey) {
// string searchKeyword = '%' + searchKey + '%';
//  list<contact> contactListRecord = new list<contact>();

//       for(contact conObj : [Select id,Name,FirstName,LastName,Phone,MailingAddress

//       From Contact 

//      WHERE name LIKE  : searchKeyword]){

//          contactListRecord.add(conObj);

//       }


//        if(contactListRecord.size() == 0){

//           throw new AuraHandledException('No Record Found..'); 

//        }

//       return contactListRecord;

//   }