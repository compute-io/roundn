'use strict';

// ROUND NEAREST //


/**
* FUNCTION: roundn.exec( x, scalar )
*	Internal method carrying out the rounding.
*
* @private
* @param {Number} x - input value
* @param {Number} scalar - integer
* @returns {Number} rounded value
*/
roundn.exec = function( x, scalar ) {
	return Math.round( x*scalar ) / scalar;
};

/**
* FUNCTION: roundn( x, n )
*	Rounds a number to the nearest multiple of 10^n.
*
* @param {Number} x - input value
* @param {Number} n - power of 10; should be an integer value
* @returns {Number} rounded value
*/
function roundn( x, n ) {
	var scalar;

	n = -n;
	scalar = Math.pow( 10, n );
	return roundn.exec( x, scalar );
} // end FUNCTION roundn()


// EXPORTS //

module.exports = roundn;
