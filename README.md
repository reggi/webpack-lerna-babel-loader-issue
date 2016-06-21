### lerna + webpack + babel-loader issue

Goal: I'm trying to build `./packages/usage/index.js` with webpack.

* I have 4 packages `alpha`, `beta`, `gamma`, `usage`.
* `alpha`, `beta`, `gamma` are not using babel and should just be consumed using index.js
* `usage` is using babel and should be converted using `babel-loader` then the traversal should contunue

When I try and compile `babel` is oddly being request for the other deps.

```
$ lerna bootstrap
Lerna v2.0.0-beta.20
Linking all dependencies
Successfully bootstrapped 4 packages.
$ cd packages/usage
$ npm run webpack

> @reggi/usage@1.0.0 webpack /Users/thomasreggi/Desktop/webpack-issue/packages/usage
> webpack

Hash: 27e6d9d1d4147417b516
Version: webpack 1.13.1
Time: 429ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.11 kB       0  [emitted]  main
    + 3 hidden modules

ERROR in ../alpha/index.js
Module not found: Error: Cannot resolve module 'babel' in /Users/thomasreggi/Desktop/webpack-issue/packages/alpha
 @ ../alpha/index.js 1:11-33
```

And with `{ exclude: /(node_modules|bower_components)/ }` enabled I get this.

```
$ npm run webpack

> @reggi/usage@1.0.0 webpack /Users/thomasreggi/Desktop/webpack-issue/packages/usage
> webpack

Hash: 99d08ad8b664833bba1c
Version: webpack 1.13.1
Time: 401ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.25 kB       0  [emitted]  main
    + 4 hidden modules

ERROR in ../alpha/~/@reggi/beta/index.js
Module not found: Error: Cannot resolve module 'babel' in /Users/thomasreggi/Desktop/webpack-issue/packages/alpha/node_modules/@reggi/beta
 @ ../alpha/~/@reggi/beta/index.js 1:17-82
```

## Types of bundles

__Without `babel-loader` excluding `node_modules`__

https://github.com/reggi/webpack-lerna-babel-loader-issue/blob/master/packages/usage/bundle-without-exclude.js#L70

> Cannot find module \"@reggi/beta\"

__With `babel-loader` excluding `node_modules`__

https://github.com/reggi/webpack-lerna-babel-loader-issue/blob/master/packages/usage/bundle-with-exclude.js#L77

> Cannot find module \"/Users/thomasreggi/Desktop/webpack-issue/packages/beta\"

__Without `babel-loader` & switching code to `require`__

https://github.com/reggi/webpack-lerna-babel-loader-issue/blob/master/packages/usage/bundle-without-babel.js#L97

> Includes everything perfectly.
