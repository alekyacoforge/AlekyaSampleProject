import { api, LightningElement,track } from 'lwc';

export default class ChildComp extends LightningElement {
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
        console.log('Hello -1');
        this.pNumber=this.template.querySelector('lightning-input').value;
        console.log(this.pNumber);
        
        const custEvent = new CustomEvent(
            'sendphonenumber', {
                detail: {pNumb: this.pNumber, ids:this.valFromParent}
            });
        this.dispatchEvent(custEvent);
    }

}