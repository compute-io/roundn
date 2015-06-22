'use strict';

// MODULES //

var ROUNDN = require( './number.js' );


// ROUND NEAREST //

/**
* FUNCTION: roundn( out, arr, n, accessor )
*	Rounds each array element to the nearest multiple of 10^n using an accessor function.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Number} n - power of 10; should be an integer value
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]} output array
*/
function roundn( y, x, n, clbk ) {
	var len = x.length,
		v, i,
		scalar;

	n = -n;
	scalar = Math.pow( 10, n );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = ROUNDN.exec( v, scalar );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION roundn()


// EXPORTS //

module.exports = roundn;
