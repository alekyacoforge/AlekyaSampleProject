import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class GetPicklistValuesHandson extends LightningElement {
    value='';
    options;
    recordTypeId;
    @wire(getObjectInfo, {objectApiName: 'Account'})
    objectInfo({data, error}){
        if(data){
            this.recordTypeId = data.defaultRecordTypeId;
        }
        else{
            console.log('Error Fetching Object Details');
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: INDUSTRY_FIELD })
    industryValues({data, error}){
        if(data){
            this.options = data.values;
        }
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}