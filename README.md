#simplr-fade
###[Playground](http://simov.github.com/simplr-fade/)
###[Multiple](http://simov.github.com/simplr-fade/examples/demo2.html)

##Html
You can use whatever html structure you want to as long as there is a container filled in with items.
```html
<div class="fader">
    <div class="item">
		<p>item 1</p>
	</div>
	<!-- ... -->
	<div class="item">
		<p>item N</p>
	</div>
</div>
```
Use a list if you want to.
```html
<ul>
	<li>item 1</li>
	<!-- ... -->
	<li>item N</li>
</ul>
```

##Css
The container must be **relative** and the items inside must be **absolute**.
```css
/*required*/
.fader { position: relative; }
.fader .item { position: absolute; }
```
The items must have some **non transparent background** within them and their size must be equal to their container's size, in order to *hide* them one below another.

##Plugin call
```js
$('.fader .item').srFade();
```

##Properties

####speed
Alternate the animation **speed** (in milliseconds: 1000 = 1 second, 400 = 0.4 of a second).
```js
$('.fader .item').srFade({speed: 600});
```
####duration
Alternate the time to wait between each step when *auto* is on (in milliseconds: 1000 = 1 second, 400 = 0.4 of a second).
```js
$('.fader .item').srFade({duration: 4000});
```

####auto
By default simplr-fade cycle through the items automatically.
```js
$('.fader .item').srFade({auto: false});
```

####animate
Pass the css properties you want to animate like in the default's jquery animate method.
```js
$('.fader .item').srFade({
	animate: { width: 0, height: 0, top:500/2, left:800/2, opacity:0.5 }
});
```

####easing
Specify an easing function to use when transitioning between the items. Note that the **jquery.easing** plugin must be included in your html page before using this property.
```js
$('.fader .item').srFade({
	easing: 'easeOutBounce'
});
```

####effect
Specify a predefined animations from the **jquery.ui.effect** plugin. Note that it must be included in your html page before using this property.
```js
$('.fader .item').srFade({
	effect: 'puff'
});
```
Not all effects from the **jquery.ui.effect** plugin are useful for this plugin. The right ones to use are: *blind, clip, drop, explode, fade, fold, puff*.

The *animate* and the *effect* properties can't be used simultaneously. The *effect* property will take precedence if both are supplied.


##Events

####onFade
Raised just before the animation starts. It receives the **index** of the element that is about to be animated. This is the place to update the navigation of your fader (if you have one).
```js
$('.fader .item').srFade({
	onFade: function (index) {
		$('.fader-nav a').removeClass('active').eq(index).addClass('active');
	}
});
```

####onAfterFade
Raises after the animation of the current item is completed. It receives the **index** of the current item. You can use this event to start secondary animations within your fader items.
```js
$('.fader .item').srFade({
	onAfterFade: function (index) {
		$('.fader .item').eq(index).find('p').slideDown();
	}
});
```

##Methods
First get an instance of your fader.
```js
var fader = $('.fader .item').srFade({
	// ... properties and events
});
```
####prev
If you have navigation arrows for cycle through the items use them like this.
```js
$('.prev').click(function () {
	fader.prev();
	return false;
});
```
####next
```js
$('.next').click(function () {
	fader.next();
	return false;
});
```
####fadeTo
Use it to navigate to a specified item. Usefull for navigation dots.
```js
$('.fader-nav a').click(function () {
	fader.fadeTo($('.fader-nav a').index(this));
	return false;
});
```
####start stop
The automatic transition between the items can be stopped temporarily and restarted back later on. Usefull when hovering on fader item.
```js
$('.fader .item').hover(function () {
	fader.stop();
}, function () {
	fader.start();
});
```
