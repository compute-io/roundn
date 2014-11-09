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

To use the module,

``` javascript
var roundn = require( 'compute-roundn' );
```

#### roundn( x, n )

Rounds values to the nearest multiple of `10^n`. `x` may be either a numeric `array` or a single numeric value. `n` must be an `integer` specifying the multiple of `10^n` to which the value(s) should be rounded.

``` javascript
var val = roundn( 2.4567, -2 );
// returns 2.46
```


## Examples

``` javascript
// Round a value to 2 decimal places:
console.log( roundn( Math.PI, -2 ) );
// returns 3.14

// If `n=0`, then `roundn()` behaves like `Math.round()`:
console.log( roundn( Math.PI, 0 ) );
// returns 3

console.log( Math.round( Math.PI ) );
// returns 3

// Round a value to the nearest thousand:
console.log( roundn( 12368, 3 ) );
// returns 12000

// Round each array value to 2 decimal places...
var data = new Array( 5 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.PI;
}

console.log( roundn( data, -2 ) );
// returns [ 3.14, 3.14, 3.14, 3.14, 3.14 ]
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

If provided an input `array`, the `array` is mutated. If mutation is undesired,

``` javascript
var data = [ Math.PI, Math.PI, Math.PI ],
	copy = data.slice();

round( copy, -2 );
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


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