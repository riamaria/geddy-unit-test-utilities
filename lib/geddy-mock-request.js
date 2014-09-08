'use strict';

/**
 * Mock response class for unit testing Geddy controllers
 * 
 * @author Aleksi Asikainen 
 * @constructor  
 */
var GeddyMockRequest = function( options )
{
	this.headers = {};
};


GeddyMockRequest.prototype = {

	/**
	 * Set request headers
	 * 
	 * @public
	 * @param {object} headers	 	 	 
	 */	 		
	setHeaders : function( headers )
	{
		this.headers = headers || {};
	},
}


module.exports = GeddyMockRequest;

