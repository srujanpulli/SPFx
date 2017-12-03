import * as React from 'react';
import styles from './AllFabricIcons.module.scss';
import { IAllFabricIconsProps } from './IAllFabricIconsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AllFabricIcons extends React.Component<IAllFabricIconsProps, {}> {
  public render(): React.ReactElement<IAllFabricIconsProps> {

let allIcons = JSON.parse(this.props.allIcons).allicons;
let allIconsContainer = allIcons.map((icon, index) =>
<div className={`ms-Grid-row ${styles.row}`}>
<div className="ms-Grid-col ms-xl1 ms-lg1 ms-md1 ms-sm1 ms-xs1"><i className={`ms-Icon ms-Icon--${icon}`} title={icon} aria-hidden="true"></i></div>
  <div className="ms-Grid-col ms-xl6 ms-lg6 ms-md6 ms-sm6 ms-xs6">{icon}</div>
</div>
);
    return (
      <div className={styles.allFabricIcons}>
        <div className={styles.container}>
        {allIconsContainer}
        </div>
      </div>
    );
  }
}
