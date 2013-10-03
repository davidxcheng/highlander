requirejs.config({

	// by default load module IDs from js/libs
	baseUrl: 'js/libs',

	// except for this module
	paths: {
		highlander: '../highlander'
	} 
});

requirejs(['highlander'], function(hl) {

});