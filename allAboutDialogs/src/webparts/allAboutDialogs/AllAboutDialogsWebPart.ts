import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AllAboutDialogsWebPartStrings';
import AllAboutDialogs from './components/AllAboutDialogs';
import { IAllAboutDialogsProps } from './components/IAllAboutDialogsProps';

export interface IAllAboutDialogsWebPartProps {
  description: string;
}

export default class AllAboutDialogsWebPart extends BaseClientSideWebPart<IAllAboutDialogsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAllAboutDialogsProps > = React.createElement(
      AllAboutDialogs,
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
