declare interface IBrandMyPageWebPartStrings {
  // BasicGroupName: string;
  // DescriptionFieldLabel: string;
  PropertyPaneDescription: string;
  hideQuickLaunchLabel: string;
  hideSiteLogoLabel: string,
  hideSiteTitle: string,
  hideSiteDescription: string,
  hideSiteMembers: string,
  hideTopNav: string,
  hideTitleRow: string,
  hideCommandBarItems: string,    
  hidePageTitle: string,
  hideSearchBox:string,
  hideShareButton:string
}

declare module 'BrandMyPageWebPartStrings' {
  const strings: IBrandMyPageWebPartStrings;
  export = strings;
}
