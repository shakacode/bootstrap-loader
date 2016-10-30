# Contributing
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions
Before opening an issue, please search the [issue tracker](https://github.com/shakacode/bootstrap-loader/issues) to make sure your issue hasn't already been reported.

## Development
Fork, then clone the repo:

```
git clone https://github.com/your-username/bootstrap-loader.git
```

To start development simply run:

```
npm start
```

It will run linters, clear directory with previous build, create new build and run watchers to re-build on every change.

## Testing changes to the repo
Make sure to write new tests for your changes. Currently the test suite is light. Please help us flesh it out. Run the tests with `npm test`.

If you don't make a new test, then be sure to modify the `/examples` with behavior that demonstrates your change.

Regardless, you will also want to run the example implementations to ensure they work as expected with your changes. 

Ensure your changes don't break any of the examples before you publish your PR!

## Testing before your PR is ready for merge

* Be sure to check the browser console and look for error messages!
* If you install `bootstrap-loader` locally, you have to re-install it on every change. Yes. Very inconvenient! `npm run install-local`

### Testing Setup
```sh
rm -rf node_modules && npm i
cd examples/basic or examples/css-modules
rm -rf node_modules
npm run install-local
npm i
```
* Note, we recommend against using `npm link` for these examples.

### Testing each example directory
 
For both the basic and css-modules examples

1. Either set an ENV variable of DEBUG=TRUE or run the commands like this:
2. See the README.md inside the examples directories for all available commands, or else run
   `npm run` to show the commands.
3. Examine the DEBUG output, as well as the results.
4. The custom `.bootstraprc` files have extra colors so you'll know they are running if you see non-standard bootstrap colors.

For the multiple-entries example

1. This example do a simple use of the configFilePath and the DEBUG=TRUE is ignored.
2. See the README.md inside the examples directories for all available commands, or else run
   `npm run` to show the commands.
3. Compare the CSS files to see the different results.
4. The file `.bootstraprc` is ignored here.

### Debug Output
When doing development or debugging, you probably want DEBUG output on.

Either set an ENV value: `export DEBUG=TRUE` or set debug in the config file. To turn off debugging, etiher `unset DEBUG` or change the debug value in the config file.


## Build
To create a build run:

```
npm run prerelease
```

It will do the same things as `npm start`, but without activating watchers.

## Linting and Testing
To lint your code run:

```
npm run lint
```

To test your code run:

```
npm run test
```

In order to run tests in a browser
```
npm i -g browserify babelify tape-run faucet

browserify -t babelify node_package/tests/*.js | tape-run | faucet
or
browserify -t babelify node_package/tests/*.js | tape-run --browser chrome | faucet
```

## Using the Local Library for Development
The examples directories have a npm script: `npm run install-local`. Please use that for testing the example directories.

#### npm link
We can use the `npm link` feature in our development process if we reference full paths to our loader in webpack's config: `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`. In order for this library to find the expected `bootstrap` version, you must also `npm link` the expected `bootstrap` and `extract-text-webpack-plugin` (assuming you are passing `extractStyles` to `boostrap.loader` e.g. `...
  bootstrap.loader?extractStyles&...`) versions from your project's `node_modules` directory to your clone of this library.   

#### Installing locally
More often than not, `npm link` will not work. Maybe you did not set the sibling directories of `bootstrap` and `extract-text-webpack plugin`?

If `npm link` doesn't work for you, just install `bootstrap-loader` locally:

```
cd my-test-project
npm install --save-dev ../path/to/local/bootstrap-loader
```

Note that if you install `bootstrap-loader` locally, you have to re-install it on every change. Yes. Very inconvenient! 

## How the loader works
There are 2 entry points: `./loader.js` & `./extractStyles.js`. These are the dummy loaders, which apply real loader to dummy `no-op.js` file. The source of the real loader is located in `./src/bootstrap.loader.js`. Before exploring things in it, check out `./src/bootstrap.config.js` to figure out how we handle default / user config files & gather options for loader.

The main purpose of `./src/bootstrap.loader.js` is to resolve location of `bootstrap` package and create `require`s for webpack to invoke `./src/bootstrap.styles.loader.js` and `./src/bootstrap.scripts.loader.js`. Those are responsible for loading bootstrap's SCSS styles and jQuery scripts.

If you have any questions about further details – don't hesitate to create an issue.

## Examples
Bootstrap loader comes with [examples](examples) to demonstrate how to implement it in various cases. Currently there are 2 example apps: [basic implementation](examples/basic) and [implementation with CSS Modules](examples/css-modules). Check out theirs READMEs to find out how to use them.

## New features
Please open an issue with a proposal for a new feature or refactoring before starting on the work. We don't want you to waste your efforts on a pull request that we won't want to accept.

## Style
[Shakacode](https://github.com/shakacode) is trying to keep a standard style across its various projects, which can be found over in [eslint-config-shakacode](https://github.com/shakacode/style-guide-javascript). If you have a style change proposal, it should first be proposed there. If accepted, we will be happy to accept a PR to implement it here.

## Submitting Changes
* Open a new issue in the [issue tracker](https://github.com/shakacode/bootstrap-loader/issues).
* Fork the repo.
* Create a new feature branch based off the master branch.
* Make sure there are no linting errors and all tests pass (if any).
* Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
