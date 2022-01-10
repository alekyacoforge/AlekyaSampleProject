import { api, LightningElement } from 'lwc';

export default class AccountPrinter extends LightningElement {
    @api accInfo;
    @api printId;
}