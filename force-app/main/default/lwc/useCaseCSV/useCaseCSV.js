import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';


const columns = [
    {
        label: 'Name', fieldName: 'Name', type: 'text', sortable: true
    },
    {
        label: 'Phone', fieldName: 'Phone', type: 'phone'
    },
    {
        label: 'Industry', fieldName: 'Industry', type: 'text', sortable: true
    },
    {
        label: 'AnnualRevenue', fieldName: 'AnnualRevenue', type: 'text', sortable: true
    }
]

export default class UseCaseCSV extends LightningElement {
   
accountColumns = columns;
accounts;
connectedCallback(){
    getAccounts().then((response)=>{this.accounts = response})
}
     handleDownload = () =>{
      
        let rowEnd = '\n';
        let csvString = '';
        let rowData = new Set();
      
        this.accounts.forEach((account)=>
        {
            Object.keys(account).forEach(key =>{
               rowData.add(key);
            })
        });
        //array.from() takes the set iterable and transofrm into an arrya
        rowData = Array.from(rowData);
        csvString +=rowData.join(',');
        csvString += rowEnd;
        console.log(csvString);

        for(let i = 0; i< this.accounts.length; i++){

            let colValue = 0;

            // to get all the available keys
            for(let key of rowData){

                //to check if it is the first colunm 
               if(colValue > 0){
                   csvString += ',';
               }

               let value = this.accounts[i][key] == undefined ? '' : this.accounts[i][key];
               csvString += `"${value}"`;
               colValue++;
            }
            csvString += rowEnd;
            console.log(csvString);
        }
        console.log('print line no 67');
        let downloadElement = document.createElement('a');
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self';
    
        downloadElement.download = 'AccountData.csv';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }}