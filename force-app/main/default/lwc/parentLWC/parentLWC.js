import { LightningElement } from 'lwc';

export default class ParentLWC extends LightningElement {

    //computed= false;
    get computed()
    {
        return true;
    }

}