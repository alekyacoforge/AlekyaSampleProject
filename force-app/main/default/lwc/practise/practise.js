import { LightningElement, track } from 'lwc';

export default class Practise extends LightningElement {
    
    @track randomText = 'First Lwc Para';
    @track isShown= false;
    @track arrayofText = ['LWC', 'Apex', 'JS', 'CSS'];
    handleText = () =>
    {
        console.log('Clicked!');
        this.isShown = true;
        let index = Math.floor(Math.random() * this.arrayOfText.length);
        console.log(this.arrayOfText[index]);
        this .randomText = this.arrayOfText[index];

    }
    trackChange = (event) =>{
        console.log(event.target.value);
        this.randomText = event.target.value;
    }
}
/*
trainees =[
    {
        id:"1",
        name:"kkk",
        department:"gh",
        age:"12"
    },
    {
        id:"1",
        name:"kkk",
        department:"gh",
        age:"12"
    },
    {
        id:"1",
        name:"kkk",
        department:"gh",
        age:"12"
    },
];
@track showTable = false;
handleShowTable =() =>
{
    this.showTable = !this.showTable;
    const ctrlBtn = this.template.querySelector('.ctrl-btn');
    const outputText = this.template.querySelector('.output-text');
    if(this.showTable){
        ctrlBtn.textContent ='Hide Data';
        outputText.textContent = 'click button to hide'
    }else{
        ctrlBtn.textContent ='Show Data';
        outputText.textContent = 'click button to show'
    }
}
}*/