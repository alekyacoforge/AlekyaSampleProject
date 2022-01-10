import { LightningElement } from 'lwc';

export default class PreviewGrandParent extends LightningElement
{
    isPreviewOpened = false;
    handleOpenPreview = () =>
    {
        this.isPreviewOpened = true;
    }
    handleClosePreview = () =>
    {
        this.isPreviewOpened = false;
    }
    handleCloseBoth = () =>
    {
        this.isPreviewOpened = false;
    }
}