/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	roundn = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix roundn', function tests() {

	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Float32Array( 25 );
	d2 = new Float32Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = Math.PI;
		d2[ i ] = 3.14;
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float32' );
		out = matrix( d2, [5,5], 'float32' );
	});

	it( 'should export a function', function test() {
		expect( roundn ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			roundn( matrix( [10,10] ), mat );
		}
	});

	it( 'should round values to the nearest multiple of 10^n', function test() {
		var actual;

		actual = matrix( [5,5], 'float32' );
		actual = roundn( actual, mat, -2 );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( roundn( out, mat, 0 ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( roundn( out, mat, 0 ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( roundn( out, mat, 0 ).data, expected );
	});

});
