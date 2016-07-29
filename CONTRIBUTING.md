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


### Using the Local Library
#### npm link
We can use the `npm link` feature in our development process if we reference full paths to our loader in webpack's config: `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`. In order for this library to find the expected `bootstrap` version, you must also `npm link` the expected `bootstrap` and `extract-text-webpack-plugin` (assuming you are passing `extractStyles` to `boostrap.loader` e.g. `...
  bootstrap.loader?extractStyles&...`) versions from your project's `node_modules` directory to your clone of this library.

#### Installing locally
If `npm link` doesn't work for you, just install `bootstrap-loader` locally:

```
cd my-test-project
npm install --save-dev ../path/to/local/bootstrap-loader
```

Note that if you install `bootstrap-loader` locally, you have to re-install it on every change.

#### Testing changes to the repo
Make sure to write new tests for your changes. Currently the test suite is light, please help us flesh it out. Run the tests with `npm test`.

You will also want to run the example implementations to ensure they work as expected with your changes. To test the examples,

```
cd examples/basic
npm install --save-dev ../..
npm run bs4:customlocation
```

Ensure your changes don't break any of the examples before you publish your PR.

### Build
To create a build run:

```
npm run prerelease
```

It will do the same things as `npm start`, but without activating watchers.

### Linting and Testing
To lint your code run:

```
npm run lint
```

To test your code run:

```
npm run test
```

## How loader works
There are 2 entry points: `./loader.js` & `./extractStyles.js`. These are the dummy loaders, which apply real loader to dummy `no-op.js` file. The source of the real loader is located in `./src/bootstrap.loader.js`. Before exploring things in it, check out `./src/bootstrap.config.js` to figure out how we handle default / user config files & gather options for loader.

The main purpose of `./src/bootstrap.loader.js` is to resolve location of `bootstrap` package and create `require`s for webpack to invoke `./src/bootstrap.styles.loader.js` and `./src/bootstrap.scripts.loader.js`. Those are responsible for loading bootstrap's SCSS styles and jQuery scripts.

If you have any questions about further details – don't hesitate to create an issue.

## Examples
Bootstrap loader comes with [examples](examples) to demonstrate how to implement it in various cases. Currently there are 2 example apps: [basic implementation](examples/basic) and [implementation with CSS Modules](examples/css-modules). Check out theirs READMEs to find out how to use them.

## New Features
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
