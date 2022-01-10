import { LightningElement } from 'lwc';
import{ ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import DEPARTMENT_FIELD from '@salesforce/schema/Contact.Department';



export default class RecordForm extends LightningElement {
fields = [NAME_FIELD, TITLE_FIELD, DEPARTMENT_FIELD];

handleSubmit=(event) =>
{
 event.preventDefault();
 const fields = event.detail.fields;
 fields.Email = 'ik@test.com';
 this.template.querySelector('lightning-record-form').submit(fields);
}

handleSuccess= (event) =>
{
    console.log(JSON.stringify(event.detail));
    this.dispatchEvent(new ShowToastEvent({
        title: 'Record Created',
        message: `A new contact with id ${event.detail.id} has been created`,
        variant: 'success',
        mode: 'sticky'

    }));
}
}