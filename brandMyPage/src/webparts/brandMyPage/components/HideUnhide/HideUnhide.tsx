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

export default class HideUnhide extends React.Component<IHideUnhideProps, {}> {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  public componentDidMount() 
    {
      // apply hide styles?
      //  alert("mount success")
      // $(".ms-CommandBarItem-link").hide();      

    }
  public componentWillUnmount() 
    {
      // apply show styles?
      // alert("UN ---- mount success")
    }
  public render(): React.ReactElement<IHideUnhideProps> {    
    // require('./App.js');
    function hideQuickLaunch()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#sideNavBox").hide();
            $("#contentBox").css("margin-left","5px")            
        }
        else
        {
            $( "nav[role='navigation']" ).hide();
            hideSearchBox();
            $("div[class^='pageContainer_']").css( "left", "0px" );
        }        
    }
    function showQuickLaunch()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#sideNavBox").show();
            $("#contentBox").css("margin-left","220px")                        
        }
        else
        {
            $( "nav[role='navigation']" ).show();
            // $("div[class^='searchBox_']").show();
            $("div[class^='pageContainer_']").css( "left", $( "nav[role='navigation']" ).css("width")); 
            if(!($("#divhideSearchBox").length == 0))
                hideSearchBox();
            else
                showSearchBox();
        } 
    }
    //hide Site Top Navigation bar
    function hideTopNav()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $(".ms-breadcrumb-top").hide();
        }
        else
        {
            $(".ms-compositeHeader-topWrapper").hide();                            
        }
        hideSearchBox();
    }
    function showTopNav()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $(".ms-breadcrumb-top").show();
        }
        else
        {
            $(".ms-compositeHeader-topWrapper").show();                            
        }
        if(!($("#divhideSearchBox").length == 0))
            hideSearchBox();
        else
            showSearchBox();         
    }    
    //hide Site Logo
    function hideSiteLogo()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#siteIcon").hide()
        }
        else
        {
            $(".ms-siteHeader-siteLogo").hide();    
        } 
    }
    function showSiteLogo()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#siteIcon").show()
        }
        else
        {
            $(".ms-siteHeader-siteLogo").show();            
        } 
    }
    //hide Site Title
    function hideSiteTitle()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#pageTitle").hide();
        }
        else
        {
            $(".ms-siteHeader-siteName").hide();                    
        } 
    }
    function showSiteTitle()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#pageTitle").show();
        }
        else
        {
            $(".ms-siteHeader-siteName").show();                    
        } 
    }
    //hide Site Description
    function hideSiteDescription()
    {
            $(".ms-siteHeader-groupInfo").hide();                    
    }
    function showSiteDescription()
    {
            $(".ms-siteHeader-groupInfo").show();                    
    }
    //hide Site Members
    function hideSiteMembers()
    {
            $(".ms-compositeHeader-peopleInfo").hide();                                    
    }
    function showSiteMembers()
    {
            $(".ms-compositeHeader-peopleInfo").show();                    
    }
    //hide Site Title row
    function hideTitleRow()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#s4-titlerow").hide();            
        }
        else
        {
            $(".ms-compositeHeader").hide();                            
        } 
    }
    function showTitleRow()
    {
        if($('#s4-bodyContainer').length > 0)
        {
            $("#s4-titlerow").show();            
        }
        else
        {
            $(".ms-compositeHeader").show();                            
        } 
    }
    //hide Site Title row
    function hideCommandBarItems()
    { 
        $(".ms-CommandBarItem-link").hide();
    }
    function showCommandBarItems()
    {
        $(".ms-CommandBarItem-link").show();
    }  
      //hide Site Title row
    function hidePageTitle()
    {
        if(!(window.location.href.indexOf("?Mode=Edit") > -1))
            $("div[class^='pageTitle_']").hide();        
    }
    function showPageTitle()
    {
        $("div[class^='pageTitle_']").show();
    } 
    // Hide Search box 
    function hideSearchBox()
    {
            if($('#s4-bodyContainer').length > 0)
                $("#DeltaPlaceHolderSearchArea").hide();
            else
                $("div[class^='searchBox_']").hide();
    }
    function showSearchBox()
    {
        if($("#divHideTitleRow").length == 0 && $("#divHideQuickLaunch").length == 0)
        {
            if($('#s4-bodyContainer').length > 0)      
                $("#DeltaPlaceHolderSearchArea").show();
            else
                $("div[class^='searchBox_']").show();
        }
    }   
    
    //Hide Share Button
    function hideShareButton()
    {
        $("span:contains('Share')").filter(function(){
            return $(this).text() === "Share" ? true : false;
        }).closest("button").hide();  
    }
    function showShareButton()
    {
        $("span:contains('Share')").filter(function(){
            return $(this).text() === "Share" ? true : false;
        }).closest("button").show();
    }    
        
    // css updates to hide on page load.
      if(this.props.hideQuickLaunchProperty)
        hideQuickLaunch();
      else
        showQuickLaunch();

      if(this.props.hideTitleRowProperty)
      {
          hideTitleRow();
          hideSearchBox();
      }
      else
      {
          showTitleRow();
          showSearchBox;

          if(this.props.hideTopNavProperty)
              hideTopNav(); 
            else
              showTopNav();     
          if(this.props.hideSiteLogoProperty)
              hideSiteLogo();
            else
              showSiteLogo();
          if(this.props.hideSiteTitleProperty)
              hideSiteTitle();
            else
              showSiteTitle();
          if(this.props.hideSiteDescriptionProperty)
              hideSiteDescription();   
            else
              showSiteDescription();
          if(this.props.hideSiteMembersProperty)
              hideSiteMembers(); 
            else
              showSiteMembers();
          if(this.props.hideSearchBoxProperty)
              hideSearchBox();
            else
              showSearchBox();
          if(this.props.hideShareButtonProperty)
              hideShareButton();
            else
              showShareButton();
      }   
      if(this.props.hideCommandBarItemsProperty)
          hideCommandBarItems();   
      else
          showCommandBarItems();
      if(this.props.hidePageTitleProperty)
          hidePageTitle();
        else
          showPageTitle();

