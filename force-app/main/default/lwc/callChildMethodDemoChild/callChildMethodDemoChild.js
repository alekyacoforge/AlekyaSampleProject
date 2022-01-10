import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
export default class CallChildMethoDemoChild extends LightningElement
{
    @api oppInfo;

    @api deleteOpportunity = () =>
    {
        console.log('Control Child');
        deleteRecord(this.oppInfo.Id).then(() =>
        {
            this.dispatchEvent(new CustomEvent('deleterecord'));
        });
    }
}