$.fn.hideQuickLaunch = function ()
{    
    // css updates to hide quicklaunch on page load.
    $( "nav[role='navigation']" ).hide();
    $("div[class^='searchBox_']").hide();
    $("div[class^='pageContainer_']").css( "left", "0px" );
 
    $( "body" ).bind("DOMSubtreeModified",function() {
        if($("#divHideQuickLaunch").length == 0)//check divHideQuickLaunch doesn't exist on the page
        {
            //Webpart doesn't exist, so show quicklaunch
            $( "nav[role='navigation']" ).show();
            $("div[class^='searchBox_']").show();
            $("div[class^='pageContainer_']").css( "left", $( "nav[role='navigation']" ).css("width"));                
        }
        else
        {
            //Webpart exists, so hide quicklaunch
            $( "nav[role='navigation']" ).hide();
            $("div[class^='searchBox_']").hide();
            $("div[class^='pageContainer_']").css( "left", "0px" );        
        }
    });
}