//Start page navigation triggers
$( "body" ).bind("DOMSubtreeModified",function() {
  if(window.location.href.indexOf("?Mode=Edit") > -1)
  {
      $("#divWPLoaded").show();
  }
  else
  {
    $("#divWPLoaded").hide();
  }        
  if($("#divHideTitleRow").length == 0)
  {
      showTitleRow();
      if($("#divHideTopNav").length == 0)
          showTopNav();
      else
          hideTopNav();  

      if($("#divHideSiteLogo").length == 0)
          showSiteLogo();
      else
          hideSiteLogo();

      if($("#divHideSiteTitle").length == 0)
          showSiteTitle();
      else
          hideSiteTitle();

      if($("#divHideSiteDescription").length == 0)
          showSiteDescription();
      else
          hideSiteDescription();

      if($("#divHideSiteMembers").length == 0)
          showSiteMembers();
      else
          hideSiteMembers(); 
          
      if($("#divhideSearchBox").length == 0)
          showSearchBox();
      else
          hideSearchBox();

      if($("#divhideShareButton").length == 0)
          showShareButton();
      else
          hideShareButton();
  }
  else
  {
      hideTitleRow();           
  }

  if($("#divHideCommandBarItems").length == 0)
      showCommandBarItems();
  else
      hideCommandBarItems(); 

  if($("#divHidePageTitle").length == 0)
      showPageTitle();
  else
      hidePageTitle();            
  if($("#divHideQuickLaunch").length == 0)//check divHideQuickLaunch doesn't exist on the page
      showQuickLaunch();
  else
      hideQuickLaunch();
}); // End page navigation updates method
      
    
    function IsQuickLaunchHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideQuickLaunch" className={styles.hide}>hide quicklaunch</div>);}
      else { return (null);}}
    function IsSiteLogoHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideSiteLogo" className={styles.hide}>hide Site Logo</div>);}
      else { return (null);}}
    function IsSiteTitleHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideSiteTitle" className={styles.hide}>hide Site Title</div>);}
      else { return (null);}}
    function IsSiteDescriptionHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideSiteDescription" className={styles.hide}>hide Site Description</div>);}
      else { return (null);}}
    function IsSiteMembersHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideSiteMembers" className={styles.hide}>hide Site Members</div>);}
      else { return (null);}}
    function IsTopNavHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideTopNav" className={styles.hide}>hide Top Nav</div>);}
      else { return (null);}}
    function IsTitleRowHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideTitleRow" className={styles.hide}>hide title row</div>);}
      else { return (null);}}
    function IsCommandBarItemsHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHideCommandBarItems" className={styles.hide}>hide command bar items</div>);}
      else { return (null);}}
    function IsPageTitleHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divHidePageTitle" className={styles.hide}>hide page title</div>);}
      else { return (null);}}
    function IsSearchBoxHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divhideSearchBox" className={styles.hide}>hide search box</div>);}
      else { return (null);}}
    function IsShareButtonHidden(props) {
      if (props.isHidden) { return (<div hidden={true} id="divhideShareButton" className={styles.hide}>hide share button</div>);}
      else { return (null);}}
        // return (null); if you want to return null
        console.log("HideUnHide - React component is loaded");


        return(<span>
        <IsQuickLaunchHidden isHidden={this.props.hideQuickLaunchProperty}/>
        <IsSiteLogoHidden isHidden={this.props.hideSiteLogoProperty}/>
        <IsSiteTitleHidden isHidden={this.props.hideSiteTitleProperty}/>
        <IsSiteDescriptionHidden isHidden={this.props.hideSiteDescriptionProperty}/>
        <IsSiteMembersHidden isHidden={this.props.hideSiteMembersProperty}/>
        <IsTopNavHidden isHidden={this.props.hideTopNavProperty}/>
        <IsTitleRowHidden isHidden={this.props.hideTitleRowProperty}/>
        <IsCommandBarItemsHidden isHidden={this.props.hideCommandBarItemsProperty}/>
        <IsPageTitleHidden isHidden={this.props.hidePageTitleProperty}/>
        <IsSearchBoxHidden isHidden={this.props.hideSearchBoxProperty}/>
        <IsShareButtonHidden isHidden={this.props.hideShareButtonProperty}/></span>
    )
      
  }//end of render
  
}
