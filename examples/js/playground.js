
// plugin

$(function () {
  fader = $('.fader .item').srFade({
    css3: $('.css3 option:eq(0)').text(),
    onFade: function (index) {
      this.animated = true
      $('.nav a').removeClass('active').eq(index).addClass('active')
    },
    onAfterFade: function (index) {
      this.animated = false
      if (this.cssChanged) {
        cssInit()
        this.cssChanged = false
      }
    }
  })
  $('.prev').on('click', function (e) {
    fader.prev()
    return false
  })
  $('.next').on('click', function (e) {
    fader.next()
    return false
  })
  $('.stop').on('click', function (e) {
    if (!$(this).hasClass('start')) {
      fader.stop()
      $(this).addClass('start').text('start')
    } else {
      fader.start()
      $(this).removeClass('start').text('stop')
    }
    return false
  })
  $('.nav a').on('click', function () {
    fader.fadeTo($('.nav a').index(this))
    return false
  })
  fader.animated = false
})

// demo

$(function () {

  // change transition

  $('[name=transition]').on('change', function (e) {
    // set active
    $('fieldset').removeClass('active')
    $(this).attr('checked', true).parents('fieldset').addClass('active')
    // animation helpers
    $('.fader').removeClass('overflow')
    $('.fader .item img').removeClass('wh100')
    $('.custom').slideUp()
    // change
    switch($('[name=transition]').index(this)) {
      case 0: //default
        fader.effect = null
        fader.css3 = null
        fader.animate = {opacity: 'hide'}
        // dropdowns
        $('.animate, .effect, .css3').attr('disabled', true)
        $('.easing, .easing option').attr('disabled', false)
        // easing
        $('.easing').trigger('change')
        break
      case 1: //animate
        fader.effect = null
        fader.css3 = null
        $('.animate').trigger('change')
        // dropdowns
        $('.animate').attr('disabled', false)
        $('.effect, .css3').attr('disabled', true)
        // easing
        $('.easing, .easing option').attr('disabled', false)
        $('.easing').trigger('change')
        break
      case 2: //effect
        fader.css3 = null
        $('.effect').trigger('change')
        // dropdowns
        $('.effect').attr('disabled', false)
        $('.animate, .css3').attr('disabled', true)
        // easing
        $('.easing, .easing-sub').attr('disabled', true)
        break
      case 3: //css3
        fader.effect = null
        if (fader.animated) {
          fader.cssChanged = true
        } else {
          cssInit()
        }
        $('.css3').trigger('change')
        // dropdowns
        $('.css3').attr('disabled', false)
        $('.animate, .effect').attr('disabled', true)
        // easing
        $('.easing, .easing-sub').attr('disabled', false)
        $('.easing option').first().attr('disabled', true)
        $('.easing option').last().attr('disabled', true)
        $('.easing option').last().prev().attr('disabled', true)
        if ($('.easing option:selected').attr('disabled') == 'disabled') {
          $('.easing option:eq(1)').attr('selected', true)
        }
        $('.easing').trigger('change')
        break
      
    }
  })

  // options

  $('.duration').on('change', function (e) {
    var value = $('.duration option:selected').text()
    fader.duration = parseInt(value)
    if (fader.css3) {
      $('.fader .item').css(prefix + 'animation-duration', value + 'ms')
    }
  })

  $('.delay').on('change', function (e) {
    var value = $('.delay option:selected').text()
    fader.delay = parseInt(value)
  })

  $('.easing').on('change', function (e) {
    var index = $('.easing option').index($('.easing option:selected'))
    if (index == 0 || index == 1) {
      $('.easing-sub').attr('disabled', true)
      fader.easing = $('.easing option:selected').val()
    } else {
      $('.easing-sub').attr('disabled', false)
      fader.easing = $('.easing-sub option:selected').val()
        + $('.easing option:selected').val()
    }
    if (fader.css3) {
      $('.fader .item').css(prefix + 'animation-timing-function', cssEasing())
    }
  })

  $('.easing-sub').on('change', function (e) {
    fader.easing = $('.easing-sub option:selected').val()
      + $('.easing option:selected').val()
    if (fader.css3) {
      $('.fader .item').css(prefix + 'animation-timing-function', cssEasing())
    }
  })

  // transitions

  var animation = [
    {def: {width:0 }},
    {def: {height:0 }},
    {def: {width:0,height:0 }},
    {def: {width:0,height:0,top:313/2,left:500/2,opacity:0.5 }},
    {def: {top:-313,opacity:0 }},
    {def: {top:-313 }, overflow:true},
    {def: {left:-500 }, overflow:true},
    {def: {width:832,height:521,top:-104,left:-166,opacity:0 }, images:true}
  ]

  $('.animate').on('change', function (e) {
    var index = $('.animate option').index($('.animate option:selected'))
    $('.fader').removeClass('overflow')
    $('.fader .item img').removeClass('wh100')
    
    var anim = animation[index],
      overflow = anim.overflow || false,
      images = anim.images || false

    overflow ? $('.fader').addClass('overflow') : null
    $('.style-overflow input').attr('checked', overflow)
    images ? $('.fader .item img').addClass('wh100') : null
    $('.style-images input').attr('checked', images)

    $('.custom').slideDown()
    $('#controls textarea').val(JSON.stringify(anim.def, null, 4))
    fader.animate = anim.def
  })

  $('.effect').on('change', function (e) {
    var name = $('.effect option:selected').text()
    name == 'puff'
      ? $('.fader .item img').addClass('wh100')
      : $('.fader .item img').removeClass('wh100')
    fader.effect = name
  })

  $('.css3').on('change', function (e) {
    // inline
    // fader.cssChanged = true
    // set transition
    var name = $('.css3 option:selected').text()
    fader.css3 = name
  })

  // animation helpers

  $('.style-overflow input').on('click', function (e) {
    $('.fader').toggleClass('overflow')
  })

  $('.style-images input').on('click', function (e) {
    $('.fader .item img').toggleClass('wh100')
  })

  $('.create').on('click', function (e) {
    $('#controls p').hide()
    try {
      var animation = JSON.parse($('#controls textarea').val())
      fader.animate = animation
    } catch (err) {
      $('#controls p').show()
    }
  })

  // init

  $('.duration option:eq(4)').attr('selected', true).parent().trigger('change')
  $('.delay option:eq(0)').attr('selected', true).parent().trigger('change')
  $('[name=transition]:eq(0)').trigger('change')
})

// css3 helpers

var prefix = (function cssPrefix () {
  switch (true) {
    case $.browser.webkit: return '-webkit-'
    case $.browser.mozilla: return '-moz-'
    case $.browser.msie: return '-ms-'
    case $.browser.opera: return '-o-'
    default: return ''
  }
}())

function cssInit () {
  var items = $('.fader .item')
  for (var i=0; i < items.length; i++) {
    var display = items[i].style.display
    var zIndex = items[i].style.zIndex
    items[i].style.cssText = ''
    $(items[i]).css({zIndex: zIndex, display: display})
      .css(prefix+'backface-visibility', 'hidden')
      .css(prefix+'animation-duration', fader.duration+'ms')
      .css(prefix+'animation-timing-function', cssEasing())
      .css(prefix+'animation-fill-mode', 'both')
  }
}

function cssEasing () {
  switch (fader.easing) {
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
