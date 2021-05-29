$('.menu-slider').slick({
  centerMode: true,
  centerPadding: '300px',
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1567,
      settings: {
        centerPadding: '250px',
      }
    },
    {
      breakpoint: 1399,
      settings: {
        centerPadding: '130px',
      }
    },
    {
      breakpoint: 1124,
      settings: {
        centerPadding: '80px',
      }
    },
    {
      breakpoint: 1099,
      settings: {
        centerPadding: '50px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 900,
      settings: {
        centerMode: false,
        slidesToShow: 1
      }
    }
  ]
});


$('.review-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1099,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});