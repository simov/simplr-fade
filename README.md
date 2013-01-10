#simplr-fade
jquery fader plugin.

##Live demos
- [Main demo](http://simov.github.com/simplr-fade/)
- [Multiple faders demo](http://simov.github.com/simplr-fade/examples/demo2.html)

The demos are in the `examples/` folder of this repository.

##Html structure
```html
    <div class="some-holder">
    	<div class="elem">
			<p>elem stuff inside</p>
		</div>
		<div class="elem">
			<p>elem stuff inside</p>
		</div>
		<!-- ... -->
	</div>
	
	<!-- or some list if you like -->
	<ul><!-- ul or something else is your container -->
		<li>elem stuff inside</li>
		<li>elem stuff inside</li><!-- these are your elements -->
		<!-- ... -->
	</ul>
	
	<!-- or whatever html structure you want to use -->
```

##Css
Your fader holder must be **relative** and your fader items inside must be **absolute**.
```css
    /*you must set this at minimum!*/
    .some-holder { position: relative; }
	.some-holder .elem { position: absolute; }
```
You must have some non transparent background within your fader elements.
You'll need to set up the **width** and the **height** of your elements to be exact as their holder, in order to *hide* them one below another.

##Plugin call
```js
    $('.some-holder .elem').srFade();
```

##Properties

####speed, duration
Alternate the animation **speed** and the **duration** to wait between steps (in milliseconds: 1000 = 1 second, 400 = 0.4 second and so forth).
```js
    $('.some-holder .elem').srFade({speed: 600, duration: 4000});
```
####auto
By default simplr-fade fades the elements automatically, you can change that by passing additional parameter to the plugin call.
```js
    $('.some-holder .elem').srFade({auto: false});
```

##Events
####onFade
This event is raised just before the animation starts. You receive the **index** of the element that is about to be animated. This is the place to update the navigation of your fader (if you have one).
```js
    $('.some-holder .elem').srFade({
    	onFade: function (index) {
			$('.fader-nav a').removeClass('active').eq(index).addClass('active');
		}
	});
```

####onAfterFade
Raises after the animation of the current element is completed. You receive the **index** of the current element. You can use this event to start secondary animations inside your fader elements.
```js
    $('.some-holder .elem').srFade({
    	onAfterFade: function (index) {
			$('.some-holder .elem').eq(index).find('p').slideDown();
		}
	});
```

##Methods
First ger an instance to your fader.
```js
    var fader = $('.fader .item').srFade({
    	// ... properties and events
	});
```
####prev, next
If you have prev/next buttons for navigating use them like this.
```js
    $('.prev').click(function () {
		fader.prev();
		return false;
	});
	$('.next').click(function () {
		fader.next();
		return false;
	});
```
####fadeTo
You can use this with your fader navigation to go to a specified item.
```js
    $('.fader-nav a').click(function () {
    	fader.fadeTo($('.fader-nav a').index(this));
		return false;
	});
```
####start, stop
You can stop the auto fade temporarily and start it again. Usefull on hovering fader elements.
```js
    $('.some-holder .elem').hover(function () {
    	fader.stop();
	}, function () {
		fader.start();
	});
```

##animate
If you're not satisfied with the default's jQuery fadeOut effect you can write your own animations for transition between fader elements. Call the plugin with additional **animate** parameter and pass the css properties you want to animate like in the default's jquery animate method.
```js
    $('.some-holder .elem').srFade({
    	animate: { width: 0, height: 0, top:500/2, left:800/2, opacity:0.5 }
	});
```

##effect
You can use a particular effect from the jQueryUI-Effect plugin with the **effect** parameter. Note that you must include the **jquery.ui.effect** plugin in your html file.
```js
    $('.some-holder .elem').srFade({
    	effect: 'puff'
	});
```
Not all effects from the **jquery.ui.effect** plugin are useful with this plugin. The right ones to use are these: *blind, clip, drop, explode, fade, fold, puff*.

The *animate* and *effec* arguments can't be used at the same time. The *effect* parameter takes precedence if both are supplied.
