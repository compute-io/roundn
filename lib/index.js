'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArray = require( 'validate.io-array' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isInteger = require( 'validate.io-integer-primitive'),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var roundn1 = require( './number.js' ),
	roundn2 = require( './array.js' ),
	roundn3 = require( './accessor.js' ),
	roundn4 = require( './deepset.js' ),
	roundn5 = require( './matrix.js' );


// ROUND NEAREST //

/**
* FUNCTION: roundn( x[, n[, opts] ] )
*	Rounds values to the nearest multiple of 10^n.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Number} [n] - power of 10; should be an integer value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} rounded value(s) 
*/
function roundn( x, n, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( n === undefined ) {
		n = 0;
	} else if ( !isInteger( n ) ) {
		throw new TypeError( 'roundn()::invalid input argument. Power of 10 must be an integer value.' );
	}

	if ( isNumber( x ) ) {
		return roundn1( x, n );
	}
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'roundn()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return roundn5( out, x, n );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return roundn4( x, n, opts.path, opts.sep );
		}
		// Handle regular, typed, and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype || !isArray( x ) ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new TypeError( 'roundn()::invalid input argument. Unrecognized/unsupported array-like object. Provide either a plain or typed array. Value: `' + x + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return roundn3( out, x, n, opts.accessor );
		}
		return roundn2( out, x, n );
	}
	return NaN;
} // end FUNCTION roundn()


// EXPORTS //

module.exports = roundn;
