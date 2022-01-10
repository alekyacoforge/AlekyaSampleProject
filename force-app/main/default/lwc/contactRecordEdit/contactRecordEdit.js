import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactRecordEdit extends LightningElement {
    handleSubmit = (event) => 
    {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Department = 'Manager';
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess = (event) =>
    {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Record Created',
            message: `A new record with id ${event.detail.id} has been created`,
            variant: 'success',
            mode: 'sticky'
        }));
    }

    resetFields = () => 
    {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if(inputFields){
            inputFields.forEach(element => {
                element.reset();
            });
        }
    }
}