import { LightningElement,track,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountManager.getAccountList';
import updateAccount from '@salesforce/apex/AccountManager.updateRecord';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
export default class ParentCom extends LightningElement {
    @wire(getAccountList) accounts;
    //@track displayDetails =false;
    @track updatedPhone;
    @track idToUpdate;
    @track accIdsToPush = [];
    handleCLick(event)
    {   
        //this.displayDetails=true;
        var recordId= event.target.dataset.recordId;
        console.log( 'Record Id is ' + JSON.stringify(recordId) );
        const childComp=this.template.querySelector('c-child-comp');
        childComp.displayRecord(recordId,true);
        
        
    }
    updateNumb(event)
    {
        this.updatedPhone=event.detail.pNumb;
        this.idToUpdate=event.detail.ids;
        console.log('Updated phone number is : '+event.detail.pNumb );
        console.log('Id to update : '+event.detail.ids );
        updateAccount({
            accId:this.idToUpdate,
            pNumber: this.updatedPhone
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.accounts);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });

        const childComp=this.template.querySelector('c-child-comp');
        childComp.displayRecord(this.idToUpdate,false);
        //return refreshApex(this.accounts);
    }
    addAccs(event)
    {
        var accIds= event.target.dataset.recordId;
        console.log('Checkbox Account Ids are : '+accIds);
        if(accIds)
        {
            console.log('Inside first if');
            if(event.target.checked)
            {
                console.log('Inside second if');
                this.accIdsToPush.push(accIds);
            }
            else
            {
                console.log('Inside third if');
                if(this.accIdsToPush.includes(accIds))
                {
                    console.log('Inside fourth if');
                    const index = this.accIdsToPush.indexOf(accIds);
                        if (index > -1) 
                        {
                            console.log('Inside fifth if');
                            this.accIdsToPush.splice(index, 1);
                        }
                }
            }
        }
        console.log('ids in the array are : '+this.accIdsToPush);
        
    }
    
    navigateTo(event)
    {
        var stringedIds = this.accIdsToPush.toString();
        console.log('button clicked');
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__AccConComp'
            },
            state: {
                c__allAccsIds : stringedIds
            }
        });
    }
    
}