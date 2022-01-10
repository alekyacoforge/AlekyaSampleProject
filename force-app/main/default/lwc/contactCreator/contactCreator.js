import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class ContactCreator extends LightningElement {
    fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD];

    handleSuccess(event){
    console.log(JSON.stringify(event.detail));
    this.dispatchEvent(new ShowToastEvent({
        title: 'Record Created',
        message: `A new contact with id ${event.detail.id} has been created`,
        variant: 'success',
        mode: 'sticky'

    }));
}
    
    
}