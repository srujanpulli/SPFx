import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BrandMyPageWebPartStrings';
import BrandMyPage from './components/BrandMyPage';
import { IBrandMyPageProps } from './components/IBrandMyPageProps';

export interface IBrandMyPageWebPartProps {
  description: string;
}

export default class BrandMyPageWebPart extends BaseClientSideWebPart<IBrandMyPageWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBrandMyPageProps > = React.createElement(
      BrandMyPage,
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
