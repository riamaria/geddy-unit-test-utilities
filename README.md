# Geddy Unit Test Utilities


## Installation

```bash
> npm install geddy-unit-test-utils
```


## Usage

```javascript
var assert				= require( 'assert' ),
	GeddyUnitTestUtils	= require( 'geddy-unit-test-utils' );


var tests = {

	'test controller action' : function( next )
	{
		var ctl = GeddyUnitTestUtils.controller.create( 'MyTestController' );
		
		ctl.params = {
				id		: 1234,
				name	: 'John',
				phone	: '12345678'
		};
		
		ctl.response.onComplete(
				function()
				{
					console.log( ctl.response.getStatusCode() );
					console.log( ctl.response.getHeader( 'content-type' ) );
					console.log( ctl.response.getContent() );
				
					assert.equals( ctl.response.getStatusCode(), 200 );
				
					next();
				}
			);
			
		ctl.unit.runAction( 'myAction' );
	}

};

module.exports = tests;
```

