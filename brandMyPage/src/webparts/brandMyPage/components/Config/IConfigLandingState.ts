export interface IConfigLandingState {
    // hideDialog: boolean;
    pivotToDisplay: number;
    selectedKey: number;
    isChecked:boolean;
    // _onhideUnhideChange: (boolean) => boolean;

    // hideQuickLaunchProperty: boolean;
    // hideSiteLogoProperty: boolean;
    // hideSiteTitleProperty: boolean;
    // hideSiteDescriptionProperty: boolean;
    // hideSiteMembersProperty: boolean;
    // hideTopNavProperty: boolean;
    // hideTitleRowProperty: boolean;
    // hideCommandBarItemsProperty: boolean;
    // hidePageTitleProperty: boolean;
    // hideSearchBoxProperty: boolean;
    // hideShareButtonProperty: boolean;

    configOptions:{
      "hideQuickLaunchProperty": boolean,
      "hideSiteLogoProperty": boolean,
      "hideSiteTitleProperty": boolean,
      "hideSiteDescriptionProperty": boolean,
      "hideSiteMembersProperty": boolean,
      "hideTopNavProperty": boolean,
      "hideTitleRowProperty": boolean,
      "hideCommandBarItemsProperty": boolean,
      "hidePageTitleProperty": boolean,
      "hideSearchBoxProperty": boolean,
      "hideShareButtonProperty": boolean
    };  
  }