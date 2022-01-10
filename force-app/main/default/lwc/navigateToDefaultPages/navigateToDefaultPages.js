import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigateToDefaultPages extends NavigationMixin(LightningElement) {
    navigateToChatter = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'chatter'
            }
        });
    }

    navigateToFiles = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'ContentDocument',
                actionName: 'home'
            }
        });
    }

    navigateToGoogle = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://www.google.com/'
            }
        });
    }

    navigateToReports = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Report',
                actionName: 'home'
            },
        });
    }
}