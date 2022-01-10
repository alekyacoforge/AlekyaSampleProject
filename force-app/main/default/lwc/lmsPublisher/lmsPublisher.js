import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountController.getAccount';
import { publish, MessageContext } from 'lightning/messageService';
import demoMessageChannel from '@salesforce/messageChannel/demoMessageChannel__c';
export default class LmsPublisher extends LightningElement {
    recordId;
    source;
    recordData;

    @wire(MessageContext)
    messageContext;

    handleChange = (event) =>
    {
        let inputName = event.target.name;
        let inputVal = event.target.value;

        if (inputName === 'id') {
            this.recordId = inputVal
        } else {
            this.source = inputVal;
        }
    }

    handlePublish = () =>
    {
        getAccount({ accId: this.recordId })
            .then(response =>
            {
                this.recordData = response;
                const message = {
                    recordId: this.recordId,
                    recordData: this.recordData,
                    source: this.source
                }
                console.log(message);
                publish(this.messageContext, demoMessageChannel, message);
            })
    }
}