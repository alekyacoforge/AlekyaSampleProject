import { LightningElement, api } from 'lwc';

export default class EventWithDataChild extends LightningElement {

    @api contact;
    
    handleSelectContact = ()=>{
        const selectedEvent = new CustomEvent('selected', {detail: this.contact.Id});
        this.dispatchEvent(selectedEvent);
    }

}