import { LightningElement } from 'lwc';
import LOCALE from '@salesforce/i18n/locale';
import LANG from '@salesforce/i18n/lang';
import DIR from '@salesforce/i18n/dir';
export default class I18nlang extends LightningElement {

    date = new Date();
    formattedDate = new Int1.DateTimeformat(LOCALE).format(this.date);
    lang = LANG;
    dir =DIR;
}