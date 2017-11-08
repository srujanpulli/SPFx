import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneToggle,
  PropertyPaneButton
} from '@microsoft/sp-webpart-base';

import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';

import * as strings from 'BrandMyPageWebPartStrings';
import BrandMyPage from './components/BrandMyPage';
import { IBrandMyPageProps } from './components/IBrandMyPageProps';

import { PropertyPaneColorButton } from '../../controls/PropertyPaneColorPicker/PropertyPaneColorButton';

export interface IBrandMyPageWebPartProps {
  // description: string;
  hideQuickLaunchProperty: boolean;
  hideSiteLogoProperty: boolean;
  hideSiteTitleProperty: boolean;
  hideSiteDescriptionProperty: boolean;
  hideSiteMembersProperty: boolean;
  hideTopNavProperty: boolean;
  hideTitleRowProperty: boolean;
  hideCommandBarItemsProperty: boolean;
  hidePageTitleProperty: boolean;
  hideSearchBoxProperty: boolean;
  hideShareButtonProperty: boolean;
  StartConfigurations;
  compactMode : boolean;
}

export default class BrandMyPageWebPart extends BaseClientSideWebPart<IBrandMyPageWebPartProps> {

  private colorPickerButton: PropertyPaneColorButton;
  
  // public showPropertyPaneMethod(): void {
  //   this.context.propertyPane.open()
  // }
  protected onInit(): Promise<void> {
    this.configureWebPart = this.configureWebPart.bind(this);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IBrandMyPageProps > = React.createElement(
      BrandMyPage,
      {
        // description: this.properties.description
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
        hideShareButtonProperty: this.properties.hideShareButtonProperty,
        configureWebPart: this.configureWebPart,
        editMode: this.displayMode
      }
    );

    ReactDom.render(element, this.domElement);
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
                }),
              ] 
            },
            // {
            //   groupName: strings.BasicGroupName,
            //   groupFields: [
            //   ]
            // }
          ]
        },
        {
          header: {
            description: "add some Colors"
          },
          groups: [
            {
              groupName: "Compact mode",
              groupFields: [
                PropertyPaneToggle('compactMode',{label : strings.compactMode})                
              ] 
            },
            {
              groupName: "Look and feel",
              groupFields: [
                // PropertyPaneButton('addColor', {
                //   buttonType: 0,
                //   text: 'Generate Theme',
                //   icon: 'Color',
                //   onClick: this.SimpleAlert
                // }),                
                // PropertyPaneTextField('description', {
                //   label: "Web part description"
                // }),
                // PropertyPaneTextField('noResultsMsg', {
                //   label: "No results message"
                // }),
                new PropertyPaneColorButton(
                  'BGColor', {
                  key: "BGColor",
                  label: "Add colors",
                  selectedColor: "#ffffff",
                  disabled: false,
                  showColorDialog: false,
                  onClick() : void {}                 
                }),this.colorPickerButton
              ]
            }
          ]
        },
      ]
    };
  }
  private configureWebPart(): void {
    this.context.propertyPane.open();
  }
  private SimpleAlert():void {
    alert();
  }
}
