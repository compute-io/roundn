'use strict';

var matrix = require( 'dstructs-matrix' ),
	roundn = require( './../lib' );


var data,
	mat,
	out,
	tmp,
	i;

// Round a value to 2 decimal places:
out = roundn( Math.PI, -2 );
console.log( out );
// returns 3.14

// If `n=0`, then `roundn()` behaves like `Math.round()`:
out = roundn( Math.PI, 0 );
console.log( out );
// returns 3

out = Math.round( Math.PI );
console.log( out );
// returns 3

// Round a value to the nearest thousand:
out = roundn( 12368, 3 );
console.log( out );
// returns 12000

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.PI;
}
out = roundn( data, -2 );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = roundn( data, -2, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );


// ----
// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = roundn( data, -2, {
	'path': 'x/1',
	'sep': '/'
});
console.log( 'Deepset:' );
console.dir( out );
console.log( '\n' );


// ----
// Typed arrays...
data = new Float64Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.PI;
}
tmp = roundn( data, -2 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [5,2], 'float64' );
out = roundn( mat, -2 );
console.log( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = roundn( mat, -2, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', out.dtype, out.toString() );
