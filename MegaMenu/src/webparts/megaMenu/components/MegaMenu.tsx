import * as React from 'react';
import styles from './MegaMenu.module.scss';
import { IMegaMenuProps } from './IMegaMenuProps';
import { IMegaMenuState } from './IMegaMenuState';
import { escape } from '@microsoft/sp-lodash-subset';

import { DefaultButton, CompoundButton, ActionButton, Button, IconButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
// import { Link } from 'office-ui-fabric-react/lib/Link';

export default class MegaMenu extends React.Component<IMegaMenuProps, IMegaMenuState> {
  
  constructor(props) {
    super(props);
    this.state = { 
      showPanel: false,
      stateMenuConfig: this.props.menuConfig,
      _isEditMode: this.props.isEditMode};
  }

  public render(): React.ReactElement<IMegaMenuProps> {

    class SingleHeader extends React.Component<{name, isEditModetmp}> {
      public render() {
        if(this.props.isEditModetmp)
        {
          return (
            <div className={`ms-Grid-row ${styles.hoverBorder}`}>
              <div className="ms-Grid-col ms-lg8">
                <h1 className={styles.heading}>{this.props.name}</h1>
              </div>
              <div className={`ms-Grid-col ms-lg1 ${styles.iconPaddingTop5px}`}>
              <IconButton iconProps={ { iconName: 'Edit' } } title='Edit' ariaLabel='Edit'  />
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
      return (<ul className={`${styles.links}`}>{allLinksInGroup}
               <ActionButton className={styles.redFont} iconProps={ { iconName: 'Add' }} text="Add a new link" />
              </ul>);
      }
    }    

    class SingleCard extends React.Component<{cardContents, isEditModetmp}> {
      public render() {
        return (
          <div className="ms-Grid-col ms-xl4 ms-lg6 ms-md6 ms-sm12">        
            <SingleHeader name={this.props.cardContents.heading} isEditModetmp={this.props.isEditModetmp} />
            <LinkGroup links={this.props.cardContents.links} isEditModetmp={this.props.isEditModetmp} />
          </div>);
      }
    }    

    class AddNewCard extends React.Component<any> {
      public render() {
        return <h1>Hello, {this.props}</h1>;
      }
    }    

    class AddNewLink extends React.Component<any> {
      public render() {
        return <h1>Hello, {this.props}</h1>;
      }
    }    

    class AllCards extends React.Component<{cardContents, isEditModetmp}> {
      public render() {
        let cards = this.props.cardContents;
        let allCardsInContainer = cards.map((card, index) =>
          <SingleCard cardContents={card} isEditModetmp={this.props.isEditModetmp}/>
        );
        return (<div className={`ms-Grid-row  ${styles.row}`}>{allCardsInContainer}
                    <PrimaryButton iconProps={ { iconName: 'Add' }} >
                        Add a new heading..
                    </PrimaryButton>
                </div>);
      }
    }

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
                        <div ><PrimaryButton iconProps={ { iconName: 'ChromeClose' } } onClick={ () => this.setState({ showPanel: false }) } >Dismiss</PrimaryButton></div>
                        <div ><PrimaryButton iconProps={ { iconName: 'Accept' } } onClick={ () => this.props.save(this.state.stateMenuConfig) } >Done</PrimaryButton></div>
                      </div>
                  );
                }}
                >
                <div>
                {/* <IconButton onClick={ () => this.setState({ showPanel: false })} iconProps={ { iconName: 'ChromeClose' } } title='Close' ariaLabel='Close'>Close</IconButton> */}
                {/* <DefaultButton checked={!this.state.showPanel} className={styles.burgerBarClose} onClick={ () => this.setState({ showPanel: false }) } ><div className={styles.close} ></div></DefaultButton> */}
                  <br/>
                  {/* START mega menu content */}
                  <div className={styles.megaMenu}>
                    <div className={styles.container}>
                      
                      <AllCards cardContents={JSON.parse(this.state.stateMenuConfig).cards} isEditModetmp={this.props.isEditMode} />
                      {/* <SingleCard cardContents={x}/> */}

                    </div>
                  </div>
                  {/* END mega menu content */}
                </div>
                {/* <div className={styles.megaMenu}>
                    <div className={styles.container}>
                      <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
                        <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
                          <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
                          <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
                          <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
                          <a href="https://aka.ms/spfx" className={styles.button}>
                            <span className={styles.label}>Learn more</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
              </Panel>
      </div>
    );
  }
}
