import { LightningElement } from 'lwc';

export default class HandsOnChild extends LightningElement {
    value;

    handleChange =(event)=>{
        this.value = event.target.value
    }

    handleFireEvent = () => {
        this.dispatchEvent(new CustomEvent('inputtext',{bubbles: true, composed: true, detail: this.value}))
    }
}