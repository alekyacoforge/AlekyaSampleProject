import { LightningElement } from 'lwc';
/*import static_resources from '@salesforce/resourceUrl/FirstOne';*/
import static_resources from '@salesforce/resourceUrl/StaticFile';
export default class StaticExample extends LightningElement {
/*
    apple = static_resources + '/apple.png';
    samsung = static_resources + '/samsung.png';
    oneplus = static_resources + '/oneplus.png';*/
    apple = static_resources + '/Assets/img1.jpg';//with in folder folder
    samsung = static_resources + '/Assets/img2.jpg';
    oneplus = static_resources + '/Assets/img3.jpg';


}