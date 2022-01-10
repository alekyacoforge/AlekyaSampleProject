import { LightningElement, track } from 'lwc';

export default class ChangeArrayTextProperty extends LightningElement {

    randomText = 'For this text to change we do not need the @track decorator as it is of a primitive type';

    @track
    randomTextArray = ['This', 'is', 'an', 'Array'];

    justAnObject = {
        text: 'I am without @track'
    }

    @track
    justATrackedObject = {
        text: 'I am having @track'
    }

    handleChangeText () {
        this.randomText = 'Random text must have changed';
    }

    handleChangeArray() {
        this.randomTextArray.push('Added something..');
    }

    handleTrackedObjectChange() {
        this.justATrackedObject.text = 'I am having @track so you were able to change me saida';
    }

    handleObjectChange() {
        this.justAnObject.text = 'I am not having @track so you were not able to change me';
    }
}