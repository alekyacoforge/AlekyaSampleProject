import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact.Level__c';
import LEVEL_FIELD from '@salesforce/schema/Contact.Level__c';
import getFilteredContacts from '@salesforce/apex/ContactsController.findContacts';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';


export default class UiSearch extends LightningElement {
    @track listOfContacts;
    levelOptions;
    recordTypeId;
    searchValue;


    @wire(getObjectInfo, {objectApiName: CONTACT_OBJECT})
    getRecordType({data, error}){
        if(data){
            console.log(JSON.stringify(data.defaultRecordTypeId));
            this.recordTypeId = data.defaultRecordTypeId;
        }else if(error){
            console.log("Error Getting Contact RecordTypes=>", JSON.stringify(error));
        }
    }

    @wire(getPicklistValues, {recordTypeId: "$recordTypeId", fieldApiName: LEVEL_FIELD})
    levelPicklistValues({data, error}){
        if(data){
            console.log("LevelPicklist=>", JSON.stringify(data.values));
            this.levelOptions = data.values;
        }else{
            console.log("Error fetching picklists");
        }
    }

    filterContacts = () =>{
        getFilteredContacts({name: this.searchValue})
        .then(contacts =>{
            console.log(JSON.stringify(contacts));
            this.listOfContacts = contacts;
        })
        .catch(error =>{
            console.log("error=>", JSON.stringify(error));
        })
    }

    handleSearch = (event) =>{
        this.searchValue = this.template.querySelector('.searchbox').value;
        console.log(this.searchValue);
        if(this.searchValue){
            console.log("searchValue");
            this.filterContacts();
        }else{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: `Type a name to search`,
                variant: 'error',
                mode: 'sticky'
            }));
        }
    }

    handleUpdate = (event) =>{
        const recordId = event.currentTarget.getAttribute('value');
        let fields = {'Id': recordId};
        console.log("handleUpdate");
        let cardElement = event.currentTarget.closest("lightning-card");
        let inputElements = cardElement.querySelectorAll("lightning-input");
        let comboboxElements = cardElement.querySelectorAll("lightning-combobox");
        inputElements.forEach(element => {
            element.value ? fields[element.name] = element.value : fields[element.name] = '';
        });
        comboboxElements.forEach(element => {
            element.value ? fields[element.name] = element.value : fields[element.name] = '';
        });
        console.log(fields);

        updateRecord({fields})
        .then(record =>{
            console.log(JSON.stringify(record));
            this.dispatchEvent(new ShowToastEvent({
                title: 'Record Updated!',
                message: `Record with id ${record.id} updated successfully`,
                variant: 'success',
                mode: 'sticky'
            }));
            // this.listOfContacts.forEach((contact,index) => {
            //     if(contact.Id === recordId){
            //         this.listOfContacts.splice(index, 1, record);
            //     }
            // });
            refreshApex(this.filterContacts());
        })
        .catch(error =>{
            console.log(JSON.stringify(error));
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error updating record',
                message: JSON.stringify(error.body.message),
                variant: 'error',
                mode: 'sticky'
            }));
        })
    }

    handleDelete = (event) =>{
        const recordId = event.currentTarget.getAttribute('value');
        deleteRecord(recordId)
        .then(() =>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Record Deleted!',
                message: `Record deleted successfully`,
                variant: 'success',
                mode: 'sticky'
            }));

            this.listOfContacts.forEach((contact,index) => {
                if(contact.Id === recordId){
                    this.listOfContacts.splice(index, 1);
                }
            });
        })
        .catch(error =>{
            console.log(JSON.stringify(error));
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error deleting record',
                message: JSON.stringify(error.body.message),
                variant: 'error',
                mode: 'sticky'
            }));
        })
    }
}