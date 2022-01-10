import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class UiGetObjInfo extends LightningElement {
//public static void getAccounts(Id accountId, Id reccordTypeId){}
    //@wire(getAccounts, {accountId: ''})
    //@wire(getAccounts, {accountId: '$recordId', recordTypeId: ''})
    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    objectInfo; //{data, error}

    get objectInfoStr()
    {
        if (this.objectInfo.data) {
            return JSON.stringify(this.objectInfo.data.fields);
        }
        
            return JSON.stringify(this.objectInfo.error);
    }

    renderedCallback()
    {
        console.log('Inside Rendered');
        console.log((JSON.stringify(this.objectInfo.data)));
        /*console.log(JSON.parse(JSON.stringify(this.objectInfo.data)));
        console.log(this.objectInfo.data.defaultRecordTypeId);*/
    }
    
}