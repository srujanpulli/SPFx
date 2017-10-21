import { Version, DisplayMode } from '@microsoft/sp-core-library';
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
  // description: string;
  hideQuickLaunchProperty: boolean;
  hideSiteLogoProperty: boolean;
  hideSiteTitleProperty: boolean;
  hideSiteDescriptionProperty: boolean;
  hideSiteMembersProperty: boolean;
  hideTopNavProperty: boolean;
  hideTitleRowProperty: boolean;
  hideCommandBarItemsProperty: boolean;
  hidePageTitleProperty: boolean,
  hideSearchBoxProperty: boolean,
  hideShareButtonProperty: boolean  
}

import 'jQuery';
declare var $;

export default class HideAnElementWebPartWebPart extends BaseClientSideWebPart<IHideAnElementWebPartProps> {

  public render(): void {

    require('./App.js');

    var tmpHideAnElementPlaceHolder = "";

    if((window.location.href.indexOf("?Mode=Edit") > -1) || (DisplayMode.Edit == 2))
    {
      tmpHideAnElementPlaceHolder += '<div id="divWPLoaded"><strong>hide An Element</strong> webpart is loaded</div>';
    }
    else
    {
      $("#divWPLoaded").hide();
    }

    if(this.properties.hideQuickLaunchProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideQuickLaunch" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideSiteLogoProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideSiteLogo" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideSiteTitleProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideSiteTitle" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideSiteDescriptionProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideSiteDescription" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideSiteMembersProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideSiteMembers" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideTopNavProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideTopNav" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideTitleRowProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideTitleRow" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideCommandBarItemsProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHideCommandBarItems" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hidePageTitleProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divHidePageTitle" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideSearchBoxProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divhideSearchBox" style="display:none">Webpart loaded</div>`;
    }
    if(this.properties.hideShareButtonProperty)
    {
      tmpHideAnElementPlaceHolder += `<div id="divhideShareButton" style="display:none">Webpart loaded</div>`;
    }
   
    this.domElement.innerHTML = tmpHideAnElementPlaceHolder;
      
      $().hideAnElement({
        hideQuickLaunchProperty: this.properties.hideQuickLaunchProperty,
        hideSiteLogoProperty: this.properties.hideSiteLogoProperty,
        hideSiteTitleProperty: this.properties.hideSiteTitleProperty,
        hideSiteDescriptionProperty: this.properties.hideSiteDescriptionProperty,
        hideSiteMembersProperty: this.properties.hideSiteMembersProperty,
        hideTopNavProperty: this.properties.hideTopNavProperty,
        hideTitleRowProperty: this.properties.hideTitleRowProperty,
        hideCommandBarItemsProperty: this.properties.hideCommandBarItemsProperty,    
        hidePageTitleProperty: this.properties.hidePageTitleProperty,
        hideSearchBoxProperty: this.properties.hideSearchBoxProperty,
        hideShareButtonProperty: this.properties.hideShareButtonProperty
      });      
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected onPropertyPaneConfigurationStart(): void {
    // Not needed for now
  }

  protected onPropertyPaneFieldChanged(): void{
    // Not needed for now
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
              groupName: "Modern page only options",
              groupFields: [
                PropertyPaneCheckbox('hideSiteDescriptionProperty', { 
                  text: strings.hideSiteDescription,  
                  checked: false, 
                  disabled: this.properties.hideTitleRowProperty == true ? true : false,
                }),
                PropertyPaneCheckbox('hideSiteMembersProperty', { 
                  text: strings.hideSiteMembers,  
                  checked: false, 
                  disabled: this.properties.hideTitleRowProperty == true ? true : false,
                }),
                PropertyPaneCheckbox('hideCommandBarItemsProperty', { 
                  text: strings.hideCommandBarItems,  
                  checked: false, 
                  disabled: false,
                }),
                PropertyPaneCheckbox('hidePageTitleProperty', { 
                  text: strings.hidePageTitle,  
                  checked: false, 
                  disabled: false,
                })
              ] 
            },
            {
              groupName: "Modern and Classic page options",
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),
                PropertyPaneCheckbox('hideQuickLaunchProperty', { 
                  text: strings.hideQuickLaunchLabel,  
                  checked: false, 
                  disabled: false,
                }),
                PropertyPaneCheckbox('hideSearchBoxProperty', { 
                  text: strings.hideSearchBox,  
                  checked: false, 
                  disabled: (this.properties.hideTitleRowProperty || this.properties.hideQuickLaunchProperty == true )== true ? true : false,
                }),
                PropertyPaneCheckbox('hideSiteLogoProperty', { 
                  text: strings.hideSiteLogoLabel,  
                  checked: false, 
                  disabled: this.properties.hideTitleRowProperty == true ? true : false,
                }),
                PropertyPaneCheckbox('hideSiteTitleProperty', { 
                  text: strings.hideSiteTitle,  
                  checked: false, 
                  disabled: this.properties.hideTitleRowProperty == true ? true : false,
                }),
                PropertyPaneCheckbox('hideTopNavProperty', { 
                  text: strings.hideTopNav,  
                  checked: false, 
                  disabled: this.properties.hideTitleRowProperty == true ? true : false,
                }),
                PropertyPaneCheckbox('hideShareButtonProperty', { 
                  text: strings.hideShareButton,  
                  checked: false, 
                  disabled: this.properties.hideTitleRowProperty == true ? true : false,
                }),
                PropertyPaneCheckbox('hideTitleRowProperty', { 
                  text: strings.hideTitleRow,  
                  checked: false, 
                  disabled: false,
                })
              ] 
            },
            // {
            //   groupName: "Classic page only options",
            //   groupFields: [
            //     PropertyPaneCheckbox('hideSearchBoxProperty', { 
            //       text: strings.hideSearchBox,  
            //       checked: false, 
            //       disabled: this.properties.hideTitleRowProperty == true ? true : false,
            //     })
            //   ] 
            // },
            // {
            //   groupName: strings.BasicGroupName,
            //   groupFields: [
            //   ]
            // }
          ]
        }
      ]
    };
  }
}
