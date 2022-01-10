import { LightningElement, wire,api } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import { publish, MessageContext } from 'lightning/messageService';
import demoMessageChannel from '@salesforce/messageChannel/demoMessageChannel__c';

export default class Contactlms extends LightningElement {
    messageContext;
    inputName;
    recordData;
    recordname;
    

    @wire(MessageContext)
    messageContext;

    handleSearch = (event) =>
    {
        this.inputName = event.target.value;
        
        }

        handleContactSelect=() =>{
            getContactList({conname: this.inputName})
            .then(response=>{
                this.recordData=response;
            const message={
                MatchingContact:this.recordData
            }
    
            publish(this.messageContext, recordSelected, payload);
        })
    }}