import { LightningElement, track } from 'lwc';

export default class Combination extends LightningElement {

    trainees = [
        {
            id: 1,
            name: 'Akash Gupta',
            dept: 'Salesforce',
            age: 30
        }, {
            id: 2,
            name: 'Prakash Gupta',
            dept: 'Frontend',
            age: 35
        }, {
            id: 3,
            name: 'Akash Shaw',
            dept: 'Backend',
            age: 40
        }
    ];
    @track showTable = false;

    handleShowTable = () =>
    {
        this.showTable = !this.showTable;
        const ctrlBtn = this.template.querySelector('.ctrl-btn');
        const outputText = this.template.querySelector('.output-text');
        if (this.showTable) {
            ctrlBtn.textContent = 'Hide Data';
            outputText.textContent = 'Click on the button to hide data'
        }
        else {
            ctrlBtn.textContent = 'Show Data';
            outputText.textContent = 'Click on the button to show data'
        }
    }
}