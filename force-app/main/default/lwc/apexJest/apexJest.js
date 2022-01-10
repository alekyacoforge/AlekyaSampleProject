import { LightningElement, wire } from "lwc";
import getAccount from "@salesforce/apex/AccountController.getAccount";
export default class ApexJest extends LightningElement {
  recordId = "0015g00000BMtGTAA1";
  account;

  @wire(getAccount, { accId: "$recordId" })
  wiredAccount({ data, error }) {
    if (data) {
      console.log(JSON.stringify(data));
      this.account = data;
    } else if (error) {
      console.log(error);
    }
  }
}