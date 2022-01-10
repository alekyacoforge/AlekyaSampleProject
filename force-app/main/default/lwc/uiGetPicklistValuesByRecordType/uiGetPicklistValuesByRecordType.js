import { LightningElement, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class UiGetPicklistValuesByRecordType extends LightningElement {
    industryValue;
    typeValue;
    accountIndustryValues;
    accountTypeValues;
    @wire(getPicklistValuesByRecordType, { objectApiName: ACCOUNT_OBJECT, recordTypeId: '012000000000000AAA' })
    accountPicklists({ data, error })
    {
        if (data) {
            console.log(JSON.parse(JSON.stringify(data)));
            this.accountIndustryValues = data.picklistFieldValues.Industry.values;
            this.accountTypeValues = data.picklistFieldValues.Type.values;
        }
        else if (error) {
            console.log(JSON.stringify(error));
        }
    }

    handleChange = (event) =>
    {
        if (event.target.name === 'industry') {
            this.industryValue = event.target.value;
        }
        else {
            this.typeValue = event.target.value;
        }
    }

    

}