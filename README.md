
# simplr-fade / [Playground](http://simov.github.com/simplr-fade/) / [Multiple](http://simov.github.com/simplr-fade/examples/demo2.html)

## HTML

You can use whatever html structure you want to as long as there is a container with items in it:

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

or a list if you want to:

```html
<ul class="fader">
	<li>item 1</li>
	<!-- ... -->
	<li>item N</li>
</ul>
```

## CSS

The container must be `relative` and the items must be `absolute`:

```css
/*required*/
.fader { position: relative; }
.fader .item { position: absolute; }
```

The items should have a **non transparent background** and their size should be equal to the size of the container, in order to *hide* them one under another.


## JavaScript

```js
$('.fader .item').srFade();
```


## Properties

### duration

Animation duration (in milliseconds: 1000 = 1 second, 400 = 0.4 of a second):

```js
$('.fader .item').srFade({duration: 600});
```

### delay

Time to wait between each step when `auto` is on (in milliseconds: 1000 = 1 second, 400 = 0.4 of a second):

```js
$('.fader .item').srFade({delay: 4000});
```

### easing

Specify an easing function to use for the transition between items. When using the `animate` property the [jQuery Easing](http://gsgd.co.uk/sandbox/jquery/easing/) plugin must be included inside your page. When using the `css3` property no additional plugin is required.

```js
$('.fader .item').srFade({
    easing: 'easeOutSine'
});
```

### auto

By default simplr-fade cycles through the items automatically:

```js
$('.fader .item').srFade({auto: false});
```

### animate

Pass css properties to animate (like in the default jQuery animate method):

```js
$('.fader .item').srFade({
	animate: { width: 0, height: 0, top:500/2, left:800/2, opacity:0.5 }
});
```

### effect

Specify a predefined animation from the [jQuery UI Effect](http://docs.jquery.com/UI/Effects) plugin. Note that it must be included inside your page before that:

```js
$('.fader .item').srFade({
	effect: 'puff'
});
```

Appropriate effects to use from the *jQuery UI Effect* plugin are: *blind, clip, drop, explode, fade, fold, puff*.

### css3

Specify a predefined animation from [animate.css](http://daneden.me/animate/). Note that it must be included inside your page before that:

```js
$('.fader .item').srFade({
    css3: 'flipOutX'
});
```

The *animate*, *effect* and *css3* properties cannot be used simultaneously.


## Events

#### onFade

Raised just before the animation starts. It receives the item's `index` that is about to be animated. That's the place to update the navigation of the fader (if there is one).

```js
$('.fader .item').srFade({
	onFade: function (index) {
		$('.fader-nav a').removeClass('active').eq(index).addClass('active');
	}
});
```

#### onAfterFade

Raised after the animation of the current item has completed. It receives the current item's `index`. Can be used to start secondary animations within the fader items.

```js
$('.fader .item').srFade({
	onAfterFade: function (index) {
		$('.fader .item').eq(index).find('p').slideDown();
	}
});
```

## Methods

First you need a simplr-fade instance:

```js
var fader = $('.fader .item').srFade({
	// ... properties and events
});
```

### prev

Navigate back and forth between your items, usefull for navigation arrows:

```js
$('.prev').click(function () {
	fader.prev();
	return false;
});
```

### next

```js
$('.next').click(function () {
	fader.next();
	return false;
});
```

### fadeTo

Navigate to specific item, usefull for navigation dots:

```js
$('.fader-nav a').click(function () {
	fader.fadeTo($('.fader-nav a').index(this));
	return false;
});
```

### stop

The automatic transition between items can be stopped temporarily and restarted back later on. Usefull when hovering over the fader:

```js
$('.fader .item').mouseover(function () {
	fader.stop();
});
```

### start

```js
$('.fader .item').mouseout(function () {
	fader.start();
});
```
