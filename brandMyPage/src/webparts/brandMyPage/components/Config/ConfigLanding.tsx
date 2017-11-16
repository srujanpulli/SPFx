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
import { Modal }                                                              from 'office-ui-fabric-react/lib/Modal';
import { autobind }                                                           from 'office-ui-fabric-react/lib/Utilities';
import { MessageBar, MessageBarType }                                         from 'office-ui-fabric-react/lib/MessageBar';
import { ColorPicker }                                                        from 'office-ui-fabric-react/lib/ColorPicker';
import { Slider }                                                             from 'office-ui-fabric-react/lib/Slider';
import { loadTheme }                                                          from 'office-ui-fabric-react/lib/Styling';
import './Modal.Basic.Example.module.scss';
// import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import HideUnhide             from './../HideUnhide/HideUnhide';
import { IHideUnhideProps }   from './../HideUnhide/IHideUnhideProps';
import { IHideUnhideState }   from './../HideUnhide/IHideUnhideState';

import 'jQuery';
declare var $;

export default class ConfigLanding extends React.Component<IConfigLandingProps, IConfigLandingState> {
  constructor(props) {
    super(props);
    
    this.state = {
      isChecked:false,
      hideFinishDialog: true,  
      hideThemeDialog: false,    
      configOptions : this.props.configOptions,
      selectedKey: this.props.configOptions.cachedTabKey,
    };
    
    this._takeMetoNextPage = this._takeMetoNextPage.bind(this);
    this._takeMetoPrevPage = this._takeMetoPrevPage.bind(this);
    this._showFinishDialog = this._showFinishDialog.bind(this);
    this._closeFinishDialog = this._closeFinishDialog.bind(this);
    this._showThemeDialog = this._showThemeDialog.bind(this);
    this._closeThemeDialog = this._closeThemeDialog.bind(this);
    this.onPivotChange = this.onPivotChange.bind(this);    
    this._finishChanges = this._finishChanges.bind(this);
    // this._onColorChanged = this._onColorChanged.bind(this);
    
  }

