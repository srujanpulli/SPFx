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
      selectedKey: 0
    };
    this._takeMetoNextPage = this._takeMetoNextPage.bind(this);    
  }

  public componentDidMount() {
  }
  public componentWillUnmount() {
  }
  public render(){//: React.ReactElement<IConfigLandingProps> 
    
    let rStyles: ICheckboxStyles = {
      root: {
        marginTop: '10px'
      }
    };

    let pivotArray: React.ReactElement<IPivotItemProps>[] = [];

    if (this.state.pivotToDisplay >= 1) {
      pivotArray.push(
        <PivotItem linkText='Hide elments' itemKey='0' key='0'>
          {/* <h1>Hide or Unhide different options.</h1> */}
          <h2>Modern page only options</h2>
          {/* <Checkbox label='Controlled checkbox' checked={ isChecked } onChange={ this._onControlledCheckboxChange }/> */}
          <Checkbox styles={ rStyles } label='Hide Site Description' checked={ this.props.hideSiteDescriptionProperty } disabled = {this.props.hideTitleRowProperty == true ? true : false}/>
          <Checkbox styles={ rStyles } label='Hide Site Members' checked={ this.props.hideSiteMembersProperty }  disabled = {this.props.hideTitleRowProperty == true ? true : false}/>
          <Checkbox styles={ rStyles } label='Hide Command bar items' checked={ this.props.hideCommandBarItemsProperty }/>
          <Checkbox styles={ rStyles } label='Hide Page Title' checked={ this.props.hidePageTitleProperty }/>
          <h2>Modern and classic Page options</h2>
          <Checkbox styles={ rStyles } label='Hide quick launch' checked={ this.props.hideQuickLaunchProperty }/>
          <Checkbox styles={ rStyles } label='Hide Title row' checked={ this.props.hideTitleRowProperty }/>
          <Checkbox styles={ rStyles } label='Hide Search box' checked={ this.props.hideSearchBoxProperty }  disabled = {(this.props.hideTitleRowProperty || this.props.hideQuickLaunchProperty == true )== true ? true : false} />
          <Checkbox styles={ rStyles } label='Hide Site Logo' checked={ this.props.hideSiteLogoProperty } disabled = {this.props.hideTitleRowProperty == true ? true : false}/>
          <Checkbox styles={ rStyles } label='Hide Site Title' checked={ this.props.hideSiteTitleProperty } disabled = {this.props.hideTitleRowProperty == true ? true : false}/>
          <Checkbox styles={ rStyles } label='Hide Top Navigation' checked={ this.props.hideTopNavProperty } disabled = {this.props.hideTitleRowProperty == true ? true : false}/>
          <Checkbox styles={ rStyles } label='Hide Share button' checked={ this.props.hideShareButtonProperty } disabled = {this.props.hideTitleRowProperty == true ? true : false}/>
          
          {/* show next button */}
          <div hidden={this.state.pivotToDisplay > 1} className={styles.right}>
          <PrimaryButton description='NEXT > Add some colors' onClick={this._takeMetoNextPage}>NEXT > Add some colors</PrimaryButton></div>
        </PivotItem>
      );
    }
    if (this.state.pivotToDisplay >= 2) {
      pivotArray.push(
        <PivotItem linkText='Add colors' itemKey='1' key='1'>
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
        <PivotItem linkText='Miscellaneous' itemKey='2' key='2'>
          <Label>3 Click the button below to show/hide this pivot item.</Label>
          <Label>The selected item will not change when the number of pivot items changes.</Label>
          <Label>If the selected item was removed, the new first item will be selected.</Label>
        </PivotItem>
      );
    }
    if (this.props.editMode == 2) {
      console.log("Config - React component - Edit is loaded");
      return (
        <span className={styles.configLanding}>
          <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large}  selectedKey={ `${this.state.selectedKey}` }>
          { pivotArray }
          </Pivot>

          {/* Include in edit mode as well */}
          <HideUnhide hideQuickLaunchProperty={this.props.hideQuickLaunchProperty}
            hideSiteLogoProperty={this.props.hideSiteLogoProperty}
            hideSiteTitleProperty={this.props.hideSiteTitleProperty}
            hideSiteDescriptionProperty={this.props.hideSiteDescriptionProperty}
            hideSiteMembersProperty={this.props.hideSiteMembersProperty}
            hideTopNavProperty={this.props.hideTopNavProperty}
            hideTitleRowProperty={this.props.hideTitleRowProperty}
            hideCommandBarItemsProperty={this.props.hideCommandBarItemsProperty}
            hidePageTitleProperty={this.props.hidePageTitleProperty}
            hideSearchBoxProperty={this.props.hideSearchBoxProperty}
            hideShareButtonProperty={this.props.hideShareButtonProperty} />

        </span>
      )
    }
    else {
      console.log("Config - React component - Read only is loaded");
      // return (null); if you want to return null
      return (<span className={styles.configLanding}>
        <HideUnhide hideQuickLaunchProperty={this.props.hideQuickLaunchProperty}
          hideSiteLogoProperty={this.props.hideQuickLaunchProperty}
          hideSiteTitleProperty={this.props.hideQuickLaunchProperty}
          hideSiteDescriptionProperty={this.props.hideQuickLaunchProperty}
          hideSiteMembersProperty={this.props.hideQuickLaunchProperty}
          hideTopNavProperty={this.props.hideQuickLaunchProperty}
          hideTitleRowProperty={this.props.hideQuickLaunchProperty}
          hideCommandBarItemsProperty={this.props.hideQuickLaunchProperty}
          hidePageTitleProperty={this.props.hideQuickLaunchProperty}
          hideSearchBoxProperty={this.props.hideQuickLaunchProperty}
          hideShareButtonProperty={this.props.hideQuickLaunchProperty} />
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

}
