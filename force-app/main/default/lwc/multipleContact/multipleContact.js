import { LightningElement, wire,api, track } from 'lwc';
import fetchContactRecord from '@salesforce/apex/DeleteContact.fetchContactRecord';
import deleteMultipleContactRecord from '@salesforce/apex/DeleteContact.deleteMultipleContactRecord';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import  getContactList from '@salesforce/apex/DeleteContact.getContactList';

const columns = [
    {
       label: 'FirstName',
       fieldName: 'FirstName',
       type: 'text',
       editable: true,
   }, {
       label: 'LastName',
       fieldName: 'LastName',
       type: 'text',
       editable: true,
   }, {
       label: 'Phone',
       fieldName: 'Phone',
       type: 'phone',
       editable: true
   }
];

export default class MultipleContact extends LightningElement {
    columns = columns;
    ContactId;
    saveDraftValues = [];
    @track contactsRecord;
    @track  wireContact;
    searchValue = '';
    isShowCreate=false;
    isModalOpen = false;
    
    // @wire (fetchContactRecord)
    // getContactRecords({data, error}){
    //     if(data){
    //         console.log("ContactRecords=>>" , JSON.stringify(data));
    //         this.wireContact = data;
    //     }else{
    //         console.log(JSON.stringify(error))
    //     }
    // }
//
    constructor(){
        super();
        this.fetchContactRecords();
    }
   
    fetchContactRecords = () =>{
        fetchContactRecord({}).then(contacts =>{
            this.wireContact = contacts;
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        })

    }
    handleSave(event) {
        console.dir(event.detail.draftValues);
        this.saveDraftValues = event.detail.draftValues;

        console.log(this.saveDraftValues.slice());
        
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
        console.log("recordInputs=>>", JSON.stringify(recordInputs))

        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.saveDraftValues = [];
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully!!',
                    variant: 'success'
                })
            );
            
            return this.refresh();
        }).catch(error => {
            console.log("Error=>>", JSON.stringify(error.body));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occured!!',
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }

    // This function is used to refresh the table once data updated
    async refresh() {
        await refreshApex(this.fetchContactRecords());
    }


    @api selectedContactIdList=[];
    @track errorMsg;

   
    handleAdd = (event) =>{
        this.isShowCreate=true;
    
        this.AccountId = event.target.value;

    }

    getSelectedIdAction(event){
        const selectedContactRows = event.detail.selectedRows;
        window.console.log('selectedContactRows# ' + JSON.stringify(selectedContactRows));
        this.selectedContactRows=[];
        
        for (let i = 0; i<selectedContactRows.length; i++){
            this.selectedContactIdList.push(selectedContactRows[i].Id);
        }

     
    }
    handleModalClose = (event) =>{
        
        this.isModalOpen = false;
    }
   
    deleteContactRowAction(){
        deleteMultipleContactRecord({conObj:this.selectedContactIdList})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedContactRows=[];
            refreshApex(this.fetchContactRecords());
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record deleted successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);

            
        })
        .catch(error =>{
            this.errorMsg =error;
            const toastEvent = new ShowToastEvent({
                title:'Error!',
                message: JSON.stringify(error.body.message),
                variant:'error'
              });
              this.dispatchEvent(toastEvent);
            window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
        });
    }
   
 
    
      searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
  
    handleSearchKeyword() {
        if (this.searchValue !== '') {
            getContactList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    this.wireContact = [];
                    this.wireContact = result;
                    // this.contactsRecord = result;
                    console.dir(this.wireContact);
                    // console.log(JSON.stringify(this.contactsRecord));
                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    
                    // this.contactsRecord = null;
                });
        } else {
           
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}