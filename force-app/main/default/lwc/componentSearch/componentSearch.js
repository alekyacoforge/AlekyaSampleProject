import { LightningElement, wire, api, track } from 'lwc';
//import getObjs from '@salesforce/apex/getSearchData.getContactList';
//import getContactRecords from  '@salesforce/apex/getSearchData.getContactRecords';
export default class ComponentSearch extends LightningElement {

    firstName;
    lastName;
    middleName;
    postalCode;
    birthDate;
    phone;




    firstNameValue = (event) => {
        this.firstName = event.target.value;
    }

    middleNameValue = (event) => {
        this.middleName = event.target.value;
    }

    lastNameValue = (event) => {
        this.lastName = event.target.value;
    }

    postalCodeValue = (event) => {
        this.postalCode = event.target.value;
    }
    dateOfBirthValue = (event) => {
        this.birthDate = event.target.value;
    }
    phoneValue = (event) => {
        this.phone = event.target.value;
    }



    handleSearch = () => {

        let searchString = [
            {
                firstName: this.firstName,
                lastName: this.lastName,
                middleName: this.middleName,
                postalCode: this.postalCode,
                phone: this.phone
            }
        ];

        console.log('searching..', searchString);

        let stringJSON = JSON.stringify(searchString);
        getContactList({ getobjs: stringJSON })
            .then(result => {
                console.log('sucess', result);
                this.contactsRecord = result;
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
    }
    

    handleReset() {

        this.template.querySelector('form').reset();
    }

}
    














//         if (this.searchValue !== '') {
//             getContactList({
//                     searchKey: this.searchValue
//                 })
//                 .then(result => {
//                     // set @track contacts variable with return contact list from server  
//                     this.contactsRecord = result;
//                 })
//                 .catch(error => {

//                     const event = new ShowToastEvent({
//                         title: 'Error',
//                         variant: 'error',
//                         message: error.body.message,
//                     });
//                     this.dispatchEvent(event);
//                 });
//             } else {
//                 // fire toast event if input field is blank
//                 const event = new ShowToastEvent({
//                     variant: 'error',
//                     message: 'Search text missing..',
//                 });
//                 this.dispatchEvent(event);
//             }
//         }



// handleReset(){
    //        this.template.querySelectorAll('lightning-input').forEach(element => {
    //            element.value = null;   
    //         });
    //       }
        


//}