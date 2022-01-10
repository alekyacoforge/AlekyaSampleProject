import { LightningElement, api } from 'lwc';
import{ ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Recordpage extends LightningElement {

    @api objectApiName;
    @api recordId;

handleToast = () =>
{
const toaster = new ShowToastEvent({
    title: 'Message From Salesforce',
    message: `You are in a ${this.ojectApiName } record and the id is ${this.recordId }`,
    variant: 'success',
    mode: 'sticky'//pester automatic for 5sec
});
this.dispatchEvent(toaster);
}
}