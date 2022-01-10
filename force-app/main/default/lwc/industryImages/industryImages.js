import { LightningElement } from 'lwc';
/*import static_resources from '@salesforce/resourceUrl/FirstOne';*/
import static_resources from '@salesforce/resourceUrl/SearchImages';
export default class IndustryImages extends LightningElement { 

    imga = static_resources + '/Images/imga.jpg';//with in folder folder
    imgc = static_resources + '/Images/imgc.jpg';
    imgd = static_resources + '/Images/imgd.jpg';


}