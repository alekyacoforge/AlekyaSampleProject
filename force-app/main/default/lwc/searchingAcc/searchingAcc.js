import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { deleteRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { NavigationMixin } from 'lightning/navigation';
import getAccountsByIndustryOrName from '@salesforce/apex/AccountController.getAccountsByIndustryOrName';


export default class SearchingAcc extends NavigationMixin(LightningElement) {
    @track listOfAccounts;
    recordTypeId;
    industryOptions;
    industrySearchValue;
    nameSearchValue;
    isModalOpen = false;
    modalAccountId;
    AccountId;
    isSearchResults = true;
    showSpinner = false;
    isShowCreate=false;
    



    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT})/*Use this get obj info wire adapter to get metadata */ 
    getRecordType({data, error}){
        if(data){
            console.log(JSON.stringify(data.defaultRecordTypeId));
            this.recordTypeId = data.defaultRecordTypeId;
        }else if(error){
            console.log("Error Getting Contact RecordTypes=>", JSON.stringify(error));
        }
    }

    @wire(getPicklistValues, {recordTypeId: "$recordTypeId", fieldApiName: INDUSTRY_FIELD})/*Use this getpicklistValues wire adapter to get the picklist values for a specified field */
    industryPicklistValues({data, error}){
        if(data){
            this.industryOptions = data.values;
        }else{
            console.log("Error fetching industryPicklistValues");
            console.log(JSON.stringify(error));
        }
    }

    filterAccounts = () =>{
        getAccountsByIndustryOrName({industry: this.industrySearchValue, accountName: this.nameSearchValue})/*apex method to fetch and getting list of accounts */
        .then(accounts =>{
            
            this.listOfAccounts = accounts;
            console.log(JSON.stringify(this.listOfAccounts));
            if(this.listOfAccounts.length === 0){
                this.isSearchResults = false;
            }else{
                this.isSearchResults = true;
            }
        })
        .catch(error =>{
            console.log("error while getting accounts=>", JSON.stringify(error));
        })
    }

    handleSearch = (event) =>{
        this.isSearchResults = true;
        this.listOfAccounts = [];
        
        this.industrySearchValue = this.template.querySelector('.industry-searchbox').value;
        this.nameSearchValue = this.template.querySelector('.name-searchbox').value;
        if(!this.industrySearchValue && !this.nameSearchValue){//if not indus name value  and not industryvalue then show empty)
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Type a name to search',
                variant: 'error',
                mode: 'sticky'
            }));
        }else{
            if(!this.industrySearchValue){
                this.industrySearchValue = '';
            }else if(!this.nameSearchValue){
                this.nameSearchValue = '';
            }
            this.filterAccounts();//will go to filter accounts
        }
    }
   

    handleAdd = (event) =>{//for add button
        this.isShowCreate=true;
    
        this.AccountId = event.target.value;

    }
   
    handleDelete = (event) =>/*Method to delete the particular rec */
    {
        const deleteId = event.target.value;
        console.log(deleteId);
        deleteRecord(deleteId)
            .then(() =>
            {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: `Account record with id ${ deleteId } has been deleted`,
                    variant: 'success',
                    mode: 'sticky'
                }));
                for (let acc of this.listOfAccounts) {
                    if (acc.Id == deleteId) {
                        this.listOfAccounts.splice(acc, 1);
                    }
                }
            })
            .catch(error =>
            {
                console.log(error);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: 'Error',
                    variant: 'error'
            }))
        })
    }
    handleEdit = (event) =>{
        this.modalAccountId = event.target.value;
        this.isModalOpen = true;
    }
    handleCreate = (event) =>{
        this.modalAccountId = event.target.value;
        this.isModalOpen = true;
    }


    handleModalClose = (event) =>{
        
        this.isModalOpen = false;
    }


    navigateToCreateRecPage = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            }
        })
    }

    


}