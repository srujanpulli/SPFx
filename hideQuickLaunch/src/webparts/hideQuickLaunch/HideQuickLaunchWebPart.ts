import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HideQuickLaunchWebPart.module.scss';
import * as strings from 'HideQuickLaunchWebPartStrings';

export interface IHideQuickLaunchWebPartProps {
  description: string;
}

import 'jQuery';
declare var $;

export default class HideQuickLaunchWebPartWebPart extends BaseClientSideWebPart<IHideQuickLaunchWebPartProps> {

  public render(): void {
    require('./App.js');    
    
    // --> Code to fix issue to unhide quicklaunch when navigating to another page without this webpart.
    this.domElement.innerHTML = `<div id="divHideQuickLaunch" style="display:none">Webpart loaded</div>`;

    // spulli --> comment sample code
    //   <div class="${styles.hideQuickLaunch}">
    //   <div class="${styles.container}">
    //     <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
    //       <div class="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
    //         <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
    //         <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
    //         <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
    //         <a href="https://aka.ms/spfx" class="${styles.button}">
    //           <span class="${styles.label}">Learn more</span>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>
      $().hideQuickLaunch();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
