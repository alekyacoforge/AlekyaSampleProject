import { LightningElement, track, wire } from 'lwc';
import retrieveAccountRecords from '@salesforce/apex/accConApex.retrieveAccountRecords';

export default class ChildContact extends LightningElement {
    @wire (retrieveAccountRecords) accData;
    @track getAccId;
     
    handleChangeBox(event){        
        this.getAccId = event.target.value;
        window.console.log('getAccId ' + this.getAccId);
       const myCustomEventItem = new CustomEvent('myeventdemo',{
            detail: this.getAccId
       });
       this.dispatchEvent(myCustomEventItem);
        
    }
}