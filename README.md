html5-fallback
=================

Forked from [toddmotto's required-fallback](https://github.com/toddmotto/required-fallback),
with added functionality for other attributes, starting with `placeholder` attributes,
but possibly with other additions as I find them necessary in other projects.

This project contains a robust html5 attribute fallback system, using client-side jQuery scripting.

### Currently supported attributes: ###
* `required` attribute, with client-side validation and the addition of required messages next to required fields.
    * this is still largely code from
        [toddmotto's required-fallback](https://github.com/toddmotto/required-fallback),
        but I've made some modifications for compatibility and code-standards (I use jshint)
* `placeholder` attribute, which will configurably add `title` attributes and/or a caption above, before, after, or below the field
    * By default, they are placed in the title attribute, (appended in parentheses if there already is one).

### Attributes currently planned: ###
* `min`/`max` fields, and other fields that get validated automatically by html5
*

## How do I get started? ##
In its simplest form, you can just:

1. Download the [html5-fallback.js](js/html5-fallback.js) script into your web application's directory structure
2. Add `<script src="/path/to/js/html5-fallback.js"></script>` in your documents' `<head>`s
3. You're done!

  _If you want,_ you can also:
4. (optional) Customize the styling of elements added or modified by this system:
    - Form Validation messages will all have the class `.form-error`
    - Required form elements will have the class `.required`
    - Added descriptions (to replace placeholders) will have the class `.form-placeholder`
    - Any form element which had a placeholder will have te class `.placeholder`

### Testing: ###
If you want to test whether or not it's currently working, just open up
[html5-fallback.js](js/html5-fallback.js) and edit the following line
(on line # 27):

```javascript
// set to true to test on modern browsers
var testing = false;
```

to say:

```javascript
// set to true to test on modern browsers
var testing = true;
```


## Advanced Attributes and Configurations ##
I make use of the custom html5 'data-' attribute system, which is x-browser compatable,
and, with the use of jQuery, also works with older, non-html5 browsers.

All the data attributes are just inserted in the page's html, and you can add these attributes to anything,
but they'll only be used on form elements when the browser doesn't support the given html5 attribute.

I prefix all this fallback system's data attributes with 'data-fb-' to keep from conflicting (hopefully) with other systems.
This (obviously) stands for 'data-fallback' and should be easy enough to remember.

**Note:** This was primarily tested on IE7 (using F12 in IE11), but should work for anything past IE4

### Required attribute handling: ###

As stated earlier, this code has been largely left unchanged (as of now),
but might get some configuration options and the like, if I ever get around to it.

For now: here's what it does:

Let's say you have:

```html
<form>
    <div id="parent">
        <input type="text" required />
    </div>
</form>
```

on your page somewhere. The form can contain as little or as much as you want.

If the browser that's displaying the form doesn't know how to use the
html5 `required` attribute, your input element will display as:


```html
<form>
    <div id="parent">
        <input type="text" class="required" />
        <span class="form-error">Required</span>
    </div>
</form>
```

in the markdown. The javascript hides the "Required" message initially.

Then, if you were to submit this form, it is automatically validated in
client-side javascript. If any of the `<input required>`s on the page have
not been filled out, they will display the `<span class="form-error">Required</span>`
message until they are changed, and the form will not submit.

If the user then fills out all the pages, they can successfully submit the form.

#### Notes: ####
* All of the validation message objects get the class ".form-error" added to them.
* TODO Add config-attribute for the validation failure message
* TODO Add automatic additions of asterixes, title usage, etc.

### Placeholder attribute handling: ###

Below I'm listing the suffixes of the data attributes which pertain to the
placeholder functionality and its options, all of which have the prefix:
'data-fb-ph-'. That is, they all use the standard prefix of 'data-fb-'
with the prefix 'ph-' for "placeholder" added to it.

#### Adding the placeholder to the element's `title` attribute: ####

##### **"-title-use"** - should I use the title attribute for placeholders? #####

This attribute can be used to disable the default behavior of using the
element's `title` attribute when finding new places for the placeholder
information.

E.g.:

```html
<input placeholder="I'm a teapot" data-fb-ph-title-use="false"
    title="You've attempted to brew coffee in a teapot."/>
```

will result in:

```html
<input class="placeholder"
    title="You've attempted to brew coffee in a teapot"><br />
<span class="form-placeholder">I'm a teapot</span>
```

if the browser doesn't support `placeholder`

If you want to use the title, you may either omit `data-fb-ph-title-use`
or specify `data-fb-ph-title-use="true|1"`.

**Note:** If "title-use" is set to false, none of the title-related attributes
get used at all. You can specify them, but they will simply not be used.
##### **"-title-replace"** - should I replace the existing title attribute, if it exists, or append to it? #####

In the event that an element which already has a title is detected, the default functionality is
`data-fb-ph-title-replace="false"`, which will append the placeholder text to the existing `title`
attribute, in parentheses.

`data-fb-ph-title-replace="true|1"` will replace the form element's title instead of appending it in parantheses.

E.g.:

```html
<input placeholder="I'm a teapot" data-fb-ph-title-replace="true"
    title="You've attempted to brew coffee in a teapot."/>
```

will result in:

```html
<input class="placeholder" data-fb-ph-title-replace="true"
    title="I'm a teapot">
```

#### Adding the placeholder as a description in a seperate DOM element: ####

##### **"-desc-use"** - Should I add a description element that contains the placeholder's text? #####

This attribute can be used to disable the default behavior of adding an extra
element to the DOM which contains the placeholder's text information.

`data-fb-ph-desc-use="false|0"` will force no addition of a placeholder-based description.

E.g.:

```html
<input placeholder="I'm a teapot" data-fb-ph-desc-use="false"/>
```

will result in:

```html
<input class="placeholder" title="I'm a teapot" data-fb-ph-desc-use="false">
```

with no additional elements added to the dom.

#####**"-desc-format"** - What kind of DOM element should the description be placed in?

`data-fb-ph-desc-format` is used to specify what type of DOM-element to put it in

######Currently Supported Values:
* **"span"** (default)

    E.g.:

    ```html
    <input placeholder="I'm a teapot"
        title="You've attempted to brew coffee in a teapot."/>
    ```

    will result in:

    ```html
    <input class="placeholder"
        title="You've attempted to brew coffee in a teapot"><br />
    <span class="form-placeholder">I'm a teapot</span>
    ```

    if the browser doesn't support `placeholder`.
* **"label"**

    E.g.:

    ```html
    <input id="inputID" placeholder="I'm a teapot"
        data-fb-ph-desc-format="label"/>
    ```

    will result in:

    ```html
    <input id="inputID" class="placeholder" title="I'm a teapot"
         data-fb-ph-desc-format="label"><br />
    <label for="inputID" class="form-placeholder">I'm a teapot</label>
    ```

    if the browser doesn't support `placeholder`.

    **Note:** make sure your form element has an id or name attribute,
    so the label can have its `for` attribute set properly.
* **"div"**

    E.g.:

    ```html
    <input placeholder="I'm a teapot" data-fb-ph-desc-format="div"/>
    ```

    will result in:

    ```html
    <input class="placeholder" title="I'm a teapot" data-fb-ph-desc-format="div">
    <div class="form-placeholder">I'm a teapot</div>
    ```

    if the browser doesn't support `placeholder`.
* **"p"**

    E.g.:

    ```html
    <input placeholder="I'm a teapot" data-fb-ph-desc-format="p"
        title="You've attempted to brew coffee in a teapot." />
    ```

    will result in:

    ```html
    <input class="placeholder"
        title="You've attempted to brew coffee in a teapot (I'm a teapot)">
    <p class="form-placeholder">I'm a teapot</p>
    ```

    if the browser doesn't support `placeholder`.
* **"tr"**

    E.g.:

    ```html
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

    ```html
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

    ```html
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

    ```html
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

###### Notes: ######
* All of these objects get the class ".form-placeholder" added to them.
* I may change the implementation so that any type of element is supported in the future,
    but that isn't high on my priority list. This list of elements will likely be all I ever need.

    Feel free to ask me about it, though, if you want the functionality added sooner.
    Or, of course, you could fork the repo and do it yourself, and just submit the pull request
    when you're done ;) I'd appreciate that, as well.

##### **"-desc-location"** - Where should I put the description element? #####

###### Currently Supported Values:######
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

##### Note: #####
* block-level elements (`<div>`, `<p>`), and table-elements (`<tr>`, `<td>`)
    specified with `data-fb-ph-desc-format` can only be displayed
    with `data-fb-ph-desc-location="after|before"`.

    I only added the extra `<br />` capability for inline-elements,
    as using styling is a better approach to doing this with block-elements.

    Values are converted as follows:
    * 'above' => 'before'
    * 'below' => 'after'

#### Notes: ####
* All of the validation message objects get the class ".form-placeholder" added to them.
* TODO Add javascript solution to mimic the placeholder functionality
    - I'd like to actually replace the functionality if need-be, to keep make
        my functionality just as robust as Todd's required functionality.

### Development: ###
I plan to keep developing this as I need it, but feel free to use it as you see fit,
subject to the license(s). Bug fixes might be coming soon, if I find any, otherwise,
consider it finished until I change this notice.

### Licensing: ###

As a whole, I release this under the [MIT License](http://opensource.org/licenses/MIT) as follows:

> The MIT License (MIT)
>
> Copyright (c) 2014 Chris Thomas <thomas.chris.a@gmail.com>
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

The portions of the software relating to required attributes, as well as the
index.html and .css files are (C) 2013 [Todd Motto](toddmotto.com), and distributed under the
MIT License. [Click Here](http://toddmotto.com/licensing) to view his specific
licensing terms, otherwise look below for an enclosed version of the license:

> The MIT License (MIT)
>
> Copyright (c) 2013 Todd Motto
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

### Contributing: ###
I only ask that you properly keep track of your changes in the ChangeLog,
and that you use jshint with the default options to validate your code.
Provided those things, go ahead and make a fork and shoot me a PR when you're done.
I'd love to see what people can do with something like this.
