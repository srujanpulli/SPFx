export interface IBrandMyPageWebPartProps {
  StartConfigurations;
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
    "masterTheme":{
      "isCustomized":boolean,
      "backgroundColor" : string,
    },
    "topNav":{
      "isCustomized":boolean,
      "color": string,
      "backgroundColor" : string,
      "hoverColor": string,
      "hoverBackgroundColor" : string
    },
    "quickLaunch":{
      "isCustomized":boolean,
      "color": string,
      "backgroundColor" : string,
      "hoverColor": string,
      "hoverBackgroundColor" : string
    },
    "SiteTitle":{
      "isCustomized":boolean,
      "fontSize": number,
      "color" : string,
    },
    "PageTitle":{
      "isCustomized":boolean,
      "fontSize": number,
      "color" : string,
    }
  };  
}