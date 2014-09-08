'use strict';

var GeddyMockRequest	= require( './geddy-mock-request' ),
	GeddyMockResponse	= require( './geddy-mock-response' );


var GeddyUnitTestUtils = {

	controller : {
			create : function( controllerName )
			{
				var ctl = geddy.controller.create( controllerName );
		
				ctl.params		= {};
				ctl.request		= new GeddyMockRequest();
				ctl.response	= new GeddyMockResponse();
				
				ctl.unit = {
					runAction : function( actionName )
					{
						ctl._handleAction( actionName );
					}
				};
		
				return ctl;
			}
	}

};


module.exports = GeddyUnitTestUtils;
