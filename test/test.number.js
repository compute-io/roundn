/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	roundn = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number roundn', function tests() {

	it( 'should export a function', function test() {
		expect( roundn ).to.be.a( 'function' );
	});

	it( 'should round a value to a desired number of decimals', function test() {
		assert.strictEqual( roundn( Math.PI, -2 ), 3.14 );
	});

	it( 'should round a value to a desired number of digits', function test() {
		assert.strictEqual( roundn( 12368, 3 ), 12000 );
	});

	it( 'should behave like `Math.round()` if `n` is 0', function test() {
		assert.strictEqual( roundn( Math.PI, 0 ), Math.round( Math.PI ) );
	});

});
