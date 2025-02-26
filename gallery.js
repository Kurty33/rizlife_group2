$(document).ready(function() {
    var owl = $(".trailer-slider");

    owl.owlCarousel({
        items: 1,
        loop: true,
        autoplay: false,  // Prevent auto slide
        nav: false,
        dots: false
    });

    // ✅ Next/Prev Button Click Events
    $(".trailer-next").click(function() {
        owl.trigger('next.owl.carousel');
    });

    $(".trailer-prev").click(function() {
        owl.trigger('prev.owl.carousel');
    });

    function playCurrentVideo() {
        $(".trailer-video").each(function() {
            this.pause();
            this.currentTime = 0;
        });

        var currentVideo = $(".trailer-slider .owl-item.active .trailer-video")[0];
        if (currentVideo) {
            currentVideo.muted = false;  // ✅ Ensure sound is ON
            currentVideo.play();

            currentVideo.onended = function() {
                owl.trigger('next.owl.carousel');  // ✅ Move to next slide after video ends
            };
        }
    }

    // ✅ Play video when the slide changes
    owl.on('translated.owl.carousel', function() {
        playCurrentVideo();
    });

    // ✅ Play first video on page load
    playCurrentVideo();

    // ✅ Initialize Gallery
    $(".image-gallery").each(function() {
        $(this).owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            margin: 10,
            nav: false,
            dots: false,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 4 }
            }
        });
    });
});
