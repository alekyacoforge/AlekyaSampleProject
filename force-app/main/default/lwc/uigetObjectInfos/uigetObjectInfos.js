import { LightningElement, wire } from 'lwc';
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class UigetObjectInfos extends LightningElement {
    objects = [ACCOUNT_OBJECT, CONTACT_OBJECT];
    @wire(getObjectInfos, { objectApiNames: '$objects' })
    objectInfos;

    get accountObjInfoStr()
    {
        return this.objectInfos.data ? JSON.stringify(this.objectInfos.data.results[0].result.fields) : JSON.stringify(this.objectInfos.error);
    }

    get contactObjInfoStr()
    {
        return this.objectInfos.data ? JSON.stringify(this.objectInfos.data.results[1].result.fields) : JSON.stringify(this.objectInfos.error);
    }

    renderedCallback()
    {
        console.log(JSON.stringify(this.objectInfos.data));
    }
}