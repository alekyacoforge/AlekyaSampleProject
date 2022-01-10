import { LightningElement } from 'lwc';

export default class PreviewParent extends LightningElement
{
    isModalOpened = false;

    handleOpenModal = () =>
    {
        this.isModalOpened = true;
    }
    handleCloseModal = () =>
    {
        this.isModalOpened = false;
    }
    handleClosePreview = () =>
    {
        this.dispatchEvent(new CustomEvent('closepreview'));
    }
    handleCloseBoth = () =>
    {
        this.isModalOpened = false;
    }
}