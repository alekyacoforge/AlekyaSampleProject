import { LightningElement } from 'lwc';

export default class HandsOnParent extends LightningElement {
    inputText;

    handleChildEvent = (event) => {
        this.inputText = event.detail;
    }
}