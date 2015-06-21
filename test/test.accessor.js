/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	roundn = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor roundn', function tests() {

	it( 'should export a function', function test() {
		expect( roundn ).to.be.a( 'function' );
	});

	it( 'should round values to the nearest multiple of 10^n using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': Math.PI}
		];
		actual = new Array( data.length );

		actual = roundn( actual, data, -2, getValue );
		expected = [ 3.14, 3.14, 3.14, 3.14, 3.14, 3.14  ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( roundn( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

});
