'use strict';

// MODULES //

var ROUNDN = require( './number.js' );


// ROUND NEAREST //

/**
* FUNCTION: roundn( out, matrix, n )
*	Rounds each matrix element to the nearest multiple of 10^n e.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @param {Number} n - power of 10; should be an integer value
* @returns {Matrix} output matrix
*/
function roundn( y, x, n ) {
	var len = x.length,
		i,
		scalar;

	n = -n;
	scalar = Math.pow( 10, n );
	if ( y.length !== len ) {
		throw new Error( 'roundn()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = ROUNDN.exec( x.data[ i ], scalar );
	}
	return y;
} // end FUNCTION roundn()


// EXPORTS //

module.exports = roundn;
