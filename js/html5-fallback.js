/**
 * The main JS file for html5-fallback
 *
 * Contains the scripting which determines which attributes are supported,
 *   and performing fallbacks.
 * For now: using variables (marked) for options.
 *
 * TODO use metas or something for configuration options.
 */


/**
 * Self-Executing function that does all the work
 *
 * I used (function($){...})(jQuery) format to allow use in environments,
 * e.g. WordPress, where the '$' alias of jQuery is not supported.
 * Since I use '$', I thought this would be a good idea.
 */
(function ($) {
			
	// feature detect
	var supportsRequired = 'required' in document.createElement('input');
	
	// loop through required attributes
	$('[required]').each(function () {
	
		// if 'required' isn't supported
		if (!supportsRequired) {
		
			// this
			var self = $(this);
		
			// swap attribute for class
			self.removeAttr('required').addClass('required');
			
			// append an error message
			self.parent().append('<span class="form-error">Required</span>');
			
		}
		
	});
	
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
		
		// if empty on change, i.e. if data is removed
		if (self.val() === '' || checked) {
		
			// show/keep the error in view
			self.siblings('.form-error').show();
		
		// if there's a value or checked
		} else {
		
			// hide the error
			self.siblings('.form-error').hide();
			
		}
		
	});

})(jQuery);
