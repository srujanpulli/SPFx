import * as React from 'react';
import styles from './MegaMenu.module.scss';
import { IMegaMenuProps } from './IMegaMenuProps';
import { IMegaMenuState } from './IMegaMenuState';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { DefaultButton, CompoundButton, ActionButton, Button, IconButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { valid, link } from 'glamor';

export default class MegaMenu extends React.Component<IMegaMenuProps, IMegaMenuState> {
  
  constructor(props) {
    super(props);
    this.state = { 
      showPanel: false,
      stateMenuConfig: this.props.menuConfig,
      editHeading :
      {
        isNewItem:true,
        showHeadingPanel:false,
        headingID: 0,
        headingTitle: "" 
      },
      editLink:{
        isNewItem:true,
        showLinkPanel:false,
        linkID: 0,
        headingID: 0,    
        linkTitle: "",
        linkUrl: "",
        iconName: ""
      },
      };
    this._addHeading = this._addHeading.bind(this);
    this._editHeading = this._editHeading.bind(this);
    this._addLink = this._addLink.bind(this);
    this._onCloseHeadingPanel = this._onCloseHeadingPanel.bind(this) ;
    this._onCloseLinkPanel = this._onCloseLinkPanel.bind(this) ;
    this._headingSave = this._headingSave.bind(this)
    this._addLinkSave = this._addLinkSave.bind(this)
    this._editLink = this._editLink.bind(this)
    
  }

  public render(): React.ReactElement<IMegaMenuProps> {
    var _isEditMode = this.props.isEditMode;
    var _isHeadingPanelOpen = this.state.editHeading.showHeadingPanel;
    var _isLinkPanelOpen = this.state.editLink.showLinkPanel

    class SingleHeader extends React.Component<{cardContents, headingKey, isEditModetmp, _editHeading:(headingIndex:number) => void}> {
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <div className={`ms-Grid-row ${styles.hoverBorder}`}>
              <div className="ms-Grid-col ms-lg8">
                <h1 className={styles.heading}>{this.props.cardContents[this.props.headingKey].heading}</h1>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'Edit' } } title='Edit' ariaLabel='Edit' onClick={() => this.props._editHeading(this.props.headingKey)}  />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'Cancel' } } title='Cancel' ariaLabel='Delete' />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'ChevronLeftSmall' } } title='Move left' ariaLabel='Move left' disabled={(this.props.headingKey == 0 ? true : false)}/>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'ChevronRightSmall' } } title='Move right' ariaLabel='Move right'  disabled={(this.props.headingKey == this.props.cardContents.length - 1 ? true : false)}/>
              </div>
          </div>
          );
        }else{
          return <h1 className={styles.heading}>{this.props.cardContents[this.props.headingKey]}</h1>;
        }
      }
    }

    class SingleLink extends React.Component<{links, url, iconName, name, isEditModetmp, headingKey, linkKey, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void}> {
      public constructor(props: any) {
        super(props);
        this.handleSaveLinkClick = this.handleSaveLinkClick.bind(this);
      }
      handleSaveLinkClick(headkingKey:number, linkKey:number, iconName:string): void {
        this.props._editLink(headkingKey,linkKey, iconName);
      }
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <div className={`ms-Grid-row ${styles.hoverBorder}`}>
              <div className="ms-Grid-col ms-lg8">
              {/* headingKey={this.props.headingKey} linkKey={index} */}
               <ActionButton data-automation-id='test' href={this.props.url} target="_blank" iconProps={ { iconName: this.props.iconName } } disabled={ false } >{this.props.name}</ActionButton>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'Edit' } } title='Edit' ariaLabel='Edit' onClick={() => this.handleSaveLinkClick(this.props.headingKey, this.props.linkKey, this.props.iconName)} />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'Cancel' } } title='Delete' ariaLabel='Delete' />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'ChevronUpSmall' } } title='Move Up' ariaLabel='Move Up' disabled={(this.props.linkKey == 0 ? true : false)} />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'ChevronDownSmall' } } title='Move Down' ariaLabel='Move Down' disabled={(this.props.linkKey == this.props.links.length-1 ? true : false)}/>
              </div>
          </div>
          );
        }else{
          return <ActionButton data-automation-id='test' href={this.props.url} iconProps={ { iconName: this.props.iconName } } disabled={ false } >{this.props.name}</ActionButton>;
        }
      }
    }    

    class LinkGroup extends React.Component<{ links,isEditModetmp, headingKey,  _addLink:(headingIndex:number) => void, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void}> {
      
      public render() {
        let allLinks = this.props.links;
        let allLinksInGroup = allLinks.map((link, index) =>
          // Correct! Key should be specified inside the array.
          <li><SingleLink links={this.props.links} headingKey={this.props.headingKey} linkKey={index} name={link.name} url={link.link} iconName={link.iconName} isEditModetmp={this.props.isEditModetmp} _editLink={this.props._editLink}/></li>
        );
      if(this.props.isEditModetmp)        
      {
        return (<ul className={`${styles.links}`}>{allLinksInGroup}
        <ActionButton className={styles.redFont} iconProps={ { iconName: 'Add' }} text="Add a new link" onClick={() => this.props._addLink(this.props.headingKey)} />
      </ul>);
      }
      else
      {
        return (<ul className={`${styles.links}`}>{allLinksInGroup}</ul>);
      }
      
      }
    }    

    class SingleCard extends React.Component<{headingKey, cardContents, isEditModetmp, _addLink:(headingIndex:number) => void, _editHeading:(headingIndex:number) => void, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void}> {

      constructor(props)
      {
        super(props)
        this.setState({});
      }
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">        
              <SingleHeader cardContents={this.props.cardContents} headingKey={this.props.headingKey} isEditModetmp={this.props.isEditModetmp} _editHeading={this.props._editHeading} />
              <LinkGroup headingKey={this.props.headingKey} links={this.props.cardContents[this.props.headingKey].links} isEditModetmp={this.props.isEditModetmp} _editLink={this.props._editLink} _addLink={this.props._addLink}/>
            </div>);
        }
        else
        {
          return (
            <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">        
              <SingleHeader cardContents={this.props.cardContents} headingKey={this.props.headingKey} isEditModetmp={this.props.isEditModetmp} _editHeading={this.props._editHeading}/>
              <LinkGroup headingKey={this.props.headingKey} links={this.props.cardContents[this.props.headingKey].links} isEditModetmp={this.props.isEditModetmp} _editLink={this.props._editLink} _addLink={this.props._addLink}/>
            </div>);
        }

      }

    }    

    class AllCards extends React.Component<{cardContents,isEditModetmp, _addHeading:() => void, _editHeading:(headingIndex:number) => void, _addLink:(headingIndex:number) => void, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void}> {
      constructor(props)
      {
        super(props)
        this.setState({});       
      }
      public render() {
        let cards = this.props.cardContents;
        let allCardsInContainer = cards.map((card, index) =>
          <SingleCard headingKey={index} cardContents={cards} isEditModetmp={this.props.isEditModetmp} _addLink={this.props._addLink} _editHeading = {this.props._editHeading} _editLink={this.props._editLink}/>
        );

        if(this.props.isEditModetmp)
        {
          return (<div className={`ms-Grid-row  ${styles.row}`}>
            {allCardsInContainer}
            <PrimaryButton iconProps={ { iconName: 'Add' }} onClick={ this.props._addHeading} >
              Add a new heading..
            </PrimaryButton>
      </div>);
        }
        else
        {
          return (<div className={`ms-Grid-row  ${styles.row}`}>
            {allCardsInContainer}
            </div>);
        }
      }
    }

