import * as React from 'react';
import styles from './MegaMenu.module.scss';
import { IMegaMenuProps } from './IMegaMenuProps';
import { IMegaMenuState } from './IMegaMenuState';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { DefaultButton, CompoundButton, ActionButton, Button, IconButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { valid } from 'glamor';

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
        linkUrl: ""
      },
      };
    this._addHeading = this._addHeading.bind(this);
    this._editHeading = this._editHeading.bind(this);
    this._addLink = this._addLink.bind(this);
    this._onCloseHeadingPanel = this._onCloseHeadingPanel.bind(this) ;
    this._onCloseLinkPanel = this._onCloseLinkPanel.bind(this) ;
    this._headingSave = this._headingSave.bind(this)
    this._addLinkSave = this._addLinkSave.bind(this)
    
  }

  public render(): React.ReactElement<IMegaMenuProps> {
    var _isEditMode = this.props.isEditMode;
    var _isHeadingPanelOpen = this.state.editHeading.showHeadingPanel;
    var _isLinkPanelOpen = this.state.editLink.showLinkPanel

    class SingleHeader extends React.Component<{headingKey, name, isEditModetmp, _editHeading:(headingIndex:number) => void}> {
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <div className={`ms-Grid-row ${styles.hoverBorder}`}>
              <div className="ms-Grid-col ms-lg8">
                <h1 className={styles.heading}>{this.props.name}</h1>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'Edit' } } title='Edit' ariaLabel='Edit' onClick={() => this.props._editHeading(this.props.headingKey)}  />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'Cancel' } } title='Cancel' ariaLabel='Delete' />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'ChevronLeftSmall' } } title='Move left' ariaLabel='Move left'  />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'ChevronRightSmall' } } title='Move right' ariaLabel='Move right' />
              </div>
          </div>
          );
        }else{
          return <h1 className={styles.heading}>{this.props.name}</h1>;
        }
      }
    }

    class SingleLink extends React.Component<{url, iconName, name, isEditModetmp}> {
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <div className={`ms-Grid-row ${styles.hoverBorder}`}>
              <div className="ms-Grid-col ms-lg8">
               <ActionButton data-automation-id='test' href={this.props.url} target="_blank" iconProps={ { iconName: this.props.iconName } } disabled={ false } >{this.props.name}</ActionButton>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'Edit' } } title='Edit' ariaLabel='Edit'  />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'Cancel' } } title='Delete' ariaLabel='Delete' />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'ChevronUpSmall' } } title='Move Up' ariaLabel='Move Up'  />
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
                <IconButton iconProps={ { iconName: 'ChevronDownSmall' } } title='Move Down' ariaLabel='Move Down' />
              </div>
          </div>
          );
        }else{
          return <ActionButton data-automation-id='test' href={this.props.url} iconProps={ { iconName: this.props.iconName } } disabled={ false } >{this.props.name}</ActionButton>;
        }
      }
    }    

    class LinkGroup extends React.Component<{links,isEditModetmp}> {
      
      public render() {
        let allLinks = this.props.links;
        let allLinksInGroup = allLinks.map((link) =>
          // Correct! Key should be specified inside the array.
          <li><SingleLink name={link.name} url={link.link} iconName={link.iconName} isEditModetmp={this.props.isEditModetmp} /></li>
        );
      return (<ul className={`${styles.links}`}>{allLinksInGroup}</ul>);
      }
    }    

    class SingleCard extends React.Component<{headingKey, cardContents, isEditModetmp, _addLink:(headingIndex:number) => void, _editHeading:(headingIndex:number) => void}> {

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
              <SingleHeader headingKey={this.props.headingKey} name={this.props.cardContents.heading} isEditModetmp={this.props.isEditModetmp} _editHeading={this.props._editHeading} />
              <LinkGroup links={this.props.cardContents.links} isEditModetmp={this.props.isEditModetmp} />
              <ActionButton className={styles.redFont} iconProps={ { iconName: 'Add' }} text="Add a new link" onClick={() => this.props._addLink(this.props.headingKey)} />
            </div>);
        }
        else
        {
          return (
            <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">        
              <SingleHeader headingKey={this.props.headingKey} name={this.props.cardContents.heading} isEditModetmp={this.props.isEditModetmp} _editHeading={this.props._editHeading}/>
              <LinkGroup links={this.props.cardContents.links} isEditModetmp={this.props.isEditModetmp} />
            </div>);
        }

      }

    }    

    class AllCards extends React.Component<{cardContents,isEditModetmp, _addHeading:() => void, _editHeading:(headingIndex:number) => void, _addLink:(headingIndex:number) => void}> {
      constructor(props)
      {
        super(props)
        this.setState({});       
      }
      public render() {
        let cards = this.props.cardContents;
        let allCardsInContainer = cards.map((card, index) =>
          <SingleCard headingKey={index} cardContents={card} isEditModetmp={this.props.isEditModetmp} _addLink={this.props._addLink} _editHeading = {this.props._editHeading}/>
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

class EditHeadingPanel extends React.Component<{cardContents, isNewItem, headingIndex, _onCloseHeadingPanel: () => void, _headingSave(headingValue: string): void}, any> {
      public constructor(props: any) {
        super(props);
        if(this.props.isNewItem)
        {
          this.state = { headingValue : ""};
        }
        else
        {
          this.state = { headingValue : this.props.cardContents[this.props.headingIndex].heading};
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
        this.props._headingSave(this.state.headingValue);
      }
    
      @autobind
      private _onRenderFooterContent(): JSX.Element {
        
        return (
          <div>
            <PrimaryButton
              // onClick={ this.props._headingSave(this.state.headingValue) }
              onClick={this.handleClick}
              style={ { 'marginRight': '8px' } }
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
    class EditLinkPanel extends React.Component<{cardContents, isNewItem, headingIndex, linkIndex, _onCloseLinkPanel: () => void, _addLinkSave(headingValue: string): void},any> {
      public constructor(props: any) {
        super(props);
        if(this.props.isNewItem)
        {
          this.state = { linkText : "", linkUrl: ""};
        }
        else
        {
          // this.state = { headingValue : this.props.cardContents[this.props.headingIndex].heading};          
        }
        this.state = { headingValue : this.props.cardContents[this.props.headingIndex].heading};        
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(): void {
        this.props._addLinkSave(this.state.headingValue);
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
                            onGetErrorMessage = {(value) => value.length > 0
                              ? ''
                              : `This field is required.`}
                          />
                          <TextField label="Url"
                            required={ true }
                            prefix="https://"
                            placeholder='Enter Heading'
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
                      
                      <AllCards cardContents={JSON.parse(this.state.stateMenuConfig).cards} isEditModetmp={_isEditMode} _addHeading={this._addHeading} _editHeading={this._editHeading} _addLink={this._addLink} />
                      {/* <SingleCard cardContents={x}/> */}

                      <EditHeadingPanel cardContents={JSON.parse(this.state.stateMenuConfig).cards} headingIndex={this.state.editHeading.headingID} isNewItem={this.state.editHeading.isNewItem} _onCloseHeadingPanel={this._onCloseHeadingPanel} _headingSave={this._headingSave} />
                      <EditLinkPanel cardContents={JSON.parse(this.state.stateMenuConfig).cards} headingIndex={this.state.editLink.headingID} linkIndex={0} isNewItem={this.state.editLink.isNewItem} _onCloseLinkPanel={this._onCloseLinkPanel} _addLinkSave={this._headingSave} />
                    </div>
                  </div>
                  {/* END mega menu content */}
              </Panel>
              {/* <AllCards cardContents={JSON.parse(this.state.stateMenuConfig).cards} isEditModetmp={_isEditMode} _addHeading={this._addHeading} /> */}
      </div>
    );        
  }

  @autobind
  public _editLink(showLinkPanel:boolean, linkID: number, headingID: number, linkTitle: string, linkUrl: string): void {
    this.state.editLink.showLinkPanel = true;
    this.state.editLink.headingID = headingID;
    this.state.editLink.linkID = linkID;
    this.state.editLink.linkTitle = linkTitle;
    this.state.editLink.linkUrl = linkUrl;
    
    this.setState(this.state);
  }

  public _headingSave(headingValue:string) : void {
    // alert();
    alert("method called" + headingValue);
  }
  public _addLinkSave(headingValue:string) : void {
    // alert();
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
