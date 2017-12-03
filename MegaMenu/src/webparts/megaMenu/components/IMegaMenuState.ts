export interface IMegaMenuState {
  showPanel: boolean;
  stateMenuConfig: string;
  editHeading:{
    isNewItem:boolean,
    showHeadingPanel:boolean,
    headingID: number,
    headingTitle: string
  };
  editLink:{
    isNewItem:boolean,
    showLinkPanel:boolean,
    linkID: number,
    headingID: number,    
    linkTitle: string,
    linkUrl: string,
    iconName: string
  };
  // SaveProps:{
  //   showDialog:boolean;
  // };
  // IgnoreProps:{
  //   showDialog:boolean;
  // };
}