class EditHeadingPanel extends React.Component<{cardContents, isNewItem, headingIndex, _onCloseHeadingPanel: () => void, _headingSave(configOptionstmp, isNewItem:boolean, headingKey: number, headingValue: string): void}, any> {
      public constructor(props: any) {
        super(props);
        if(this.props.isNewItem)
        {
          this.state = {  headingValue : "",
          headingKey : this.props.headingIndex,
          isNewItem: this.props.isNewItem};
        }
        else
        {
          this.state = {  headingValue : this.props.cardContents[this.props.headingIndex].heading,
          headingKey : this.props.headingIndex,
          isNewItem: this.props.isNewItem};
        }
        this.handleClick = this.handleClick.bind(this);
      }

      public render() {
        return (<div className={`ms-Grid-row  ${styles.row}`}>
                    <Panel
                      isOpen={ _isHeadingPanelOpen }
                      type={ PanelType.smallFixedFar }
                      onDismiss={ this.props._onCloseHeadingPanel }
                      headerText='My Heading Panel'
                      closeButtonAriaLabel='Close'
                      onRenderFooterContent={ this._onRenderFooterContent }
                    >
                      <div><TextField
                            label = "Heading"
                            required={ true }
                            placeholder='Enter Heading'
                            value={this.state.headingValue}
                            onChanged={(value: string) => { this.setState({headingValue : value});} }
                            onGetErrorMessage = {(value) => value.length > 0
                              ? ''
                              : `This field is required.`}
                          />

                    </div>
                    </Panel>
                </div>);
      }

      handleClick(): void {
        this.props._headingSave(this.props.cardContents,this.state.isNewItem, this.state.headingKey, this.state.headingValue);
      }
    
