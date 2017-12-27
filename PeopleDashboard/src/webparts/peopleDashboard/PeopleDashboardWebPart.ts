import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
} from '@microsoft/sp-webpart-base';

import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from '@microsoft/sp-http';

import * as strings from 'PeopleDashboardWebPartStrings';
import PeopleDashboard from './components/PeopleDashboard';
import { IPeopleDashboardProps } from './components/IPeopleDashboardProps';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { PropertyPaneButtonType } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneButton/IPropertyPaneButton';
import { Web } from "sp-pnp-js";
import pnp, { List, ListEnsureResult } from "sp-pnp-js";
import HttpClientConfiguration from '@microsoft/sp-http/lib/httpClient/HttpClientConfiguration';
import SPHttpClientConfiguration from '@microsoft/sp-http/lib/spHttpClient/SPHttpClientConfiguration';
import { IODataList } from '@microsoft/sp-odata-types';
import SPList from '@microsoft/sp-page-context/lib/SPList';
import { PropertyPaneCheckbox } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox';

export interface IPeopleDashboardWebPartProps {
  webpartTitle: string;
  selectList: string;
  createNewList: string;
  btnCreateList: Button;
  compactMode: boolean;
}
export interface spList {
  Title: string;
  id: string;
}
export default class PeopleDashboardWebPart extends BaseClientSideWebPart<IPeopleDashboardWebPartProps> {
  private dropDownOptions: IPropertyPaneDropdownOption[] = [];
  private selectedList: string = "";
  private CreateList(): void {
    var listName = this.properties.createNewList;
    let spWeb = new Web(this.context.pageContext.web.absoluteUrl);
    let spListDescription = "List created using PersonDashboard app " + listName;
    let spListTemplateId = 100;
    let spEnableCT = true;
    spWeb.lists.ensure(listName, spListDescription, spListTemplateId, spEnableCT).then((spList: ListEnsureResult) => {
      if (spList.created) {
        alert(`List ` + listName + ` Created`);
          spList.list.fields.addText("PersonShortDescription", 200).then((f) => {
            spList.list.fields.addText("PersonDescription", 200).then((f) => {
              spList.list.fields.addText("PersonImage", 200).then((f) => {
                spList.list.fields.addNumber("SortOrder").then((f) => { });
              });
            });
          });
        this.selectedList = listName;        
        this.GetLists().then((options) => {
          this.dropDownOptions = options;
          this.context.propertyPane.refresh();
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
          this.properties.selectList = listName;
          this.properties.createNewList = "";          
          this.context.propertyPane.refresh();          
          this.render();
        });
      }
      else { alert('FAILURE - List with the same name already exist!'); }
    });
  }
  private _CreateList(): void {
    this.CreateList();
  }
  protected onInit(): Promise<void> {
    this.configureWebPart = this.configureWebPart.bind(this);
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IPeopleDashboardProps > = React.createElement(
      PeopleDashboard,
      {
        webpartTitle: this.properties.webpartTitle,
        selectList: this.properties.selectList,
        createNewList: this.properties.createNewList,
        btnCreateList: this.properties.btnCreateList,
        spHttpClient: this.context.spHttpClient,
        configureWebPart: this.configureWebPart,
        context: this.context,
        webPartDisplayMode: this.displayMode,
        compactMode: this.properties.compactMode,   
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
          // header: {
          //   // description: "Configure webpart settings"
          // },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: 'Webpart Title (optional)',
                  placeholder: 'Enter a webpart title'
                }),
                PropertyPaneDropdown('selectList', {
                  label: 'Select a list*',
                  options: this.dropDownOptions,
                  selectedKey: this.selectedList
                }),
                PropertyPaneTextField('createNewList', {
                  label: 'Or create a new list',
                  placeholder: "List name should be at least 3 characters"
                }),
                PropertyPaneButton('createList', { text: "Create List", disabled: (this.properties.createNewList && this.properties.createNewList.length > 2) ? false : true , buttonType: PropertyPaneButtonType.Primary, onClick: this._CreateList.bind(this) }),
                PropertyPaneCheckbox("compactMode",{
                  text: "Compact mode",  
                  checked: false, 
                  disabled: false,
                })
              ]
            }
          ]
        }
      ]
    };
  }
  // Load option for lists drop down.
  protected onPropertyPaneConfigurationStart(): void {
    // Stops execution, if the list values already exists 
    if (this.dropDownOptions.length > 0) return;

    // Calls function to append the list names to dropdown  
    this.GetLists().then((options) => {
      this.dropDownOptions = options;
      this.context.propertyPane.refresh();
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this.render();
    });
  }
  private GetLists(): Promise<IPropertyPaneDropdownOption[]> {
    // REST API to pull the list names 
    let listresturl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists?$filter=(BaseTemplate eq 100) and (Hidden eq false) and substringof('List created using PersonDashboard app',description)";
    return this.LoadLists(listresturl).then((response) => {
      // Render the data in the web part  

      var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
      response.value.map((list: IODataList) => {
        options.push({ key: list.Title, text: list.Title });

      });
      return options;
    });
  }

  private LoadLists(url: string): Promise<any> {
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("WARNING - failed to hit URL " + url + ". Error = " + response.statusText);
        return null;
      }
    });
  }
  protected get disableReactivePropertyChanges(): boolean { return true; }

  private configureWebPart(): void {
    this.context.propertyPane.open();
  }
}