import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HideAnElementWebPart.module.scss';
import * as strings from 'HideAnElementWebPartStrings';

export interface IHideAnElementWebPartProps {
  description: string;
  hideQuickLaunchLabelProperty: boolean;
}

import 'jQuery';
declare var $;

export default class HideAnElementWebPartWebPart extends BaseClientSideWebPart<IHideAnElementWebPartProps> {

  public render(): void {

    require('./App.js');

    var tmpHideAnElementPlaceHolder = '';

    if(this.properties.hideQuickLaunchLabelProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideQuickLaunch" style="display:block">Webpart loaded</div>`;
    }
    // this.properties.hideQuickLaunchLabelProperty = false;
    // this.context.propertyPane.refresh();
    
    // escape(this.properties.hideQuickLaunchLabelProperty.toString())
    this.domElement.innerHTML = tmpHideAnElementPlaceHolder + `
      <div class="${styles.hideAnElement}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${this.properties.hideQuickLaunchLabelProperty}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
      
      $().hideAnElement();      
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
                }),
                PropertyPaneCheckbox('hideQuickLaunchLabelProperty', { 
                  text: strings.hideQuickLaunchLabel,  
                  checked: false, 
                  disabled: false,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
