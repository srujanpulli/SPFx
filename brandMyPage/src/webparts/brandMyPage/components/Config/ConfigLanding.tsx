import * as React from 'react';
import styles                   from './IConfigLanding.module.scss';
import { IConfigLandingProps }  from './IConfigLandingProps';
import { IConfigLandingState }  from './IConfigLandingState';
import { escape }               from '@microsoft/sp-lodash-subset';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize, IPivotItemProps }  from 'office-ui-fabric-react/lib/Pivot';
import { Checkbox, ICheckboxStyles, ICheckboxProps }                          from 'office-ui-fabric-react/lib/Checkbox';
import { Label }                                                              from 'office-ui-fabric-react/lib/Label';
import { Icon }                                                               from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton }                                       from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter }                                   from 'office-ui-fabric-react/lib/Dialog';
import { autobind }                                                           from 'office-ui-fabric-react/lib/Utilities';
// import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import HideUnhide             from './../HideUnhide/HideUnhide';
import { IHideUnhideProps }   from './../HideUnhide/IHideUnhideProps';
import { IHideUnhideState }   from './../HideUnhide/IHideUnhideState';

import 'jQuery';
declare var $;

export default class ConfigLanding extends React.Component<IConfigLandingProps, IConfigLandingState> {
  // private _pivotToDisplay: number;  
  // public _selectedKey: number;
  constructor(props) {
    super(props);//props

    // this._pivotToDisplay = 1;
    // this._selectedKey = 0;
    
    this.state = {
      isChecked:false,
      hideFinishDialog: true,      
      configOptions : this.props.configOptions,
      selectedKey: 0,
      // hideQuickLaunchProperty: this.props.configOptions.hideQuickLaunchProperty,
      // hideSiteLogoProperty: this.props.configOptions.hideSiteLogoProperty,
      // hideSiteTitleProperty: this.props.configOptions.hideSiteTitleProperty,
      // hideSiteDescriptionProperty: this.props.configOptions.hideSiteDescriptionProperty,
      // hideSiteMembersProperty: this.props.configOptions.hideSiteMembersProperty,
      // hideTopNavProperty: this.props.configOptions.hideTopNavProperty,
      // hideTitleRowProperty: this.props.configOptions.hideTitleRowProperty,
      // hideCommandBarItemsProperty: this.props.configOptions.hideCommandBarItemsProperty,
      // hidePageTitleProperty: this.props.configOptions.hidePageTitleProperty,
      // hideSearchBoxProperty: this.props.configOptions.hideSearchBoxProperty,
      // hideShareButtonProperty: this.props.configOptions.hideShareButtonProperty,
    };
    
    this._takeMetoNextPage = this._takeMetoNextPage.bind(this);
    this._takeMetoPrevPage = this._takeMetoPrevPage.bind(this);
    this._showFinishDialog = this._showFinishDialog.bind(this);
    this._closeFinishDialog = this._closeFinishDialog.bind(this);
    
    this._finishChanges = this._finishChanges.bind(this);
  }

