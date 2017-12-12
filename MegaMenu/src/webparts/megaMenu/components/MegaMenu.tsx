import * as React from 'react';
import styles from './MegaMenu.module.scss';
import { IMegaMenuProps } from './IMegaMenuProps';
import { IMegaMenuState } from './IMegaMenuState';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { DefaultButton, CompoundButton, ActionButton, Button, IconButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import {Checkbox, ICheckboxStyles, ICheckboxProps} from 'office-ui-fabric-react/lib/Checkbox';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { valid, link, checked } from 'glamor';

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
        openInNewTab:false,
        iconName: ""
      }
      };
    this._addHeading = this._addHeading.bind(this);
    this._editHeading = this._editHeading.bind(this);
    this._addLink = this._addLink.bind(this);
    this._editLink = this._editLink.bind(this);
    
    this._onCloseHeadingPanel = this._onCloseHeadingPanel.bind(this) ;
    this._onCloseLinkPanel = this._onCloseLinkPanel.bind(this) ;

    this._headingSave = this._headingSave.bind(this);
    this._addLinkSave = this._addLinkSave.bind(this);
    
    this._moveHeading = this._moveHeading.bind(this);
    this._moveLink = this._moveLink.bind(this);

    this._deleteHeading = this._deleteHeading.bind(this);
    this._deleteLink = this._deleteLink.bind(this);

    this._closeMenuPanel = this._closeMenuPanel.bind(this);
    this._cancelMenuPanel = this._cancelMenuPanel.bind(this);
    this._saveMenuPanel = this._saveMenuPanel.bind(this);
  }
  public render(): React.ReactElement<IMegaMenuProps> {
    var _isEditMode = this.props.isEditMode;
    var _isHeadingPanelOpen = this.state.editHeading.showHeadingPanel;
    var _isLinkPanelOpen = this.state.editLink.showLinkPanel;

    class SingleHeader extends React.Component<{cardContents, headingKey, isEditModetmp, _editHeading:(headingIndex:number) => void, _moveHeading:(configOptions, moveToLeft: boolean, headingIndex:number) => void, _deleteHeading:(configOptions, headingIndex:number) => void}> {
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <div className={`ms-Grid-row ${styles.hoverBorder}`}>
              <div className="ms-Grid-col ms-lg8">
                <h1 className={styles.heading}>{this.props.cardContents.cards[this.props.headingKey].heading}</h1>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'Edit' } } title='Edit' ariaLabel='Edit' onClick={() => this.props._editHeading(this.props.headingKey)}  />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'Cancel' } } title='Delete' ariaLabel='Delete' onClick={() => this.props._deleteHeading(this.props.cardContents, this.props.headingKey)}/>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'ChevronLeftSmall' } } title='Move left' ariaLabel='Move left' onClick={() => this.props._moveHeading(this.props.cardContents, true,this.props.headingKey)}  disabled={(this.props.headingKey == 0 ? true : false)}/>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'ChevronRightSmall' } } title='Move right' ariaLabel='Move right' onClick={() => this.props._moveHeading(this.props.cardContents, false, this.props.headingKey)}  disabled={this.props.headingKey >= this.props.cardContents.cards.length - 1 ? true : false}/>
              </div>
          </div>
          );
        }else{
          return <h1 className={styles.heading}>{this.props.cardContents.cards[this.props.headingKey].heading}</h1>;
        }
      }
    }

    class SingleLink extends React.Component<{cardContents, url, iconName, name, openInNewTab, isEditModetmp, headingKey, linkKey, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void, _moveLink:(cardContents, moveDown:boolean,headingIndex:number, linkIndex:number)=> void, _deleteLink:(cardContents, headingIndex:number, linkIndex:number)=> void}> {
      public constructor(props: any) {
        super(props);
        this.handleSaveLinkClick = this.handleSaveLinkClick.bind(this);
        this.handleMoveLinkClick = this.handleMoveLinkClick.bind(this);
        this.handleDeleteLinkClick = this.handleDeleteLinkClick.bind(this);        
      }
      public handleSaveLinkClick(headkingKey:number, linkKey:number, iconName:string): void {
        this.props._editLink(headkingKey,linkKey, iconName);
      }
      public handleMoveLinkClick(cardContents, moveDown:boolean, headkingKey:number, linkKey:number): void {
        this.props._moveLink(cardContents,moveDown,headkingKey,linkKey);
      }
      public handleDeleteLinkClick(headkingKey:number, linkKey:number): void {
        this.props._deleteLink(this.props.cardContents, headkingKey,linkKey);
      }
      public render() {
        if(this.props.isEditModetmp)
        {
          //all links open in new tab in edit mode.
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
                <IconButton iconProps={ { iconName: 'Cancel' } } title='Delete' ariaLabel='Delete'  onClick={() => this.handleDeleteLinkClick(this.props.headingKey, this.props.linkKey)} />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'ChevronUpSmall' } } title='Move Up' ariaLabel='Move Up' disabled={(this.props.linkKey == 0 ? true : false)} onClick={() => this.handleMoveLinkClick(this.props.cardContents,false, this.props.headingKey, this.props.linkKey)} />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'ChevronDownSmall' } } title='Move Down' ariaLabel='Move Down' disabled={this.props.linkKey == this.props.cardContents.cards[this.props.headingKey].links.length-1 ? true : false}  onClick={() => this.handleMoveLinkClick(this.props.cardContents,true, this.props.headingKey, this.props.linkKey)}/>
              </div>
          </div>
          );
        }else{
          if(this.props.openInNewTab)
          {
            return <ActionButton data-automation-id='test' href={this.props.url} target="_blank" iconProps={ { iconName: this.props.iconName } } disabled={ false } >{this.props.name}</ActionButton>;
          }
          else
          {
            return <ActionButton data-automation-id='test' href={this.props.url} target="_self"  iconProps={ { iconName: this.props.iconName } } disabled={ false } >{this.props.name}</ActionButton>;
          }
          
        }
      }
    }    

    class LinkGroup extends React.Component<{ cardContents,isEditModetmp, headingKey,  _addLink:(headingIndex:number) => void, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void, _moveLink:(cardContents, moveDown:boolean,headingIndex:number, linkIndex:number)=> void, _deleteLink:(cardContents, headingIndex:number, linkIndex:number)=> void}> {
      
      public render() {
        let allLinks = this.props.cardContents.cards[this.props.headingKey].links;
        let allLinksInGroup = allLinks.map((link, index) =>
          // Correct! Key should be specified inside the array.
          <li key={index}><SingleLink cardContents={this.props.cardContents} headingKey={this.props.headingKey} linkKey={index} name={link.name} url={link.link} openInNewTab={link.openInNewTab} iconName={link.iconName} isEditModetmp={this.props.isEditModetmp} _editLink={this.props._editLink} _moveLink={this.props._moveLink} _deleteLink={this.props._deleteLink}/></li>
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

    class SingleCard extends React.Component<{headingKey, cardContents, isEditModetmp, _addLink:(headingIndex:number) => void, _editHeading:(headingIndex:number) => void, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void, _moveHeading:(configOptions, moveToLeft: boolean, headingIndex:number) => void, _moveLink:(cardContents, moveDown:boolean,headingIndex:number, linkIndex:number)=> void, _deleteHeading:(cardContents, linkIndex:number)=> void, _deleteLink:(cardContents, headingIndex:number, linkIndex:number)=> void}> {

      constructor(props)
      {
        super(props);
      }
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <span>        
              <SingleHeader cardContents={this.props.cardContents} headingKey={this.props.headingKey} isEditModetmp={this.props.isEditModetmp} _editHeading={this.props._editHeading} _moveHeading={this.props._moveHeading} _deleteHeading={this.props._deleteHeading} />
              <LinkGroup headingKey={this.props.headingKey} cardContents={this.props.cardContents} isEditModetmp={this.props.isEditModetmp} _editLink={this.props._editLink} _addLink={this.props._addLink} _moveLink={this.props._moveLink} _deleteLink={this.props._deleteLink}/>
            </span>);
        }
        else
        {
          return (
            <span >        
              <SingleHeader cardContents={this.props.cardContents} headingKey={this.props.headingKey} isEditModetmp={this.props.isEditModetmp} _editHeading={this.props._editHeading} _moveHeading={this.props._moveHeading} _deleteHeading={this.props._deleteHeading}/>
              <LinkGroup headingKey={this.props.headingKey} cardContents={this.props.cardContents} isEditModetmp={this.props.isEditModetmp} _editLink={this.props._editLink} _addLink={this.props._addLink} _moveLink={this.props._moveLink} _deleteLink={this.props._deleteLink}/>
            </span>);
        }

      }

    }    

    class AllCards extends React.Component<{baseCardContents, cardContents,isEditModetmp, _addHeading:() => void, _editHeading:(headingIndex:number) => void, _addLink:(headingIndex:number) => void, _editLink:(headingIndex:number, linkIndex:number, iconName: string) => void, _moveHeading:(configOptions, moveToLeft: boolean, headingIndex:number) => void, _deleteHeading:(configOptions, headingIndex:number) => void, _moveLink:(cardContents, moveDown:boolean,headingIndex:number, linkIndex:number)=> void, _deleteLink:(cardContents, headingIndex:number, linkIndex:number)=> void,_closeMenuPanel:()=>void, _cancelEditMenu:(baseCardContents)=> void, _savelEditMenu:(cardContents)=> void},{SavePropsshowDialog:boolean,
      IgnorePropsshowDialog:boolean,
      exportConfigIsPanelOpen:boolean,
      exportConfigIsImport:boolean,
      txtCardContents: string}> {
      constructor(props)
      {
        super(props);
        this.state = {
          SavePropsshowDialog:false,
          IgnorePropsshowDialog:false,
          exportConfigIsPanelOpen:false,
          exportConfigIsImport:false,
          txtCardContents:""
        };
      }
      @autobind
      private _onRenderFooterContentExportImport(): JSX.Element {
        if(!this.state.exportConfigIsImport)
        {
          return (<DefaultButton onClick={ () => {
            this.setState({"exportConfigIsPanelOpen":false});}} > Done </DefaultButton>
          );
        }else
        {
          return(<span>
            <PrimaryButton onClick={() => {this.props._savelEditMenu(JSON.parse(this.state.txtCardContents)); this.setState({"exportConfigIsPanelOpen":false}); }  } style={ { 'marginRight': '8px' } } >
            Import
            </PrimaryButton>
            <DefaultButton onClick={ () => {this.setState({"exportConfigIsPanelOpen":false}); }} > Cancel </DefaultButton>
          </span>);
        }
      }

      public render() {
        let cardContents = this.props.cardContents;
        let Col1 = [];
        let Col2 = [];
        let Col3 = [];
        cardContents.cards.forEach((card, index) => {
   
        switch(index % 3) {
          case 0:
            Col1.push(<SingleCard key={index} headingKey={index} cardContents={cardContents} isEditModetmp={this.props.isEditModetmp} _addLink={this.props._addLink} _editHeading = {this.props._editHeading} _editLink={this.props._editLink} _moveHeading={this.props._moveHeading}  _moveLink={this.props._moveLink} _deleteHeading={this.props._deleteHeading} _deleteLink={this.props._deleteLink} />);
            break;
          case 1:
            Col2.push(<SingleCard key={index} headingKey={index} cardContents={cardContents} isEditModetmp={this.props.isEditModetmp} _addLink={this.props._addLink} _editHeading = {this.props._editHeading} _editLink={this.props._editLink} _moveHeading={this.props._moveHeading}  _moveLink={this.props._moveLink} _deleteHeading={this.props._deleteHeading} _deleteLink={this.props._deleteLink} />);
            break;
          case 2:
            Col3.push(<SingleCard key={index} headingKey={index} cardContents={cardContents} isEditModetmp={this.props.isEditModetmp} _addLink={this.props._addLink} _editHeading = {this.props._editHeading} _editLink={this.props._editLink} _moveHeading={this.props._moveHeading}  _moveLink={this.props._moveLink} _deleteHeading={this.props._deleteHeading} _deleteLink={this.props._deleteLink} />);
          break;
          default:break;          
          }
        });
        if(this.props.isEditModetmp)
        {
          return (<span>
            <DefaultButton iconProps={ { iconName: 'ChromeClose' } } onClick={()=>{this.setState({IgnorePropsshowDialog:true});}} >Cancel</DefaultButton><span className={styles.paddingLeft10px} >
            <PrimaryButton iconProps={ { iconName: 'save' } } onClick={ () => {this.setState({SavePropsshowDialog:true});} } >Save</PrimaryButton></span>
            <div className={`ms-Grid-row  ${styles.row}`}>
            <div className="ms-Grid-col ms-lg7"></div>
            <div className="ms-Grid-col ms-lg5"> 
              <DefaultButton iconProps={ { iconName: 'PageCheckedOut' } } onClick={()=>{this.setState({"exportConfigIsPanelOpen":true,"exportConfigIsImport":false});}} >Export</DefaultButton>
              <DefaultButton iconProps={ { iconName: 'PageCheckedin' } } onClick={()=>{ this.setState({"exportConfigIsPanelOpen":true,"exportConfigIsImport":true});}} >Import</DefaultButton>
            </div>
            </div>
          <div className={`ms-Grid-row  ${styles.row}`}>
            {/* {allCardsInContainer} */}
            <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">{Col1}</div>
            <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">{Col2}</div>
            <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">{Col3}</div>
            <PrimaryButton iconProps={ { iconName: 'Add' }} onClick={ this.props._addHeading} >
              Add a new heading..
            </PrimaryButton>
                {/* Cancel confirmation dialog */}
                      <Dialog
                          hidden={ !this.state.IgnorePropsshowDialog }
                          onDismiss={ () => {this.setState({IgnorePropsshowDialog:false});} }
                          dialogContentProps={ {
                            type: DialogType.normal,
                            title: 'Cancel confirmation',
                            subText: 'By clicking "OK" all of your current changes will be lost.'
                          } }
                          modalProps={ {
                            isBlocking: true,
                            containerClassName: 'ms-dialogMainOverride'
                          } }
                        >
                          <DialogFooter>
                            <PrimaryButton onClick={ this._YesCancelDialog} text='OK' />
                            <DefaultButton onClick={ ()=> {this.setState({IgnorePropsshowDialog:false});} } text='Cancel' />
                          </DialogFooter>
                        </Dialog>
                        {/* Save confirmation dialog */}
                        <Dialog
                          hidden={ !this.state.SavePropsshowDialog }
                          onDismiss={ () => {this.setState({SavePropsshowDialog:false});} }
                          dialogContentProps={ {
                            type: DialogType.normal,
                            title: 'Save confirmation',
                            subText: 'Are you sure you want to save current changes?'
                          } }
                          modalProps={ {
                            isBlocking: true,
                            containerClassName: 'ms-dialogMainOverride'
                          } }
                        >
                          <DialogFooter>
                            <PrimaryButton onClick={ this._YesSaveEditMenu} text='Save' />
                            <DefaultButton onClick={ ()=> {this.setState({SavePropsshowDialog:false});} } text='Cancel' />
                          </DialogFooter>
                        </Dialog>
                        <Panel
                            isOpen={ this.state.exportConfigIsPanelOpen }
                            type={ PanelType.smallFixedFar }
                            headerText='Export/ Import by copy pasting text from this box'
                            closeButtonAriaLabel='Close'
                            onRenderFooterContent={ this._onRenderFooterContentExportImport }
                            >
                            <div hidden={this.state.exportConfigIsImport}>
                            <TextField label="Export text" value={JSON.stringify(this.props.cardContents)}
                            multiline
                            rows={ 8 }
                            required={true}
                            onGetErrorMessage = {(value) => (value.length > 0 && JSON.parse(value))
                              ? ''
                              : `This field is required.`}
                            onChanged={(value: string) => { this.setState({txtCardContents : value});} }                                                        
                            /></div>
                            <div hidden={!this.state.exportConfigIsImport}>
                            <TextField label="Import text" hidden={!this.state.exportConfigIsImport} value={this.state.txtCardContents}
                            multiline
                            rows={ 8 }
                            required={true}
                            onGetErrorMessage = {(value) => (value.length > 0 && JSON.parse(value))
                              ? ''
                              : `This field is required.`}
                            onChanged={(value: string) => { this.setState({txtCardContents : value});} }                                                        
                            /></div>
                            <div hidden={this.state.exportConfigIsImport}>Copy text from this textbox to any oher page</div>
                            <div hidden={!this.state.exportConfigIsImport}>Paste text in this textbox and click Import</div>
                        </Panel>
                  </div></span>);
        }
        else
        {
          return (<span>
          <PrimaryButton iconProps={ { iconName: 'ChromeClose' } } onClick={this._closeMenu} >Close</PrimaryButton>
          <div className={`ms-Grid-row  ${styles.row}`}>
              <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">{Col1}</div>
              <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">{Col2}</div>
              <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">{Col3}</div>
            </div></span>);
        }
      }
    @autobind // Readonly mode - just close the dialog
    public _closeMenu():void{
      this.props._closeMenuPanel();
    }
    // @autobind //Don't do anything, keep editing
    // public _cancelEditMenu(): void {
    //   this.props._cancelEditMenu();
    // }
    @autobind    //Save current changes
    public _YesSaveEditMenu(): void {
      this.setState({SavePropsshowDialog:false});      
      this.props._savelEditMenu(this.props.cardContents);// Send current state    
    }

    @autobind    //Ignore current changes
    public _YesCancelDialog(): void {
      this.setState({IgnorePropsshowDialog:false});// Send default props to reset
      this.props._cancelEditMenu(this.props.baseCardContents);
    }

    // public _cancelChangesSuccess(cardContents): void {
    //   // this.props.save(JSON.stringify(cardContents));
    //   this.setState({stateMenuConfig: JSON.stringify(cardContents)})
    //   // this.state.SaveProps.showDialog = false;    
    // }
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
          this.state = {  headingValue : this.props.cardContents.cards[this.props.headingIndex].heading,
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
                      headerText='Edit Heading'
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

      public handleClick(): void {
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
    class EditLinkPanel extends React.Component<{cardContents, isNewItem, headingIndex, linkIndex, _onCloseLinkPanel: () => void, _addLinkSave(configOptions, isNewItem:boolean, headingKey:number, headingValue:string, linkKey:number, linkText:string, linkUrl:string, iconName: string, openInNewTab: boolean): void},any> {
      public constructor(props: any) {
        super(props);
        if(this.props.isNewItem)
        {
          this.state = {  headingValue  : this.props.cardContents.cards[this.props.headingIndex].heading,
                          linkText : "Home", 
                          linkUrl: "https://url",
                          iconName:"Link",
                          openInNewTab:false};
        }
        else
        {
          this.state = { 
                        headingValue  : this.props.cardContents.cards[this.props.headingIndex].heading,
                        linkText      : this.props.cardContents.cards[this.props.headingIndex].links[this.props.linkIndex].name,
                        linkUrl       : this.props.cardContents.cards[this.props.headingIndex].links[this.props.linkIndex].link,
                        iconName      : this.props.cardContents.cards[this.props.headingIndex].links[this.props.linkIndex].iconName,
                        openInNewTab  : this.props.cardContents.cards[this.props.headingIndex].links[this.props.linkIndex].openInNewTab
          };
        }

        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(): void {
        //isNewItem:boolean, headingKey:number, headingValue:string, linkKey:number, linkText:string, linkUrl:string, iconName: string
        this.props._addLinkSave(this.props.cardContents, this.props.isNewItem, this.props.headingIndex, this.state.headingValue, this.props.linkIndex, this.state.linkText, this.state.linkUrl, this.state.iconName, this.state.openInNewTab);
      }
      @autobind
      private _onControlledCheckboxChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
        this.setState({ openInNewTab: checked! });
      }
      public render() {
        return (<div className={`ms-Grid-row  ${styles.row}`}>
                    <Panel
                      isOpen={ _isLinkPanelOpen }
                      type={ PanelType.smallFixedFar }
                      onDismiss={ this.props._onCloseLinkPanel }
                      headerText='Edit link'
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
                          <Checkbox
                            label='Open in new tab'
                            // onChange={ (checked) => {this.setState({'openInNewTab': checked})} }
                            onChange={ this._onControlledCheckboxChange }                            
                            checked={this.state.openInNewTab}
                            ariaDescribedBy={ 'descriptionID' }
                          />
                          <TextField label="Icon"
                            required={ false }
                            placeholder='Type an icon'
                            value={this.state.iconName}
                            onChanged={(value: string) => { this.setState({iconName : value});} }                            
                          />
                          <div><a href="https://developer.microsoft.com/en-us/fabric#/styles/icons" target="_blank">Find an icon</a></div>
                    </div>
                    </Panel>
                </div>);
      }
    
      @autobind
      private _onRenderFooterContentLink(): JSX.Element {
        return (
          <div>
            <PrimaryButton
              onClick={ this.handleClick }
              style={ { 'marginRight': '8px' } }
              disabled = {(this.state.linkText == "" || this.state.linkUrl == "") ? true : false}
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
            <PrimaryButton className={styles.megaButton} onClick={ () => this.setState({ showPanel: true }) } ><div className={styles.burgerBar} ></div></PrimaryButton>
            <Panel
                isOpen={ this.state.showPanel }
                type={ PanelType.smallFluid }
                onDismiss={ () => this.setState({ showPanel: false }) }
                hasCloseButton = {false}
                >
                  {/* START mega menu content */}
                  <div className={styles.megaMenu}>
                    <div className={styles.container}>
                      <AllCards baseCardContents={JSON.parse(this.props.menuConfig)} cardContents={JSON.parse(this.state.stateMenuConfig)} isEditModetmp={_isEditMode} _addHeading={this._addHeading} _editHeading={this._editHeading} _addLink={this._addLink} _editLink={this._editLink} _moveHeading={this._moveHeading} _moveLink={this._moveLink} _deleteHeading={this._deleteHeading} _deleteLink={this._deleteLink} _closeMenuPanel={this._closeMenuPanel} _cancelEditMenu={this._cancelMenuPanel} _savelEditMenu={this._saveMenuPanel}/>
                      <EditHeadingPanel cardContents={JSON.parse(this.state.stateMenuConfig)} headingIndex={this.state.editHeading.headingID} isNewItem={this.state.editHeading.isNewItem} _onCloseHeadingPanel={this._onCloseHeadingPanel} _headingSave={this._headingSave} />
                      <EditLinkPanel cardContents={JSON.parse(this.state.stateMenuConfig)} headingIndex={this.state.editLink.headingID} linkIndex={this.state.editLink.linkID} isNewItem={this.state.editLink.isNewItem} _onCloseLinkPanel={this._onCloseLinkPanel} _addLinkSave={this._addLinkSave} />
                    </div>
                  </div>
                  {/* END mega menu content */}
              </Panel>

      </div>
    );        
  }
  public _moveHeading(configOptions,moveToLeft: boolean, headingKey:number ) :void{
    var tmpHeadValue = headingKey;
    if(!moveToLeft)
    {
      tmpHeadValue+= 1;
    }
    var tmpHead = configOptions.cards[tmpHeadValue];
    configOptions.cards[tmpHeadValue] =  configOptions.cards[tmpHeadValue - 1];
    configOptions.cards[tmpHeadValue - 1] = tmpHead;
    
    this.setState({ stateMenuConfig : JSON.stringify(configOptions)});

  }
  public _moveLink(configOptions, moveDown: boolean, headingKey:number, linkKey:number ) :void{
    var tmpLinkValue = linkKey;
    if(moveDown)
    {
      tmpLinkValue+= 1;
    }
    var tmpLink = configOptions.cards[headingKey].links[tmpLinkValue];
    configOptions.cards[headingKey].links[tmpLinkValue] = configOptions.cards[headingKey].links[tmpLinkValue - 1];
    configOptions.cards[headingKey].links[tmpLinkValue - 1] = tmpLink;
    
    this.setState({ stateMenuConfig : JSON.stringify(configOptions)});

  }
  public _deleteHeading(configOptions, headingKey:number ) :void{
    configOptions.cards.splice(headingKey,1);
    this.setState({ stateMenuConfig : JSON.stringify(configOptions)});

  }
  public _deleteLink(configOptions, headingKey:number, linkKey:number ) :void{
    configOptions.cards[headingKey].links.splice(linkKey,1);    
    this.setState({ stateMenuConfig : JSON.stringify(configOptions)});

  }
  public _headingSave(configOptions ,isNewItem:boolean, headingKey:number, headingValue:string) : void {
    var configOptionstmp = configOptions;
    var Card = { heading: headingValue, 
                    links :[{ iconName:"addFriend",
                        link:"https://spwestpros.blogspot.com",
                        name:"Sample link"}]};
          
            if(isNewItem)
            {
              configOptionstmp.cards.push(Card);
            }
            else
            {
              configOptions.cards[headingKey].heading = headingValue;
            }
    this.state.editHeading.showHeadingPanel = false;
    this.setState({ stateMenuConfig : JSON.stringify(configOptions)});

  }
  public _addLinkSave(configOptions, isNewItem:boolean, headingKey:number, headingValue:string, linkKey:number, linkText:string, linkUrl:string, iconName: string, openInNewTab: boolean) : void {
    var configOptionstmp = configOptions;
    var link = {  'name':     linkText,
                  'iconName': iconName,
                  'link':     linkUrl,
                  'openInNewTab': openInNewTab};
            if(isNewItem)
            {
              configOptionstmp.cards[headingKey].links.push(link);
            }
            else
            {
              configOptions.cards[headingKey].heading = headingValue;
              configOptionstmp.cards[headingKey].links[linkKey] = link;
            }
    this.state.editLink.showLinkPanel = false;
    this.setState({ stateMenuConfig : JSON.stringify(configOptions)});

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

    // this._showSaveDialog = this._showSaveDialog.bind(this);
    // this._saveChangesSuccess = this._saveChangesSuccess.bind(this);
    // this._cancelChangesSuccess = this._cancelChangesSuccess.bind(this);
    public _closeMenuPanel(): void {
      this.setState({showPanel:false});
    }
    public _cancelMenuPanel(baseCardContents): void {
      this.setState({showPanel:false, stateMenuConfig: JSON.stringify(baseCardContents)});
    }
    public _saveMenuPanel(cardContents): void {
      this.setState({showPanel:false});
      // this.state.stateMenuConfig
      this.setState({stateMenuConfig:JSON.stringify(cardContents)});
      this.props.save(JSON.stringify(cardContents));
      this.render();
    }
  
}
