import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import common from '@salesforce/resourceUrl/common';

export default class UseExternalCss extends LightningElement {
    renderedCallback()
    {
        loadStyle(this, common).then(() =>
        {
            console.log('CSS Loaded');
        })
    }
}