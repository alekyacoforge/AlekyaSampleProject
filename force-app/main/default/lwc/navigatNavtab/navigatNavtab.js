import { LightningElement, track, api } from 'lwc';
import searchContacts from '@salesforce/apex/ApplicationNumber.getContacts';
import { NavigationMixin } from 'lightning/navigation';



export default class NavigatNavtab extends LightningElement {

  @track ApplicationNumber;
    @track results;
   
    ApplicationNumberValue = (event) => {
        this.ApplicationNumber = event.target.value;
    }

    handleSearch(event) {
        //this.ApplicationNumber = event.detail.value;
        console.log('Selected value is : ' + this.ApplicationNumber);
        searchContacts({ ApplicationNo: this.ApplicationNumber })
            .then((result) => {
                this.results = result;
                this.errors = undefined;
                console.log('Result is : ' + this.results);
               

                this[NavigationMixin.Navigate]({

                    type: "standard__recordPage",
                    attributes: {
                        recordId: this.results,//recid
                        
                        actionName: "view"

                    }

                }).then((url) => {
                  { url: '/lightning/r/Contact/'+recordId +'/view?ws='+encodeURIComponent(window.location.pathname) }
                    
                    console.log('navigate ' + this.results);

                });

            })
            .catch((error) => {
                this.errors = error;
                this.results = undefined;
            });

          }}