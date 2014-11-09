/**
*
*	COMPUTE: roundn
*
*
*	DESCRIPTION:
*		- Round values to the nearest multiple of 10^n.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: roundn( x, n )
*	Rounds values to the nearest multiple of 10^n. Notes: if provided an array, mutates the array.
*
* @param {Array|Number} x - value(s) to be rounded
* @param {Number} n - power of 10; should be an integer value
* @returns {Array|Number} rounded value(s). If `x` is an empty array, returns `null`.
*/
function roundn( x, n ) {
	var isArray = Array.isArray( x ),
		scalar,
		len;
	if ( !isArray && ( typeof x !== 'number' || x !== x ) ) {
		throw new TypeError( 'roundn()::invalid input argument. Must provide either a single numeric value or a numeric array.' );
	}
	if ( typeof n !== 'number' || n !== n || n !== ( n | 0) ) {
		throw new TypeError( 'roundn()::invalid input argument. Power of 10 must be an integer value.' );
	}
	n = -n;
	scalar = Math.pow( 10, n );
	if ( !isArray ) {
		return Math.round( x*scalar ) / scalar;
	}
	len = x.length;
	if ( !len ) {
		return null;
	}
	for ( var i = 0; i < len; i++ ) {
		x[ i ] = Math.round( x[i]*scalar ) / scalar;
	}
	return x;
} // end FUNCTION roundn()


// EXPORTS //

module.exports = roundn;
