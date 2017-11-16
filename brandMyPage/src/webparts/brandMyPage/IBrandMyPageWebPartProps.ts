export interface IBrandMyPageWebPartProps {
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
  StartConfigurations;
  // compactMode : boolean;

  configOptions:{
    "cachedTabKey": number,
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
    "hideShareButtonProperty": boolean,
    "PageTitleTheme":{
      "fontSize": number,
      "color" : string,
      "backgroundColor": string,
    }
  };  
}