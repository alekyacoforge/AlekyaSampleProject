import { LightningElement, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import IND_FIELD from "@salesforce/schema/Account.Industry";

export default class WireJest extends LightningElement {
    recordId = "0015g00000BMtGTAA1";
  account;
  name = "";
  phone = "";
  industry = "";

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD, PHONE_FIELD, IND_FIELD]
  })
  wiredRecord({ data }) {
    if (data) {
      this.account = data;
      console.log(JSON.stringify(data));
      this.name = data.fields.Name.value;
      this.phone = data.fields.Phone.value;
      this.industry = data.fields.Industry.value;
    }
  }
}