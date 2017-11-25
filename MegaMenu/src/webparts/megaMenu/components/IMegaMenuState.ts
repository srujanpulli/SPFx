export interface IMegaMenuState {
  showPanel: boolean;
  stateMenuConfig: string;
  editHeading:{
    showHeadingPanel:boolean,
    headingID: number,
    headingTitle: string
  }
  editLink:{
    showLinkPanel:boolean,
    linkID: number,
    headingID: number,    
    linkTitle: string,
    linkUrl: string
  }
}
