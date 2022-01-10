import { LightningElement, track, api } from 'lwc';
import searchContacts from '@salesforce/apex/ApplicationNumber.getContacts';
import { NavigationMixin } from 'lightning/navigation';


export default class OpenCaseFieldSearch extends NavigationMixin(LightningElement) {
    @track ApplicationNumber;
    @track results;
   
    ApplicationNumberValue = (event) => {
        this.ApplicationNumber = event.target.value;
    }

    handleSearch(event) {
        //this.ApplicationNumber = event.detail.value;
        console.log('Selected value is : ' + this.ApplicationNumber);
        searchContacts({ ApplicationNo: this.ApplicationNumber })
            .then((result) => {
                this.results = result;
                this.errors = undefined;
                console.log('Result is : ' + this.results);
               

                this[NavigationMixin.GenerateUrl]({

                    type: "standard__recordPage",
                    attributes: {
                        recordId: this.results,//recid
                        actionName: "view"

                    }

                }).then((url) => {

                    window.open(url, "_blank");
                    console.log('navigate ' + this.results);

                });

            })
            .catch((error) => {
                this.errors = error;
                this.results = undefined;
            });





            
        //     workspaceAPI.openTab({
        //         url: '/lightning/r/Contact/0035g00000GdaYtAAJ/view',
        //     }).then(function(response) {
        //         workspaceAPI.focusTab({tabId : response});
        //    })
        //     .catch(function(error) {
        //         console.log(error);
        //     });


        //     workspaceAPI.openSubtab({
        //         focus: true,
        //         parentTabId: "Search_Comp",
        //         pageReference: {
        //             type: "standard__component",
        //             attributes: {
        //               componentName: "c__MyAuraUrlAddressable"
        //             },
        //             state: {
        //                 recordId: this.results,
        //               myParam: param
        //             }
        //         }
        //     });




            // workspaceAPI.openSubtab({
            //     focus: true,
            //     parentTabId: "Search_Comp",
            //     pageReference: {
            //         type: "standard__component",
            //         attributes: {
            //           componentName: "c__MyAuraUrlAddressable"
            //         },
            //         state: {
            //             recordId: this.results,
            //           myParam: param
            //         }
            //     }
            // });




        //     this[NavigationMixin.GenerateUrl]({

        //         type: "standard__recordPage",
        //         attributes: {
        //             recordId: this.results,//recid
        //             actionName: "view"

        //         }

        //     }).then((url) => {

        //         window.open(url, "_blank");
        //         console.log('navigate ' + this.results);

        //     });

        // })
        // .catch((error) => {
        //     this.errors = error;
        //     this.results = undefined;
        // });

       // this[NavigationMixin.Navigate](config);

    //    this[NavigationMixin.Navigate]({
    //     type: 'standard__navItemPage',
    //     attributes: {
    //         apiName: 'Search_Comp'
    //     },
    //     state: {
    //         c__strInput: 'testing',
    //         c__recId: this.recordId
    //     }
    // });


    // openTab : function(component, event, helper) {
    //     var workspaceAPI = component.find("workspace");
    //     workspaceAPI.openTab({
    //         url: "what is the url that goes here?",        
    //         focus: true
    //     }).then( () => {
    //         // Do something
    //     }).catch(function(error) {
    //         console.log(error);
    //     });
    // }


    
     }}

    
// }