import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AllFabricIconsWebPartStrings';
import AllFabricIcons from './components/AllFabricIcons';
import { IAllFabricIconsProps } from './components/IAllFabricIconsProps';

export interface IAllFabricIconsWebPartProps {
  description: string;
}

export default class AllFabricIconsWebPart extends BaseClientSideWebPart<IAllFabricIconsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAllFabricIconsProps > = React.createElement(
      AllFabricIcons,
      {
        description: this.properties.description
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
