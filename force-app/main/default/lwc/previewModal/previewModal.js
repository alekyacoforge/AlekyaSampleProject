import { LightningElement } from 'lwc';

export default class PreviewModal extends LightningElement
{
    handleCloseModal = () =>
    {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    handleCloseBoth = () =>
    {
        this.dispatchEvent(new CustomEvent('closebothmycomps',{bubbles: true, composed: true}))
    }
}