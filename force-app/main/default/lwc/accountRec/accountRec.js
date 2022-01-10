import { LightningElement, wire,api, track } from 'lwc';
import fetchAccountRecord from '@salesforce/apex/DeleteAccount.fetchAccountRecord';
import deleteMultipleAccountRecord from '@salesforce/apex/DeleteAccount.deleteMultipleAccountRecord';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import  getAccountList from '@salesforce/apex/DeleteAccount.getAccountList';

const columns = [
     {
        label: 'AccountName',
        fieldName: 'Name',
        type: 'text',
        editable: true,
    }, {
        label: 'Website',
        fieldName: 'Website',
        type: 'url',
        editable: true,
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        editable: true
    }
];

export default class AccountRec extends LightningElement {

    columns = columns;
    AccountId;
    saveDraftValues = [];
    @track accountsRecord;
    @track  wireAccount;
    searchValue = '';
    isShowCreate=false;
    isModalOpen = false;
    
    
    constructor(){
        super();
        this.fetchAccountRecords();
    }
   
    fetchAccountRecords = () =>{
        fetchAccountRecord({}).then(accounts =>{
            this.wireAccount = accounts;
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


    @api selectedAccountIdList=[];
    @track errorMsg;

   
    handleAdd = (event) =>{
        this.isShowCreate=true;
    
        this.AccountId = event.target.value;

    }

    getSelectedIdAction(event){
        const selectedAccountRows = event.detail.selectedRows;
        window.console.log('selectedAccountRows# ' + JSON.stringify(selectedAccountRows));
        this.selectedAccountRows=[];
        
        for (let i = 0; i<selectedAccountRows.length; i++){
            this.selectedAccountIdList.push(selectedAccountRows[i].Id);
        }

     
    }
    handleModalClose = (event) =>{
        
        this.isModalOpen = false;
    }
   
    deleteAccountRowAction(){
        deleteMultipleAccountRecord({conObj:this.selectedAccountIdList})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedAccountRows=[];
            refreshApex(this.fetchAccountRecords());
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
            getAccountList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    this.wireAccount = [];
                    this.wireAccount = result;
                    
                    console.dir(this.wireAccount);
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