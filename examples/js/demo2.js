
$(function () {
    /*
        top fader - uses jQuery.ui-effect plugin
    */

    var fader1 = $('#fader1 .item').srFade({
        duration : 1000,
        delay    : 1000,
        auto     : false,
        effect   : 'puff',
        // update the fader navigation
        onFade : function (index) {
            $('#controls1 .nav a').removeClass('active').eq(index).addClass('active');
        }
    });
    // go to the previous item
    $('#controls1 .prev').on('click', function () {
        fader1.prev();
        return false;
    });
    // go to the next item
    $('#controls1 .next').on('click', function () {
        fader1.next();
        return false;
    });
    // go to item within the fader by clicking in the navigation
    $('#controls1 .nav a').on('click', function () {
        fader1.fadeTo($('#controls1 .nav a').index(this));
        return false;
    });
    

    /*
        bottom fader - uses default jquery animate()
    */

    var fader2 = $('#fader2 .item').srFade({
        duration: 700,
        delay   : 3000,
        animate : { top: -313 },
        easing: 'easeInOutCubic',
        // update the fader navigation
        onFade: function (index) {
            $('#controls2 .nav a').removeClass('active').eq(index).addClass('active');
        },
        // start secondary animation within the fader item
        onAfterFade: function (index) {
            $('#fader2 .item').eq(index).find('p').effect('shake');
        }
    });
    // go to the previous item
    $('#controls2 .prev').on('click', function () {
        fader2.prev();
        return false;
    });
    // go to the next item
    $('#controls2 .next').on('click', function () {
        fader2.next();
        return false;
    });
    // stop/start auto by clicking a button
    $('#controls2 .stop').on('click', function () {
        if (!$(this).hasClass('start')) {
            fader2.stop();
            $(this).addClass('start').text('start');
        } else {
            fader2.start();
            $(this).removeClass('start').text('stop');
        }
        return false;
    });
    // stop auto on hovering the fader item
    $('#fader2 .item').on('mouseover', function (e) {
        fader2.stop();
        $('#controls2 .stop').addClass('start').text('start');
    });
    $('#fader2 .item').on('mouseout', function (e) {
        fader2.start();
        $('#controls2 .stop').removeClass('start').text('stop');
    });
    // go to item within the fader by clicking in the navigation
    $('#controls2 .nav a').click(function () {
        fader2.fadeTo($('#controls2 .nav a').index(this));
        return false;
    });
    

    /*
        background fader - uses default fade out
    */
    
    $('body [class*=body-]').srFade({duration: 3000});
});