  public componentDidMount() {
    console.log("Config - React component is loaded");    
  }
  public componentWillUnmount() {
  }
  public render(): React.ReactElement<IConfigLandingProps>{ 
    console.log("ConfigLanding - React component is loaded");
    
    let pivotArray: React.ReactElement<IPivotItemProps>[] = [];
    
    pivotArray.push(
      <PivotItem linkText='Overview' itemKey='0' itemIcon='Info'>
        <Label>Step 1</Label>
        <Label>Step 2</Label>
        <Label>Step 3.</Label>
        
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"></div>
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div className={styles.right}>
            <div className={styles.right}>
            <PrimaryButton description='Next' iconProps={ { iconName: 'Forward' }} onClick={this._takeMetoNextPage}>NEXT</PrimaryButton>
            </div>
          </div></div>
          </div>
        </div>
      </PivotItem>
    );
      pivotArray.push(
        <PivotItem linkText='Hide elments' itemKey='1' itemIcon='Hide'>
          
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
              <h2>Modern page only options</h2>
                <Checkbox inputProps={{value: "hideSiteDescriptionProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Description' checked={ this.state.configOptions.hideSiteDescriptionProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
                <Checkbox inputProps={{value: "hideSiteMembersProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Members' checked={ this.state.configOptions.hideSiteMembersProperty }  disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
                <Checkbox inputProps={{value: "hideCommandBarItemsProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Command bar items' checked={ this.state.configOptions.hideCommandBarItemsProperty }/>
                <Checkbox inputProps={{value: "hidePageTitleProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Page Title' checked={ this.state.configOptions.hidePageTitleProperty }/>
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
              <h2>Modern and classic Page options</h2>
                <Checkbox inputProps={{value: "hideQuickLaunchProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide quick launch' checked={ this.state.configOptions.hideQuickLaunchProperty }/>
                <Checkbox inputProps={{value: "hideTitleRowProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Title row' checked={ this.state.configOptions.hideTitleRowProperty }/>
                <Checkbox inputProps={{value: "hideSearchBoxProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Search box' checked={ this.state.configOptions.hideSearchBoxProperty }  disabled = {(this.state.configOptions.hideTitleRowProperty || this.state.configOptions.hideQuickLaunchProperty )== true ? true : false} />
                <Checkbox inputProps={{value: "hideSiteLogoProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Logo' checked={ this.state.configOptions.hideSiteLogoProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
                <Checkbox inputProps={{value: "hideSiteTitleProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Site Title' checked={ this.state.configOptions.hideSiteTitleProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
                <Checkbox inputProps={{value: "hideTopNavProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Top Navigation' checked={ this.state.configOptions.hideTopNavProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
                <Checkbox inputProps={{value: "hideShareButtonProperty"}} onChange={this._onhideUnhideChange.bind(this)} className={styles.top10Margin} label='Hide Share button' checked={ this.state.configOptions.hideShareButtonProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
              </div>
            </div>
          </div>                    
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><DefaultButton description='Back' iconProps={ { iconName: 'Back' }} onClick={this._takeMetoPrevPage}>BACK</DefaultButton></div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div className={styles.right}>
              <PrimaryButton description='Back' iconProps={ { iconName: 'Forward' }} onClick={this._takeMetoNextPage}>NEXT</PrimaryButton>
              </div></div>
            </div>
          </div>

        </PivotItem>
      );
      
      pivotArray.push(
        <PivotItem linkText='Add colors' itemKey='2' itemIcon='Color'>
          <Label>2 Click the button below to show/hide this pivot item.</Label>
          <Label>The selected item will not change when the number of pivot items changes.</Label>
          <Label>If the selected item was removed, the new first item will be selected.</Label>
          
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><DefaultButton description='Back' iconProps={ { iconName: 'Back' }} onClick={this._takeMetoPrevPage}>BACK</DefaultButton></div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div className={styles.right}>
              <div className={styles.right}>
              <PrimaryButton description='Next' iconProps={ { iconName: 'Forward' }} onClick={this._takeMetoNextPage}>NEXT</PrimaryButton>
              </div>
            </div></div>
            </div>
          </div>
        </PivotItem>
      );
      pivotArray.push(
        <PivotItem linkText='Miscellaneous' itemKey='3' itemIcon='Drop'>
          <Label>3 Click the button below to show/hide this pivot item.</Label>
          <Label>The selected item will not change when the number of pivot items changes.</Label>
          <Label>If the selected item was removed, the new first item will be selected.</Label>
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><DefaultButton description='Back' iconProps={ { iconName: 'Back' }} onClick={this._takeMetoPrevPage}>BACK</DefaultButton></div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><div className={styles.right}>
              <div className={styles.right}>
              <PrimaryButton description='Finish' iconProps={ { iconName: 'Accept' }} onClick={this._finishChanges}>FINISH</PrimaryButton>
              </div>
            </div></div></div></div>
            <Dialog
            hidden={ this.state.hideFinishDialog }
            onDismiss={ this._closeFinishDialog }
            dialogContentProps={ {
              type: DialogType.normal,
              title: 'Done..',
              subText: 'Your changes have been successfully applied. Don\'t forget to Publish this page to reflect changes to all users.'
            } }
            modalProps={ {
              titleAriaId: 'myLabelId',
              subtitleAriaId: 'mySubTextId',
              isBlocking: false,
              containerClassName: 'ms-dialogMainOverride'
            } }
          >
            { null /** You can also include null values as the result of conditionals */ }
            <DialogFooter>
              <PrimaryButton onClick={ this._closeFinishDialog } text='OK' />
            </DialogFooter>
          </Dialog>
        </PivotItem>        
      );

    if (this.props.editMode == 2) {
      return (
        <span className={styles.configLanding}>
          <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} selectedKey={ `${this.state.selectedKey}` } >
          { pivotArray }
          </Pivot>            
          {/* Include in edit mode as well */}
          <HideUnhide hideQuickLaunchProperty={this.props.configOptions.hideQuickLaunchProperty}
            hideSiteLogoProperty={this.props.configOptions.hideSiteLogoProperty}
            hideSiteTitleProperty={this.props.configOptions.hideSiteTitleProperty}
            hideSiteDescriptionProperty={this.props.configOptions.hideSiteDescriptionProperty}
            hideSiteMembersProperty={this.props.configOptions.hideSiteMembersProperty}
            hideTopNavProperty={this.props.configOptions.hideTopNavProperty}
            hideTitleRowProperty={this.props.configOptions.hideTitleRowProperty}
            hideCommandBarItemsProperty={this.props.configOptions.hideCommandBarItemsProperty}
            hidePageTitleProperty={this.props.configOptions.hidePageTitleProperty}
            hideSearchBoxProperty={this.props.configOptions.hideSearchBoxProperty}
            hideShareButtonProperty={this.props.configOptions.hideShareButtonProperty} />

        </span>
      );
    }
    else {
      // return (null); if you want to return null
      return (<span className={styles.configLanding}>
            <HideUnhide hideQuickLaunchProperty={this.props.configOptions.hideQuickLaunchProperty}
            hideSiteLogoProperty={this.props.configOptions.hideSiteLogoProperty}
            hideSiteTitleProperty={this.props.configOptions.hideSiteTitleProperty}
            hideSiteDescriptionProperty={this.props.configOptions.hideSiteDescriptionProperty}
            hideSiteMembersProperty={this.props.configOptions.hideSiteMembersProperty}
            hideTopNavProperty={this.props.configOptions.hideTopNavProperty}
            hideTitleRowProperty={this.props.configOptions.hideTitleRowProperty}
            hideCommandBarItemsProperty={this.props.configOptions.hideCommandBarItemsProperty}
            hidePageTitleProperty={this.props.configOptions.hidePageTitleProperty}
            hideSearchBoxProperty={this.props.configOptions.hideSearchBoxProperty}
            hideShareButtonProperty={this.props.configOptions.hideShareButtonProperty} />
      </span>
      );
    }


  }//end of render


  // @autobind
  private _onhideUnhideChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
    var checkBoxID = ev.currentTarget.attributes.getNamedItem('value').value.toString();
    var _configOptions = {
      "hideQuickLaunchProperty": this.state.configOptions.hideQuickLaunchProperty,
      "hideSiteLogoProperty": this.state.configOptions.hideSiteLogoProperty,
      "hideSiteTitleProperty": this.state.configOptions.hideSiteTitleProperty,
      "hideSiteDescriptionProperty": this.state.configOptions.hideSiteDescriptionProperty,
      "hideSiteMembersProperty": this.state.configOptions.hideSiteMembersProperty,
      "hideTopNavProperty": this.state.configOptions.hideTopNavProperty,
      "hideTitleRowProperty": this.state.configOptions.hideTitleRowProperty,
      "hideCommandBarItemsProperty": this.state.configOptions.hideCommandBarItemsProperty,
      "hidePageTitleProperty": this.state.configOptions.hidePageTitleProperty,
      "hideSearchBoxProperty": this.state.configOptions.hideSearchBoxProperty,
      "hideShareButtonProperty": this.state.configOptions.hideShareButtonProperty
    };
    _configOptions[checkBoxID] = checked!;
    this.props.save(_configOptions);    
    this.setState({configOptions: _configOptions});
    // this.render();        
  }
  
  private _takeMetoNextPage(): void {
    this.setState({selectedKey: (this.state.selectedKey + 1) % 4})
  }
  private _takeMetoPrevPage(): void {
    this.setState({selectedKey: (this.state.selectedKey - 1) % 4})    
  }
  private _finishChanges(): void {
    var _configOptions = {
      "hideQuickLaunchProperty": this.state.configOptions.hideQuickLaunchProperty,
      "hideSiteLogoProperty": this.state.configOptions.hideSiteLogoProperty,
      "hideSiteTitleProperty": this.state.configOptions.hideSiteTitleProperty,
      "hideSiteDescriptionProperty": this.state.configOptions.hideSiteDescriptionProperty,
      "hideSiteMembersProperty": this.state.configOptions.hideSiteMembersProperty,
      "hideTopNavProperty": this.state.configOptions.hideTopNavProperty,
      "hideTitleRowProperty": this.state.configOptions.hideTitleRowProperty,
      "hideCommandBarItemsProperty": this.state.configOptions.hideCommandBarItemsProperty,
      "hidePageTitleProperty": this.state.configOptions.hidePageTitleProperty,
      "hideSearchBoxProperty": this.state.configOptions.hideSearchBoxProperty,
      "hideShareButtonProperty": this.state.configOptions.hideShareButtonProperty
    };
    this.props.save(_configOptions);
    this.setState({ hideFinishDialog: false });    
  }
  private _closeFinishDialog() {
    this.setState({ hideFinishDialog: true });
  }
  private _showFinishDialog() {
    this.setState({ hideFinishDialog: false });
  }
}
