export interface IBrandMyPageProps {
  // description: string;
  hideQuickLaunchProperty: boolean;
  hideSiteLogoProperty: boolean;
  hideSiteTitleProperty: boolean;
  hideSiteDescriptionProperty: boolean;
  hideSiteMembersProperty: boolean;
  hideTopNavProperty: boolean;
  hideTitleRowProperty: boolean;
  hideCommandBarItemsProperty: boolean;
  hidePageTitleProperty: boolean;
  hideSearchBoxProperty: boolean;
  hideShareButtonProperty: boolean;
  configureWebPart: () => void;
  editMode: number
}
export interface IEditModeTextProps {
  configAction: () => void;
}
export interface IEditModeTextState {
  hideDialog: boolean;
}