import { LightningElement,track,api } from 'lwc';

export default class UpdateChildComp  extends LightningElement {

    @track valFromParent;
    @track disResult=false;
    @track pNumber;
    @api 
    displayRecord(recordId,resDis)
    {
        console.log( 'Record Id in child comp ' + JSON.stringify( recordId ) );
        this.valFromParent = recordId;
        this.disResult=resDis;
    }

    updatePhone(event)
    {
        console.log('Hey');
        this.pNumber=this.template.querySelector('lightning-input').value;
        console.log(this.pNumber);
        
        const custEvent = new CustomEvent(
            'sendphonenumber', {
                detail: {pNumb: this.pNumber, ids:this.valFromParent}
            });
        this.dispatchEvent(custEvent);
    }
}