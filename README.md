roundn
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Round values to the nearest multiple of 10^n.


## Installation

``` bash
$ npm install compute-roundn
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var roundn = require( 'compute-roundn' );
```

#### roundn( x[, n[, options ] ] )

Rounds values to the nearest multiple of `10^n`. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).
. `n` must be an `integer` specifying the multiple of `10^n` to which the value(s) should be rounded. If `n` and `options` are not supplied, the function behaves like `Math.round`.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = roundn( 2.32 );
// returns 2

out = roundn( 2.4567, -2 );
// returns 2.46

out = roundn( 12368, 3 )
// returns 12,000

data = [ Math.PI, Math.PI, Math.PI ];
out = roundn( data, -2 );
// returns [ 3.14, 3.14, 3.14 ]

data = new Float64Array( data );
out = roundn( data, -2 );
// returns Float64Array( [3.14, 3.14, 3.14] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = Math.PI;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  Math.PI Math.PI
	   Math.PI Math.PI
	   Math.PI Math.PI ]
*/

out = roundn( mat, -2 );
/*
	[ 3.14 3.14
	  3.14 3.14
	  3.14 3.14 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
data = [
	{'x': Math.PI},
	{'x': Math.PI},
	{'x': Math.PI},
	{'x': Math.PI},
	{'x': Math.PI},
];
function getValue( d, i ) {
	return d.x;
}

var out = roundn( data, -2,  {
	'accessor': getValue
});
// returns [ 3.14, 3.14, 3.14, 3.14, 3.14 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
data = [
	{'x':[9,Math.PI]},
	{'x':[9,Math.PI]},
	{'x':[9,Math.PI]},
	{'x':[9,Math.PI]},
	{'x':[9,Math.PI]},
	{'x':[9,Math.PI]}
];

var out = roundn( data, -2, {
	'path': 'x|1',
	'sep': '|'
});
/*
	[
		{'x':[9,3.14]},
		{'x':[9,3.14]},
		{'x':[9,3.14]},
		{'x':[9,3.14]},
		{'x':[9,3.14]},
		{'x':[9,3.14]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Float32Array( [ Math.PI, Math.PI, Math.PI, Math.PI ] );

out = roundn( data, -2, {
	'dtype': 'int32'
});
// returns Int32Array( [3, 3, 3, 3] )

// Works for plain arrays, as well...
out = roundn( [ Math.PI, Math.PI, Math.PI, Math.PI ], -2, {
	'dtype': 'uint8'
});
// returns Uint8Array( [3, 3, 3, 3] )
```

By default, the function returns a new data structure. To mutate the input data structure, set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ Math.PI, Math.PI, Math.PI ];

out = roundn( data, -2, {
	'copy': false
});
// returns [ 3.14, 3.14, 3.14 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = Math.PI;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  Math.PI Math.PI
	   Math.PI Math.PI
	   Math.PI Math.PI ]
*/

out = roundn( mat, -2, {
	'copy': false
});
/*
	[ 3.14 3.14
	  3.14 3.14
	  3.14 3.14 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the element's absolute value is `NaN`.

	``` javascript
	var data, out;

	out = roundn( null );
	// returns NaN

	out = roundn( true );
	// returns NaN

	out = roundn( {'a':'b'} );
	// returns NaN

	out = roundn( [ -1, null, -2 ] );
	// returns [ -1, NaN, -2 ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x': Math.PI},
		{'x': Math.PI},
		{'x': Math.PI},
		{'x': Math.PI},
		{'x': Math.PI},
		{'x': null}
	];

	out = roundn( data, -2, {
		'accessor': getValue
	});
	// returns [ 3.14, 3.14, 3.14, 3.14, 3.14, NaN ]

	out = roundn( data, -2, {
		'path': 'x'
	});
	/*
		[
			{'x': 3.14},
			{'x': 3.14},
			{'x': 3.14},
			{'x': 3.14},
			{'x': 3.14},
			{'x': NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output `array`, as `NaN` values are cast to `0`.

	``` javascript
	var out = roundn( [ -1, null, -2 ], 0, {
		'dtype': 'int8'
	});
	// returns Int8Array( [-1,0,-2] );
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	roundn = require( 'compute-roundn' );


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

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.PI;
}
out = roundn( data, -2 );

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

// Matrices...
mat = matrix( data, [5,2], 'float64' );
out = roundn( mat, -2 );

// Matrices (custom output data type)...
out = roundn( mat, -2, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.

[npm-image]: http://img.shields.io/npm/v/compute-roundn.svg
[npm-url]: https://npmjs.org/package/compute-roundn

[travis-image]: http://img.shields.io/travis/compute-io/roundn/master.svg
[travis-url]: https://travis-ci.org/compute-io/roundn

[coveralls-image]: https://img.shields.io/coveralls/compute-io/roundn/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/roundn?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/roundn.svg
[dependencies-url]: https://david-dm.org/compute-io/roundn

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/roundn.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/roundn

[github-issues-image]: http://img.shields.io/github/issues/compute-io/roundn.svg
[github-issues-url]: https://github.com/compute-io/roundn/issues
