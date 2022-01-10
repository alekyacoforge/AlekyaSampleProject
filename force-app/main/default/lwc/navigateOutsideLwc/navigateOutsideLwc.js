import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigateOutsideLwc extends NavigationMixin(LightningElement) {

    vfUrl;

    connectedCallback()
    {

        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/sampleNavVfPage'
            }
        }).then(url => {
            this.vfUrl = url;
        })
    }

       navigateToVfPage =()=>{
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/NavigationVfPage'
            }
        }).then(url =>{
            window.open(url);
        })
    }

    navigateToAura = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__SampleAuraComponent'
            }
        })
    }
}