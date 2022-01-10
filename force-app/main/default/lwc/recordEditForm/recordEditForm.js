import { api, LightningElement } from 'lwc';
import{ ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordEditForm extends LightningElement {
    @api recordId;

    handleSuccess = (event) =>
    {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Contact Updated',
            message: `Contact with id ${ event.detail.id } has been updated!`,
            variant: 'success',
            mode: 'dismissible'
        }));
    }

    resetForm = () =>
    {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if (inputFields) {
            inputFields.forEach(field =>
            {
                field.reset();
            })
        }
    }
}