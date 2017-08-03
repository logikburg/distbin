/*
. Home Slider
. ProgressBar
. quoteSlider
. testimonialSlider
. featuresSlider
. contactForm
. subscribe
. Map
. Header
. Tooltip
. Count Facts
. Start countdown
. Ready
*/
(function($) {
    "use strict";

    /* Start Home slider */
    function homeContentSlider() {
        var homeContSlider = $('.home-content-slider'),
            autoplay = homeContSlider.data('autoplay'),
            autoplaySpeed = homeContSlider.data('speed');
        if ($(window).width() > 992) {
            homeContSlider.owlCarousel({
                animateOut: 'bounceOut',
                animateIn: 'bounceIn',
                autoplay: autoplay,
                autoplayTimeout: autoplaySpeed,
                items: 1,
                dots: false,
                mouseDrag: false,
                touchDrag: false,
                loop: true
            });
        } else {
            homeContSlider.owlCarousel({
                autoplay: false,
                items: 1,
                dots: false,
                mouseDrag: true,
                touchDrag: true,
                loop: true,
                autoHeight: true
            });
        }
    }

    function homeContentSliderFade() {
        $('.home-content-slider').css({
            'opacity': '1'
        })
    }

    function homeSliderOwl() {
        var homeOwlSlider = $(".home-slider"),
            autoplay = homeOwlSlider.data('autoplay'),
            autoplaySpeed = homeOwlSlider.data('speed'),
            touchSlide = homeOwlSlider.data('touch-drag');
        homeOwlSlider.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            items: 1,
            mouseDrag: touchSlide,
            touchDrag: touchSlide,
            dots: false,
            nav: true,
            navSpeed: 500,
            loop: true,
            autoHeight: true,
            navText: ["<img src='assets/img/layout/slider-left-thin-arrow.png'>", "<img src='assets/img/layout/slider-right-thin-arrow.png'>"]
        });
        if ($('.home-fullscreen>div').hasClass('home-slider')) {
            $('.home-fullscreen').css({
                'padding': '0'
            });
        }
    }

    function sliderOwl() {
        var owlSlider = $(".carousel"),
            autoplay = owlSlider.data('autoplay'),
            autoplaySpeed = owlSlider.data('speed'),
            touchSlide = owlSlider.data('touch-drag'),
            loopSlides = owlSlider.data('loop');
        owlSlider.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            items: 1,
            mouseDrag: touchSlide,
            touchDrag: touchSlide,
            dots: true,
            nav: true,
            loop: loopSlides,
            autoHeight: true,
            navText: ["<img src='assets/img/layout/slider-left-thin-arrow.png'>", "<img src='assets/img/layout/slider-right-thin-arrow.png'>"],
            navRewind: true,
            slideBy: 'page'
        });
    }
    /* Ends Home slider */

    /* Start ProgressBar */
    function progressBars() {
        function progressBar() {
            $('.progress').each(function() {
                $(this).find('.progress-bar').animate({
                    width: $(this).attr('data-percent')
                }, 800);
            });
        }
        if ($('.progress-bars').data('animate-on-scroll') === 'on') {
            $('.progress-bars').waypoint(function() {
                progressBar();
            }, {
                offset: '100%',
                triggerOnce: true
            });
        } else {
            progressBar();
        }
    }
    /* Ends ProgressBar */

    /* Start quoteSlider */
    function quoteSlider() {
        var quoteOwl = $('.quote-slider');
        quoteOwl.owlCarousel({
            autoplay: false,
            autoplayTimeout: 3000,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: ["<img src='assets/img/layout/slider-left-thin-arrow.png'>", "<img src='assets/img/layout/slider-right-thin-arrow.png'>"]
        });
    }
    /* Ends quoteSlider */


    /* Start testimonialSlider */
    function testimonialSlider() {
        var testimonialsOwl = $('.testimonials'),
            autoplay = testimonialsOwl.data('autoplay'),
            autoplaySpeed = testimonialsOwl.data('speed');
        testimonialsOwl.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            autoplaySpeed: 700,
            loop: true,
            items: 1,
            dots: true,
            dotsSpeed: 400
        });
    }
    /* Ends quoteSlider */

    /* Start featuresSlider */
    function featuresSlider() {
        var featureSlider = $(".features-slider"),
            autoplay = featureSlider.data('autoplay'),
            autoplaySpeed = featureSlider.data('speed');
        featureSlider.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            loop: false,
            dots: false,
            nav: false,
            responsiveRefreshRate: 200,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });
    }
    /* Ends featuresSlider */

    /* Start ContactForm */
    function contactForm() {
        $('#contactform').on('submit', function() {
            var action = 'assets/php/contact.php';
            $("#message-info").slideUp(250, function() {
                $('#message-info').hide();
                $('#submit')
                    .after('<div class="loader"><div></div></div>')
                    .attr('disabled', 'disabled');
                $.post(action, {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        message: $('#message').val()
                    },
                    function(data) {
                        document.getElementById('message-info').innerHTML = data;
                        $('#message-info').slideDown(250);
                        $('#contactform .loader div').fadeOut('slow', function() {
                            $(this).remove();
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') !== null) {
                            $('#contactform').slideUp(850, 'easeInOutExpo');
                        }
                    });
            });
            return false;
        });
    }
    /* Ends contactForm */

    /* Start subscribeForm */
    function subscribeForm() {
        $('#subscribe-form,#subscribe-form-2').on('submit', function(e) {
            e.preventDefault();
            var $el = $(this),
                $alert = $el.find('.form-validation'),
                $submit = $el.find('button'),
                action = $el.attr('action');
            $submit.button('loading');
            $alert.removeClass('alert-danger alert-success');
            $alert.html('');
            $.ajax({
                type: 'POST',
                url: action,
                data: $el.serialize() + '&ajax=1',
                dataType: 'JSON',
                success: function(response) {
                    if (response.status === 'error') {
                        $alert.html(response.message);
                        $alert.addClass('alert-danger').fadeIn(500);
                    } else {
                        $el.trigger('reset');
                        $alert.html(response.message);
                        $alert.addClass('alert-success').fadeIn(500);
                    }
                    $submit.button('reset');
                }
            });
        });
    }
    /* Ends subscribeForm */

    /* Start Map */
    function initMap() {
        $('#content-map').waypoint(function() {
            initMaps()
        }, {
            offset: '100%',
            triggerOnce: true
        });
    }
    /* Ends Map */

    /* Start Top Header */
    function Header() {

        $('.nav li a, .btn-scroll').on('click', function() {
            var $anchor = $(this);

            function scrollToAnchor() {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - offsetVar
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
            }
            if ($(window).width() > 992) {
                var offsetVar = '59';
                scrollToAnchor();
            } else {
                var offsetVar = '0';
                scrollToAnchor();
            }
        });

        function navSmall() {
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 70) {
                    $('nav').addClass("nav-small");
                } else {
                    $('nav').removeClass("nav-small");
                }
            });
        }
        if ($('nav').data('animation') === 'hiding') {
            var Window = $(window);
            var navPosition = Window.scrollTop();
            Window.on('scroll', function() {
                if (Window.scrollTop() > navPosition) {
                    $('nav').removeClass('nav-down').addClass('nav-up');
                } else {
                    $('nav').removeClass('nav-up').addClass('nav-down');
                }
                navPosition = Window.scrollTop();
            });
            navSmall();
        } else {
            navSmall();
        }
        $('.scroll-top').on('click', function() {
            $('html, body').stop().animate({
                scrollTop: 0
            }, 2000, 'easeInOutExpo');
            return false;
        });

        function elementsAnchor() {
            var hash = window.location.hash;
            if (hash != '') {
                setTimeout(function() {
                    $('html, body').stop().animate({
                        scrollTop: $(hash).offset().top - 59
                    }, 1000, 'easeInOutExpo');
                    history.pushState('', document.title, window.location.pathname);
                }, 500);
            }
        }
        elementsAnchor();
    }
    /* Ends Top Header */

    /* Tooltip icons */
    function bootstrapTools() {
        $("[data-toggle='tooltip']").tooltip();
    }


    /* Start Count Facts */
    function countUp() {
        $('#count-facts').waypoint(function() {
            $('.counter h1').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1700,
                    easing: 'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        //alert('finished');
                    }
                });
            });
        }, {
            offset: '100%',
            triggerOnce: true
        });
    }
    /* Ends Count Facts */

    /* Start countdown */
    function countdown() {
        var dateUser = $("#countdown-timer").attr('data-date'),
            deadline = new Date(dateUser);

        function updateClock() {
            var today = Date(),
                diff = Date.parse(deadline) - Date.parse(today);
            if (diff <= 0) {
                clearInterval(interval);
            } else {
                var seconds = Math.floor((diff / 1000) % 60),
                    minutes = Math.floor((diff / 1000 / 60) % 60),
                    hours = Math.floor((diff / 1000 / 60 / 60) % 24),
                    days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30.5),
                    months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.5) % 12);
                $("#months").text(('0' + months).slice(-2));
                $("#days").text(('0' + days).slice(-2));
                $("#hours").text(('0' + hours).slice(-2));
                $("#minutes").text(('0' + minutes).slice(-2));
                $("#seconds").text(('0' + seconds).slice(-2));
            }
        }
        var interval = setInterval(updateClock, 1000);
    }
    /* Ends countdown */


    /* Start on Ready */
    jQuery(document).ready(function() {
        $.when(homeContentSlider()).then(homeContentSliderFade());
        homeSliderOwl();
        progressBars();
        countUp();
        quoteSlider();
        parallax();
        testimonialSlider();
        featuresSlider();
        contactForm();
        subscribeForm();
        initMap();
        sliderOwl();
        Header();
        bootstrapTools();
        countdown();
    });
    /* Ends on Ready */

}(jQuery));
