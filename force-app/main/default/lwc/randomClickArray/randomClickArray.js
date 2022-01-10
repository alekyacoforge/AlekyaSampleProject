import { LightningElement, track } from 'lwc';

export default class RandomClickArray extends LightningElement {

    @track randomText = 'First LWC para';
    @track isShown = false;
    @track arrayofText = ['One', 'Two', 'Three', 'Four'];

    handleText = () =>
    {
        console.log('Clicked!!');
        this.isShown = !this.isShown;
        let index = Math.floor(Math.random() * this.arrayofText.length);
        console.log(this.arrayofText[index]);
        this.randomText=this.arrayofText[index];
    }
    trackChange = (event) =>
    {
        console.log(event.target.value);
        this.randomText = event.target.value;
    }

}