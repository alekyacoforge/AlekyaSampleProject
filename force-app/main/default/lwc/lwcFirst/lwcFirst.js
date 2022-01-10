import { LightningElement, track } from 'lwc';

export default class lwcFirst extends LightningElement 
{
 //@track randomText = 'First LWC para';
 @track name;
 @track age;
 @track origin;
 @track isShown = false;
 arrayOfText = ['Lightning', 'Aura', 'Salesforce','Apex','JavaScript'];
 handleText = () =>
 {
     console.log('Clicked!!');
     this.isShown = !this.isShown;
     /*console.log('Name: ', this.template.querySelector('.name').value);
     this.name = this.template.querySelector('.name').value;
     this.age = this.template.querySelector('.age').value;
     this.origin = this.template.querySelector('.orign').value;*/
     /*let elementList = this.template.querySelectorAll('input');
     for (let el of elementList) {
         let inputVal = el.value;
         if (el.name === 'name') {
             this.name = inputVal;
         }
         else if (el.name === 'age'){
             this.age = inputVal;
         }
         else if (el.name === 'origin') {
             this.origin = inputVal;
         }
     }*/
 }
 trackChange = (event) =>
 {
     console.log(event.target.value);
     //this.randomText = event.target.value;
     /*let inputVal = event.target.value;
     switch (event.target.name) {
         case "name": this.name = inputVal;
             break;
         case "age": this.age = inputVal;
             break;
         case "origin": this.origin = inputVal;
             break;
         default : 
     }*/

 }
}