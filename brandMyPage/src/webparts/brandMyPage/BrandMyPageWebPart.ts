import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BrandMyPageWebPartStrings';
import {IBrandMyPageWebPartProps} from './IBrandMyPageWebPartProps';

import ConfigLanding from './components/Config/ConfigLanding';
import { IConfigLandingProps } from './components/Config/IConfigLandingProps';

export default class BrandMyPageWebPart extends BaseClientSideWebPart<IBrandMyPageWebPartProps> {

  protected onInit(): Promise<void> {
    this.configureWebPart = this.configureWebPart.bind(this);
    return super.onInit();
  }
  public save: (configOptions) => void = (configOptions) => {
    this.properties.configOptions = configOptions;
    this.render();
  }
  public render(): void {
    const element: React.ReactElement<IConfigLandingProps > = React.createElement(
      ConfigLanding,
      {
        configureWebPart: this.configureWebPart,
        editMode: this.displayMode,
        // hideQuickLaunchProperty: this.properties.hideQuickLaunchProperty,
        // hideSiteLogoProperty: this.properties.hideSiteLogoProperty,
        // hideSiteTitleProperty: this.properties.hideSiteTitleProperty,
        // hideSiteDescriptionProperty: this.properties.hideSiteDescriptionProperty,
        // hideSiteMembersProperty: this.properties.hideSiteMembersProperty,
        // hideTopNavProperty: this.properties.hideTopNavProperty,
        // hideTitleRowProperty: this.properties.hideTitleRowProperty,
        // hideCommandBarItemsProperty: this.properties.hideCommandBarItemsProperty,
        // hidePageTitleProperty: this.properties.hidePageTitleProperty,
        // hideSearchBoxProperty: this.properties.hideSearchBoxProperty,
        // hideShareButtonProperty: this.properties.hideShareButtonProperty,
        configOptions:this.properties.configOptions,
        // Save method
        save: this.save        
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
              groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // })
              ]
            }
          ]
        }
      ]
    };
  }
  private configureWebPart(): void {
    this.context.propertyPane.open();
  }
}
