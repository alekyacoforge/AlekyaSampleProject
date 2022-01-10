import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class NavigateToListView extends NavigationMixin(LightningElement) {
    customListView;
    connectedCallback(){

        this[NavigationMixin.GenerateUrl]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Account',
                actionName: 'list'
            },
            state:{
                filterName: 'MyAccounts'
            }
        }).then(url =>{
            this.customListView =url;
        })
    }
    

    navigateToAccListView =()=>{
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Account',
                actionName: 'list'
            },
            state:{
                filterName: 'Recent'
            }
        });
    }
}