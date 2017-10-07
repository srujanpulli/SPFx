import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HideQuickLaunchWebPartStrings';
import HideQuickLaunch from './components/HideQuickLaunch';
import { IHideQuickLaunchProps } from './components/IHideQuickLaunchProps';

export interface IHideQuickLaunchWebPartProps {
  description: string;
}

export default class HideQuickLaunchWebPart extends BaseClientSideWebPart<IHideQuickLaunchWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHideQuickLaunchProps > = React.createElement(
      HideQuickLaunch,
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
