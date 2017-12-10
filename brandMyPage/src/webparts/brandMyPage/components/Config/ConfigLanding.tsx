import * as React from 'react';
import styles from './IConfigLanding.module.scss';
import { IConfigLandingProps } from './IConfigLandingProps';
import { IConfigLandingState } from './IConfigLandingState';
import { escape } from '@microsoft/sp-lodash-subset';
// import { Fabric }               from 'office-ui-fabric-reacgulpt/lib/Fabric';

import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize, IPivotItemProps } from 'office-ui-fabric-react/lib/Pivot';
import { Checkbox, ICheckboxStyles, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';

import HideUnhide from './../HideUnhide/HideUnhide';
import { IHideUnhideProps } from './../HideUnhide/IHideUnhideProps';
import { IHideUnhideState } from './../HideUnhide/IHideUnhideState';

import { IBrandMyPageWebPartDefaultProps } from "./../../IBrandMyPageWebPartDefaultProps";

import 'jQuery';
declare var $;
class ConfigCustomizeMasterTheme extends React.Component<{config, _applyChanges: (configTypeName, configOptions) => void},{stateConfig, hideThemeDialog}>
{
  constructor(props)
  {
    super(props);
    this.state = {stateConfig : this.props.config, hideThemeDialog: true};
      this._applyThemeDialog = this._applyThemeDialog.bind(this);
      this._showThemeDialog = this._showThemeDialog.bind(this);
  }
  private _showThemeDialog() {
    this.setState({ hideThemeDialog: false });
  }
  private _applyThemeDialog(customized : boolean) {
    if(customized)
    {
      this.state.stateConfig.isCustomized = true;
    }
    else
    {
      this.state.stateConfig.isCustomized = false;
    }
    this.setState(this.state);
    this.setState({ hideThemeDialog: true });
    this.props._applyChanges("masterTheme",this.state.stateConfig);
  }
  public render()
  {
    return(<div>
      <DefaultButton description='Master theme' onClick={this._showThemeDialog} text='Master theme' iconProps={{ iconName: "Color" }} />
      <Panel
      isOpen={!this.state.hideThemeDialog}
      type={PanelType.medium}
      headerText='Customize - Master theme'
      isFooterAtBottom={true}
      onRenderFooterContent={() => {
        return (
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><PrimaryButton onClick={() => {this._applyThemeDialog(true);}} text='Apply' iconProps={{ iconName: 'Accept' }} /></div>
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><DefaultButton disabled={!this.state.stateConfig.isCustomized} className="ms-bgColor-orangeLighter" onClick={() => this._applyThemeDialog(false)} text='Disable theme' iconProps={{ iconName: 'Cancel' }} /></div>
            </div></div>
        );
      }}
    >
      <span>
      <h3>Add background color to Title bar and Quicklaunch</h3>
      <ColorPicker color={this.state.stateConfig.backgroundColor} onColorChanged={color => { this.state.stateConfig.backgroundColor = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
      </span>
    </Panel></div>
    );
  }
}
class ConfigCustomizeTopNavTheme extends React.Component<{config, _applyChanges: (configTypeName, configOptions) => void},{stateConfig, hideThemeDialog}>
{
  constructor(props)
  {
    super(props);
    this.state = {stateConfig : this.props.config, hideThemeDialog: true};
      this._applyThemeDialog = this._applyThemeDialog.bind(this);
      this._showThemeDialog = this._showThemeDialog.bind(this);
  }
  private _showThemeDialog() {
    this.setState({ hideThemeDialog: false });
  }
  private _applyThemeDialog(customized : boolean) {
    if(customized)
    {
      this.state.stateConfig.isCustomized = true;
    }
    else
    {
      this.state.stateConfig.isCustomized = false;
    }
    this.setState(this.state);
    this.setState({ hideThemeDialog: true });
    this.props._applyChanges("topNav",this.state.stateConfig);
  }
  public render()
  {
    return(<div>
      <DefaultButton description='Top navigation' onClick={this._showThemeDialog} text='Top navigation' iconProps={{ iconName: "Color" }} />
      <Panel
      isOpen={!this.state.hideThemeDialog}
      type={PanelType.medium}
      headerText='Customize - Top navigation'
      isFooterAtBottom={true}
      onRenderFooterContent={() => {
        return (
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><PrimaryButton onClick={() => {this._applyThemeDialog(true);}} text='Apply' iconProps={{ iconName: 'Accept' }} /></div>
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><DefaultButton disabled={!this.state.stateConfig.isCustomized} className="ms-bgColor-orangeLighter" onClick={() => this._applyThemeDialog(false)} text='Disable theme' iconProps={{ iconName: 'Cancel' }} /></div>
            </div></div>
        );
      }}
    >
      <span>
        <Pivot>
          <PivotItem linkText='Color' itemKey="0">
            <ColorPicker color={this.state.stateConfig.color} onColorChanged={color => { this.state.stateConfig.color = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
          <PivotItem linkText='Hover color' itemKey="1">
            <ColorPicker color={this.state.stateConfig.hoverColor} onColorChanged={color => { this.state.stateConfig.hoverColor = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
          <PivotItem linkText='Background color' itemKey="2">
            <ColorPicker color={this.state.stateConfig.backgroundColor} onColorChanged={color => { this.state.stateConfig.backgroundColor = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
          <PivotItem linkText='Background hover color' itemKey="3">
            <ColorPicker color={this.state.stateConfig.hoverBackgroundColor} onColorChanged={color => { this.state.stateConfig.hoverBackgroundColor = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
        </Pivot>
      </span>
    </Panel></div>
    );
  }
}
class ConfigCustomizeQuickLaunchTheme extends React.Component<{config, _applyChanges: (configTypeName, configOptions) => void},{stateConfig, hideThemeDialog}>
{
  constructor(props)
  {
    super(props);
    this.state = {stateConfig : this.props.config, hideThemeDialog: true};
      this._applyThemeDialog = this._applyThemeDialog.bind(this);
      this._showThemeDialog = this._showThemeDialog.bind(this);
  }
  private _showThemeDialog() {
    this.setState({ hideThemeDialog: false });
  }
  private _applyThemeDialog(customized : boolean) {
    if(customized)
    {
      this.state.stateConfig.isCustomized = true;
    }
    else
    {
      this.state.stateConfig.isCustomized = false;
    }
    this.setState(this.state);
    this.setState({ hideThemeDialog: true });
    this.props._applyChanges("quickLaunch",this.state.stateConfig);
  }
  public render()
  {
    return(<div>
      <DefaultButton description='Quick launch' onClick={this._showThemeDialog} text='Quick launch' iconProps={{ iconName: "Color" }} />
      <Panel
      isOpen={!this.state.hideThemeDialog}
      type={PanelType.medium}
      headerText='Customize - Quick launch'
      isFooterAtBottom={true}
      onRenderFooterContent={() => {
        return (
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><PrimaryButton onClick={() => {this._applyThemeDialog(true);}} text='Apply' iconProps={{ iconName: 'Accept' }} /></div>
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><DefaultButton disabled={!this.state.stateConfig.isCustomized} className="ms-bgColor-orangeLighter" onClick={() => this._applyThemeDialog(false)} text='Disable theme' iconProps={{ iconName: 'Cancel' }} /></div>
            </div></div>
        );
      }}
    >
      <span>
        <Pivot>
          <PivotItem linkText='Color' itemKey="0">
            <ColorPicker color={this.state.stateConfig.color} onColorChanged={color => { this.state.stateConfig.color = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
          <PivotItem linkText='Hover color' itemKey="1">
            <ColorPicker color={this.state.stateConfig.hoverColor} onColorChanged={color => { this.state.stateConfig.hoverColor = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
          <PivotItem linkText='Background color' itemKey="2">
            <ColorPicker color={this.state.stateConfig.backgroundColor} onColorChanged={color => { this.state.stateConfig.backgroundColor = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
          <PivotItem linkText='Background hover color' itemKey="3">
            <ColorPicker color={this.state.stateConfig.hoverBackgroundColor} onColorChanged={color => { this.state.stateConfig.hoverBackgroundColor = color; if (!this.state.stateConfig.isCustomized) { this.state.stateConfig.isCustomized = true; } this.setState(this.state); }} />
          </PivotItem>
        </Pivot>

      </span>
    </Panel></div>
    );
  }
}
class ConfigCustomizeSiteTitleTheme extends React.Component<{config, _applyChanges: (configTypeName, configOptions) => void},{stateConfig, hideThemeDialog}>
{
  constructor(props)
  {
    super(props);
    this.state = {stateConfig : this.props.config, hideThemeDialog: true};
      this._applyThemeDialog = this._applyThemeDialog.bind(this);
      this._showThemeDialog = this._showThemeDialog.bind(this);
  }
  private _showThemeDialog() {
    this.setState({ hideThemeDialog: false });
  }
  private _applyThemeDialog(fontCustomized : boolean,colorCustomized : boolean ) {
    if(fontCustomized)
    {
      this.state.stateConfig.isFontCustomized = true;
    }
    else
    {
      this.state.stateConfig.isFontCustomized = false;
    }
    if(colorCustomized)
    {
      this.state.stateConfig.isColorCustomized = true;
    }
    else
    {
      this.state.stateConfig.isColorCustomized = false;
    }    
    this.setState(this.state);
    this.setState({ hideThemeDialog: true });
    this.props._applyChanges("SiteTitle",this.state.stateConfig);
  }
  public render()
  {
    return(<div>
      <DefaultButton description='Site title' onClick={this._showThemeDialog} text='Site title' iconProps={{ iconName: "Color" }} />
      <Panel
      isOpen={!this.state.hideThemeDialog}
      type={PanelType.medium}
      headerText='Customize - Site title'
      isFooterAtBottom={true}
      onRenderFooterContent={() => {
        return (
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><PrimaryButton onClick={() => {this._applyThemeDialog(this.state.stateConfig.isFontCustomized, this.state.stateConfig.isColorCustomized);}} text='Apply' iconProps={{ iconName: 'Accept' }} /></div>
              <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><DefaultButton disabled={!this.state.stateConfig.isCustomized} className="ms-bgColor-orangeLighter" onClick={() => this._applyThemeDialog(false, false)} text='Disable theme' iconProps={{ iconName: 'Cancel' }} /></div>
            </div></div>
        );
      }}
    >
      <span>
      <Pivot>
      <PivotItem linkText='Font size' itemKey="0">
        <Slider
          // label='Basic example:'
          min={0}
          max={46}
          step={1}
          value={this.state.stateConfig.fontSize}
          showValue={true}
          // tslint:disable-next-line:jsx-no-lambda
          onChange={value => { this.state.stateConfig.fontSize = value; if (!this.state.stateConfig.isFontCustomized) { this.state.stateConfig.isFontCustomized = true; } this.setState(this.state); }} />          
        </PivotItem>
      <PivotItem linkText='Color' itemKey="1">
        <ColorPicker color={this.state.stateConfig.color} onColorChanged={color => { this.state.stateConfig.color = color; if (!this.state.stateConfig.isColorCustomized) { this.state.stateConfig.isColorCustomized = true; } this.setState(this.state); }} />
          <span hidden={!this.state.stateConfig.isColorCustomized }><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i></span>

      </PivotItem>
    </Pivot>
      </span>
    </Panel></div>
    );
  }
}
class ConfigCustomizePageTitleTheme extends React.Component<{config, _applyChanges: (configTypeName, configOptions) => void},{stateConfig, hideThemeDialog}>
{
  constructor(props)
  {
    super(props);
    this.state = {stateConfig : this.props.config, hideThemeDialog: true};
      this._applyThemeDialog = this._applyThemeDialog.bind(this);
      this._showThemeDialog = this._showThemeDialog.bind(this);
  }
  private _showThemeDialog() {
    this.setState({ hideThemeDialog: false });
  }
  private _applyThemeDialog(fontCustomized : boolean,colorCustomized : boolean ) {
    if(fontCustomized)
    {
      this.state.stateConfig.isFontCustomized = true;
    }
    else
    {
      this.state.stateConfig.isFontCustomized = false;
    }
    if(colorCustomized)
    {
      this.state.stateConfig.isColorCustomized = true;
    }
    else
    {
      this.state.stateConfig.isColorCustomized = false;
    }    
    this.setState(this.state);
    this.setState({ hideThemeDialog: true });
    this.props._applyChanges("PageTitle",this.state.stateConfig);
  }
  public render()
  {
    return(<div>
      <DefaultButton description='Page title' onClick={this._showThemeDialog} text='Page Title' iconProps={{ iconName: "Color" }} />
      <Panel
      isOpen={!this.state.hideThemeDialog}
      type={PanelType.medium}
      headerText='Customize - Page title'
      isFooterAtBottom={true}
      onRenderFooterContent={() => {
        return (
          <div className="ms-Grid">
            <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><PrimaryButton onClick={() => {this._applyThemeDialog(this.state.stateConfig.isFontCustomized, this.state.stateConfig.isColorCustomized);}} text='Apply' iconProps={{ iconName: 'Accept' }} /></div>
            <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><DefaultButton disabled={!this.state.stateConfig.isCustomized} className="ms-bgColor-orangeLighter" onClick={() => this._applyThemeDialog(false, false)} text='Disable theme' iconProps={{ iconName: 'Cancel' }} /></div>
          </div></div>
        );
      }}
    >
      <span>
      <Pivot>
      <PivotItem linkText='Font size' itemKey="0">
        <Slider
          // label='Basic example:'
          min={8}
          max={60}
          step={1}
          value={this.state.stateConfig.fontSize}
          showValue={true}
          onChange={value => { this.state.stateConfig.fontSize = value; if (!this.state.stateConfig.isFontCustomized) { this.state.stateConfig.isFontCustomized = true; } this.setState(this.state); }} />
          <span hidden={!this.state.stateConfig.isFontCustomized}><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i> </span>
      </PivotItem>
      <PivotItem linkText='Color' itemKey="1">
        <ColorPicker color={this.state.stateConfig.color} onColorChanged={color => { this.state.stateConfig.color = color; if (!this.state.stateConfig.isColorCustomized) { this.state.stateConfig.isColorCustomized = true; } this.setState(this.state); }} />
        <span hidden={!this.state.stateConfig.isColorCustomized}><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i> </span>
        </PivotItem>
    </Pivot>
      </span>
    </Panel></div>
    );
  }
}

class ConfigHideElements extends React.Component<{config, _applyChanges: (configTypeName, configOptions) => void},{stateConfig}>
{
  constructor(props)
  {
    super(props);
    this.state = {stateConfig : this.props.config};
    this._nextClick = this._nextClick.bind(this);
    
  }
  private _onhideUnhideChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
    var checkBoxID = ev.currentTarget.attributes.getNamedItem('value').value.toString();
    this.state.stateConfig[checkBoxID] = checked!;
    this.setState(this.state);
    // this.props.save(this.state.configOptions);
  }
  public _nextClick()
  {
    this.props._applyChanges("hideUnhide", this.state.stateConfig);
  }
  public render(){
    return(
      <div className="ms-Grid">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
          <h2>Modern page only options</h2>
          <Checkbox inputProps={{ value: "hideSiteDescriptionProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Description' checked={this.state.stateConfig.hideSiteDescriptionProperty} disabled={this.state.stateConfig.hideTitleRowProperty == true ? true : false} />
          <Checkbox inputProps={{ value: "hideSiteMembersProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Members' checked={this.state.stateConfig.hideSiteMembersProperty} disabled={this.state.stateConfig.hideTitleRowProperty == true ? true : false} />
          <Checkbox inputProps={{ value: "hideCommandBarItemsProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Command bar items' checked={this.state.stateConfig.hideCommandBarItemsProperty} />
          <Checkbox inputProps={{ value: "hidePageTitleProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Page Title' checked={this.state.stateConfig.hidePageTitleProperty} />
        </div>
        <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
          <h2>Modern and classic Page options</h2>
          <Checkbox inputProps={{ value: "hideQuickLaunchProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide quick launch' checked={this.state.stateConfig.hideQuickLaunchProperty} />
          <Checkbox inputProps={{ value: "hideTitleRowProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Title row' checked={this.state.stateConfig.hideTitleRowProperty} />
          <Checkbox inputProps={{ value: "hideSearchBoxProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Search box' checked={this.state.stateConfig.hideSearchBoxProperty} disabled={(this.state.stateConfig.hideTitleRowProperty || this.state.stateConfig.hideQuickLaunchProperty) == true ? true : false} />
          <Checkbox inputProps={{ value: "hideSiteLogoProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Logo' checked={this.state.stateConfig.hideSiteLogoProperty} disabled={this.state.stateConfig.hideTitleRowProperty == true ? true : false} />
          <Checkbox inputProps={{ value: "hideSiteTitleProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Title' checked={this.state.stateConfig.hideSiteTitleProperty} disabled={this.state.stateConfig.hideTitleRowProperty == true ? true : false} />
          <Checkbox inputProps={{ value: "hideTopNavProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Top Navigation' checked={this.state.stateConfig.hideTopNavProperty} disabled={this.state.stateConfig.hideTitleRowProperty == true ? true : false} />
          <Checkbox inputProps={{ value: "hideShareButtonProperty" }} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Share button' checked={this.state.stateConfig.hideShareButtonProperty} disabled={this.state.stateConfig.hideTitleRowProperty == true ? true : false} />
        </div>
      </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div>
            <PrimaryButton description='Apply' iconProps={{ iconName: 'Accept' }} onClick={this._nextClick}>Apply Hide elements</PrimaryButton>
          </div></div>
        </div>

    </div>
    );
  }
}

export default class ConfigLanding extends React.Component<IConfigLandingProps, IConfigLandingState> {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      hideFinishDialog: true,
      hideMasterThemeDialog: false,
      hideTopNavThemeDialog: false,
      hideQuLaunchThemeDialog: false,
      hideSiteTitleThemeDialog: false,
      hidePageTitleThemeDialog: false,
      configOptions: this.props.configOptions,
      selectedKey: 0,
    };

    // this._takeMetoNextPage = this._takeMetoNextPage.bind(this);
    // this._takeMetoPrevPage = this._takeMetoPrevPage.bind(this);
    this._applyChanges = this._applyChanges.bind(this);
    this._showFinishDialog = this._showFinishDialog.bind(this);
    this._closeFinishDialog = this._closeFinishDialog.bind(this);
    this._getTextBoxErrorMessage = this._getTextBoxErrorMessage.bind(this);    
    this.onPivotChange = this.onPivotChange.bind(this);
    this._finishChanges = this._finishChanges.bind(this);
    // this._onColorChanged = this._onColorChanged.bind(this);
    this._showMasterThemeDialog = this._showMasterThemeDialog.bind(this);
    this._closeMasterThemeDialog = this._closeMasterThemeDialog.bind(this);

    this._showTopNavThemeDialog = this._showTopNavThemeDialog.bind(this);
    this._closeTopNavThemeDialog = this._closeTopNavThemeDialog.bind(this);

    this._showQuLaunchThemeDialog = this._showQuLaunchThemeDialog.bind(this);
    this._closeQuLaunchThemeDialog = this._closeQuLaunchThemeDialog.bind(this);

    this._showSiteTitleThemeDialog = this._showSiteTitleThemeDialog.bind(this);
    this._closeSiteTitleThemeDialog = this._closeSiteTitleThemeDialog.bind(this);

    this._showPageTitleThemeDialog = this._showPageTitleThemeDialog.bind(this);
    this._closePageTitleThemeDialog = this._closePageTitleThemeDialog.bind(this);
  }

  public componentDidMount() {
    console.log("Config - React component is loaded");
  }
  public componentWillUnmount() {
  }
  public render(): React.ReactElement<IConfigLandingProps> {
    console.log("ConfigLanding - React component is loaded");
    // var pageTitleStyle = {"color":this.state.configOptions.PageTitleTheme.color, "background-color":this.state.configOptions.PageTitleTheme.backgroundColor, "font-size": this.state.configOptions.PageTitleTheme.fontSize.toString() + "px" }
    let pivotArray: React.ReactElement<IPivotItemProps>[] = [];

    pivotArray.push(
      <PivotItem linkText='Overview' itemKey='0' itemIcon='Info'><br />
        {/* <MessageBar messageBarType={MessageBarType.severeWarning} ><strong>Note: </strong>Don't forget to click Save changes.</MessageBar> */}
        <MessageBar messageBarType={MessageBarType.info} >This configuration box is visible <u>only in edit mode.</u></MessageBar>
        <p>Brand this page in three easy steps.</p>
        <ul>
          <li><b>Step 1</b> - Hide or Unhide different elements on a specific page including Quicklaunch, Top navigation, Share button etc...</li>
          <li><b>Step 2</b> - Add/ update colors of navigation, page titles etc...</li>
          <li><b>Step 3</b> - Update miscellaneous settings including compacte mode to remove additional padding or margin spaces.</li>
          <li><b>Finally</b> - Click on 'Save all changes'.</li>
        </ul>


        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"></div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div className={styles.right}>
              <div className={styles.right}>
                {/* <PrimaryButton description='Next' iconProps={{ iconName: 'Forward' }} onClick={this._takeMetoNextPage}>NEXT</PrimaryButton> */}
              </div>
            </div></div>
          </div>
        </div>
      </PivotItem>
    );
    pivotArray.push(
      <PivotItem linkText='Hide elments' itemKey='1' itemIcon='Hide'>
        <ConfigHideElements config={this.state.configOptions.hideUnhide} _applyChanges={this._applyChanges}/>
      </PivotItem>
    );

    pivotArray.push(
      <PivotItem linkText='Customize theme' itemKey='2' itemIcon='Color'>
        <br />
        <table className="ms-Table"><thead ><tr className={styles.tableRowCustomStyle}><th className="ms-fontColor-teal" >Element</th><th className="ms-fontColor-teal">Is customized ?</th></tr></thead>
          <tbody>
            {/* Button#1 */}
            <tr className={styles.tableRowCustomStyle}><td>
            <ConfigCustomizeMasterTheme config={this.state.configOptions.masterTheme}  _applyChanges={this._applyChanges} />
            </td>
              <td>
                <span hidden={!this.state.configOptions.masterTheme.isCustomized}><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i> </span>
                <span hidden={this.state.configOptions.masterTheme.isCustomized}><i className="ms-Icon ms-Icon--Blocked ms-font-m" aria-hidden="true" aria-label="No"></i> No</span>
              </td></tr>
            {/* Button#2 */}
            <tr className={styles.tableRowCustomStyle}><td>
              {/* <DefaultButton description='Top navigation' onClick={this._showTopNavThemeDialog} text='Top navigation' iconProps={{ iconName: "Color" }} /> */}
              <ConfigCustomizeTopNavTheme config={this.state.configOptions.topNav}  _applyChanges={this._applyChanges} />
            </td>
              <td>
                <span hidden={!this.state.configOptions.topNav.isCustomized}><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i> </span>
                <span hidden={this.state.configOptions.topNav.isCustomized}><i className="ms-Icon ms-Icon--Blocked ms-font-m" aria-hidden="true" aria-label="No"></i> No</span>
              </td></tr>
            {/* Button#3 */}
            <tr className={styles.tableRowCustomStyle}><td>
            <ConfigCustomizeQuickLaunchTheme config={this.state.configOptions.quickLaunch}  _applyChanges={this._applyChanges} />
            </td>
              <td>
                <span hidden={!this.state.configOptions.quickLaunch.isCustomized}><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i> </span>
                <span hidden={this.state.configOptions.quickLaunch.isCustomized}><i className="ms-Icon ms-Icon--Blocked ms-font-m" aria-hidden="true" aria-label="No"></i> No</span>
              </td></tr>
            {/* Button#4 */}
            <tr className={styles.tableRowCustomStyle}><td>
            <ConfigCustomizeSiteTitleTheme config={this.state.configOptions.SiteTitle}  _applyChanges={this._applyChanges} />
            </td>
              <td>
                <span hidden={!this.state.configOptions.SiteTitle.isColorCustomized && !this.state.configOptions.SiteTitle.isFontCustomized }><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i> </span>
                <span hidden={this.state.configOptions.SiteTitle.isColorCustomized || this.state.configOptions.SiteTitle.isFontCustomized}><i className="ms-Icon ms-Icon--Blocked ms-font-m" aria-hidden="true" aria-label="No"></i> No</span>
              </td></tr>
            {/* Button#5 */}
            <tr className={styles.tableRowCustomStyle}><td>
            <ConfigCustomizePageTitleTheme config={this.state.configOptions.PageTitle}  _applyChanges={this._applyChanges} />
            </td>
              <td>
              <span hidden={!this.state.configOptions.PageTitle.isColorCustomized && !this.state.configOptions.PageTitle.isFontCustomized }><i className="ms-Icon ms-Icon--Accept ms-font-xxl ms-fontColor-tealLight" aria-hidden="true" aria-label="configured"></i> </span>
                <span hidden={this.state.configOptions.PageTitle.isColorCustomized || this.state.configOptions.PageTitle.isFontCustomized}><i className="ms-Icon ms-Icon--Blocked ms-font-m" aria-hidden="true" aria-label="No"></i> No</span>
              </td></tr>

          </tbody>
        </table>
        {/* Button# END */}
        <br /><br />
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            {/* <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><DefaultButton description='Back' iconProps={{ iconName: 'Back' }} onClick={this._takeMetoPrevPage}>BACK</DefaultButton></div> */}
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div className={styles.right}>
              <div className={styles.right}>
                {/* <PrimaryButton description='Next' iconProps={{ iconName: 'Forward' }} onClick={this._takeMetoNextPage}>NEXT</PrimaryButton> */}
              </div>
            </div></div>
          </div>
        </div>
      </PivotItem>
    );
    pivotArray.push(
      <PivotItem linkText='Miscellaneous' itemKey='3' itemIcon='Drop'>
        <TooltipHost
            calloutProps={ { gapSpace: 10 } }
            tooltipProps={ {
              onRenderContent: () => {
                return (
                  <div>
                    Hide extra space around webparts, Quick links and People webpart.
                  </div>
                );
              }
            } }
            delay={ TooltipDelay.zero }
            id='customID'
            directionalHint={ DirectionalHint.bottomLeftEdge }
          >
              <Checkbox className={styles.top10Margin} label='Compact mode' checked={this.state.configOptions.Misc.compactMode} onChange={(ev: React.FormEvent<HTMLElement>, checked: boolean) => {this.state.configOptions.Misc.compactMode = checked!; this.setState(this.state);} }  />
              <br/><br/>
          </TooltipHost>
        <br/><br/>
        <PrimaryButton description='Finish' iconProps={{ iconName: 'Accept' }} onClick={this._finishChanges}>Apply</PrimaryButton>
      </PivotItem>
      
    );

    if (this.props.editMode == 2) {
      return (
        <span className={styles.configLanding}>
          <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} selectedKey={`${this.state.selectedKey}`} onLinkClick={this.onPivotChange}>
            {pivotArray}
          </Pivot><br/>
          <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg8"></div>
            <div className="ms-Grid-col ms-lg4">
            {/* <PrimaryButton description='Finish' iconProps={{ iconName: 'Save' }} onClick={this._finishChanges}>Save all changes</PrimaryButton> */}
            <Dialog
                hidden={this.state.hideFinishDialog}
                onDismiss={this._closeFinishDialog}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: 'Done..',
                  subText: 'Your changes have been successfully applied. Don\'t forget to Save & Publish this page to reflect changes to all users.'
                }}
                modalProps={{
                  titleAriaId: 'myLabelId',
                  subtitleAriaId: 'mySubTextId',
                  isBlocking: false,
                  containerClassName: 'ms-dialogMainOverride'
                }}
              >
                {null /** You can also include null values as the result of conditionals */}
                <DialogFooter>
                  <PrimaryButton onClick={this._closeFinishDialog} text='OK' />
                </DialogFooter>
              </Dialog>
            </div>
          </div></div>
          
          {/* Include in edit mode as well */}
          <HideUnhide configOptions={this.props.configOptions} />

        </span>
      );
    }
    else {
      // return (null); if you want to return null
      return (<span className={styles.configLanding}>
        <HideUnhide configOptions={this.props.configOptions} />
      </span>
      );
    }


  }//end of render


  // @autobind
  private _onhideUnhideChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
    // var checkBoxID = ev.currentTarget.attributes.getNamedItem('value').value.toString();
    // this.state.configOptions.hideUnhide[checkBoxID] = checked!;
    // this.setState(this.state);
    // this.props.save(this.state.configOptions);
  }

  // private _takeMetoNextPage(configTypeName, configOptions): void {
  //   this.setState({ selectedKey: (this.state.selectedKey + 1) % 4 });
  //   this.state.configOptions[configTypeName] = configOptions;
  //   this.setState(this.state);
  // }    
  // private _takeMetoPrevPage(): void {
  //   this.setState({ selectedKey: (this.state.selectedKey - 1) % 4 });
  // }
  private _applyChanges(configTypeName, configOptions): void {
    this.state.configOptions[configTypeName] = configOptions;
    this.setState(this.state);
    this._finishChanges();
  }
  private _finishChanges(): void {
    this.props.save(this.state.configOptions);
    // this.setState({ hideFinishDialog: false });
  }// save changes when user clicks FInish again.
  public onPivotChange(item: PivotItem): void {
    this.setState({ selectedKey: parseInt(item.props.itemKey) });
    this.props.save(this.state.configOptions);
  }// save changes on every tab change.

  private _closeFinishDialog() {
    this.setState({ hideFinishDialog: true });
  }
  private _showFinishDialog() {
    this.setState({ hideFinishDialog: false });
  }

  private _showMasterThemeDialog() {
    this.setState({ hideMasterThemeDialog: true });
  }
  private _closeMasterThemeDialog() {
    this.setState({ hideMasterThemeDialog: false });
  }

  private _showTopNavThemeDialog() {
    this.setState({ hideTopNavThemeDialog: true });
  }
  private _closeTopNavThemeDialog() {
    this.setState({ hideTopNavThemeDialog: false });
  }

  private _showQuLaunchThemeDialog() {
    this.setState({ hideQuLaunchThemeDialog: true });
  }
  private _closeQuLaunchThemeDialog() {
    this.setState({ hideQuLaunchThemeDialog: false });
  }

  private _showSiteTitleThemeDialog() {
    this.setState({ hideSiteTitleThemeDialog: true });
  }
  private _closeSiteTitleThemeDialog() {
    this.setState({ hideSiteTitleThemeDialog: false });
  }

  private _showPageTitleThemeDialog() {
    this.setState({ hidePageTitleThemeDialog: true });
  }
  private _closePageTitleThemeDialog() {
    this.setState({ hidePageTitleThemeDialog: false });
  }
  private _getTextBoxErrorMessage(value: string): string {
    return value.length > 0
      ? ''
      : `This field is required.`;
  }
}
