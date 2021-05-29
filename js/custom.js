var locale = $('html').attr('lang');

var languages;
if(!locale || locale == ''){
  languages = languages['de']
}
else{
 languages = languages[locale];
}


function preloader(ajax) {
  var preloader = document.getElementById("preloader");
  var icon = document.getElementById("loader-icon");

  if (typeof ajax === 'boolean') {
      if (ajax === true) {
          $(icon).css({
              'display' : 'block'
          });
          $(preloader).css({
              'opacity' : '1',
              'position' : 'fixed',
              'z-index': 1000
          });
      } else {
          $(preloader).css({
              'opacity' : '0',
              'position' : 'fixed',
              'z-index': -5
          });
          $(icon).css({
              'display' : 'none'
          });
          preloader.setAttribute("aria-busy", "false");
          document.getElementById("site").style.opacity = "1";
      }
      return true;
  }
}


 if(document.location.pathname === "/" || document.location.pathname === "/"+locale){
   setTimeout(function () {
     preloader(false);
   }, 3000);
 }
 else{
  setTimeout(function () {
    preloader(false);
  }, 200);
 }


/*setTimeout(function () {
    preloader(false);
  }, 3000);
*/

/*function setCookie(){
  var date = new Date();
  date.setTime(date.getTime() + (300 * 1000));
  $.cookie('loadedAlready', 'YES', { expires: date });
}


$(function() {
  if( $.cookie( 'loadedAlready' ) != 'YES' ) {
    setTimeout(function () {
      preloader(false);
    }, 3000);
  setCookie()
  }
  else{
    setTimeout(function () {
      preloader(false);
    }, 100);
  }
});

$('body').click(function(){
  setCookie()
})*/


/*
$(window).on('unload', function(e) {
  $.cookie.del( 'loadedAlready' );
});
*/

/*menu open*/
$(document).on('click', '.open', function() {
  if (window.matchMedia('(max-width: 992px)').matches) {
      $(".overlay").css('width', '100%');
    } else {
      $(".overlay").css('width', '50%');
    }
  
  $('.close-block').css({
    'transitionDelay' : '1.5s',
    'transitionTime' : '0.5s',
    'width' : '80px',
    'opacity' : '1'
  });

  $('.closebtn').css({
    'transitionDelay' : '2s',
    'transitionTime' : '0.5s',
    'opacity' : '1'
  });

  $('.animated-border').addClass('animated-borderHeight');
  $('.close-block').addClass('animated-close-block');
  $('.right_side_icons').show('slow');
})

$(document).on('click', '.close-block, .menu__link', function() {
  $(".overlay").css('width', '0');
  $('.close-block').css({
    'transitionDelay' : '0s',
    'transitionTime' : '0s',
    'width' : '0',
    'opacity' : '0'
  });

  $('.closebtn').css({
    'transitionDelay' : '0s',
    'transitionTime' : '0s',
    'opacity' : '0'
  });

  $('.animated-border').removeClass('animated-borderHeight');
  $('.close-block').removeClass('animated-close-block');
})

/*Button Hover*/
$( ".button_su_inner" ).mouseenter(function(e) {
  var parentOffset = $(this).offset(); 
  var relX = e.pageX - parentOffset.left;
  var relY = e.pageY - parentOffset.top;
  $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
  $(this).prev(".su_button_circle").removeClass("desplode-circle");
  $(this).prev(".su_button_circle").addClass("explode-circle");

});

$( ".button_su_inner" ).mouseleave(function(e) {
  var parentOffset = $(this).offset(); 
  var relX = e.pageX - parentOffset.left;
  var relY = e.pageY - parentOffset.top;
  $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
  $(this).prev(".su_button_circle").removeClass("explode-circle");
  $(this).prev(".su_button_circle").addClass("desplode-circle");
});



$(".with-effect, .input__effect").change(function(){
  if($(this).val() != ""){
    $(this).addClass("has-content");
  }else{
    $(this).removeClass("has-content");
  }
});


$(function() {
  $(".menu__link").each(function() {
    var _this = $(this);
    var image = $('#menu-img_'+_this.data('id')).val();
    var icon = _this.html()
    $(this).mouseover(function(e) {
      setTimeout(function() {
        $('#menu__img').fadeIn(500).css('display', 'flex');
        $('#menu__img').html($('<img>',{id:'theImg',src:image}))
        $('#theImg').fadeIn(1000);
      }, 200);
    });
    $(this).mouseout(function(e) {
      setTimeout(function() {
        $('#menu__img').hide();
      }, 200);
    });
  });
});
