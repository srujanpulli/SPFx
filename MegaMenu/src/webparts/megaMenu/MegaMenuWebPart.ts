import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'MegaMenuWebPartStrings';
import MegaMenu from './components/MegaMenu';
import { IMegaMenuProps } from './components/IMegaMenuProps';

export interface IMegaMenuWebPartProps {
  description: string;
}

export default class MegaMenuWebPart extends BaseClientSideWebPart<IMegaMenuWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMegaMenuProps > = React.createElement(
      MegaMenu,
      {
        description: this.properties.description
      }
    );

    if(window.location.href.indexOf("workbench.") > -1)
    {
      ReactDom.render(element, this.domElement);
    }
    else
    {
      ReactDom.render(element, document.getElementsByClassName("ms-siteLogoContainerOuter")[0]); //in actual site (replace on logo container)
    }
    //ReactDom.render(element, document.getElementsByClassName("commandBar_e788ae32")[0]); //in workbench
    
    
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
