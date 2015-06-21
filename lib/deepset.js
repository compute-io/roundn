'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	ROUNDN = require( './number.js' );


// ROUND NEAREST //

/**
* FUNCTION: roundn( arr, n, path[, sep] )
*	Rounds each array element to the nearest multiple of 10^n and deep sets the input array.
*
* @param {Array} arr - input array
* @param {Number} n - power of 10; should be an integer value
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function roundn( x, n, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		i,
		scalar;

	scalar = Math.pow( 10, n );
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			dset( x[i], ROUNDN.exec( dget( x[i] ), scalar ) );
		}
	}
	return x;
} // end FUNCTION roundn()


// EXPORTS //

module.exports = roundn;
