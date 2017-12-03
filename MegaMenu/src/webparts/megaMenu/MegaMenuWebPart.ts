import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';

import * as strings from 'MegaMenuWebPartStrings';
import MegaMenu from './components/MegaMenu';
import PlaceHolder from './PlaceHolder';
import { IMegaMenuProps } from './components/IMegaMenuProps';

export interface IMegaMenuWebPartProps {
  menuConfig: string;
}

export default class MegaMenuWebPart extends BaseClientSideWebPart<IMegaMenuWebPartProps> {
  public save: (configOptions) => void = (configOptions) => {
    // alert();
    this.properties.menuConfig = configOptions;
    this.render();
  }
  public render(): void {
      const element: React.ReactElement<IMegaMenuProps > = React.createElement(
      MegaMenu,
      {
        // menuConfig: this.properties.menuConfig
        menuConfig: this.properties.menuConfig,
        save: this.save,
        isEditMode: (this.displayMode == 2) ? true : false
      }
    );
    const placeHolder: React.ReactElement<{}> = React.createElement(PlaceHolder);

    if(window.location.href.indexOf("workbench.") > -1)
    {
      ReactDom.render(element, this.domElement);
    }
    else
    {
      ReactDom.render(element, document.getElementsByClassName("ms-siteLogoContainerOuter")[0]); //in actual site (replace on logo container)
      ReactDom.render(placeHolder, this.domElement);      
    } 
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          // header: {
          //   menuConfig: strings.PropertyPanemenuConfig
          // },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('menuConfig', {
                  label: strings.DescriptionFieldLabel,
                  multiline: true,
                  resizable: true,
                  rows:16
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
