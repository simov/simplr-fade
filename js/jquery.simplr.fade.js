/**
 * jquery.simplr.fade
 * version 3.0
 * copyright (c) 2010 https://simov.github.com/simplr-fade/
 * licensed under MIT
 */
;(function ($) {
  'use strict'

  $.fn.srFade = function (options) {
  
  // public
  var properties = $.extend({
    duration : 400, 
    delay    : 5000,
    easing   : 'swing',
    auto     : true,
    // animation
    animate  : {opacity: 'hide'},
    effect   : null,
    css3     : null,
    // events
    onFade : null, 
    onAfterFade : null
  }, options || {})

  // public
  var api = {
    next: function () {
      if (animated) return
      fadeTo(index == items.length-1 ? 0 : index+1)
    },
    prev: function () {
      if (animated) return
      fadeTo(index-1 < 0 ? items.length-1 : index-1)
    },
    fadeTo: function (idx) {
      if (animated || idx == index) return
      fadeTo(idx)
    },
    start: function () {
      self.auto = true
      if (!animated) start()
    },
    stop: function () {
      self.auto = false
      if (!animated) stop()
    }
  }

  // this alias
  var self = $.extend(this, properties, api)

  // private fields
  var items = this,
    timer = null,
    index = 0,
    animated = false,
    targetIndex = 0

  // init
  setActive()
  onFade(0)
  onAfterFade(0)
  start()
  
  // private api
  function setActive() {
    items.css('z-index', 1).show().eq(index).css('z-index', items.length)
  }
  
  function prepareActive(idx) {
    items.eq(idx).css('z-index', items.length-1)
  }
  
  function start() {
    if (!self.auto) return 
    timer = setInterval(function () {
      fadeTo(index == items.length-1 ? 0 : index+1)
    }, self.delay)
  }
  
  function stop() {
    clearInterval(timer)
  }
  
  function fadeTo(idx) {
    stop()
    prepareActive(idx)
    fade(idx)
  }
  
  function fade(idx) {
    animated = true
    targetIndex = idx
    if (self.effect != null) {
      items.eq(index).effect(self.effect, self.duration, function () {
        afterFade(idx)
      })
    }
    else if (self.css3) {
      items.eq(index).addClass('animated ' + self.css3)
    }
    else { // animate
      var style = items.length ? items.eq(index)[0].style.cssText : ''
      items.eq(index).animate(self.animate, self.duration, self.easing, function () {
        this.style.cssText = style
        afterFade(idx)
      })
    }
    onFade(idx)
  }
  
  function afterFade (idx) {
    index = idx
    setActive()
    animated = false
    onAfterFade(idx)
    start()
  }
  
  function onFade (idx) {
    if ($.isFunction(self.onFade)) self.onFade(idx)
  }
  function onAfterFade (idx) {
    if ($.isFunction(self.onAfterFade)) self.onAfterFade(idx)
  }


  // css3
  if (self.css3) {
    var prefix = cssPrefix()
    items.css(prefix+'backface-visibility', 'hidden')
    items.css(prefix+'animation-duration', self.duration+'ms')
    items.css(prefix+'animation-timing-function', cssEasing())
    items.css(prefix+'animation-fill-mode', 'both')
    items.on(cssAnimation(), function (e) {
      items.removeClass().addClass('item')
      afterFade(targetIndex)
    })
  }
  function cssPrefix () {
    switch (true) {
      case $.browser.webkit: return '-webkit-'
      case $.browser.mozilla: return '-moz-'
      case $.browser.msie: return '-ms-'
      case $.browser.opera: return '-o-'
      default: return ''
    }
  }
  function cssEasing () {
    switch (self.easing) {
      case 'easeInSine': return 'cubic-bezier(0.47, 0, 0.745, 0.715)'
      case 'easeOutSine': return 'cubic-bezier(0.39, 0.575, 0.565, 1)'
      case 'easeInOutSine': return 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
      case 'easeInQuad': return 'cubic-bezier(0.55, 0.085, 0.68, 0.53)'
      case 'easeOutQuad': return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      case 'easeInOutQuad': return 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      case 'easeInCubic': return 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
      case 'easeOutCubic': return 'cubic-bezier(0.215, 0.61, 0.355, 1)'
      case 'easeInOutCubic': return 'cubic-bezier(0.645, 0.045, 0.355, 1)'
      case 'easeInQuart': return 'cubic-bezier(0.895, 0.03, 0.685, 0.22)'
      case 'easeOutQuart': return 'cubic-bezier(0.165, 0.84, 0.44, 1)'
      case 'easeInOutQuart': return 'cubic-bezier(0.77, 0, 0.175, 1)'
      case 'easeInQuint': return 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
      case 'easeOutQuint': return 'cubic-bezier(0.23, 1, 0.32, 1)'
      case 'easeInOutQuint': return 'cubic-bezier(0.86, 0, 0.07, 1)'
      case 'easeInExpo': return 'cubic-bezier(0.95, 0.05, 0.795, 0.035)'
      case 'easeOutExpo': return 'cubic-bezier(0.19, 1, 0.22, 1)'
      case 'easeInOutExpo': return 'cubic-bezier(1, 0, 0, 1)'
      case 'easeInCirc': return 'cubic-bezier(0.6, 0.04, 0.98, 0.335)'
      case 'easeOutCirc': return 'cubic-bezier(0.075, 0.82, 0.165, 1)'
      case 'easeInOutCirc': return 'cubic-bezier(0.785, 0.135, 0.15, 0.86)'
      case 'easeInBack': return 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
      case 'easeOutBack': return 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      case 'easeInOutBack': return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      default: return 'linear'
    }
  }
  function cssAnimation () {
    switch (true) {
      case $.browser.webkit: return 'webkitAnimationEnd'
      case $.browser.mozilla: return 'animationend'
      case $.browser.msie: return 'MSAnimationEnd'
      case $.browser.opera: return 'animationend'
      default: return ''
    }
  }
  
  // extended this
  return self
  }
})(jQuery)
