$('#date_1, #date_2, #date_3').datepicker({
    defaultDate: new Date(),
    minDate: new Date(),
    autoclose: true,
    firstDay: 1,
    dateFormat: 'dd-mm-yy',
});

$('#time_1, #time_2, #time_3').timepicker({
    hourText: 'Stunde',
    minuteText: 'Minute',
    showPeriodLabels: false,
    minutes: {
        interval: 15,
        manual: [0, 30]
    },
});


// Send Form functionality
$('.request-form').on('submit', function (e) {
    e.preventDefault();

    let $form = $(this);
    let data  = $form.serialize();
    $form.find('.help-block').text('');
    $form.find('.invalid').removeClass('invalid');
    var validator = false;
    // Frontend validation here

    var name = $(this).find('[name ="name"]');
    var email = $(this).find('[name ="email"]');
    var tel = $(this).find('[name ="tel"]');
    var date = $(this).find('.calendar');
    var time = $(this).find('.time');
    var pax = $(this).find('[name ="pax"]');
    var thankyou = $(this).parent().find('#thankyou');

    if (name.val() === '' || name.val() == 0) {
      name.addClass('invalid');
      name.next('.help-block').text(languages.errorName).show();
      validator = true;
    }

    var phoneValidate=/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(tel.val());
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


    if (date.val() === '' || date.val() == 0) {
      date.addClass('invalid');
      date.next('.help-block').text(languages.errorField).show();
      validator = true;
    }

    if (time.val() === '' || time.val() == 0) {
      time.addClass('invalid');
      time.next('.help-block').text(languages.errorField).show();
      validator = true;
    }

    if (pax.val() === '' || pax.val() == 0) {
      pax.addClass('invalid');
      pax.next('.help-block').text(languages.errorField).show();
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
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfWwXIaAAAAAP8qx2Soq63lLlvbBUqAs6qaMg3k', {action: 'submit'}).then(function(token) {
                data += '&gr_token=' + token;
                $.post($form.attr('action'), data, function (data) {
                    preloader(false);
                    $form[0].reset();
                    $form.hide();
                    thankyou.show();
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

(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
}(jQuery));

$(document).ready(function() {
  $(".pax").inputFilter(function(value) {
    return /^\d*$/.test(value);
  });
});
