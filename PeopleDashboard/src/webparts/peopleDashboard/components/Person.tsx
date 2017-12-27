import * as React from 'react';
import styles from './PeopleDashboard.module.scss';
import { IPersonProps } from './IPersonProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Button, BaseButton } from 'office-ui-fabric-react/lib/Button';
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { HoverCard, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import { Placeholder } from '../../../controls/placeholder';

export default class Person extends React.Component<IPersonProps, {}> {
  
    
    public render(): React.ReactElement<IPersonProps> {
      var tmpInitials = this.props.fullName;
      if(this.props.fullName != null && this.props.fullName != undefined && this.props.fullName != "")
      {
        const examplePersona = {
          imageUrl: this.props.profilePic,
          imageInitials: tmpInitials.match(/\b(\w)/g).join(''),
          primaryText: this.props.fullName,
          secondaryText: this.props.shortDescription,
        };
        const expandingCardProps: IExpandingCardProps = {
          onRenderCompactCard: this._onRenderCompactCard,
          onRenderExpandedCard: this._onRenderExpandedCard,
          compactCardHeight: 125,
          expandedCardHeight: 280
          // renderData: item
        };
        if(this.props.compactMode)
        {
          return (
            <div className={`ms-Grid-col ${styles.personButtonMini}`}>
              <HoverCard expandingCardProps={ expandingCardProps } instantOpenOnClick={ true } expandedCardOpenDelay={100}>
              {/* sticky={true} */}
                <Persona { ...examplePersona } size={ PersonaSize.large}  hidePersonaDetails={ true }/>
              </HoverCard>
            </div>
          );
        }
        else
        {
          return (
            <div className={`ms-Grid-col ${styles.personButton}`}>
              <HoverCard expandingCardProps={ expandingCardProps } instantOpenOnClick={ true } expandedCardOpenDelay={100}>
              {/* sticky={true} */}
                <Persona { ...examplePersona } size={ PersonaSize.extraLarge }  hidePersonaDetails={ false }/>
              </HoverCard>
            </div>
          );
        }
      }
      else
      return (
        <div>Please fill in details</div>
      );
      
    }
    @autobind
    private _onRenderCompactCard(): JSX.Element {
      var tmpInitials = this.props.fullName;
      const examplePersona = {
        imageUrl: this.props.profilePic,
        imageInitials: tmpInitials.match(/\b(\w)/g).join(''),
        primaryText: this.props.fullName,
        secondaryText: this.props.shortDescription,
      };
      return (
        <div className={`hoverCardExample-compactCard ${styles.padding10}`}>
          <Persona { ...examplePersona } size={ PersonaSize.extraLarge }  hidePersonaDetails={ true }/>
        </div>
      );
    }
  
    @autobind
    private _onRenderExpandedCard(): JSX.Element {
      return (
        <div className={`hoverCardExample-expandedCard ${styles.padding10}`}>
          {/* Sample expanded content */}
          <div className={`ms-fontSize-xl`}>{this.props.fullName}</div>
          <div className={`ms-fontSize-sPlus ms-fontWeight-semilight`}>{this.props.shortDescription}</div>
          <div dangerouslySetInnerHTML={{__html:this.props.fullDescription}}></div>
        </div>
      );
    }
    
  }