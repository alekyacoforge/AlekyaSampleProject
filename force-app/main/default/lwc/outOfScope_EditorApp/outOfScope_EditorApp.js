import { LightningElement } from 'lwc';
//import Industry_Image from '@salesforce/resourceUrl/Industry_Images';
export default class OutOfScope_EditorApp extends LightningElement {

    image = 'https://statuscast-web.azureedge.net/wp-content/uploads/2019/02/banner@2x.png';//Industry_Image;

    closeModal = () =>{
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

}