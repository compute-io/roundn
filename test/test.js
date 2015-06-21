/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

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

	it( 'should throw an error if the first argument is neither a number or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
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
				roundn( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				roundn( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				roundn( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				roundn( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should  values to the nearest multiple of 10^n when provided a number', function test() {
		assert.strictEqual( roundn( Math.PI, -2 ), 3.14 );
		assert.strictEqual( roundn( 12368, 3 ), 12000 );
	});

	it( 'should round values to the nearest multiple of 10^n when provided a plain array', function test() {
		var data, actual, expected, i;

		data = new Array( 5 );
		expected = new Array( 5 );
		actual = new Array( 5 );

		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = Math.PI;
			expected[ i ] = 3.14;
		}

		actual = roundn( data, -2 );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = roundn( data, -2, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should round values to the nearest multiple of 10^n when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Float64Array( 5 );
		expected = new Float64Array( 5 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = Math.PI;
			expected[ i ] = 3.14;
		}

		actual = roundn( data, -2 );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = roundn( data, -2, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should round values to the nearest multiple of 10^n and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ Math.PI, Math.PI, Math.PI, Math.PI, Math.PI ];
		expected = new Int8Array( [ 3, 3, 3, 3, 3 ] );

		actual = roundn( data, -2, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );
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

		expected = [ 3.14, 3.14, 3.14, 3.14, 3.14, 3.14  ];


		actual = roundn( data, -2, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = roundn( data, -2, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute an element-wise principal square root and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]}
		];
		expected = [
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]},
			{'x':[9,3.14]}
		];

		actual = roundn( data, -2, {
			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]},
			{'x':[9,Math.PI]}
		];

		actual = roundn( data, -2, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should round elements of a matrix to the nearest multiple of 10^n', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Float32Array( 25 );
		d2 = new Float64Array( 25 );
		d3 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.PI;
			d2[ i ] = 3.14;
			d3[ i ] = 3.14;
		}
		mat = matrix( d1, [5,5], 'float32' );
		out = roundn( mat, -2 );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = roundn( mat, -2, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should round values to the nearest multiple of 10^n and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.PI;
			d2[ i ] = 3.14;
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = roundn( mat, -2, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( roundn( [] ), [] );
		assert.deepEqual( roundn( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( roundn( new Int8Array() ), new Float64Array() );
	});

});
