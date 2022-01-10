import { LightningElement } from 'lwc';

export default class HandsOnGrandParent extends LightningElement {
    inputText;

    handleEventFromGC = (event) => {
        console.log('Event from GC');
        this.inputText = event.detail;
    }
}