import { LightningElement, track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpportunites from '@salesforce/apex/OpportunityController.fetchOpportunities';
export default class UiDeleteRecord extends LightningElement {
    @track listOfOpportunites;
    connectedCallback() {

        getOpportunites()
            .then(opps => {
                this.listOfOpportunites = opps;

            })
            .catch(error => {
                console.log(JSON.stringify(errror))

            })
    }

    deleteOpportunity = (event) => {

        const deleteId = event.target.value;
        console.log(deleteId);
        deleteRecord(deleteId)
            .then(response => {

                console.log(JSON.stringify(response));
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: `Opportunity record with id ${ deleteId } has been deleted`,
                    variant: 'success',
                    mode: 'pester'
                }));
                for (let opp of this.listOfOpportunites) {
                    if (opp.Id == deleteId) {

                        this.listOfOpportunites.splice(opp, 1);
                    }
                }
            })
            .catch(error => {

                console.log(error);
                this.dispatchEvent(new ShowToastEvent({

                    title: 'Error',
                    message: 'Error',
                    variant: 'error'
                }))


            })

    }
}