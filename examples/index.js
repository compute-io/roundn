var roundn = require( './../lib' );

// Round a value to 2 decimal places:
console.log( roundn( Math.PI, -2 ) );
// Returns 3.14

// If `n=0`, then `roundn()` behaves like `Math.round()`:
console.log( roundn( Math.PI, 0 ) );
// Returns 3

console.log( Math.round( Math.PI ) );
// Returns 3

// Round a value to the nearest thousand:
console.log( roundn( 12368, 3 ) );
// Returns 12000

// Round each array value to 2 decimal places...
var data = new Array( 5 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.PI;
}

console.log( roundn( data, -2 ) );
// Returns [ 3.14, 3.14, 3.14, 3.14, 3.14 ]