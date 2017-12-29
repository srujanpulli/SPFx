import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TabbedLinksWebPartStrings';
import TabbedLinks from './components/TabbedLinks';
import { ITabbedLinksProps } from './components/ITabbedLinksProps';
// import PlaceHolder from './PlaceHolder';

export interface ITabbedLinksWebPartProps {
  menuConfig: string;
}

export default class TabbedLinksWebPart extends BaseClientSideWebPart<ITabbedLinksWebPartProps> {
  public save: (configOptions) => void = (configOptions) => {
    this.properties.menuConfig = configOptions;
    this.render();
  }
  public render(): void {
    const element: React.ReactElement<ITabbedLinksProps > = React.createElement(
      TabbedLinks,
      {
        menuConfig: this.properties.menuConfig,
        save: this.save,
        isEditMode: (this.displayMode == 2) ? true : false
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected get disableReactivePropertyChanges(): boolean{
    return true;
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        // {
        //   header: {
        //     description: strings.PropertyPaneDescription
        //   },
        //   groups: [
        //     {
        //       groupName: strings.BasicGroupName,
        //       groupFields: [
        //         PropertyPaneTextField('description', {
        //           label: strings.DescriptionFieldLabel
        //         })
        //       ]
        //     }
        //   ]
        // }
      ]
    };
  }
}
