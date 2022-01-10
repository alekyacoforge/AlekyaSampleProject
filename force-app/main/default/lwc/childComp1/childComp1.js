import { LightningElement,api, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/AccController.getContacts';

export default class ChildComp1 extends LightningElement {
    @api accIdValue;

    @track columns =[
        {
            label: 'Account name',
            fieldName: 'Account.Name',
            
            sortable: true

    },
    {
        label: 'Contact Name',
        fieldName: 'Name',
        type: 'text',
        sortable: true

    },{
        label: 'Title',
        fieldName: 'Title',
        type: 'text',
        sortable: true

    },
    {
        label: 'Email',
        fieldName: 'Email',
        type: 'email',
        sortable: true

    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: true

    }];

    @track error;
    @track conList;
    @wire (getContactList, {accIds: '$accIdValue'})
    wiredContacts({
        error,
        data
    }){
        if(data)
        {
            this.conList=data;
            
        }
        else if (error)
        {
            this.error=error;
        }
    }

    
}