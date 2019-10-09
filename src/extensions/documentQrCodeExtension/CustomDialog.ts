import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { SPComponentLoader } from '@microsoft/sp-loader';  
import styles from './DocumentQrCodeExtensionCommandSet.module.scss';

import Download from './download';

interface ICustomDialogContentProps {
    itemUrl: string;
    close: () => void;
    submit: (color: string) => void;
    
  }
export default class CustomDailog extends BaseDialog {
    public itemUrl: string;
    public base64Image: string;
    public filename:string;
    public render(): void {
       this.domElement.innerHTML +=   `<div id="popup1" class="${ styles.mainpopup }">
	    <div class="${ styles.popup }">
		<h2>QR Code</h2>
		<div class="${ styles.content }"> ` +
        `<img src="` + this.base64Image  + `"> 
        </br>
        <button id="downloadQR">Download QR Code</button>
        <button id="close">Close</button>
		</div>
	</div>
</div>`;
this._setButtonEventHandlers();
    }
  
     // METHOD TO BIND EVENT HANDLER TO BUTTON CLICK
 private _setButtonEventHandlers(): void {  
    const webPart: CustomDailog = this;  
    this.domElement.querySelector('#downloadQR').addEventListener('click', () => {  
        Download(this.base64Image, this.filename, "image/png");
     }); 
     this.domElement.querySelector('#close').addEventListener('click', () => {  
      this.close();
   }); 

 } 

    public getConfig(): IDialogConfiguration {
      return {
        isBlocking: false
      };
    }
    
    protected onAfterClose(): void {
      super.onAfterClose();
    }
  }
  