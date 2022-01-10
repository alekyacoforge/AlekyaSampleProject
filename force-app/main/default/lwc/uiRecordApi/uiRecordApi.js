import { api, LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class UiRecordApi extends LightningElement {

    @api recordId;
    fields = [NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];
    @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
    contactRec;

    get name()
    {
        return getFieldValue(this.contactRec.data, NAME_FIELD);
    }
    get phone()
    {
        return getFieldValue(this.contactRec.data, PHONE_FIELD);
    }

    get email()
    {
        return getFieldValue(this.contactRec.data, EMAIL_FIELD);
    }
}