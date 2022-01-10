import { LightningElement,wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import demoMessageChannel from '@salesforce/messageChannel/demoMessageChannel__c'

export default class LmsSubscriber extends LightningElement {

    @wire(MessageContext)
    messageContext;
    receivedMessage;
    name;
    phone;
    source;
    showData = false;
    connectedCallback()
    {
        console.log('ConnectedCallback of Subscriber');
        this.subscribeMessageChannel();
    }

    subscribeMessageChannel = () =>
    {
        subscribe(this.messageContext, demoMessageChannel, (message) =>
        {
            this.receivedMessage = message;
            console.log(message);
        })
    }

    handleShow = () =>
    {
        if (this.receivedMessage) {
            this.showData = true;
            this.name = this.receivedMessage.recordData.Name;
            this.phone = this.receivedMessage.recordData.Phone;
            this.source = this.receivedMessage.source;
            this.receivedMessage = JSON.stringify(this.receivedMessage);
        }
    }
}