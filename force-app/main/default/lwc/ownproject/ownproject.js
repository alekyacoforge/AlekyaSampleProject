import { LightningElement, track } from 'lwc';

export default class Ownproject extends LightningElement {
    
    @track isShown=false;
    arrays = [
        {
            id:"1",
            name:"kkk",
            department:"gh",
            age:"12"
        },
        {
            id:"2",
            name:"HHH",
            department:"IK",
            age:"2"
        },]
    handleText = () =>
{
this.isShown=!this.isShown;
//console.log('Clicked!!');

//this.isShown = !this.isShown;
/*console.log('Name: ', this.template.querySelector('.name').value);
this.name = this.template.querySelector('.name').value;
this.age = this.template.querySelector('.age').value;
this.group = this.template.querySelector('.group').value;*/
//let elementList = this.template.querySelectorAll('input');
/*for(let el of elementList){
    let inputVal = el.value;
    if(el.name == 'name'){
        this.name = inputVal;
    }
    else if(el.name == 'age'){
        this.age = inputVal;
    }
    else if(el.name == 'origin'){
        this.origin = inputVal;
    }*/
}


}