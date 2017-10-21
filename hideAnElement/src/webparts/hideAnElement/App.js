$.fn.hideAnElement = function (options)
{    
    var opt = $.extend({}, {
        hideQuickLaunchProperty: false,
        hideTopNavProperty: false,        
        hideSiteLogoProperty: false,
        hideSiteTitleProperty: false,
        hideSiteDescriptionProperty: false,
        hideSiteMembersProperty: false,
        hideTitleRowProperty: false,
        hideCommandBarItemsProperty: false,    
        hidePageTitleProperty: false,
        hideSearchBoxProperty:false,
        hideShareButtonProperty:false
    }, options);
    //hide QuickLaunch
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
    if(options.hideQuickLaunchProperty)
        hideQuickLaunch();
  
    if(options.hideTitleRowProperty)
    {
        hideTitleRow();
        hideSearchBox();
    }
    else
    {
        if(options.hideTopNavProperty)
            hideTopNav();      
        if(options.hideSiteLogoProperty)
            hideSiteLogo();   
        if(options.hideSiteTitleProperty)
            hideSiteTitle();   
        if(options.hideSiteDescriptionProperty)
            hideSiteDescription();   
        if(options.hideSiteMembersProperty)
            hideSiteMembers(); 
        if(options.hideSearchBoxProperty)
            hideSearchBox();
        if(options.hideShareButtonProperty)
            hideShareButton;
    }   
    if(options.hideCommandBarItemsProperty)
        hideCommandBarItems();   
    if(options.hidePageTitleProperty)
        hidePageTitle();   
        
        
 
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
    });
}