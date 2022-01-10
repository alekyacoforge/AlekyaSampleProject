import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import generateAsPDF from '@salesforce/apex/DisplayRichTextHelper.generateAsPDF';
export default class UsecasePdf extends LightningElement {
    textValue;
    attachmentId;
    allowedFormats = ['font', 'size', 'bold', 'list', 'link', 'image', 'color', 'table', 'background'];

    handleText = (event) =>
    {
        this.textValue = event.target.value;
    }

    saveAsPdf = () =>
    {
        generateAsPDF({ textValue: this.textValue })
            .then(response =>
            {
                this.attachmentId = response.Id;
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Attachment Created',
                    message: `PDF Generated with Id ${ this.attachmentId }`,
                    variant: 'success'
                }))
            })
            .catch(error =>
            {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: `Error Creating Attachment.${error.body.message}`,
                    variant: 'error'
                }))
            })
    }
}