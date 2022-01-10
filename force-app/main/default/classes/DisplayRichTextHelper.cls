public with sharing class DisplayRichTextHelper {
    @AuraEnabled(cacheable=false)
    public static Attachment generateAsPDF(String textValue){

        Pagereference page = Page.renderAsPDF;
        page.getParameters().put('displayText',textValue);
        Contact con = new Contact(Id='0035g000004quuCAAQ');
        Attachment attObj = new Attachment();
        attObj.Name = 'LWC.pdf';
        attObj.ParentId = con.Id;
        attObj.Body = page.getContentAsPDF();
        attObj.IsPrivate = false;
        insert attObj;
        return attObj;
    }
}