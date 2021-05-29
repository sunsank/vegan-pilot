var mapSwiss;
function initMap() {

  mapSwiss = new google.maps.Map(document.getElementById('contact-map'), {
    center: {lat: 46.9483914, lng: 7.4432993},
    gestureHandling: 'cooperative',
    styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#AFDAEC"
            }, {
                "lightness": 1
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#F0F0F0"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 1
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#cccccc"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#cccccc"
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#EFEFEF"
            }]
        }],
    });

    const positions = [
    {
      position: {lat: 46.9483914, lng: 7.4432993},
      icon: '/images/pin/pin-1.png'
    },
    {
      position: {lat: 46.948996, lng: 7.4363383},
      icon: '/images/pin/pin-2.png'
    },
    {
      position: {lat: 46.9479744, lng: 7.4456023},
      icon: '/images/pin/pin-3.png'
    },
    {
      position: {lat: 46.9465609, lng: 7.4420672},
      icon: '/images/pin/pin-4.png'
    },
  ]
  for (let i = 0; i < positions.length; i++) {
    var markerSwiss = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: positions[i].position,
      icon: positions[i].icon,
      map: mapSwiss
    });
  }

  mapSwiss.setZoom(16);
  mapSwiss.panTo({lat: 46.9483914, lng: 7.4432993}); 
}


// Send Form functionality
$('#contact-form').on('submit', function (e) {
    e.preventDefault();

    let $form = $(this);
    let $titles = $('.hide__on_submit');
    let data  = $form.serialize();
    $form.find('.help-block').text('');
    $form.find('.invalid').removeClass('invalid');
    var validator = false;
    // Frontend validation here

    var name = $(this).find('#name');
    var email = $(this).find('#email');
    var tel = $(this).find('#tel');


    if (name.val() === '' || name.val() == 0) {
        name.addClass('invalid');
        name.next('.help-block').text(languages.errorName).show();
        validator = true;
    }

    var phoneValidate=/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test($('#tel').val());
    if (tel.val() === '' || tel.val() == 0 || !phoneValidate) {
        tel.addClass('invalid');
        tel.next('.help-block').text(languages.errorPhone).show();
        validator = true;
    }

    var emailValidate=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
    if (email.val() === '' || email.val() == 0 || !emailValidate) {
        email.addClass('invalid');
        email.next('.help-block').text(languages.errorEmail).show();
        validator = true;
    }


    if (validator === true) {
      $('.with-effect.invalid').eq(0).focus();
      $('body').animate({
          scrollTop: $(".invalid").offset().top - 120
      }, 800);
      return false;
    }

    if (!validator) {
        preloader(true);
        $titles.hide();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfWwXIaAAAAAP8qx2Soq63lLlvbBUqAs6qaMg3k', {action: 'submit'}).then(function(token) {
                data += '&gr_token=' + token;
                $.post($form.attr('action'), data, function (data) {
                    preloader(false);
                    $form[0].reset();
                    $form.hide();
                    $('#thankyou').show();
                }).fail(function (error) {
                    preloader(false);
                    if (error.status === 422) {
                        if (error.responseJSON !== null && error.responseJSON.errors !== null) {
                            for (key in error.responseJSON.errors) {
                                if (key === 'gr_token') {
                                    alert('Invalid captcha');
                                }
                                $(`[name="${key}"]`).addClass('invalid');
                                $(`[name="${key}"]`).next('.help-block').text(error.responseJSON.errors[key]);
                            }
                            $('.invalid').eq(0).focus();
                        } else {
                            alert('Error! Please, try later');
                            return false;
                        }
                    } else {
                        alert('Error! Please, try later');
                    }
                });
            });
        });
    }
});

$('input').on('keyup', function(){
  $(this).removeClass('invalid');
  $(this).next('.help-block').hide();
});