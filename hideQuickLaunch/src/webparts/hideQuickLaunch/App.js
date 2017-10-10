$.fn.hideQuickLaunch = function ()
{    
    // css updates to hide quicklaunch.
    $( "nav[role='navigation']" ).hide();
    $("div[class^='searchBox_']").hide();
    $("div[class^='pageContainer_']").css( "left", "0px" );   
}