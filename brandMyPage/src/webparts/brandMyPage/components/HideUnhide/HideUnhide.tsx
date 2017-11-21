import * as React from 'react';
import { IHideUnhideProps } from './IHideUnhideProps';
import { IHideUnhideState } from './IHideUnhideState';
// import { escape } from '@microsoft/sp-lodash-subset';

// import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

// import { autobind } from 'office-ui-fabric-react/lib/Utilities';
// import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import styles from './IHideUnhide.module.scss';

import 'jQuery';
declare var $;
// var tmp = this.state.configOptions.masterTheme.backgroundColor;

export default class HideUnhide extends React.Component<IHideUnhideProps, {}> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    public componentDidMount() {
        // apply hide styles?
        //  alert("mount success")
        // $(".ms-CommandBarItem-link").hide();      

    }
    public componentWillUnmount() {
        // apply show styles?
        // alert("UN ---- mount success")
    }
    public render(): React.ReactElement<IHideUnhideProps> {
        // custom style objects
        var customStyles = {
            "masterTheme": {
                "background-color": this.props.configOptions.masterTheme.backgroundColor
            }
        };

        // require('./App.js');
        function hideQuickLaunch() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#sideNavBox").hide();
                $("#contentBox").css("margin-left", "5px");
            }
            else {
                $("nav[role='navigation']").hide();
                hideSearchBox();
                $("div[class^='pageContainer_']").css("left", "0px");
            }
        }
        function showQuickLaunch() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#sideNavBox").show();
                $("#contentBox").css("margin-left", "220px");
            }
            else {
                $("nav[role='navigation']").show();
                // $("div[class^='searchBox_']").show();
                $("div[class^='pageContainer_']").css("left", $("nav[role='navigation']").css("width"));
                if (!($("#divhideSearchBox").length == 0))
                    hideSearchBox();
                else
                    showSearchBox();
            }
        }
        //hide Site Top Navigation bar
        function hideTopNav() {
            if ($('#s4-bodyContainer').length > 0) {
                $(".ms-breadcrumb-top").hide();
            }
            else {
                $(".ms-compositeHeader-topWrapper").hide();
            }
            hideSearchBox();
        }
        function showTopNav() {
            if ($('#s4-bodyContainer').length > 0) {
                $(".ms-breadcrumb-top").show();
            }
            else {
                $(".ms-compositeHeader-topWrapper").show();
            }
            if (!($("#divhideSearchBox").length == 0))
                hideSearchBox();
            else
                showSearchBox();
        }
        //hide Site Logo
        function hideSiteLogo() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#siteIcon").hide();
            }
            else {
                $(".ms-siteHeader-siteLogo").hide();
            }
        }
        function showSiteLogo() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#siteIcon").show();
            }
            else {
                $(".ms-siteHeader-siteLogo").show();
            }
        }
        //hide Site Title
        function hideSiteTitle() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#pageTitle").hide();
            }
            else {
                $(".ms-siteHeader-siteName").hide();
            }
        }
        function showSiteTitle() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#pageTitle").show();
            }
            else {
                $(".ms-siteHeader-siteName").show();
            }
        }
        //hide Site Description
        function hideSiteDescription() {
            $(".ms-siteHeader-groupInfo").hide();
        }
        function showSiteDescription() {
            $(".ms-siteHeader-groupInfo").show();
        }
        //hide Site Members
        function hideSiteMembers() {
            $(".ms-compositeHeader-peopleInfo").hide();
        }
        function showSiteMembers() {
            $(".ms-compositeHeader-peopleInfo").show();
        }
        //hide Site Title row
        function hideTitleRow() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#s4-titlerow").hide();
            }
            else {
                $(".ms-compositeHeader").hide();
            }
        }
        function showTitleRow() {
            if ($('#s4-bodyContainer').length > 0) {
                $("#s4-titlerow").show();
            }
            else {
                $(".ms-compositeHeader").show();
            }
        }
        //hide Site Title row
        function hideCommandBarItems() {
            $(".ms-CommandBarItem-link").hide();
        }
        function showCommandBarItems() {
            $(".ms-CommandBarItem-link").show();
        }
        //hide Site Title row
        function hidePageTitle() {
            if (!(window.location.href.indexOf("?Mode=Edit") > -1))
                $("div[class^='pageTitle_']").hide();
        }
        function showPageTitle() {
            $("nav[class^='root_']").show();
        }
        // Hide Search box 
        function hideSearchBox() {
            if ($('#s4-bodyContainer').length > 0)
                $("#DeltaPlaceHolderSearchArea").hide();
            else
                $("div[class^='searchBox_']").hide();
        }
        function showSearchBox() {
            if ($("#divHideTitleRow").length == 0 && $("#divHideQuickLaunch").length == 0) {
                if ($('#s4-bodyContainer').length > 0)
                    $("#DeltaPlaceHolderSearchArea").show();
                else
                    $("div[class^='searchBox_']").show();
            }
        }

        //Hide Share Button
        function hideShareButton() {
            $("span:contains('Share')").filter(function () {
                return $(this).text() === "Share" ? true : false;
            }).closest("button").hide();
        }
        function showShareButton() {
            $("span:contains('Share')").filter(function () {
                return $(this).text() === "Share" ? true : false;
            }).closest("button").show();
        }

        // Start custom themes
        function applyCustomMasterTheme() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {
                var styleProps = $("#divMasterTHemeCustomStyles").css([
                    "background-color"
                ]);
                $.each(styleProps, function (prop, value) {
                    if($(".ms-compositeHeader").length > 0)
                    {
                        $(".ms-compositeHeader").css(prop, value);
                    }
                    if($("nav[class^='ms-Nav']").length > 0)
                    {
                        $("nav[class^='ms-Nav']").css("background-color",value);
                        $("nav[class^='ms-Nav']").css("top","0px");
                        $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color",value,"important");
                        $("div[class^='ms-Nav-compositeLink']").css("background-color",value);
                    }
                    hideSearchBox();
                    // $("#workbenchPageContent").css(prop, value)
                });
            }
        }
        function removeCustomMasterTheme() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {       
                if($(".ms-compositeHeader").length > 0)
                {
                    $(".ms-compositeHeader").css("background-color","");
                }
                if($("nav[class^='ms-Nav']").length > 0)
                {
                    $("nav[class^='ms-Nav']").css("background-color","");
                    $("nav[class^='ms-Nav']").css("top","40px");
                    $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color","","important");
                    $("div[class^='ms-Nav-compositeLink']").css("background-color","");
                }
                    showSearchBox();
            }
        }
        function applyCustomTopNav() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {
                var styleProps = $("#divMasterTHemeCustomStyles").css([
                    "background-color"
                ]);
                $.each(styleProps, function (prop, value) {
                    if($(".ms-compositeHeader").length > 0)
                    {
                        $(".ms-compositeHeader").css(prop, value);
                    }
                    if($("nav[class^='ms-Nav']").length > 0)
                    {
                        $("nav[class^='ms-Nav']").css("background-color",value);
                        $("nav[class^='ms-Nav']").css("top","0px");
                        $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color",value,"important");
                        $("div[class^='ms-Nav-compositeLink']").css("background-color",value);
                    }
                    hideSearchBox();
                    // $("#workbenchPageContent").css(prop, value)
                });
            }
        }
        function removeCustomTopNav() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {       
                if($(".ms-compositeHeader").length > 0)
                {
                    $(".ms-compositeHeader").css("background-color","");
                }
                if($("nav[class^='ms-Nav']").length > 0)
                {
                    $("nav[class^='ms-Nav']").css("background-color","");
                    $("nav[class^='ms-Nav']").css("top","40px");
                    $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color","","important");
                    $("div[class^='ms-Nav-compositeLink']").css("background-color","");
                }
                    showSearchBox();
            }
        }

        function applyCustomQuiLaunch() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {
                var styleProps = $("#divMasterTHemeCustomStyles").css([
                    "background-color"
                ]);
                $.each(styleProps, function (prop, value) {
                    if($(".ms-compositeHeader").length > 0)
                    {
                        $(".ms-compositeHeader").css(prop, value);
                    }
                    if($("nav[class^='ms-Nav']").length > 0)
                    {
                        $("nav[class^='ms-Nav']").css("background-color",value);
                        $("nav[class^='ms-Nav']").css("top","0px");
                        $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color",value,"important");
                        $("div[class^='ms-Nav-compositeLink']").css("background-color",value);
                    }
                    hideSearchBox();
                    // $("#workbenchPageContent").css(prop, value)
                });
            }
        }
        function removeCustomQuiLaunch() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {       
                if($(".ms-compositeHeader").length > 0)
                {
                    $(".ms-compositeHeader").css("background-color","");
                }
                if($("nav[class^='ms-Nav']").length > 0)
                {
                    $("nav[class^='ms-Nav']").css("background-color","");
                    $("nav[class^='ms-Nav']").css("top","40px");
                    $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color","","important");
                    $("div[class^='ms-Nav-compositeLink']").css("background-color","");
                }
                    showSearchBox();
            }
        }
        function applyCustomSiteTitle() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {
                var styleProps = $("#divMasterTHemeCustomStyles").css([
                    "background-color"
                ]);
                $.each(styleProps, function (prop, value) {
                    if($(".ms-compositeHeader").length > 0)
                    {
                        $(".ms-compositeHeader").css(prop, value);
                    }
                    if($("nav[class^='ms-Nav']").length > 0)
                    {
                        $("nav[class^='ms-Nav']").css("background-color",value);
                        $("nav[class^='ms-Nav']").css("top","0px");
                        $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color",value,"important");
                        $("div[class^='ms-Nav-compositeLink']").css("background-color",value);
                    }
                    hideSearchBox();
                    // $("#workbenchPageContent").css(prop, value)
                });
            }
        }
        function removeCustomSiteTitle() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {       
                if($(".ms-compositeHeader").length > 0)
                {
                    $(".ms-compositeHeader").css("background-color","");
                }
                if($("nav[class^='ms-Nav']").length > 0)
                {
                    $("nav[class^='ms-Nav']").css("background-color","");
                    $("nav[class^='ms-Nav']").css("top","40px");
                    $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color","","important");
                    $("div[class^='ms-Nav-compositeLink']").css("background-color","");
                }
                    showSearchBox();
            }
        }
        function applyCustomPageTitle() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {
                var styleProps = $("#divMasterTHemeCustomStyles").css([
                    "background-color"
                ]);
                $.each(styleProps, function (prop, value) {
                    if($(".ms-compositeHeader").length > 0)
                    {
                        $(".ms-compositeHeader").css(prop, value);
                    }
                    if($("nav[class^='ms-Nav']").length > 0)
                    {
                        $("nav[class^='ms-Nav']").css("background-color",value);
                        $("nav[class^='ms-Nav']").css("top","0px");
                        $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color",value,"important");
                        $("div[class^='ms-Nav-compositeLink']").css("background-color",value);
                    }
                    hideSearchBox();
                    // $("#workbenchPageContent").css(prop, value)
                });
            }
        }
        function removeCustomPageTitle() {
            if ($('#s4-bodyContainer').length > 0)//Classic page
            {

            }
            else //Modern page
            {       
                if($(".ms-compositeHeader").length > 0)
                {
                    $(".ms-compositeHeader").css("background-color","");
                }
                if($("nav[class^='ms-Nav']").length > 0)
                {
                    $("nav[class^='ms-Nav']").css("background-color","");
                    $("nav[class^='ms-Nav']").css("top","40px");
                    $("nav[class^='ms-Nav']")[0].style.setProperty("border-right-color","","important");
                    $("div[class^='ms-Nav-compositeLink']").css("background-color","");
                }
                    showSearchBox();
            }
        }
        // End custom themes    

        // css updates to hide on page load.
        if (this.props.configOptions.hideQuickLaunchProperty)
            hideQuickLaunch();
        else
            showQuickLaunch();

        if (this.props.configOptions.hideTitleRowProperty) {
            hideTitleRow();
            hideSearchBox();
        }
        else {
            showTitleRow();
            showSearchBox();

            if (this.props.configOptions.hideTopNavProperty)
                hideTopNav();
            else
                showTopNav();
            if (this.props.configOptions.hideSiteLogoProperty)
                hideSiteLogo();
            else
                showSiteLogo();
            if (this.props.configOptions.hideSiteTitleProperty)
                hideSiteTitle();
            else
                showSiteTitle();
            if (this.props.configOptions.hideSiteDescriptionProperty)
                hideSiteDescription();
            else
                showSiteDescription();
            if (this.props.configOptions.hideSiteMembersProperty)
                hideSiteMembers();
            else
                showSiteMembers();
            if (this.props.configOptions.hideSearchBoxProperty)
                hideSearchBox();
            else
                showSearchBox();
            if (this.props.configOptions.hideShareButtonProperty)
                hideShareButton();
            else
                showShareButton();
        }
        if (this.props.configOptions.hideCommandBarItemsProperty)
            hideCommandBarItems();
        else
            showCommandBarItems();
        if (this.props.configOptions.hidePageTitleProperty)
            hidePageTitle();
        else
            showPageTitle();

        //apply custom styles
        if (this.props.configOptions.masterTheme.isCustomized) {
            applyCustomMasterTheme();
        }
        else {
            removeCustomMasterTheme();
        }

        //Start page navigation triggers
        $("body").bind("DOMSubtreeModified", () => {
            if (window.location.href.indexOf("?Mode=Edit") > -1) {
                $("#divWPLoaded").show();
            }
            else {
                $("#divWPLoaded").hide();
            }
            if ($("#divHideTitleRow").length == 0) {
                showTitleRow();
                if ($("#divHideTopNav").length == 0)
                    showTopNav();
                else
                    hideTopNav();

                if ($("#divHideSiteLogo").length == 0)
                    showSiteLogo();
                else
                    hideSiteLogo();

                if ($("#divHideSiteTitle").length == 0)
                    showSiteTitle();
                else
                    hideSiteTitle();

                if ($("#divHideSiteDescription").length == 0)
                    showSiteDescription();
                else
                    hideSiteDescription();

                if ($("#divHideSiteMembers").length == 0)
                    showSiteMembers();
                else
                    hideSiteMembers();

                if ($("#divhideSearchBox").length == 0)
                    showSearchBox();
                else
                    hideSearchBox();

                if ($("#divhideShareButton").length == 0)
                    showShareButton();
                else
                    hideShareButton();
            }
            else {
                hideTitleRow();
            }

            if ($("#divHideCommandBarItems").length == 0)
                showCommandBarItems();
            else
                hideCommandBarItems();

            if ($("#divHidePageTitle").length == 0)
                showPageTitle();
            else
                hidePageTitle();
            if ($("#divHideQuickLaunch").length == 0)//check divHideQuickLaunch doesn't exist on the page
                showQuickLaunch();
            else
                hideQuickLaunch();

        if ($("#divMasterTHemeCustomized").length > 0) {
            applyCustomMasterTheme();
        }
        else {
            removeCustomMasterTheme();
        }
        }); // End page navigation updates method


        function IsQuickLaunchHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideQuickLaunch" className={styles.hide}>hide quicklaunch</div>); }
            else { return (null); }
        }
        function IsSiteLogoHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideSiteLogo" className={styles.hide}>hide Site Logo</div>); }
            else { return (null); }
        }
        function IsSiteTitleHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideSiteTitle" className={styles.hide}>hide Site Title</div>); }
            else { return (null); }
        }
        function IsSiteDescriptionHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideSiteDescription" className={styles.hide}>hide Site Description</div>); }
            else { return (null); }
        }
        function IsSiteMembersHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideSiteMembers" className={styles.hide}>hide Site Members</div>); }
            else { return (null); }
        }
        function IsTopNavHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideTopNav" className={styles.hide}>hide Top Nav</div>); }
            else { return (null); }
        }
        function IsTitleRowHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideTitleRow" className={styles.hide}>hide title row</div>); }
            else { return (null); }
        }
        function IsCommandBarItemsHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHideCommandBarItems" className={styles.hide}>hide command bar items</div>); }
            else { return (null); }
        }
        function IsPageTitleHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divHidePageTitle" className={styles.hide}>hide page title</div>); }
            else { return (null); }
        }
        function IsSearchBoxHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divhideSearchBox" className={styles.hide}>hide search box</div>); }
            else { return (null); }
        }
        function IsShareButtonHidden(props) {
            if (props.isHidden) { return (<div hidden={true} id="divhideShareButton" className={styles.hide}>hide share button</div>); }
            else { return (null); }
        }

        function IsMasterThemeCustomized(props) {
            if (props.isHidden) { return (<div hidden={true} id="divMasterTHemeCustomized" className={styles.hide}><span id="divMasterTHemeCustomStyles" style={customStyles.masterTheme}></span></div>); }
            else { return (null); }
        }

        // return (null); if you want to return null
        console.log("HideUnHide - React component is loaded");


        return (<span hidden={true} className={styles.hideUnhide}>
            <IsQuickLaunchHidden isHidden={this.props.configOptions.hideQuickLaunchProperty} />
            <IsSiteLogoHidden isHidden={this.props.configOptions.hideSiteLogoProperty} />
            <IsSiteTitleHidden isHidden={this.props.configOptions.hideSiteTitleProperty} />
            <IsSiteDescriptionHidden isHidden={this.props.configOptions.hideSiteDescriptionProperty} />
            <IsSiteMembersHidden isHidden={this.props.configOptions.hideSiteMembersProperty} />
            <IsTopNavHidden isHidden={this.props.configOptions.hideTopNavProperty} />
            <IsTitleRowHidden isHidden={this.props.configOptions.hideTitleRowProperty} />
            <IsCommandBarItemsHidden isHidden={this.props.configOptions.hideCommandBarItemsProperty} />
            <IsPageTitleHidden isHidden={this.props.configOptions.hidePageTitleProperty} />
            <IsSearchBoxHidden isHidden={this.props.configOptions.hideSearchBoxProperty} />
            <IsShareButtonHidden isHidden={this.props.configOptions.hideShareButtonProperty} />

            <IsMasterThemeCustomized isHidden={this.props.configOptions.masterTheme.isCustomized} /></span>
        );

    }//end of render

}
