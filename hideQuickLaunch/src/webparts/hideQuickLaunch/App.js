$.fn.hideQuickLaunch = function ()
{
    // nav.ms-Nav.root_fed0c9a7

    // document.write("<script type=\"text/javascript\" src=\"https://code.jquery.com/jquery-3.2.1.min.js\"><\/script>");
    
    $( "nav[role='navigation']" ).hide();
    $("div[class^='belowSearchBox_']").hide()
    $("div[class^='pageContainer_']").css( "left", "0px" );    
    
    // nav_97226a7d spNav_6602f88f belowSearchBox_6602f88f
    // pageContainer_97226a7d container_97226a7d
    // $("div[class^='apple-'],div[class*=' apple-']")
    
    

}