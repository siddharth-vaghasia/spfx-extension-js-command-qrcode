import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import QRCode from 'qrcode'

import * as strings from 'DocumentQrCodeExtensionCommandSetStrings';


import CustomDailog from './CustomDialog';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './DocumentQrCodeExtensionCommandSet.module.scss';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDocumentQrCodeExtensionCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
  
}

const LOG_SOURCE: string = 'DocumentQrCodeExtensionCommandSet';

export default class DocumentQrCodeExtensionCommandSet extends BaseListViewCommandSet<IDocumentQrCodeExtensionCommandSetProperties> {
  private itemUrl: string;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized DocumentQrCodeExtensionCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        
          var docurl = window.location.origin + event.selectedRows[0].getValueByName("FileRef");
          // With promises
          QRCode.toDataURL(docurl)
          .then(url => {
            console.log(url)
           // Dialog.alert(`${this.properties.sampleTextOne}`);

              const dialog: CustomDailog = new CustomDailog();
              dialog.itemUrl = event.selectedRows[0].getValueByName("FileRef");
              dialog.base64Image = url;
              dialog.filename = event.selectedRows[0].getValueByName("FileName");
              dialog.show().then(() => {
                
              });
                })
                .catch(err => {
                  console.error(err)
                })
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}

