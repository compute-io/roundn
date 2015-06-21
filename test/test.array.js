/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	roundn = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array roundn', function tests() {

	it( 'should export a function', function test() {
		expect( roundn ).to.be.a( 'function' );
	});

	it( 'should round values to the nearest multiple of 10^n.', function test() {
		var data, actual, expected, i;

		data = new Array( 5 );
		expected = new Array( 5 );
		actual = new Array( 5 );

		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = Math.PI;
			expected[ i ] = 3.14;
		}

		actual = roundn( actual, data, -2 );

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Float64Array( data );
		actual = new Float64Array( data.length );

		actual = roundn( actual, data, -2 );
		expected = new Float64Array( expected );

		assert.deepEqual( actual, expected, 'typed arrays' );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( roundn( [], [] ), [] );
		assert.deepEqual( roundn( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
