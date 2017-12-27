import * as React from 'react';
import styles from './PeopleDashboard.module.scss';
import { IPeopleDashboardProps } from './IPeopleDashboardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton, PrimaryButton, ActionButton, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Placeholder } from '../../../controls/placeholder';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {Checkbox, ICheckboxStyles, ICheckboxProps} from 'office-ui-fabric-react/lib/Checkbox';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

// import { IPersonProps } from './IPersonProps';
import Person from './Person';

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';


import pnp, { List, ListEnsureResult, Web, ItemAddResult } from "sp-pnp-js";

export interface ICheckboxBasicExampleState {
  isLBChecked: boolean;
}
export interface IBasicColorPickerExampleState {
  color: string;
}
export interface ISPList {
  Title: string;
  Id: string;
  Color: string;
  Icon: DropdownMenuItemType;
  LinkLocation: string;
  LaunchBehaviour: string;
}
export interface IPeopleDashboardState {
  // status: string;
  stateListData: [{
    "Title": "",
    "Id": "",
    "PersonTitle": "",
    "PersonDescription": "",
    "PersonImage": "",
  }];
}

export default class PeopleDashboard extends React.Component<IPeopleDashboardProps, any> {
  constructor() {
    super();
    this._onConfigure = this._onConfigure.bind(this);
    this.state = {
      stateListData: [],
      panelProps:{
        isOpen: false,
        isNewItem: false,
        useO365ProfilePic: false,
        listItemID: 0,
        profilePic: "",
        fullName: "",
        shortDescription: "",
        fullDescription: ""
      }
      // list: ""
    };
    this._CloseEditPanel = this._CloseEditPanel.bind(this);
    this._AddNewItemLaunch = this._AddNewItemLaunch.bind(this);
  }
  //Open Property pane on click on placeholder button. 
  private _onConfigure() {
    this.props.context.propertyPane.open();
  }
  //Check if list text box is empty or not.
  private needsConfiguration(): boolean {
    return PeopleDashboard.isEmpty(this.props.selectList);
  }
   //Check if list text box is empty or not.
   private static isEmpty(value: string): boolean {
    return value === undefined ||
      value === null ||
      value.length === 0;
  }
  public componentDidMount() {
    this.getListData();
  }
  public componentDidUpdate(prevProps: IPeopleDashboardProps) {
    var oldListname = prevProps.selectList;
    var newListName = this.props.selectList;

    //Track if there is a change in the web part properties specially the list name. Then the content has to change.
    if (oldListname !== newListName) {
        this.getListData();
    }
}
private getListData() {
  this.getListDataViaREST().then(data => {
      this.setState({ stateListData: data, countListData: (data) ? data.length : 0 });

  });
}
    //Fetch select list data
    private getListDataViaREST(): Promise<string[]> {

      var ln = this.props.selectList;
      var restEndPoint = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('" + ln + "')/Items?$select=Id,Title,PersonShortDescription,PersonDescription,PersonImage,SortOrder&$orderby=SortOrder";
      return this.props.spHttpClient.get(restEndPoint, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => {
              return response.json();
          }).then(data => {
              return data.value;
          });

    }
  
