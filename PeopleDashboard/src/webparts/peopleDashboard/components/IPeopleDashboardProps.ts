import { Button } from "office-ui-fabric-react";
import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IPeopleDashboardProps {
  webpartTitle: string;
  selectList: string;
  createNewList: string;
  btnCreateList: Button;
  compactMode: boolean;

  spHttpClient: SPHttpClient;
  configureWebPart:() => void;
  context: WebPartContext;
  webPartDisplayMode: DisplayMode;
}