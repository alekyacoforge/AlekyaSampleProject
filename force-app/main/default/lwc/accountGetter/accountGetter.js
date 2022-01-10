import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountGetter extends LightningElement {

    listOfAccs;

    connectedCallback()
    {
        getAccounts()
            .then(response =>
            { this.listOfAccs = response });
    }

    handlePrint = (event) =>
    {
        console.log('Id: ', event.target.value);
    }
}