'use strict';

// MODULES //

var ROUNDN = require( './number.js' );


// ROUND NEAREST //

/**
* FUNCTION: roundn( out, arr, n )
*	Rounds values of an array to the nearest multiple of 10^n
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number} n - power of 10; should be an integer value
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function roundn( y, x, n ) {
	var len = x.length,
		i,
		scalar;

	n = -n;
	scalar = Math.pow( 10, n );
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = ROUNDN.exec( x[ i ], scalar );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION roundn()


// EXPORTS //

module.exports = roundn;
