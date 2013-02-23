/**
 * jquery.simplr.fade
 * version 2.0
 * copyright (c) 2010 http://github.com/simov/simplr-fade
 * licensed under MIT
 */
;(function($) {
    'use strict';

    $.fn.srFade = function(options) {
    
    // public
    var properties = $.extend({
        speed    : 400, 
        duration : 5000,
        auto     : true,
        effect   : null,
        animate  : {opacity: 'hide'},
        easing   : 'swing',
        // events
        onFade : null, 
        onAfterFade : null
    }, options || {});

    // public
    var api = {
        next: function () {
            if (animated) return;
            fadeTo(index == items.length-1 ? 0 : index+1);
        },
        prev: function () {
            if (animated) return;
            fadeTo(index-1 < 0 ? items.length-1 : index-1);
        },
        fadeTo: function (idx) {
            if (animated || idx == index) return;
            fadeTo(idx);
        },
        start: function () {
            self.auto = true;
            if (!animated) start();
        },
        stop: function () {
            self.auto = false;
            if (!animated) stop();
        }
    };

    // this alias
    var self = $.extend(this, properties, api);

    // private fields
    var items = this,
        timer = null,
        index = 0,
        animated = false;
    
    // init
    setActive();
    onFade(0);
    onAfterFade(0);
    start();
    
    // private api
    function setActive() {
        items.css('z-index', 1).show().eq(index).css('z-index', items.length);
    }
    
    function prepareActive(idx) {
        items.eq(idx).css('z-index', items.length-1);
    }
    
    function start() {
        if (!self.auto) return;	
        timer = setInterval(function () {
            fadeTo(index == items.length-1 ? 0 : index+1);
        }, self.duration);
    }
    
    function stop() {
        clearInterval(timer);
    }
    
    function fadeTo(idx) {
        stop();
        prepareActive(idx);
        fade(idx);
    }
    
    function fade(idx) {
        animated = true;
        if (self.effect != null) {
            items.eq(index).effect(self.effect, self.speed, function () {
                afterFade(idx);
            });
        } else {
            var style = items.length ? items.eq(index)[0].style.cssText : '';
            items.eq(index).animate(self.animate, self.speed, self.easing, function () {
                this.style.cssText = style;
                afterFade(idx);
            });
        }
        onFade(idx);
    }
    
    function afterFade(idx) {
        index = idx;
        setActive();
        animated = false;
        onAfterFade(idx);
        start();
    }
    
    function onFade(idx) {
        if($.isFunction(self.onFade)) self.onFade(idx);
    }
    function onAfterFade(idx) {
        if($.isFunction(self.onAfterFade)) self.onAfterFade(idx);
    }
    
    // extended this
    return self;
    };
})(jQuery);
