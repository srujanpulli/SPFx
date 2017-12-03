import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class PlaceHolder extends React.Component<any> {
    public render(): React.ReactElement<any> {
        return (<MessageBar messageBarType={MessageBarType.info} >
        <ul>
            <li>Click on Menu to start configuring your menu</li>
            <li>Optionally, you will be able to copy configuration text from/ to 'properties' to any other page.</li>
        </ul>
        </MessageBar>)
    }        
}