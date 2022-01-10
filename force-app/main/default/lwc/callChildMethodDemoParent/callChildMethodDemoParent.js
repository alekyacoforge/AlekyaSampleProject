import { LightningElement } from 'lwc';
import getOpps from '@salesforce/apex/OpportunityController.fetchTwoOpps';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CallChildMethodDemoParent extends LightningElement
{
    fetched = false;
    listOfOpps;

    fetchData = () =>
    {
        getOpps().then(response =>
        {
            this.listOfOpps = response;
            this.fetched = true;
        });
    }

    deleteAll = () =>
    {
        this.template.querySelectorAll('c-call-child-method-demo-child').forEach(childEl =>
        {
            childEl.deleteOpportunity();
        })
    }

    refreshPage = () =>
    {
        console.log('Received Event');
        this.dispatchEvent(new ShowToastEvent({
            title: 'Deleted!',
            message: 'All the listed records have been deleted!',
            variant: 'success',
        }));

        this.fetched = false;
    }
}