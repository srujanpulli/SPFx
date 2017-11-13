export interface IConfigLandingProps {
  configureWebPart: () => void;
  editMode: number;

  //add all other props
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
  //state props
  pivotToDisplay: number;

}
  