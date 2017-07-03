//image hover
$('.video-box').hover(
  function(){
    console.log("fffd");
    $(this).addClass( "rotate" );
    }, function() { 
    $(this).removeClass( "rotate" );
});

//drop-content
$('.arrow').on('click', function(){
    $parent_box = $(this).closest('.video-list');
    $parent_box.siblings().find('.video-drop').hide();
    $parent_box.find('.video-drop').toggle();
});

//slilder
$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

//hover dropdown
$(document).ready(function(){
    $('ul.nav li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });  
});

//nav scroll
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".nav-scroll").addClass("scroll");
    } else {
        $(".nav-scroll").removeClass("scroll");
    }
});

$('.close-btn').click( function() {
    $(".video-drop").hide();
} );