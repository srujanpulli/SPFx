import * as React from 'react';
import styles from './MegaMenu.module.scss';
import { IMegaMenuProps } from './IMegaMenuProps';
import { IMegaMenuState } from './IMegaMenuState';
import { escape } from '@microsoft/sp-lodash-subset';

import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';


export default class MegaMenu extends React.Component<IMegaMenuProps, IMegaMenuState> {
  
  constructor(props) {
    super(props);
    this.state = { showPanel: false };
  }

  public render(): React.ReactElement<IMegaMenuProps> {
    return (
      <div className={styles.megaMenu}>
            <PrimaryButton className={styles.megaBotton} onClick={ () => this.setState({ showPanel: true }) } ><div className={styles.burgerBar} ></div></PrimaryButton>
            <Panel
                isOpen={ this.state.showPanel }
                type={ PanelType.smallFluid }
                // tslint:disable-next-line:jsx-no-lambda
                onDismiss={ () => this.setState({ showPanel: false }) }
                headerText='Panel - Small, right-aligned, fixed'
                >
                <span>Content goes here.</span>
              </Panel>
      </div>
          //   <div className={styles.megaMenu}>
          //   <div className={styles.container}>
          //     <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
          //       <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
          //         <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
          //         <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
          //         <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
          //         <a href="https://aka.ms/spfx" className={styles.button}>
          //           <span className={styles.label}>Learn more</span>
          //         </a>
          //       </div>
          //     </div>
          //   </div>
          // </div>
    );
  }
}
