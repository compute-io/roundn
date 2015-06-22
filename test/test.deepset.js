/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	roundn = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset roundn', function tests() {

	it( 'should export a function', function test() {
		expect( roundn ).to.be.a( 'function' );
	});

	it( 'should round values to the nearest multiple of 10^n and deep set', function test() {
		var data, expected;

		data = [
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': Math.PI},
			{'x': null}
		];

		data = roundn( data, -2, 'x' );
		expected = [
			{'x': 3.14},
			{'x': 3.14},
			{'x': 3.14},
			{'x': 3.14},
			{'x': 3.14},
			// for nun-numeric values, return NaN
			{'x': NaN}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]}
		];

		data = roundn( data, -2, 'x/1', '/' );
		expected = [
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( roundn( [], -2, 'x' ), [] );
		assert.deepEqual( roundn( [], -2, 'x', '/' ), [] );
	});

});
