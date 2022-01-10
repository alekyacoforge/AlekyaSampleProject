import { LightningElement } from 'lwc';

export default class HandsonDateVali extends LightningElement {
    dateError = false;
    errorMessage;
    startDate;

    handleDateChange(event) {

        var statticDate = new Date('2021-03-01');
        this.startDate = event.target.value;
        if(this.startDate && new Date(this.startDate) > statticDate)
        {
            this.dateError = true;
            this.errorMessage = 'Date Cannot be grater than static date';
        }else{
            this.dateError = false;
        }

    }

}