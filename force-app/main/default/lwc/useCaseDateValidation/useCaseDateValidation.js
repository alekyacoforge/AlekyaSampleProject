import { LightningElement } from 'lwc';

export default class UseCaseDateValidation extends LightningElement {

    dateError = false;
    errorMessage;
    startDate;
    endDate;

    handleDateChange=(event)=>{
        let dateType = event.target.name;
        if(dateType === 'startDate'){
            this.startDate = event.target.value;
            if(this.endDate && this.startDate > this.endDate){
                this.dateError = true;
                this.errorMessage='start Date cannot be  greater end date' ;

            }else{
                this.dateError=false;
            }
        }

        else if (dateType === 'endDate'){
            this.endDate = event.target.value;
            if(this.startDate && this.startDate > this.endDate){
                this.dateError = true;
                this.errorMessage='start Date cannot be  greater end date' ;

            }else{
                this.dateError=false;
            }
        }
    }

}