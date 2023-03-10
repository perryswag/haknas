$(document).ready(function(){

    $(".memBild").hide();

    $(".knappTeaser").click(function(){
        $(".memBild").toggle(2000);
    
    });

    $(".bildLo, .bildHelge, .bildHorse1").click(function(){
        $("h6").toggleClass("colorChange");
    });

});