  public componentDidMount() {
    console.log("Config - React component is loaded");    
  }
  public componentWillUnmount() {
  }
  public render(): React.ReactElement<IConfigLandingProps>{ 
    console.log("ConfigLanding - React component is loaded");
    var pageTitleStyle = {"color":this.state.configOptions.PageTitleTheme.color, "background-color":this.state.configOptions.PageTitleTheme.backgroundColor, "font-size": this.state.configOptions.PageTitleTheme.fontSize.toString() + "px" };
    let pivotArray: React.ReactElement<IPivotItemProps>[] = [];
    
    pivotArray.push(
      <PivotItem linkText='Overview' itemKey='0' itemIcon='Info'><br/>
            <MessageBar messageBarType={ MessageBarType.severeWarning } ><strong>Note:</strong> This configuration box is visible <u>only in edit mode</u></MessageBar>
            <p>Brand this page in three easy steps.</p>
            <ul>
              <li><b>Step 1</b> - Hide or Unhide different elements on a specific page including Quicklaunch, Top navigation, Share button etc...</li>
              <li><b>Step 2</b> - Add/ update colors of navigation, page titles etc..</li>
              <li><b>Step 3</b> - Update miscellaneous settings including compacte mode to remove additional padding or margin spaces</li>
            </ul>
                        
        
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
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6"><br/>
              <DefaultButton description='Opens the Sample Dialog' onClick={ this._showThemeDialog } text='Open Dialog' /><br/>
              <Modal
                isOpen={ this.state.hideThemeDialog }
                onDismiss={ this._closeThemeDialog }
                isBlocking={ false }
                containerClassName='ms-modalExample-container'
              >
                <div className='ms-modalExample-header'>
                  <span>Customize your page title</span>
                </div>
                <div className='ms-modalExample-body'>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                      <Pivot>
                          <PivotItem linkText='Font Size' itemKey="0">
                          <Slider
                              // label='Basic example:'
                              min={ 0 }
                              max={ 46 }
                              step={ 1 }
                              value = { this.state.configOptions.PageTitleTheme.fontSize}
                              showValue={ true }
                              // vertical={ true }
                              // tslint:disable-next-line:jsx-no-lambda
                              onChange={ value => { this.state.configOptions.PageTitleTheme.fontSize = value; this.setState(this.state)}} />
                          </PivotItem>
                          <PivotItem linkText='Font color' itemKey="1">
                          <div><label>Add font color</label>
                            <ColorPicker color={this.state.configOptions.PageTitleTheme.color} onColorChanged={color => {this.state.configOptions.PageTitleTheme.color = color; this.setState(this.state); this.props.save(this.state.configOptions)}}/>
                          </div></PivotItem>
                          <PivotItem linkText='Background color' itemKey="2">
                          <div>
                          <label>Add background color</label>
                          <ColorPicker color={this.state.configOptions.PageTitleTheme.backgroundColor} onColorChanged={color => {this.state.configOptions.PageTitleTheme.backgroundColor = color; this.setState(this.state); this.props.save(this.state.configOptions)}}/>
                          </div>
                          </PivotItem>
                        </Pivot>
                      </div>
                      <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                      <p style={pageTitleStyle}>Sample Page Title</p>
                      </div>
                    </div>
                  </div>
                
                        <div className="ms-Grid">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><PrimaryButton onClick={ this._closeThemeDialog } text='Done' iconProps={ { iconName: 'Accept' } }/></div>
                      <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><DefaultButton onClick={ this._closeThemeDialog } text='Delete' iconProps={ { iconName: 'Cancel' } }/></div>
                      <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"></div>
                    </div>
                  </div>

                </div>
              </Modal>
              
              {/* <Dialog
                hidden={ this.state.hideThemeDialog }
                onDismiss={ this._closeThemeDialog }
                dialogContentProps={ {
                  type: DialogType.normal,
                  title: 'Add some colors',
                  // subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
                } }
                modalProps={ {
                  isBlocking: false,
                  containerClassName: 'ms-dialogMainOverride'
                } }
              >
        
                        <Pivot>
                          <PivotItem linkText='Font Size' itemKey="0">
                          <Slider
                              // label='Basic example:'
                              min={ 0 }
                              max={ 46 }
                              step={ 1 }
                              value = { this.state.configOptions.PageTitleTheme.fontSize}
                              showValue={ true }
                              // vertical={ true }
                              // tslint:disable-next-line:jsx-no-lambda
                              onChange={ value => { this.state.configOptions.PageTitleTheme.fontSize = value; this.setState(this.state)}} />
                          </PivotItem>
                          <PivotItem linkText='Font color' itemKey="1">
                          <div><label>Add font color</label>
                            <ColorPicker color={this.state.configOptions.PageTitleTheme.color} onColorChanged={color => {this.state.configOptions.PageTitleTheme.color = color; this.setState(this.state); this.props.save(this.state.configOptions)}}/>
                          </div></PivotItem>
                          <PivotItem linkText='Background color' itemKey="2">
                          <div>
                          <label>Add background color</label>
                          <ColorPicker color={this.state.configOptions.PageTitleTheme.backgroundColor} onColorChanged={color => {this.state.configOptions.PageTitleTheme.backgroundColor = color; this.setState(this.state); this.props.save(this.state.configOptions)}}/>
                          </div>
                          </PivotItem>
                        </Pivot>
                <DialogFooter>
                  <div className="ms-Grid">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><PrimaryButton onClick={ this._closeThemeDialog } text='Done' iconProps={ { iconName: 'Accept' } }/></div>
                      <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"></div>
                      <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4"><DefaultButton onClick={ this._closeThemeDialog } text='Delete' iconProps={ { iconName: 'Cancel' } }/></div>
                    </div>
                  </div>
                </DialogFooter>
              </Dialog> */}
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">Preview
              <p><strong>Preview</strong><br/>
                      Selected values - {this.state.configOptions.PageTitleTheme.fontSize},{this.state.configOptions.PageTitleTheme.color},{this.state.configOptions.PageTitleTheme.backgroundColor}
                      </p>
                </div>
            </div>
          </div>
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
          <p>click on button to apply colors</p>
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
              subText: 'Your changes have been successfully applied. Don\'t forget to Save & Publish this page to reflect changes to all users.'
            } }
            modalProps={ {
              titleAriaId: 'myLabelId',
              subtitleAriaId: 'mySubTextId',
              isBlocking: false,
              containerClassName: 'ms-dialogMainOverride'
            } }
          >
            { null /** You can also include null values as the result of conditionals */ }
            <ColorPicker color='#FFFFFF' />
            <DialogFooter>
              <PrimaryButton onClick={ this._closeFinishDialog } text='OK' />
            </DialogFooter>
          </Dialog>
        </PivotItem>        
      );

    if (this.props.editMode == 2) {
      return (
        <span className={styles.configLanding}>
          <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} selectedKey={ `${this.state.selectedKey}` } onLinkClick={ this.onPivotChange }>
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
    // var _configOptions = {
    //   "cachedTabKey": this.state.selectedKey,
    //   "hideQuickLaunchProperty": this.state.configOptions.hideQuickLaunchProperty,
    //   "hideSiteLogoProperty": this.state.configOptions.hideSiteLogoProperty,
    //   "hideSiteTitleProperty": this.state.configOptions.hideSiteTitleProperty,
    //   "hideSiteDescriptionProperty": this.state.configOptions.hideSiteDescriptionProperty,
    //   "hideSiteMembersProperty": this.state.configOptions.hideSiteMembersProperty,
    //   "hideTopNavProperty": this.state.configOptions.hideTopNavProperty,
    //   "hideTitleRowProperty": this.state.configOptions.hideTitleRowProperty,
    //   "hideCommandBarItemsProperty": this.state.configOptions.hideCommandBarItemsProperty,
    //   "hidePageTitleProperty": this.state.configOptions.hidePageTitleProperty,
    //   "hideSearchBoxProperty": this.state.configOptions.hideSearchBoxProperty,
    //   "hideShareButtonProperty": this.state.configOptions.hideShareButtonProperty,
    //   "PageTitleTheme":{
    //     "fontSize": this.state.configOptions.PageTitleTheme.fontSize,
    //     "color" : this.state.configOptions.PageTitleTheme.color,
    //     "backgroundColor": this.state.configOptions.PageTitleTheme.backgroundColor,
    //   }
    // };
    // _configOptions[checkBoxID] = checked!;
    // this.props.save(_configOptions);    
    // this.setState({configOptions: _configOptions});
    // this.render();
    this.state.configOptions[checkBoxID] = checked!;
    this.setState(this.state);
    this.props.save(this.state);
  }
  
  private _takeMetoNextPage(): void {
    this.setState({selectedKey: (this.state.selectedKey + 1) % 4});
  }
  private _takeMetoPrevPage(): void {
    this.setState({selectedKey: (this.state.selectedKey - 1) % 4});   
  }
  private _finishChanges(): void {
    // var _configOptions = {
    //   "cachedTabKey": this.state.selectedKey,
    //   "hideQuickLaunchProperty": this.state.configOptions.hideQuickLaunchProperty,
    //   "hideSiteLogoProperty": this.state.configOptions.hideSiteLogoProperty,
    //   "hideSiteTitleProperty": this.state.configOptions.hideSiteTitleProperty,
    //   "hideSiteDescriptionProperty": this.state.configOptions.hideSiteDescriptionProperty,
    //   "hideSiteMembersProperty": this.state.configOptions.hideSiteMembersProperty,
    //   "hideTopNavProperty": this.state.configOptions.hideTopNavProperty,
    //   "hideTitleRowProperty": this.state.configOptions.hideTitleRowProperty,
    //   "hideCommandBarItemsProperty": this.state.configOptions.hideCommandBarItemsProperty,
    //   "hidePageTitleProperty": this.state.configOptions.hidePageTitleProperty,
    //   "hideSearchBoxProperty": this.state.configOptions.hideSearchBoxProperty,
    //   "hideShareButtonProperty": this.state.configOptions.hideShareButtonProperty,
    //   "PageTitleTheme":{
    //     "fontSize": this.state.configOptions.PageTitleTheme.fontSize,
    //     "color" : this.state.configOptions.PageTitleTheme.color,
    //     "backgroundColor": this.state.configOptions.PageTitleTheme.backgroundColor,
    //   }
    // };
    this.props.save(this.state.configOptions);
    this.setState({ hideFinishDialog: false });    
  }
  private _closeFinishDialog() {
    this.setState({ hideFinishDialog: true });
  }
  private _showFinishDialog() {
    this.setState({ hideFinishDialog: false });
  }

  private _showThemeDialog() {
    this.setState({ hideThemeDialog: true });
  }
  private _closeThemeDialog() {
    this.setState({ hideThemeDialog: false });
  }
 
  public onPivotChange(item: PivotItem): void {
    this.setState({selectedKey:parseInt(item.props.itemKey) });
    // var _configOptions = {
    //   "cachedTabKey": this.state.selectedKey,
    //   "hideQuickLaunchProperty": this.state.configOptions.hideQuickLaunchProperty,
    //   "hideSiteLogoProperty": this.state.configOptions.hideSiteLogoProperty,
    //   "hideSiteTitleProperty": this.state.configOptions.hideSiteTitleProperty,
    //   "hideSiteDescriptionProperty": this.state.configOptions.hideSiteDescriptionProperty,
    //   "hideSiteMembersProperty": this.state.configOptions.hideSiteMembersProperty,
    //   "hideTopNavProperty": this.state.configOptions.hideTopNavProperty,
    //   "hideTitleRowProperty": this.state.configOptions.hideTitleRowProperty,
    //   "hideCommandBarItemsProperty": this.state.configOptions.hideCommandBarItemsProperty,
    //   "hidePageTitleProperty": this.state.configOptions.hidePageTitleProperty,
    //   "hideSearchBoxProperty": this.state.configOptions.hideSearchBoxProperty,
    //   "hideShareButtonProperty": this.state.configOptions.hideShareButtonProperty,      
    //   "PageTitleTheme":{
    //     "fontSize": this.state.configOptions.PageTitleTheme.fontSize,
    //     "color" : this.state.configOptions.PageTitleTheme.color,
    //     "backgroundColor": this.state.configOptions.PageTitleTheme.backgroundColor,
    //   }
    // };
    this.props.save(this.state.configOptions);
  }
  // Custom color code 
  // private _onColorChanged(color: string): void {
  //   this.state.configOptions.PageTitleTheme.color = color;
  //   this.setState(this.state);
  //   this.props.save(this.state.configOptions);
  // }
}