  public render(): React.ReactElement<IPeopleDashboardProps> {
    var miniPersonaFixedWidth = {
      width: '200px',
    };
    var PersonaFixedWidth = {
      width: '300px',
    };
    let disabled = false;
    //If list name text box is empty then show place holder with configure web part properties button.
    if (this.needsConfiguration()) {
      return (
        <div>
          <Placeholder
            iconName='Settings'
            iconText='Configure your web part'
            description='Looks like this webpart is <u>not</u> configured yet.'
            buttonLabel='Configure'
            onConfigure={this._onConfigure} />
        </div>
      );
    }
    else {
      var itemCol = (this.state.stateListData) ? this.state.stateListData : [];
      var tmpIsCompactMode = this.props.compactMode;

      if(this.props.webPartDisplayMode == DisplayMode.Edit)
      {
        // EDIT MODE START
        
        let editPanelHTML = 
        <Panel
            isOpen={ this.state.panelProps.isOpen }
            type={ PanelType.large }
            onDismiss={ this._CloseEditPanel }
            headerText={this.state.panelProps.isNewItem == true ? "Add user" :"Edit user"}
            closeButtonAriaLabel='Close'
            onRenderFooterContent={ this._onRenderPanelFooterContentLink }
          >
          <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg6">
                    <TextField label="Name"
                      required={ true }
                      placeholder='Enter full name of employee'
                      value={this.state.panelProps.fullName}
                      onChanged={(value: string) => { this.state.panelProps.fullName = value; this.setState(this.state);} }                            
                      onGetErrorMessage = {(value) => value.length > 0
                        ? ''
                        : `This field is required.`}
                    />
                    <TextField label="Short description"
                      required={ true }
                      placeholder='e.g. IT Manager'
                      value={this.state.panelProps.shortDescription}
                      onChanged={(value: string) => { this.state.panelProps.shortDescription = value; this.setState(this.state);} }                            
                      onGetErrorMessage = {(value) => value.length > 0
                        ? ''
                        : `This field is required.`}
                    />  
                    <TextField label="Full Description"
                      multiline
                      
                      required={ true }
                      placeholder = {"E.g. Responsibilities"}
                      value={this.state.panelProps.fullDescription}
                      onChanged={(value: string) => { this.state.panelProps.fullDescription = value; this.setState(this.state);} }                                                                                
                      onGetErrorMessage = {(value) => value.length > 0
                        ? ''
                        : `This field is required.`}
                    />
                    <div className={"ms-fontSize-sPlus"}>Description can be plain text or HTML.</div>  
                    <br/><br/>
                    <Checkbox
                      label='Use O365 profile picture of user'
                      // onChange={ (checked) => {this.setState({'openInNewTab': checked})} }
                      onChange={ this._onControlledCheckboxChange }                            
                      checked={this.state.panelProps.useO365ProfilePic}
                      ariaDescribedBy={ 'User profile picture' }
                    />             
                    <TextField label={this.state.panelProps.useO365ProfilePic == true ? "User's email" :"Image url"}
                      required={ true }
                      placeholder = {this.state.panelProps.useO365ProfilePic == true ? "E.g. abc@ebay.com" :"E.g. https://abc/xyz.ping"}
                      value={(this.state.panelProps.useO365ProfilePic == true && this.state.panelProps.profilePic.indexOf("accountname=") > - 1) ? this.state.panelProps.profilePic.substring(this.state.panelProps.profilePic.indexOf("accountname=")+12,this.state.panelProps.profilePic.length) : this.state.panelProps.profilePic}
                      onChanged={(value: string) => { this.state.panelProps.profilePic = value; this.setState(this.state);} }                                                                                
                      onGetErrorMessage = {(value) => value.length > 0
                        ? ''
                        : `This field is required.`}
                    />

                    </div>
                    <div className="ms-Grid-col ms-lg6">
                    </div>
                    <h3>Preview</h3>
                    <Person  listItemID={0} fullName={this.state.panelProps.fullName} compactMode={this.props.compactMode} profilePic={ this.state.panelProps.useO365ProfilePic == true ?  ("/_layouts/15/userphoto.aspx?size=L&accountname=" + this.state.panelProps.profilePic) : this.state.panelProps.profilePic} shortDescription={this.state.panelProps.shortDescription} fullDescription={this.state.panelProps.fullDescription} />
                    </div>
                    </Panel> ;
                    //END Edit panel HTML
        if(itemCol.length > 0)
        {
          let itemColGroup = itemCol.map((link, index) =>
          <div key={index} className={`ms-Grid-col ${styles.hoverBorder}`}>
          <div className="ms-Grid-row" style={this.props.compactMode == true ? miniPersonaFixedWidth : PersonaFixedWidth }>
            <div className="ms-Grid-col ms-lg8 ms-smPush2">
              <Person listItemID={itemCol[index].ID} fullName={itemCol[index].Title} compactMode={tmpIsCompactMode} profilePic={itemCol[index].PersonImage} shortDescription={itemCol[index].PersonShortDescription} fullDescription={itemCol[index].PersonDescription} />
            </div></div>
            <div className="ms-Grid-row" style={this.props.compactMode == true ? miniPersonaFixedWidth : PersonaFixedWidth }>
            <div className={`${styles.iconsShowOnHover}`}>

              <IconButton iconProps={ { iconName: 'ChevronLeftSmall' } } title='Move Left' ariaLabel='Move Left' onClick={() => this._MoveItemLeft(itemCol[index].ID, itemCol[index].SortOrder, index)} disabled={index < 1 ? true : false} />
              <IconButton iconProps={ { iconName: 'ChevronRightSmall' } } title='Move Right' ariaLabel='Move Right' onClick={() => this._MoveItemRight(itemCol[index].ID, itemCol[index].SortOrder, index)} disabled={index == itemCol.length - 1 ? true : false}/>
              <IconButton iconProps={ { iconName: 'Edit' } } title='Edit' ariaLabel='Edit' onClick={() => this._EditItemLaunch(itemCol[index].ID, itemCol[index].PersonImage, itemCol[index].Title, itemCol[index].PersonShortDescription, itemCol[index].PersonDescription)} />
              <IconButton iconProps={ { iconName: 'Cancel' } } title='Delete' ariaLabel='Delete' onClick={() => this._DeleteItem(itemCol[index].ID)} />
          </div></div>
          </div>
          );
          return (
            <div className={`${styles.peopleDashboard} ms-Grid-row`}>
            <MessageBar messageBarType={MessageBarType.info } >Look and Feel in edit mode is tweaked to facilitate easy editing.</MessageBar>
            {
              this.props.webpartTitle.length > 0 &&
              <div className={`ms-fontSize-xl ${styles.margin10Bottom}`}>{this.props.webpartTitle}</div>
            }
            <div><ActionButton iconProps={ { iconName: 'Add' } } title='Add new item' ariaLabel='Add new item' onClick={this._AddNewItemLaunch} > Add new item </ActionButton></div>
            {itemColGroup}
            {editPanelHTML}
            </div>//  EDIT MODE RETURN END
          );
        }
        else
        {
          return(
            <div className={`${styles.peopleDashboard} ms-Grid-row`}>
            {
              this.props.webpartTitle.length > 0 &&
              <div className={`ms-fontSize-xl ${styles.margin10Bottom}`}>{this.props.webpartTitle}</div>
            }
            <div><ActionButton iconProps={ { iconName: 'Add' } } title='Add new item' ariaLabel='Add new item' onClick={this._AddNewItemLaunch  } > Add new item </ActionButton>
            {editPanelHTML}
          </div>
              <Person  listItemID={1} fullName="Sample Title" compactMode={tmpIsCompactMode} profilePic="" shortDescription="My Title" fullDescription="My description" />
              <Person  listItemID={2} fullName="Sample Title" compactMode={tmpIsCompactMode} profilePic="" shortDescription="My Title" fullDescription="My description" />
          </div>
          );
        }

        // EDIT MODE END
      } else
      {
        // READ MODE START
        if(itemCol.length > 0)
        {
          let itemColGroup = itemCol.map((link, index) =><Person key={index} listItemID={itemCol[index].ID} fullName={itemCol[index].Title} compactMode={tmpIsCompactMode} profilePic={itemCol[index].PersonImage} shortDescription={itemCol[index].PersonShortDescription} fullDescription={itemCol[index].PersonDescription} />);
          return (
            <div className={`${styles.peopleDashboard} ms-Grid-row`}>
            {
              this.props.webpartTitle.length > 0 &&
              <div className={`ms-fontSize-xl ${styles.margin10Bottom}`}>{this.props.webpartTitle}</div>
            }
            {itemColGroup}
            </div>
          );
        }
        else
        {
          return(
            <div className={`${styles.peopleDashboard} ms-Grid-row`}>
            {
              this.props.webpartTitle.length > 0 &&
              <div className={`ms-fontSize-xl ${styles.margin10Bottom}`}>{this.props.webpartTitle}</div>
            }
              <Person  listItemID={1} fullName="Sample Title" compactMode={tmpIsCompactMode} profilePic="" shortDescription="My Title" fullDescription="My description" />
              <Person  listItemID={2} fullName="Sample Title" compactMode={tmpIsCompactMode} profilePic="" shortDescription="My Title" fullDescription="My description" />
          </div>
          );
        }
      }//END READ MODE RENDER
    }
  }//END RENDER METHOD
  public _CloseEditPanel(): void {
    this.state.panelProps.isOpen = false;
    this.setState(this.state);
  }

