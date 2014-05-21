html5-fallback
=================

Forked from [toddmotto's required-fallback](https://github.com/toddmotto/required-fallback),
with added functionality for other attributes, starting with `placeholder` attributes,
but possibly with other additions as I find them necessary in other projects.

This project contains a robust HTML5 attribute fallback system, using client-side jQuery scripting.

###Currently supported attributes:
* `required` attribute, with client-side validation and the addition of required messages next to required fields.
	* this is still largely code from
		[toddmotto's required-fallback](https://github.com/toddmotto/required-fallback),
		but I've made some modifications for compatibility and code-standards (I use jshint)
* `placeholder` attribute, which will configurably add `title` attributes and/or a caption above, before, after, or below the field
	* By default, they are placed in the title attribute, (appended in parentheses if there already is one).

###Attributes currently planned:
* No additional attributes currently planned, but I might think of something.
	Feel free to contact me (I'm on GH pretty frequently) if you have ideas/requests.
	No guarantees on quick implementations, but I can guarantee a quick response. ^_^

##How do I get started?
In its simplest form, you can just:

1. Download the `html5-fallback.js` script into your web application's directory structure
2. Add `<script src="/path/to/js/html5-fallback.js"></script>` in your documents' `<head>`s
3. You're done!

  * *If you want, you can also:*
4. (optional) Download the `main.css` file into your web application's directory structure
5. (optional) Add `<link href="/path/to/css/main.css" rel="stylesheet">` in your documents' `<head>`s
6. (optional) Customize the classes therein to better fit your site's styling.

##Advanced Attributes and Configurations
I make use of the custom html5 'data-' attribute system, which is x-browser compatable,
and, with the use of jQuery, also works with older, non-html5 browsers.

All the data attributes are just inserted in the page's html, and you can add these attributes to anything,
but they'll only be used on form elements when the browser doesn't support the given HTML5 attribute.

I prefix all this fallback system's data attributes with 'data-fb-' to keep from conflicting (hopefully) with other systems.
This (obviously) stands for 'data-fallback' and should be easy enough to remember.

**Note:** This was primarily tested on IE7 (using F12 in IE11), but should work for anything past IE4

### Placeholder attribute handling:

Below I'm listing the suffixes of the data attributes which pertain to the
placeholder functionality and its options, all of which have the prefix:
'data-fb-ph-'. That is, they all use the standard prefix of 'data-fb-'
with the prefix 'ph-' for "placeholder" added to it.

#### Adding the placeholder to the element's `title` attribute:

#####**"-title-use"** - should I use the title attribute for placeholders?
  
  This attribute can be used to disable the default behavior of using the
  element's `title` attribute when finding new places for the placeholder
  information.

	E.g.:

	```
	<input placeholder="I'm a teapot" data-fb-ph-title-use="false"
		title="You've attempted to brew coffee in a teapot."/>
	```

	will result in:

	```
	<input class="placeholder"
		title="You've attempted to brew coffee in a teapot"><br />
	<span class="form-placeholder">I'm a teapot</span>
	```

	if the browser doesn't support `placeholder`

	If you want to use the title, you may either omit `data-fb-ph-title-use`
	or specify `data-fb-ph-title-use="true|1"`.

	**Note:** If "title-use" is set to false, none of the title-related attributes
	get used at all. You can specify them, but they will simply not be used.
##### **"-title-replace"** - should I replace the existing title attribute, if it exists, or append to it?

	In the event that an element which already has a title is detected, the default functionality is
	`data-fb-ph-title-replace="false"`, which will append the placeholder text to the existing `title`
	attribute, in parentheses.

	`data-fb-ph-title-replace="true|1"` will replace the form element's title instead of appending it in parantheses.

	E.g.:

	```
	<input placeholder="I'm a teapot" data-fb-ph-title-replace="true"
		title="You've attempted to brew coffee in a teapot."/>
	```

	will result in:

	```
	<input class="placeholder" data-fb-ph-title-replace="true"
		title="I'm a teapot">
	```

####Adding the placeholder as a description in a seperate DOM element:

#####**"-desc-use" - Should I add a description element that contains the placeholder's text?
  
This attribute can be used to disable the default behavior of adding an extra
element to the DOM which contains the placeholder's text information.

`data-fb-ph-desc-use="false|0"` will force no addition of a placeholder-based description.

E.g.:

```
<input placeholder="I'm a teapot" data-fb-ph-desc-use="false"/>
```

will result in:

```
<input class="placeholder" title="I'm a teapot" data-fb-ph-desc-use="false">
```

with no additional elements added to the dom.
	
#####**"-desc-format"** - What kind of DOM element should the description be placed in?

`data-fb-ph-desc-format` is used to specify what type of DOM-element to put it in

######Currently Supported Values:
* **"span"** (default)

	E.g.:

	```
	<input placeholder="I'm a teapot"
		title="You've attempted to brew coffee in a teapot."/>
	```

	will result in:

	```
	<input class="placeholder"
		title="You've attempted to brew coffee in a teapot"><br />
	<span class="form-placeholder">I'm a teapot</span>
	```

	if the browser doesn't support `placeholder`.
* **"label"**

	E.g.:

	```
	<input id="inputID" placeholder="I'm a teapot"
		data-fb-ph-desc-format="label"/>
	```

	will result in:

	```
	<input id="inputID" class="placeholder" title="I'm a teapot"
		 data-fb-ph-desc-format="label"><br />
	<label for="inputID" class="form-placeholder">I'm a teapot</label>
	```

	if the browser doesn't support `placeholder`.
	
	**Note:** make sure your form element has an id or name attribute,
	so the label can have its `for` attribute set properly. 
* **"div"**

	E.g.:

	```
	<input placeholder="I'm a teapot" data-fb-ph-desc-format="div"/>
	```

	will result in:

	```
	<input class="placeholder" title="I'm a teapot" data-fb-ph-desc-format="div">
	<div class="form-placeholder">I'm a teapot</div>
	```

	if the browser doesn't support `placeholder`.
* **"p"**

	E.g.:

	```
	<input placeholder="I'm a teapot" data-fb-ph-desc-format="p"
		title="You've attempted to brew coffee in a teapot." />
	```

	will result in:

	```
	<input class="placeholder"
		title="You've attempted to brew coffee in a teapot (I'm a teapot)">
	<p class="form-placeholder">I'm a teapot</p>
	```

	if the browser doesn't support `placeholder`.
* **"tr"**

	E.g.:

	```
	<table>
		<tr>
			<td>
				<input placeholder="I'm a teapot" data-fb-ph-desc-format="tr"
					title="You've attempted to brew coffee in a teapot." />
			</td>
		<tr>
	</table>
	```

	will result in:

	```
	<table>
		<tr>
			<td>
				<input class="placeholder" data-fb-ph-desc-format="tr"
					title="You've attempted to brew coffee in a teapot. (I'm a teapot)" />
			</td>
		<tr>
		<tr class="form-placeholder">
			<td>
				I'm a teapot
			</td>
		</tr>
	</table>
	```

	if the browser doesn't support `placeholder`.

	**Note:** this probably won't behave the way you want right now.
	I didn't take the time to devise a way of determining _where_ in
	the table you want it, or how many columns it should span, etc.

	You probably want to use **"td"** instead, and just adjust your
	table to possibly have one more cell per row.

	I may fix this later on, but it's not high on my priority list.
* **"td"**

	E.g.:

	```
	<table>
		<tr>
			<td>
				<input placeholder="I'm a teapot" data-fb-ph-desc-format="td"
					title="You've attempted to brew coffee in a teapot." />
			</td>
		<tr>
	</table>
	```

	will result in:

	```
	<table>
		<tr>
			<td>
				<input class="placeholder" data-fb-ph-desc-format="td"
					title="You've attempted to brew coffee in a teapot. (I'm a teapot)"/>
			</td>
			<td class="form-placeholder">
				I'm a teapot
			</td>
		</tr>
	</table>
	```

	if the browser doesn't support `placeholder`.

######Notes:
* All of these objects get the class ".form-placeholder" added to them.
* I may change the implementation so that any type of element is supported in the future,
	but that isn't high on my priority list. This list of elements will likely be all I ever need.

	Feel free to ask me about it, though, if you want the functionality added sooner.
	Or, of course, you could fork the repo and do it yourself, and just submit the pull request
	when you're done ;) I'd appreciate that, as well.

#####**"-desc-location" - Where should I put the description element?

######Currently Supported Values:
* **"above"** - Display the created element above this one, on a seperate line.
	* appends a `<br />` after the created element to ensure
		that it is above the form element.
	* designed for inline-elements (like `<label>` and `<span>`)
	* gets treated like **"before"** for block-level elements (see Note below).
* **"before"** - Display the created element before this one, inline.
	* the created element is inserted directly before the form element.
* **"after"** - Display the created element after this one, inline.
	* the created element is inserted directly after the form element.
* **"below"** (default) - Display the created element below this one, on a seperate line.
	* prepends a `<br />` before the created element to ensure
		that it is below the form element.
	* designed for inline-elements (like `<label>` and `<span>`)
	* gets treated like **"after"** for block-level elements (see Note below).
####Note:
* block-level elements (`<div>`, `<p>`), and table-elements (`<tr>`, `<td>`)
	specified with `data-fb-ph-desc-format` can only be displayed 
	with `data-fb-ph-desc-location="after|before"`.

	I only added the extra `<br />` capability for inline-elements,
	as using styling is a better approach to doing this with block-elements.

	Values are converted as follows:
	* 'above' => 'before' 
	* 'below' => 'after'

###Development:
I plan to keep developing this as I need it, but feel free to use it as you see fit.
I'll figure out a license later, for now just make sure you leave a link or url
to this project if you're using it, and let that be good enough.

###Contributing:
I only ask that you properly keep track of your changes in the ChangeLog,
and that you use jshint with the default options to validate your code.
Provided those things, go ahead and make a fork and shoot me a PR when you're done.
I'd love to see what people can do with something like this.
