import { LightningElement,track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class HandsOnNavigation extends  NavigationMixin(LightningElement) {


    @track isModeEditOrView = false;
    @track isModeListView = false;
    @track isMOdeRelatedList = false;
    @track navError = false;
    
    modeValue;
    sObjectValue;
    sObjectRecordIdValue;
    sObjectlistViewIdValue;
    sObjectRelationshipValue;
    
        get optionsMode() {
            return [
                { label: 'Create', value: 'create' },
                { label: 'View', value: 'view' },
                { label: 'Edit', value: 'edit' },
                { label: 'List View', value: 'listview'},
                { label: 'Related List', value: 'relatedlist' }
            ];
        }
    
        handleOptionChange = (event) =>{
            this.navError =false;
            this.modeValue = event.detail.value;
            console.log('mode value::',this.modeValue);
    
            if(this.modeValue ==='edit' || this.modeValue ==='view'){
                this.isModeEditOrView = true;
                this.isModeListView = false;
                this.isMOdeRelatedList = false;
            }
    
            else if(this.modeValue ==='listview'){
                this.isModeListView = true;
                this.isModeEditOrView = false;
                this.isMOdeRelatedList = false;
            }
    
            else if(this.modeValue ==='relatedlist'){
                this.isMOdeRelatedList = true;
                this.isModeEditOrView = true;
                this.isModeListView = false;
            }
    
            else{
                this.isModeEditOrView = false;
                this.isModeListView = false;
                this.isMOdeRelatedList = false;
            }
        }
    
        handlesObjectRecordIdValue = (event) =>{
            this.sObjectRecordIdValue = event.detail.value;
            this.navError =false;
        }
    
        handlesObjectListViewIdValue = (event) =>{
            this.sObjectlistViewIdValue = event.detail.value;
            this.navError =false;
        }
    
        handlesRelationshipValue = (event) =>{
            this.sObjectRelationshipValue = event.detail.value;
            this.navError =false;
        }
    
        handlesObjectValue= (event) =>{
            this.sObjectValue = event.detail.value;
            this.navError =false;
        }
    
        handleNavigation = () => {
            console.log('--modeValue--',this.modeValue);
            if(this.modeValue === 'create'){
                if(this.sObjectValue){
                    this[NavigationMixin.Navigate]({
                        type:'standard__objectPage',
                        attributes:{
                            objectApiName : this.sObjectValue,      
                            actionName : 'new'
                        }
                    })
                }
                else{
                    this.navError =true;
                }
                
            }
    
            else if(this.modeValue ==='edit'){
                if(this.sObjectRecordIdValue && this.sObjectValue){
                    this[NavigationMixin.Navigate]({
                        type:'standard__recordPage',
                        attributes:{
                            recordId:this.sObjectRecordIdValue,
                            objectApiName : this.sObjectValue,      
                            actionName : 'edit'
                        }
                    })
                }
                else{
                    this.navError =true;
                }
            }
    
            else if(this.modeValue === 'view'){
                console.log('--sObjectRecordIdValue--',this.sObjectRecordIdValue);
                console.log('--sObjectValue--',this.sObjectValue);
                if(this.sObjectRecordIdValue && this.sObjectValue && this.sObjectRecordIdValue){
                    this[NavigationMixin.Navigate]({
                        type:'standard__recordPage',
                        attributes:{
                            recordId: this.sObjectRecordIdValue,
                            objectApiName : this.sObjectValue,      
                            actionName : 'view'
                        }
                    })
                }
                else{
                    this.navError =true;
                }
            }
    
            else if(this.modeValue === 'listview'){
                console.log('--sObjectValue--',this.sObjectValue);
                console.log('--sObjectlistViewIdValue--',this.sObjectlistViewIdValue);
                if(this.sObjectValue){
                    this[NavigationMixin.Navigate]({
                        type:'standard__objectPage',
                        attributes : {
                            objectApiName : this.sObjectValue,
                            actionName : 'list'
                        },
                        state : {
                            filterName : this.sObjectlistViewIdValue
                        }
                    })
                }
                else{
                    this.navError =true;
                }
            }
            else{
                console.log('--sObjectValue--',this.sObjectValue);
                console.log('--sObjectRelationshipValue--',this.sObjectRelationshipValue);
                if(this.sObjectValue && this.sObjectRelationshipValue){
                    this[NavigationMixin.Navigate]({
                        type:'standard__recordRelationshipPage',
                        attributes : {
                            recordId : this.sObjectRecordIdValue,
                            objectApiName : this.sObjectValue,
                            relationshipApiName :this.sObjectRelationshipValue,
                            actionName : 'view'
                        }
                    })
                }
                else{
                    this.navError =true;
                }
            }
        }
    }