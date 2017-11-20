import {IBrandMyPageWebPartProps} from "./../../IBrandMyPageWebPartProps";

export interface IConfigLandingState {
    selectedKey: number;
    isChecked:boolean;
    hideFinishDialog: boolean;
    hideMasterThemeDialog: boolean;
    hideTopNavThemeDialog: boolean;
    hideQuLaunchThemeDialog: boolean;
    hideSiteTitleThemeDialog: boolean;
    hidePageTitleThemeDialog: boolean;
    configOptions: IBrandMyPageWebPartProps["configOptions"];    
  }