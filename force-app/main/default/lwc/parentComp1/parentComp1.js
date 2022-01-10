import { LightningElement,track,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccController.getAccountList';
import updateAccount from '@salesforce/apex/AccController.updateRecord';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
export default class ParentComp1 extends NavigationMixin(LightningElement) {
    @wire(getAccountList) accounts;
    
    @track updatedPhone;
   @track idToUpdate;
    @track accIdsToPush = [];
   handleCLick(event)
    {   
        
        var recordId= event.target.dataset.recordId;
        const childComp=this.template.querySelector('c-update-child-comp');
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

        const childComp=this.template.querySelector('c-update-child-comp');
        childComp.displayRecord(this.idToUpdate,false);
       
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
                componentName: 'c__auraco'
            },
            state: {
                c__allAccsIds : stringedIds
            }
        });
      }

}