/**
 * The main JS file for html5-fallback
 *
 * Contains the scripting which determines which attributes are supported,
 *   and performing fallbacks.
 * For now: using variables (marked) for options.
 */


/**
 * Self-Executing function that does all the work
 *
 * I used (function($){...})(jQuery) format to allow use in environments,
 * e.g. WordPress, where the '$' alias of jQuery is not supported.
 * Since I use '$', I thought this would be a good idea.
 *
 * `required` and `placeholder` elements are the only ones with functionality at all,
 * and `required` is largely unchanged from toddmotto's implementation from which
 * I forked this project.
 * Placeholder supports a few options that can be specified using 'data-' attributes
 * in the DOM. Check out the README for more info on those.
 * TODO add configurable options to required.
 */
(function ($) {
			
	// feature detect
	var supportsRequired = 'required' in document.createElement('input');
	var supportsPlaceholder = 'placeholder' in document.createElement('input');
	
	//
	// Required attribute handling
	//

	// if 'required' isn't supported
	if(!supportsRequired)
	{
		// loop through required attributes
		$('[required]').each(function () {
			// this
			var self = $(this);
		
			// swap attribute for class
			self.removeAttr('required').addClass('required');
			
			// append an error message
			self.parent().append('<span class="form-error">Required</span>');	
		});
	}
	
	// submit the form
	$('.form').on('submit', function (e) {
	
		// loop through class name required
		$('.required').each(function () {
		
			// this
			var self = $(this);
			
			// check shorthand if statement for input[type] detection
			var checked = (self.is(':checkbox') || self.is(':radio')) ?
				self.is(':not(:checked)') &&
					$('input[name=' + self.attr('name') + ']:checked').length === 0 :
				false;
			
			// run the empty/not:checked test
			if (self.val() === '' || checked) {
					
				// show error if the values are empty still (or re-emptied)
				// this will fire after it's already been checked once
				self.siblings('.form-error').show();
				
				// stop form submitting
				e.preventDefault();
			
			// if it's passed the check
			} else {
			
				// hide the error
				self.siblings('.form-error').hide();
				
			}
			
		});
		
		// all other form submit handlers here
	
	});
	
	// key change on all form inputs
	$('input, textarea', '.form').on('blur change', function () {
	
		// this
		var self = $(this);
			
		// check shorthand if statement for input[type] detection
		var checked = (self.is(':checkbox') || self.is(':radio')) ?
			self.is(':not(:checked)') &&
				$('input[name=' + self.attr('name') + ']:checked').length === 0 :
			false;
		
		if (self.val() === '' || checked)
		{
			// if empty on change, i.e. if data is removed
			// show/keep the error in view
			self.siblings('.form-error').show();
		}
		else
		{
			// if there's a value or checked
			// hide the error
			self.siblings('.form-error').hide();
		}
		
	});
	
	//
	// Placeholder attribute handling
	//
	
	// if 'placeholder' isn't supported
	if (!supportsPlaceholder) {
		// loop through placeholder attributes
		$('[placeholder]').each(function () {
			// this
			var self = $(this);
		
			// grab the contents of the attribute
			var placeholder = self.attr('placeholder');
			// swap attribute for class
			self.removeAttr('placeholder').addClass('placeholder');

			// Now to determine what to do with it:
			// first do the title attribute, if not already filled out or fb-ph-usetitle != false
			var useTitle = self.data('fb-ph-title-use');
			if(useTitle === undefined)
			{
				useTitle = true;
			}
			var title = self.attr('title');
			if(useTitle)
			{
				// then we are using the title. How?
				if( title === '' || title === undefined )
				{
					// no/empty existing title attribute, just set the title
					self.attr('title', placeholder);
				}
				else
				{
					// title attribute exists. What do?
					var replaceTitle = self.data('fb-ph-title-replace');
					if(replaceTitle === undefined)
					{
						replaceTitle = false;
					}
					if(replaceTitle)
					{
						self.attr('title', placeholder);
					}
					else
					{
						// assume 'append' operation
						self.attr('title', title + ' (' + placeholder + ')');
					}
				}
			}

			// Now: are we adding it as a description?
			var useDesc = self.data('fb-ph-desc-use');
			if(useDesc === undefined || useDesc === '')
			{
				// set the default
				useDesc = true;
			}

			// if we are adding it as a description...
			if(useDesc)
			{
				// ... then where?
				var location = self.data('fb-ph-desc-location');
				if(location === undefined || location === '')
				{
					// set the default (below)
					location = 'below';
				}

				/* now format the placeholder element text
				 * How are we formatting it?
				 * 
				 * This way we can check if we're using a block-level element here
				 * (div,p,etc), which can determine how it's appended
				 *
				 * TODO there's probably a more elegant way of doing this, frankly.
				 */

				var format = self.data('fb-ph-format');
				if(format === undefined)
				{
					format = 'span';
				}
				var blockElem = false;
				if(format === 'span')
				{
					// use a span attribute for it
					placeholder = '<span class="form-placeholder">' + placeholder + '</span>';
				}
				else if(format === 'label')
				{
					// a label pointing to the element (make sure you're using an ID or name)
					var id = (this.id !== undefined ? this.id : self.attr('name'));
					placeholder = '<label for="' + id + '" class="form-placeholder">' + placeholder + '</label>';
				}
				else if(format === 'div')
				{
					placeholder = '<div class="form-placeholder">' + placeholder + '</div>';
					// we have a block
					blockElem = true;
				}
				else if(format === 'p')
				{
					placeholder = '<p class="form-placeholder">' + placeholder + '</p>';
					blockElem = true;
				}
				else if(format === 'tr')
				{
					// TODO what to do about column-span?
					placeholder = '<tr class="form-placeholder"><td>' + placeholder + '</td></tr>';
					blockElem = true;
				}
				else if(format === 'td')
				{
					placeholder = '<td class="form-placeholder">' + placeholder + '</td>';
					blockElem = true;
				}

				if(blockElem)
				{
					// adjust the location because <br />s aren't necessary for blocks
					if(location === 'above')
					{
						location = 'before';
					}
					else if(location === 'below')
					{
						location = 'after';
					}
				}


				// and parse the resulting location and append/prepend accordingly
				if(location === 'below')
				{
					self.parent().append('<br />' + placeholder);
				}
				else if(location === 'after')
				{
					self.parent().append(placeholder);
				}
				else if(location === 'before')
				{
					self.before(placeholder);
				}
				else if(location === 'above')
				{
					self.before(placeholder + '<br />');
				}
			}
		});
	}

})(jQuery);
