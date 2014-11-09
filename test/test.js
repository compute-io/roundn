'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	roundn = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-roundn', function tests() {

	it( 'should export a function', function test() {
		expect( roundn ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array or numeric value', function test(){
		var values = [
			'5',
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				roundn( value, 0 );
			};
		}
	});

	it( 'should throw an error if not provided an integer power', function test(){
		var values = [
			'5',
			5.326,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				roundn( Math.PI, value );
			};
		}
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

	it( 'should return `null` if provided an empty array', function test() {
		assert.isNull( roundn( [], 0 ) );
	});

	it( 'should round all values in an array', function test() {
		var data = new Array( 5 ),
			expected = new Array( 5 );
		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = Math.PI;
			expected[ i ] = 3.14;
		}
		assert.deepEqual( roundn( data, -2 ), expected );
	});

});
