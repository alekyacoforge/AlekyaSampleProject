import { api, LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import OPP_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPP_AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import OPP_CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import OPP_STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import OPP_ACCOUNTNAME_FIELD from '@salesforce/schema/Opportunity.AccountId';
export default class UiOppoertunityFilterItem extends LightningElement {

    @api oppRecordId
    showModal = false;

    oppSelectedFields = [OPP_NAME_FIELD, OPP_AMOUNT_FIELD, OPP_CLOSEDATE_FIELD, OPP_STAGENAME_FIELD, OPP_ACCOUNTNAME_FIELD];

    handleDelete = (event) => {
        let deleteId = event.target.value;
        console.log('Inside handle delete');
        this.dispatchEvent(new CustomEvent('deleteopp', { detail: { value: deleteId } }));
    }

    handleSuccessUpdate = () => {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.oppRecordId,
                objectApiName: 'Opportunity',
                actionName: 'view',
            }
        }).then(url => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: `Opportunity with record id {0} updated successfully.`,
                messageData: [{
                    url,
                    label: this.oppRecordId
                }],
                variant: 'success',
                mode: 'sticky',
            }))
        })
    }
}