      @autobind
      private _onRenderFooterContent(): JSX.Element {
        
        return (
          <div>
            <PrimaryButton
              // onClick={ this.props._headingSave(this.state.headingValue) }
              onClick={this.handleClick}
              style={ { 'marginRight': '8px' } }
              disabled={this.state.headingValue == "" ? true : false}
            >
              Save
            </PrimaryButton>
            <DefaultButton
              onClick={ this.props._onCloseHeadingPanel }
            >
              Cancel
            </DefaultButton>
          </div>
        );
      }
    }// END Heading Panel
    class EditLinkPanel extends React.Component<{cardContents, isNewItem, headingIndex, linkIndex, _onCloseLinkPanel: () => void, _addLinkSave(isNewItem:boolean, headingKey:number, headingValue:string, linkKey:number, linkText:string, linkUrl:string, iconName: string): void},any> {
      public constructor(props: any) {
        super(props);
        if(this.props.isNewItem)
        {
          this.state = {  headingValue  : this.props.cardContents[this.props.headingIndex].heading,
                          linkText : "", 
                          linkUrl: "",
                          iconName:""};
        }
        else
        {
          this.state = { 
                        headingValue  : this.props.cardContents[this.props.headingIndex].heading,
                        linkText      : this.props.cardContents[this.props.headingIndex].links[this.props.linkIndex].name,
                        linkUrl       : this.props.cardContents[this.props.headingIndex].links[this.props.linkIndex].link,
                        iconName      : this.props.cardContents[this.props.headingIndex].links[this.props.linkIndex].iconName,
          };
        }

        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(): void {
        //isNewItem:boolean, headingKey:number, headingValue:string, linkKey:number, linkText:string, linkUrl:string, iconName: string
        this.props._addLinkSave(this.props.isNewItem, this.props.headingIndex, this.state.headingValue, this.props.linkIndex, this.state.linkText, this.state.linkUrl, this.state.iconName);
      }
      public render() {
        return (<div className={`ms-Grid-row  ${styles.row}`}>
                    <Panel
                      isOpen={ _isLinkPanelOpen }
                      type={ PanelType.smallFixedFar }
                      onDismiss={ this.props._onCloseLinkPanel }
                      headerText='My Link pane'
                      closeButtonAriaLabel='Close'
                      onRenderFooterContent={ this._onRenderFooterContentLink }
                    >
                      <div> 
                          <TextField label="Heading"
                            required={ true }
                            value={this.state.headingValue}
                            disabled={true}
                          />
                          <TextField label="Link Title"
                            required={ true }
                            placeholder='Enter Heading'
                            value={this.state.linkText}
                            onChanged={(value: string) => { this.setState({linkText : value});} }                            
                            onGetErrorMessage = {(value) => value.length > 0
                              ? ''
                              : `This field is required.`}
                          />
                          <TextField label="Url"
                            required={ true }
                            prefix="https://"
                            placeholder='Enter Heading'
                            value={this.state.linkUrl}
                            onChanged={(value: string) => { this.setState({linkUrl : value});} }                            
                            onGetErrorMessage = {(value) => value.length > 0
                              ? ''
                              : `This field is required.`}
                          />
                          <TextField label="Icon"
                            required={ true }
                            placeholder='Type an icon'
                            value={this.state.iconName}
                            onChanged={(value: string) => { this.setState({iconName : value});} }                            
                            onGetErrorMessage = {(value) => value.length > 0
                              ? ''
                              : `This field is required.`}
                          />
                    </div>
                    </Panel>
                </div>);
      }
    
      @autobind
      private _onRenderFooterContentLink(): JSX.Element {
        return (
          <div>
            <PrimaryButton
              onClick={ this.props._onCloseLinkPanel }
              style={ { 'marginRight': '8px' } }
              disabled = {(this.state.linkText == "" || this.state.linkUrl == ""|| this.state.iconName =="") ? true : false}
            >
              Save
            </PrimaryButton>
            <DefaultButton
              onClick={ this.props._onCloseLinkPanel }
            >
              Cancel
            </DefaultButton>
          </div>
        );
      }
    
    }// END Heading Panel
    return (
      <div className={styles.megaMenu}>
            <PrimaryButton checked={this.state.showPanel} className={styles.megaButton} onClick={ () => this.setState({ showPanel: true }) } ><div className={styles.burgerBar} ></div></PrimaryButton>
            <Panel
                isOpen={ this.state.showPanel }
                type={ PanelType.smallFluid }
                // tslint:disable-next-line:jsx-no-lambda
                onDismiss={ () => this.setState({ showPanel: false }) }
                headerText='Panel - Small, right-aligned, fixed'
                // isFooterAtBottom={true}
                //onRenderFooterContent
                hasCloseButton = {false}
                onRenderHeader={() => {
                  return (
                    <div>
                        <div hidden={_isEditMode} ><PrimaryButton iconProps={ { iconName: 'ChromeClose' } } onClick={ () => this.setState({ showPanel: false }) } >Close</PrimaryButton></div>
                        <div hidden={!_isEditMode} ><DefaultButton iconProps={ { iconName: 'ChromeClose' } } onClick={ () => this.setState({ showPanel: false }) } >Cancel</DefaultButton><span className={styles.paddingLeft10px} ><PrimaryButton iconProps={ { iconName: 'save' } } onClick={ () => this.props.save(this.state.stateMenuConfig) } >Save</PrimaryButton></span></div>
                      </div>
                  );
                }}
                >
                  {/* START mega menu content */}
                  <div className={styles.megaMenu}>
                    <div className={styles.container}>
                      
                      <AllCards cardContents={JSON.parse(this.state.stateMenuConfig).cards} isEditModetmp={_isEditMode} _addHeading={this._addHeading} _editHeading={this._editHeading} _addLink={this._addLink} _editLink={this._editLink} />
                      {/* <SingleCard cardContents={x}/> */}

                      <EditHeadingPanel cardContents={JSON.parse(this.state.stateMenuConfig).cards} headingIndex={this.state.editHeading.headingID} isNewItem={this.state.editHeading.isNewItem} _onCloseHeadingPanel={this._onCloseHeadingPanel} _headingSave={this._headingSave} />
                      <EditLinkPanel cardContents={JSON.parse(this.state.stateMenuConfig).cards} headingIndex={this.state.editLink.headingID} linkIndex={this.state.editLink.linkID} isNewItem={this.state.editLink.isNewItem} _onCloseLinkPanel={this._onCloseLinkPanel} _addLinkSave={this._addLinkSave} />
                    </div>
                  </div>
                  {/* END mega menu content */}
              </Panel>
              {/* <AllCards cardContents={JSON.parse(this.state.stateMenuConfig).cards} isEditModetmp={_isEditMode} _addHeading={this._addHeading} /> */}
      </div>
    );        
  }

  // @autobind
  // public _editLink(showLinkPanel:boolean, linkID: number, headingID: number, linkTitle: string, linkUrl: string): void {
  //   this.state.editLink.showLinkPanel = true;
  //   this.state.editLink.headingID = headingID;
  //   this.state.editLink.linkID = linkID;
  //   this.state.editLink.linkTitle = linkTitle;
  //   this.state.editLink.linkUrl = linkUrl;
    
  //   this.setState(this.state);
  // }

  public _headingSave(configOptions ,isNewItem:boolean, headingKey:number, headingValue:string) : void {
    // alert("method called" + headingValue + isNewItem + headingKey);
    var configOptionstmp = configOptions;
    var Card = { heading: headingValue, 
                    links :[{ iconName:"addFriend",
                        link:"https://spwestpros.blogspot.com",
                        name:"Sample link"}]};
          
            if(isNewItem)
            {
              configOptionstmp.push(Card);
            }
            else
            {
              configOptions[headingKey].heading = headingValue;
            }
    this.props.save(JSON.stringify(configOptions));
  }
  public _addLinkSave(isNewItem:boolean, headingKey:number, headingValue:string, linkKey:number, linkText:string, linkUrl:string, iconName: string) : void {
    alert("method called" + headingValue);
  }
  public _addLink(headingID: number): void {
    this.state.editLink.showLinkPanel = true;
    this.state.editLink.isNewItem = true;
    this.state.editLink.headingID = headingID;
    this.state.editLink.linkID = 0;
    this.state.editLink.linkTitle = "";
    this.state.editLink.linkUrl = "";
    this.setState(this.state);
  }
  public _editLink(headingID: number, linkID: number, iconName: string): void {
    this.state.editLink.showLinkPanel = true;
    this.state.editLink.isNewItem = false;
    this.state.editLink.headingID = headingID;
    this.state.editLink.linkID = linkID;
    this.state.editLink.iconName = iconName,  
    this.setState(this.state);
  }
  public _addHeading(): void {
    this.state.editHeading.isNewItem = true;
    this.state.editHeading.showHeadingPanel = true;
    this.state.editHeading.headingID = 0;
    this.state.editHeading.headingTitle = "";
    this.setState(this.state);
  }
  public _editHeading( headingID: number): void {
    this.state.editHeading.isNewItem = false;    
    this.state.editHeading.showHeadingPanel = true;
    this.state.editHeading.headingID = headingID;
    this.setState(this.state);
  }
  public _onCloseHeadingPanel(): void {
    this.state.editHeading.showHeadingPanel = false;
    this.setState(this.state);
  }
  public _onCloseLinkPanel(): void {
    this.state.editLink.showLinkPanel = false;
    this.setState(this.state);
  }
}