  @autobind
  public _AddNewItemLaunch():void{
    this.state.panelProps.isOpen = true;
    this.state.panelProps.isNewItem = true;
    this.state.panelProps.useO365ProfilePic = false;
    this.state.panelProps.listItemID = 0;
    this.state.panelProps.profilePic = "";
    this.state.panelProps.fullName = "";
    this.state.panelProps.shortDescription = "";
    this.state.panelProps.fullDescription = "";
    this.setState(this.state);
  }
  @autobind
  public _EditItemLaunch(
    listItemID: number, profilePic: string, fullName: string, shortDescription: string, fullDescription : string
  ):void{
    this.state.panelProps.isOpen = true;
    this.state.panelProps.isNewItem = false;
    this.state.panelProps.listItemID = listItemID;
    this.state.panelProps.useO365ProfilePic = false;
    if(profilePic)
    {
      if(profilePic.indexOf("_layouts/15/userphoto.aspx") > -1)
      {
        this.state.panelProps.useO365ProfilePic = true;
      }
      else
      {
        this.state.panelProps.useO365ProfilePic = false;
      }
    }
    this.state.panelProps.profilePic = profilePic;
    this.state.panelProps.fullName = fullName;
    this.state.panelProps.shortDescription = shortDescription;
    this.state.panelProps.fullDescription = fullDescription;
    this.setState(this.state);
  }
  @autobind
  public _SaveChanges(): void {
      var maxSortorder = 0;
      let spWeb = new Web(this.props.context.pageContext.web.absoluteUrl);
      let tmpPicUrl = "";
      if(this.state.panelProps.useO365ProfilePic)
      {
        tmpPicUrl = "/_layouts/15/userphoto.aspx?size=L&accountname=" + this.state.panelProps.profilePic;
      }
      else
      {
        tmpPicUrl = this.state.panelProps.profilePic;
      }
      spWeb.lists.getByTitle(this.props.selectList).items.select("SortOrder").top(1).orderBy("SortOrder", false).get().then((items: any[]) => {
          if (items.length === 0) {
              maxSortorder = 1;
          }
          else {
              maxSortorder = items[0].SortOrder + 1;
          }
          if(this.state.panelProps.isNewItem){
          // Add data to list.
          spWeb.lists.getByTitle(this.props.selectList).items.add({
              Title: this.state.panelProps.fullName,
              PersonImage:tmpPicUrl,
              PersonShortDescription: this.state.panelProps.shortDescription,
              PersonDescription: this.state.panelProps.fullDescription,
              SortOrder: maxSortorder
          }).then((iar: ItemAddResult) => {
              alert('Success!!!: New card record added.');
              // this._CloseEditPanel;
              //Refresh the data.
              this.state.panelProps.isOpen = false;
              this.setState(this.state);
              this.getListData();
            });
          }
          else
          {
            spWeb.lists.getByTitle(this.props.selectList).items.getById(this.state.panelProps.listItemID).update({
              Title: this.state.panelProps.fullName,
              PersonImage:tmpPicUrl,
              PersonShortDescription: this.state.panelProps.shortDescription,
              PersonDescription: this.state.panelProps.fullDescription,
            }).then(() => {
              alert('Success!!!: Your changes are saved.');
              this.state.panelProps.isOpen = false;
              this.setState(this.state);
              this.getListData();}
            );
          }
      });
  }
  @autobind
  public _DeleteItem(listItemID : number): void {
    var result = confirm("Are you sure you want to delete this card?");
    if (result) {
        let spWeb = new Web(this.props.context.pageContext.web.absoluteUrl);
        spWeb.lists.getByTitle(this.props.selectList).items.getById(listItemID).delete().then(() => {
            alert('Success!! Card deleted.');
            this.getListData();
        });
    }
  }
  @autobind
  public _MoveItemLeft(listItemID : number, currentSortOrder: number, currentIndex: number): void {
    if (!confirm("Do you really want to move this card to Left?")) {
      return;
    }
    var prevItem = this.state.stateListData[currentIndex - 1];
    var prevItemId = prevItem.Id;
    var prevSortOrder = prevItem.SortOrder;

    //Swap the sort orders between current item id and previous item id.
    let spWeb = new Web(this.props.context.pageContext.web.absoluteUrl);
    let list = spWeb.lists.getByTitle(this.props.selectList);
    list.items.getById(listItemID).update({
        SortOrder: prevSortOrder
    }).then(i => {
        list.items.getById(prevItemId).update(
            { SortOrder: currentSortOrder }
        ).then(j => {
          this.getListData();
          // alert("Success!! Selected card moved to previous position.");
        });
    });
  }
  @autobind
  public _MoveItemRight(listItemID : number, currentSortOrder: number, currentIndex: number): void {
    if (!confirm("Do you really want to move this card to Right?")) {
      return;
    }
    var prevItem = this.state.stateListData[currentIndex + 1];
    var prevItemId = prevItem.Id;
    var prevSortOrder = prevItem.SortOrder;

    //Swap the sort orders between current item id and previous item id.
    let spWeb = new Web(this.props.context.pageContext.web.absoluteUrl);
    let list = spWeb.lists.getByTitle(this.props.selectList);
    list.items.getById(listItemID).update({
        SortOrder: prevSortOrder
    }).then(i => {
        list.items.getById(prevItemId).update(
            { SortOrder: currentSortOrder }
        ).then(j => {
          this.getListData();
          // alert("Success!! Selected card moved to previous position.");
        });
    });
  }
  @autobind
  private _onControlledCheckboxChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
    this.state.panelProps.useO365ProfilePic = checked!;
    this.state.panelProps.profilePic = "";
    this.setState(this.state);
  }
  @autobind
  private _onRenderPanelFooterContentLink(): JSX.Element {
    return (
      <div>
        <PrimaryButton
          onClick={ this._SaveChanges }
          style={ { 'marginRight': '8px' } }
          disabled = {(this.state.panelProps.fullName < 1 || this.state.panelProps.shortDescription < 1 || this.state.panelProps.fullDescription < 1 || this.state.panelProps.profilePic.length < 1 ) ? true : false}
        >
          Save
        </PrimaryButton>
        <DefaultButton
          onClick={ this._CloseEditPanel }
        >
          Cancel
        </DefaultButton>
      </div>
    );
  }//END _onRenderPanelFooterContentLink method
}