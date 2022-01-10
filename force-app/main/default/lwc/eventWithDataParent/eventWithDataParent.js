import { LightningElement } from 'lwc';
import getContactList from '@salesforce/apex/ContactsController.fetchFewContacts';

export default class EventWithDataParent extends LightningElement {
listOfContacts;
selectedContact;

connectedCallback()
{
    getContactList().then(response => {this.listOfContacts = response})
}
contactSelected = (event) =>
{
    console.log('Inside Parent Handler');
    const contactId = event.detail;
    this.listOfContacts.map(contact =>
        {
        if(contact.Id === contactId){
            this.selectedContact = contact;
        }
    });
}
}