'use strict';

/**
 * Mock response class for unit testing Geddy controllers
 * 
 * Usage:
 *  
 * <code>
 * var ctl = geddy.controller.create( 'MyController' );
 * 
 * ctl.request = new GeddyMockRequest();
 * ctl.response = new GeddyMockResponse(); 
 * 
 * ctl.params = {};
 * 
 * ctl.response.onComplete(
 * 		function()
 * 		{
 *         console.log( ctl.response.getStatusCode() );
 *         console.log( ctl.response.getHeader( 'content-type' ) );
 *         console.log( ctl.response.getContent() );   
 * 		}
 * );      
 * 
 * ctl._handleAction( 'myTestAction' );
 * </code> 
 *    
 * @constructor
 * @author Aleksi Asikainen 
 */
var GeddyMockResponse = function()
{
	this.headers			= {};
	this.content			= null;
	this.statusCode			= null;
	this.onCompleteCallback	= null;
};


GeddyMockResponse.prototype = {

	/**
	 * Get HTTP response content
	 * 
	 * @public
	 * @returns {string|null} Returns a string containing the reponse body or null if no content has been made available	 	 	 
	 */	 	
	getContent : function()
	{
		return this.content;
	},


	/**
	 * Get HTTP response status code
	 * 	 	
	 * @public
	 * @returns {int|null} Returns the status code of the response or null if no status code has been set	 	
	 */	
	getStatusCode : function()
	{
		return this.statusCode;
	},


	/**
	 * Get HTTP response header line
	 * 
	 * @public
	 * @param {string} headerName
	 * @returns {string|null} Returns the content of the header line or null if the specified header line does not exist	 	 
	 */	
	getHeader : function( headerName )
	{
		var lowerHeaderName = headerName.toLowerCase();

		for( var p in this.headers )
		{
			if( this.headers.hasOwnProperty( p ) === true )
			{
				if( p.toLowerCase() === lowerHeaderName )
				{
					return this.headers[ p ];
				}
			}
		}

		return null;
	},


	/**
	 * Set a callback function to be called once the response is ready to be examined
	 * 
	 * @param {Function} callbackFunction Function which will be called after the response has been fully prepared	 	 
	 * @public	 	
	 */	
	onComplete : function( callbackFunction )
	{
		this.onCompleteCallback = callbackFunction;
	},


	/**
	 * @private
	 */	
	triggerOnComplete : function()
	{
		if( this.onCompleteCallback )
		{
			this.onCompleteCallback();
		}
	},


	/**
	 * Set response headers and status code
	 * 
	 * Called by BaseController	 	 
	 * 
	 * @param {int} statusCode
	 * @param {object} headers
	 * 	 
	 * @protected	 	 
	 */	 	
	setHeaders : function( statusCode, headers )
	{
		this.headers	= headers || {};
		this.statusCode	= statusCode;
	},


	/**
	 * Called by BaseController when request is completed without a body (e.g. HEAD)
	 * 	 
	 * @protected	 
	 */	
	finish : function()
	{
		this.triggerOnComplete();
	},


	/**
	 * Called by BaseController when request is completed with a body
	 * 
	 * @param {string} content Response body	 
	 * @protected 	 
	 */	 	
	finalize : function( content )
	{
		this.content = content;
		this.triggerOnComplete();
	}

};


module.exports = GeddyMockResponse;

