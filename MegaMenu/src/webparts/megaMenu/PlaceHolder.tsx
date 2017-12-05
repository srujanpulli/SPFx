import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export default class PlaceHolder extends React.Component<any> {
    public render(): React.ReactElement<any> {
        return (<MessageBar messageBarType={MessageBarType.info} >
        <ul>
            <li><strong>Note: </strong> This webpart will be hidden after refresh on 'Read' view and only Menu will be visible.</li>
            <li>Click on Menu to start configuring your menu</li>
            <li>Optionally, you will be able to copy configuration text from/ to 'properties' to any other page.</li>
            <li>If you don't want this mega menu, delete this webpart.</li>
        </ul>
        </MessageBar>)
    }        
}