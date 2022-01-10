import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';


export default class UiGetPiclistValues extends LightningElement {

    value;
    /*
    recordTypeId
    @wire*/ 
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA' , fieldApiName: INDUSTRY_FIELD})
    industryFields;
    handleChange = (event) =>
    {
this.value = event.detail.value;
    }
}