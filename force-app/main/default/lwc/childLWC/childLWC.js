import { api, LightningElement,track } from 'lwc';

export default class ChildLWC extends LightningElement {

    @api pubValue;
    @api isShown;
}