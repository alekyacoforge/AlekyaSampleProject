import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class UsingJestFirst extends LightningElement {
  handleShowToast = () => {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Jest!",
        message: "Custom Toast Fired.",
        variant: "success"
      })
    );
  };

  handleTextChange = () => {
    const para = this.template.querySelector(".paragraph");
    para.textContent = "Changed Paragraph";
  };
}