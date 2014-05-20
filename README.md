html5-fallback
=================

Forked from [toddmotto's required-fallback](https://github.com/toddmotto/required-fallback),
with added functionality for other attributes, starting with `placeholder` attributes,
but possibly with other additions as I find them necessary in other projects.

This project contains a robust HTML5 attribute fallback system, using client-side jQuery scripting.

##How do I get started?
In its simplest form, you can just:
1. Download the `html5-fallback.js` script into your web application's directory structure
2. Add `<script src="/path/to/js/html5-fallback.js"></script>` in your documents' `<head>`s
3. You're done!

If you want, you can also:
4. (optional) Download the `main.css` file into your web application's directory structure
5. (optional) Add `<link href="/path/to/css/main.css" rel="stylesheet">` in your documents' `<head>`s
6. (optional) Customize the classes therein to better fit your site's styling.

## Currently supported attributes:
	* `required` attribute, with client-side validation and the addition of required messages next to required fields.
		* this is still largely code from
		[toddmotto's required-fallback](https://github.com/toddmotto/required-fallback),
		but I've made some modifications for compatibility and code-standards (I use jshint)
	* `placeholder` attribute, which will configurably add `title` attributes and/or a caption above, before, after, or below the field
		* By default, they are placed in the title attribute, (appended in parentheses if there already is one).

Attributes currently planned:
	* No additional attributes currently planned, but I might think of something.
	  Feel free to contact me (I'm on GH pretty frequently) if you have ideas/requests.
	  No guarantees on quick implementations, but I can guarantee a quick response. ^_^

##Advanced Attributes and Configurations
* `placeholder` attribute handling:
	* adding the placeholder to the element's `title` attribute:
		* `data-fb-ph-title-use="false|0"` disables this functionality altogether.

		  E.g.:

		  ```<input placeholder="I'm a teapot" title="You've attempted to brew coffee in a teapot." data-fb-title-use="false"/>```

		  will result in:

		  ```<input class="placeholder" title="You've attempted to brew coffee in a teapot"><br />
		  <span class="form-placeholder">I'm a teapot</span>````

		  if the browser doesn't support `placeholder`
		* `data-fb-ph-title-replace="true|1"` will replace the form element's title instead of appending it in parantheses.

		  E.g.:

		  ```<input placeholder="I'm a teapot" title="You've attempted to brew coffee in a teapot." data-fb-title-replace="true"/>`

		  will result in:

		  ```<input class="placeholder" title="I'm a teapot">```

	* adding the placeholder as a description in a seperate DOM element:
	    * `data-fb-ph-desc-use="false|0"` will force no addition of a placeholder-based description.

		  E.g.:

		  ```<input placeholder="I'm a teapot" data-fb-desc-use="false"/>`

		  will result in:

		  ```<input class="placeholder" title="I'm a teapot">```

		  with no additional elements added to the dom.
		  
		* `data-fb-ph-desc-format` is used to specify what type of DOM-element to put it in

		  ###Currently Supported Values:
		  	* **"span"** (default)

			  E.g.:

			  ```<input placeholder="I'm a teapot" title="You've attempted to brew coffee in a teapot."/>```

			  will result in:

			  ```<input class="placeholder" title="You've attempted to brew coffee in a teapot"><br />
			  <span class="form-placeholder">I'm a teapot</span>````

			  if the browser doesn't support `placeholder`.

		  	* **"label"**
		  		* **Note:** make sure your form element has an id or name attribute,
		  		  so the label can have it's `for` attribute set properly.
		  	* **"div"**
		  	* **"p"**
		  	* **"tr"**
		  		* **Note:** this probably won't behave the way you want right now.
		  		  I didn't take the time to devise a way of determining _where_ in
		  		  the table you want it, or how many columns it should span, etc.

		  		  You probably want to use **"td"** instead, and just adjust your
		  		  table to possibly have one more cell per row.

		  		  I may fix this later on, but it's not high on my priority list.
		  	* **"td"**

		  ###Note:
		    * All of these objects get the class ".form-placeholder" added to them.
		    * I may change the implementation so that any type of element is supported in the future,
		      but that isn't high on my priority list. This list of elements will likely be all I ever need.

		      Feel free to ask me about it, though, if you want the functionality added sooner.
		      Or, of course, you could fork the repo and do it yourself, and just submit the pull request
		      when you're done ;) I'd appreciate that, as well.

		* `data-fb-ph-desc-location` is used to configure where to put it
		  ###Currently Supported Values:
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
		  ###Note:
		    * block-level elements (`<div>`, `<p>`), and table-elements (`<tr>`, `<td>`)
		      specified with `data-fb-ph-desc-format` can only be displayed 
		      with `data-fb-ph-desc-location="after|before"`.

		      I only added the extra `<br />` capability for inline-elements,
		      as using styling is a better approach to doing this with block-elements.

		      Values are converted as follows:
		      * 'above' => 'before' 
		      * 'below' => 'after'

I plan to keep developing this as I need it, but feel free to use it as you see fit.
I'll figure out a license later, right now I'll get straight to coding.
