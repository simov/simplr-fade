
// plugin

$(function () {
    fader = $('.fader .item').srFade({
        onFade : function (index) {
            $('.controls .nav a').removeClass('active').eq(index).addClass('active');
        }
    });
    $('.prev').on('click', function (e) {
        fader.prev();
        return false;
    });
    $('.next').on('click', function (e) {
        fader.next();
        return false;
    });
    $('.stop').on('click', function (e) {
        if (!$(this).hasClass('start')) {
            fader.stop();
            $(this).addClass('start').text('start');
        } else {
            fader.start();
            $(this).removeClass('start').text('stop');
        }
        return false;
    });
    $('.nav a').on('click', function () {
        fader.fadeTo($('.nav a').index(this));
        return false;
    });
});

// demo

$(function () {
    // init
    $('#controls input:eq(0)').attr('checked', true);
    $('#controls label:eq(0)').addClass('active');
    $('.effect').attr('disabled', true);
    $('.animate').attr('disabled', true);
    $('.effect')[0].selectedIndex = 0;
    $('.animate')[0].selectedIndex = 3;
    $('.speed')[0].selectedIndex = 4;
    $('.duration')[0].selectedIndex = 0;
    change.effect(0);
    change.speed(4);
    change.duration(0);
    change.type(0);
    change.easing(0);
    
    // events
    $('[type=radio]').on('change', function () {
        $('#controls label').removeClass('active');
        $(this).next().addClass('active');
        change.type($('[type=radio]').index(this));
    });
    $('.effect').on('change', function (e) {
        change.effect($(this)[0].selectedIndex);
    });
    $('.animate').on('change', function (e) {
        change.animate($(this)[0].selectedIndex);
    });
    $('.speed').on('change', function (e) {
        change.speed($(this)[0].selectedIndex);
    });
    $('.duration').on('change', function (e) {
        change.duration($(this)[0].selectedIndex);
    });
    $('.easing').on('change', function (e) {
        change.easing($(this)[0].selectedIndex);
    });
    $('.easing-sub').on('change', function (e) {
        change.subEasing();
    });
    $('.style-overflow input').on('click', function (e) {
        $('.fader').toggleClass('overflow');
    });
    $('.style-images input').on('click', function (e) {
        $('.fader .item img').toggleClass('wh100');
    });
    $('.create').on('click', function (e) {
        change.create();
    });
});

var change = {
    type: function (index) {
        $('.fader').removeClass('overflow');
        $('.fader .item img').removeClass('wh100');
        $('.custom').slideUp();
        switch(index) {
            case 0: //default
                fader.effect = null;
                fader.animate = {opacity: 'hide'};
                $('.effect, .animate').attr('disabled', true);
                $('.easing').attr('disabled', false);
                this.easing($('.easing')[0].selectedIndex);
                break;
            case 1: //effect
                this.effect($('.effect')[0].selectedIndex);
                $('.effect').attr('disabled', false);
                $('.animate').attr('disabled', true);
                $('.easing, .easing-sub').attr('disabled', true);
                break;
            case 2: //animate
                fader.effect = null;
                this.animate($('.animate')[0].selectedIndex);
                $('.animate').attr('disabled', false);
                $('.effect').attr('disabled', true);
                $('.easing').attr('disabled', false);
                this.easing($('.easing')[0].selectedIndex);
                break;
        }
    },
    effect: function (index) {
        switch(index) {
            case 0:  fader.effect = 'puff';
                $('.fader .item img').addClass('wh100'); break;
            case 1:  fader.effect = 'blind';   break;
            case 2:  fader.effect = 'clip';    break;
            case 3:  fader.effect = 'drop';    break;
            case 4:  fader.effect = 'explode'; break;
            case 5:  fader.effect = 'fade';    break;
            case 6:  fader.effect = 'fold';    break;
            default: fader.effect = 'puff';    break;
        }
    },
    animation: [
        {def: {width:0 }},
        {def: {height:0 }},
        {def: {width:0,height:0 }},
        {def: {width:0,height:0,top:313/2,left:500/2,opacity:0.5 }},
        {def: {top:-313,opacity:0 }},
        {def: {top:-313 }, fader:true},
        {def: {left:-500 }, fader:true},
        {def: {width:832,height:521,top:-104,left:-166,opacity:0 }, images:true}
    ],
    animate: function (index) {
        $('.fader').removeClass('overflow');
        $('.fader .item img').removeClass('wh100');
        
        var overflow = this.animation[index].fader || false,
            images = this.animation[index].images || false;

        overflow ? $('.fader').addClass('overflow') : null;
        $('.style-overflow input').attr('checked', overflow);
        images ? $('.fader .item img').addClass('wh100') : null;
        $('.style-images input').attr('checked', images);

        $('.custom').slideDown();
        $('#controls textarea').val(JSON.stringify(this.animation[index].def));
        fader.animate = this.animation[index].def;
    },
    create: function () {
        $('#controls p').hide();
        try {
            var animation = JSON.parse($('#controls textarea').val());
            fader.animate = animation;
        } catch (err) {
            $('#controls p').show();
        }
    },
    speed: function (index) {
        switch(index) {
            case 0:  fader.speed = 200;  break;
            case 1:  fader.speed = 400;  break;
            case 2:  fader.speed = 800;  break;
            case 3:  fader.speed = 1000; break;
            case 4:  fader.speed = 1200; break;
            default: fader.speed = 400;  break;
        }
    },
    duration: function (index) {
        switch(index) {
            case 0:  fader.duration = 1000; break;
            case 1:  fader.duration = 2000; break;
            case 2:  fader.duration = 3000; break;
            case 3:  fader.duration = 4000; break;
            case 4:  fader.duration = 5000; break;
            default: fader.duration = 3000; break;
        }
    },
    easing: function (index) {
        if (index == 0 || index == 1) {
            $('.easing-sub').attr('disabled', true);
            fader.easing = $('.easing option:selected').val();
        } else {
            $('.easing-sub').attr('disabled', false);
            fader.easing = $('.easing-sub option:selected').val()
                            + $('.easing option:selected').val();
        }
    },
    subEasing: function (index) {
        fader.easing = $('.easing-sub option:selected').val()
                        + $('.easing option:selected').val();
    }
};
