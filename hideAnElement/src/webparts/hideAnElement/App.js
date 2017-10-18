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
        hidePageTitleProperty: false
    }, options);
    //hide QuickLaunch
    function hideQuickLaunch()
    {
        $( "nav[role='navigation']" ).hide();
        $("div[class^='searchBox_']").hide();
        $("div[class^='pageContainer_']").css( "left", "0px" );
    }
    function showQuickLaunch()
    {
        $( "nav[role='navigation']" ).show();
        $("div[class^='searchBox_']").show();
        $("div[class^='pageContainer_']").css( "left", $( "nav[role='navigation']" ).css("width"));                
    }
    //hide Site Top Navigation bar
    function hideTopNav()
    {
        $(".ms-compositeHeader-topWrapper").hide();                        
    }
    function showTopNav()
    {
        $(".ms-compositeHeader-topWrapper").show();                        
    }    
    //hide Site Logo
    function hideSiteLogo()
    {
        $(".ms-siteHeader-siteLogo").hide();
    }
    function showSiteLogo()
    {
        $(".ms-siteHeader-siteLogo").show();
    }
    //hide Site Title
    function hideSiteTitle()
    {
        $(".ms-siteHeader-siteName").hide();        
    }
    function showSiteTitle()
    {
        $(".ms-siteHeader-siteName").show();        
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
        $(".ms-compositeHeader").hide();                
    }
    function showTitleRow()
    {
        $(".ms-compositeHeader").show();                
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
    

    // css updates to hide on page load.
    if(options.hideQuickLaunchProperty)
        hideQuickLaunch();
  
    if(options.hideTitleRowProperty)
        hideTitleRow();
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
    }   
    if(options.hideCommandBarItemsProperty)
        hideCommandBarItems();   
    if(options.hidePageTitleProperty)
        hidePageTitle();   
        
        
 
    $( "body" ).bind("DOMSubtreeModified",function() {
        
        if($("#divHideQuickLaunch").length == 0)//check divHideQuickLaunch doesn't exist on the page
            showQuickLaunch();
        else
            hideQuickLaunch();
        
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
        }
        else
            hideTitleRow();           

        if($("#divHideCommandBarItems").length == 0)
            showCommandBarItems();
        else
            hideCommandBarItems(); 

        if($("#divHidePageTitle").length == 0)
            showPageTitle();
        else
            hidePageTitle();            

    });
}