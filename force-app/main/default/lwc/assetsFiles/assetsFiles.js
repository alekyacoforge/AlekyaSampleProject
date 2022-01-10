import { LightningElement } from 'lwc';
/*import content_assets from '@salesforce/contentAssetUrl/catszips';  //api name to writ*/
import content_assets from '@salesforce/contentAssetUrl/mobileszip';
export default class AssetsFiles extends LightningElement {

    apple = content_assets + 'pathinarchive=apple.png';
    samsung = content_assets + 'pathinarchive=samsung.png';
    oneplus = content_assets + 'pathinarchive=oneplus.png';
/*
    kit = content_assets + 'pathinarchive=cats/kitten1.png';
    kitt = content_assets + 'pathinarchive=cats/kitten2.png';// folder in folder*/
    

}