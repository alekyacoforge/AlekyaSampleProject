import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ToastHandsOn extends LightningElement {

    title;
    message;
    variant;

    get options()
    {
        return [
            {
                label: 'Success', value: 'success'
            }, {
                label: 'Warning', value: 'warning'
            }, {
                label: 'Info', value: 'info'
            }, {
                label: 'Error', value: 'error'
            }
        ]
    }

    handleChange = (event) =>
    {
        let inputVal = event.target.value;
        console.log(inputVal);
        if (event.target.name === 'title') {
            this.title = inputVal;
        } else if (event.target.name === 'message') {
            this.message = inputVal;
        }
        else {
            this.variant = inputVal;
        }
    }

    handleToast = () =>
    {
        const toaster = new ShowToastEvent({
            title: this.title,
            message: this.message,
            variant: this.variant,
            mode: 'pester'
        });
        this.dispatchEvent(toaster);
    }
}