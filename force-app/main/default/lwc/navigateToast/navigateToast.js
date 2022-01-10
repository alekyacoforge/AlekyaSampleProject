import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';


export default class NavigateToast extends NavigationMixin(LightningElement) {
    fields = [NAME_FIELD, PHONE_FIELD];

    handleSuccess = (event) =>
    {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Account',
                actionName: 'view'
            }
        }).then(url =>
        {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Record Created!',
                message: 'Click {0} to view the record',
                messageData: [{
                    label: event.detail.id,
                    url
                }],
                variant: 'success',
                mode: 'sticky'
            }))
        })
    }
}