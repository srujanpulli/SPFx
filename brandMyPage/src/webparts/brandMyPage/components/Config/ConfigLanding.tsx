import * as React from 'react';
import styles from './IConfigLanding.module.scss';
import { IConfigLandingProps } from './IConfigLandingProps';
import { IConfigLandingState } from './IConfigLandingState';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
  IPivotItemProps
} from 'office-ui-fabric-react/lib/Pivot';
import {
  Checkbox,
  ICheckboxStyles,
  ICheckboxProps
} from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { autobind } from 'office-ui-fabric-react/lib/Utilities';
// import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import HideUnhide from './../HideUnhide/HideUnhide';
import { IHideUnhideProps } from './../HideUnhide/IHideUnhideProps';
import { IHideUnhideState } from './../HideUnhide/IHideUnhideState';

import 'jQuery';
declare var $;

export default class ConfigLanding extends React.Component<IConfigLandingProps, IConfigLandingState> {
  private _pivotToDisplay: number;  
  private _selectedKey: number;  
  
  constructor(props) {
    super(props);

    this._pivotToDisplay = 1;
    this._selectedKey = 0;
    
    this.state = {
      pivotToDisplay : 1,
      selectedKey: 0,
      isChecked:false,
      configOptions : this.props.configOptions,
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
    this._onhideUnhideChange = this._onhideUnhideChange.bind(this);    
  }

  public componentDidMount() {
    console.log("Config - React component is loaded");    
  }
  public componentWillUnmount() {
  }
  public render(){//: React.ReactElement<IConfigLandingProps> 

    // let { isChecked } = this.state;    
    
    // let rStyles: ICheckboxStyles = {
    //   root: {
    //     marginTop: '10px'
    //   }
    // };

    let pivotArray: React.ReactElement<IPivotItemProps>[] = [];

    if (this.state.pivotToDisplay >= 1) {
      pivotArray.push(
        <PivotItem linkText='1. Hide elments' itemKey='0' key='0'>
          {/* <h1>Hide or Unhide different options.</h1> */}
          <h2>Modern page only options</h2>
          {/* <Checkbox label='Controlled checkbox' checked={ isChecked } onChange={ this._onControlledCheckboxChange }/> */}
          <Checkbox ariaDescribedBy="hideSiteDescriptionProperty" onChange={this._onhideUnhideChange} className={styles.top10Margin} label='Hide Site Description' checked={ this.state.configOptions.hideSiteDescriptionProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
          <Checkbox className={styles.top10Margin} label='Hide Site Members' checked={ this.state.configOptions.hideSiteMembersProperty }  disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
          <Checkbox className={styles.top10Margin} label='Hide Command bar items' checked={ this.state.configOptions.hideCommandBarItemsProperty }/>
          {/* <Checkbox onChange={ this.state._onhideUnhideChange(this.state.configOptions.hideCommandBarItemsProperty) } styles={ rStyles } label='Hide Command bar items' checked={ this.state.configOptions.hideCommandBarItemsProperty }/> */}
          <Checkbox className={styles.top10Margin} label='Hide Page Title' checked={ this.state.configOptions.hidePageTitleProperty }/>
          <h2>Modern and classic Page options</h2>
          <Checkbox className={styles.top10Margin} label='Hide quick launch' checked={ this.state.configOptions.hideQuickLaunchProperty }/>
          <Checkbox className={styles.top10Margin} label='Hide Title row' checked={ this.state.configOptions.hideTitleRowProperty }/>
          <Checkbox className={styles.top10Margin} label='Hide Search box' checked={ this.state.configOptions.hideSearchBoxProperty }  disabled = {(this.state.configOptions.hideTitleRowProperty || this.state.configOptions.hideQuickLaunchProperty == true )== true ? true : false} />
          <Checkbox className={styles.top10Margin} label='Hide Site Logo' checked={ this.state.configOptions.hideSiteLogoProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
          <Checkbox className={styles.top10Margin} label='Hide Site Title' checked={ this.state.configOptions.hideSiteTitleProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
          <Checkbox className={styles.top10Margin} label='Hide Top Navigation' checked={ this.state.configOptions.hideTopNavProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
          <Checkbox className={styles.top10Margin} label='Hide Share button' checked={ this.state.configOptions.hideShareButtonProperty } disabled = {this.state.configOptions.hideTitleRowProperty == true ? true : false}/>
          
          {/* show next button */}
          <div hidden={this.state.pivotToDisplay > 1} className={styles.right}>
          <PrimaryButton description='NEXT > Add some colors' onClick={this._takeMetoNextPage}>NEXT > Add some colors</PrimaryButton></div>
        </PivotItem>
      );
    }
    if (this.state.pivotToDisplay >= 2) {
      pivotArray.push(
        <PivotItem linkText='2. Add colors' itemKey='1' key='1'>
          <Label>2 Click the button below to show/hide this pivot item.</Label>
          <Label>The selected item will not change when the number of pivot items changes.</Label>
          <Label>If the selected item was removed, the new first item will be selected.</Label>
          <div hidden={this.state.pivotToDisplay > 2} className={styles.right}>
          <PrimaryButton description='NEXT > Add Misc items' onClick={this._takeMetoNextPage}>NEXT > Add Misc items</PrimaryButton></div>
        </PivotItem>
      );
    }
    if (this.state.pivotToDisplay >= 3) {
      pivotArray.push(
        <PivotItem linkText='3. Miscellaneous' itemKey='2' key='2'>
          <Label>3 Click the button below to show/hide this pivot item.</Label>
          <Label>The selected item will not change when the number of pivot items changes.</Label>
          <Label>If the selected item was removed, the new first item will be selected.</Label>
        </PivotItem>
      );
    }
    if (this.props.editMode == 2) {
      return (
        <span className={styles.configLanding}>
          <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large}  selectedKey={ `${this.state.selectedKey}` }>
          { pivotArray }
          </Pivot>

          {/* Include in edit mode as well */}
          <HideUnhide hideQuickLaunchProperty={this.state.configOptions.hideQuickLaunchProperty}
            hideSiteLogoProperty={this.state.configOptions.hideSiteLogoProperty}
            hideSiteTitleProperty={this.state.configOptions.hideSiteTitleProperty}
            hideSiteDescriptionProperty={this.state.configOptions.hideSiteDescriptionProperty}
            hideSiteMembersProperty={this.state.configOptions.hideSiteMembersProperty}
            hideTopNavProperty={this.state.configOptions.hideTopNavProperty}
            hideTitleRowProperty={this.state.configOptions.hideTitleRowProperty}
            hideCommandBarItemsProperty={this.state.configOptions.hideCommandBarItemsProperty}
            hidePageTitleProperty={this.state.configOptions.hidePageTitleProperty}
            hideSearchBoxProperty={this.state.configOptions.hideSearchBoxProperty}
            hideShareButtonProperty={this.state.configOptions.hideShareButtonProperty} />

        </span>
      )
    }
    else {
      // return (null); if you want to return null
      return (<span className={styles.configLanding}>
        <HideUnhide hideQuickLaunchProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideSiteLogoProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideSiteTitleProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideSiteDescriptionProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideSiteMembersProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideTopNavProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideTitleRowProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideCommandBarItemsProperty={this.state.configOptions.hideQuickLaunchProperty}
          hidePageTitleProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideSearchBoxProperty={this.state.configOptions.hideQuickLaunchProperty}
          hideShareButtonProperty={this.state.configOptions.hideQuickLaunchProperty} />
      </span>
      )
    }


  }//end of render
  private _takeMetoNextPage(): void {
    this._pivotToDisplay += 1;
    this.setState({
      pivotToDisplay: this._pivotToDisplay,
      selectedKey: (this.state.selectedKey + 1) % 3
    });
  }
  
  // @autobind
  // private _onhideUnhideChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
  //   // this.setState({ hideSiteDescriptionProperty : checked! });
  //   alert(ariaDescribedBy);
  // }

  _onhideUnhideChange = (e) => {
    console.log('this is:', e.currentTarget.getAttribute('aria-describedby'));
    // this.state.{e.currentTarget.getAttribute('aria-describedby')} = false;
    // this.setState(e.currentTarget.getAttribute('aria-describedby'):true)
    this.setState(e.currentTarget.getAttribute('aria-describedby'):true)
  }
}
