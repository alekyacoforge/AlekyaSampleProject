import { LightningElement, api, wire,track } from 'lwc';
import searchContacts from '@salesforce/apex/ApplicationNumber.getContacts';


export default class ExampleLWC extends LightningElement {
  
  @track ApplicationNumber;
    @track results;
   
    ApplicationNumberValue = (event) => {
        this.ApplicationNumber = event.target.value;
    }

    handleSearch(event) {
        
        console.log('Selected value is : ' + this.ApplicationNumber);
        searchContacts({ ApplicationNo: this.ApplicationNumber })
        .then((result) => {
          this.results = result;
          this.errors = undefined;
          console.log('Result is : ' + this.results);
        });
         
        
        this.invokeWorkspaceAPI('isConsoleNavigation').then(isConsole => {
          if (isConsole) {
            this.invokeWorkspaceAPI('getFocusedTabInfo').then(focusedTab => {
              this.invokeWorkspaceAPI('openSubtab', {
                parentTabId: focusedTab.tabId,
                recordId: this.results,
                focus: true
              }).then(tabId => {
                console.log("Solution - SubTab ID: ", tabId);
              });
            });
          }
        });
      }
     
      invokeWorkspaceAPI(methodName, methodArgs) {
        return new Promise((resolve, reject) => {
          const apiEvent = new CustomEvent("internalapievent", {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
              category: "workspaceAPI",
              methodName: methodName,
              methodArgs: methodArgs,
              callback: (err, response) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(response);
                }
              }
            }
          });
     
          window.dispatchEvent(apiEvent);
        });
      }}
               

                
  
  
  
  
  
  
  
  
  
  
  
  
  


//     @api
//  recordId;

//  accountId;
//  openAccountButtonDisabled = true;

//  @wire(getRecord, { recordId: '$recordId', fields: ['Contact.AccountId']})
//  getRecordAccount({ data }) {
//    if (data) {
//      this.accountId = data.fields.AccountId.value;
//      this.openAccountButtonDisabled = false;
//    }
//  }

//  onOpenAccountClick() {
//    this.openSubTab(this.accountId);
//  }

//  openSubTab(recordId) {
//    this.dispatchEvent(new CustomEvent('subtab', {
//      detail: {
//        recordId
//      }
//    }));
//  }