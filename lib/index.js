'use strict';

var GeddyMockRequest	= require( './geddy-mock-request' ),
	GeddyMockResponse	= require( './geddy-mock-response' ),
  sockets = require('socket.io').listen(geddy.server, {'log level': 0});


var GeddyUnitTestUtils = {

	controller : {
			create : function( controllerName )
			{
        geddy.io = {
          sockets: sockets
        };
        
				var ctl = geddy.controller.create( controllerName );
				ctl.app = {
					router: {}
				};

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
