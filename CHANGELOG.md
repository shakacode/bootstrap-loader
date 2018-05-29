# Change Log
All notable changes to this project will be documented in this file. Items under `Unreleased` is upcoming features that will be out in next version.

Contributors: please follow the recommendations outlined at [keepachangelog.com](http://keepachangelog.com/). Please use the existing headings and styling as a guide, and add a link for the version diff at the bottom of the file. Also, please update the `Unreleased` link to compare to the latest release version.

## [Unreleased]
*Please add entries here for your pull requests.*

## [v3.0.0] - 2017-05-11
##### Updated
- Update to Webpack 4: `extract-text-webpack-plugin` is replaced with `mini-css-extract-plugin`.
— Update `basic` & `css-modules` examples.

## [2.2.0] - 2017-08-14
##### Updated
- Replaced support for Bootstrap 4.0.0-alpha.6 with 4.0.0-beta. [#299](https://github.com/shakacode/bootstrap-loader/pull/316) by [Ivan Kalinin](https://github.com/IvanKalinin).
- Removed `useFlexbox` option since BS4 uses flexboxes by default
- Removed `normalize` option from your bootstrap v4 config. It was dropped in beta.
- Updated dependencies in examples

## [2.1.0] - 2017-05-01
##### Updated
- Replaced support for Bootstrap 4.0.0-alpha.4 with 4.0.0-alpha.6. [#299](https://github.com/shakacode/bootstrap-loader/pull/299) by [tc-imba](https://github.com/tc-imba).

## [2.0.0] - 2017-03-15
No changes to the package. Examples are updated. We're **ONLY** supporting:
```json
    "extract-text-webpack-plugin": ">=2.1.0",
    "webpack": ">=2.2.0"
```

You might need to update these peer dependencies!

## [2.0.0.beta.22] - 2017-02-26

##### Fixed
- Fix deprecated warning with loader-utils. [#269](https://github.com/shakacode/bootstrap-loader/pull/269) by [ryani33](https://github.com/ryani33).
- Move lint dependencies to dev dependencies. [#270](https://github.com/shakacode/bootstrap-loader/pull/270) by [ruiaraujo](https://github.com/ruiaraujo).

##### Added
- Make `bootstrap`/`bootstrap-sass` path configurable so that it can be found when `bootstrap-loader` is symlinked in development. [#255](https://github.com/shakacode/bootstrap-loader/pull/255) by [vjpr](https://github.com/vjpr).

## [2.0.0.beta.21] - 2017-02-16
##### Updates
- Update Example Dependencies. [#261](https://github.com/shakacode/bootstrap-loader/pull/261) and [#259](https://github.com/shakacode/bootstrap-loader/pull/259) by [judahmeek](https://github.com/judahmeek)

## [2.0.0.beta.20] - 2017-02-16
No changes

## [2.0.0.beta.19] - 2017-01-10
##### Fixed
- Allow RC builds of webpack

## [2.0.0.beta.18] - 2016-12-15
##### Fixed
- Allow `styleLoaders` config with only `env` config. [#227](https://github.com/shakacode/bootstrap-loader/pull/227) by [bertho-zero](https://github.com/bertho-zero).

## [2.0.0.beta.17] - 2016-12-04
##### Added
- Allow `styleLoaders` to depend on the environment variable `NODE_ENV` [#222](https://github.com/shakacode/bootstrap-loader/pull/222) by [bertho-zero](https://github.com/bertho-zero).

## [2.0.0.beta.16] - 2016-11-23
##### Fixed
- Improved webpack performance. createUserImport should pass an absolute path to webpack.addDependency. [#212](https://github.com/shakacode/bootstrap-loader/pull/212) by [stephanwilliams](https://github.com/stephanwilliams).

## [2.0.0.beta.15] - 2016-11-18
##### Added
- Ensures `-loader` suffix automatically for style loaders to safely keep compatibility with old Webpack versions as well as new versions with the suffix requirement from Webpack v2.1.0-beta.26 and onward. [#205](https://github.com/shakacode/bootstrap-loader/pull/205) by [kevinzwhuang](https://github.com/kevinzwhuang).

## [2.0.0.beta.14] - 2016-11-14
##### Added
Support for multiple config files allowing both BS3 and BS4 in the same build. [#195](https://github.com/shakacode/bootstrap-loader/pull/195) by [navarroaxel](https://github.com/navarroaxel) with help from [judahmeek](https://github.com/judahmeek).

## [2.0.0.beta.13] - 2016-11-13
Nothing changed. Meant to include PR 195

## [2.0.0.beta.12] - 2016-10-03
##### Added
Support for disabling injection of SASS sourceMap or resolve-url-loader. [#184](https://github.com/shakacode/bootstrap-loader/pull/184) by [judahmeek](https://github.com/judahmeek).

## [2.0.0.beta.11]
##### Changed
Support for Bootstrap 4.0.0-alpha.4. [#167](https://github.com/shakacode/bootstrap-loader/pull/167/files) by [rmobis](https://github.com/rmobis).

## [2.0.0.beta.10]
Includes all bug fixes for v1

## [2.0.0.beta.2]
Changes from v1.1.1 to 2.0.0.beta.2

## [1.1.6] - 2016-09-08
##### Fixed
- Allows chaining with some style loaders such as the isomorphic-style-loader. [#98](https://github.com/shakacode/bootstrap-loader/pulls/98) by [horyd](https://github.com/horyd).

## [1.1.5] - 2016-09-07
##### Fixed
- Fix for false could be interpretted as true for config file, scripts option [#159](https://github.com/shakacode/bootstrap-loader/pulls/159) by [justin808](https://github.com/justin808).

## [1.1.4] - 2016-08-31
##### Fixed
- Fix for [improper handling of defaults](https://github.com/shakacode/bootstrap-loader/issues/152) when the default .bootstraprc location is used [#154](https://github.com/shakacode/bootstrap-loader/issues/154) by [justin808](https://github.com/justin808).

##### Added
- Support for Webpack v2.

## [1.1.3] - 2016-08-30
##### Fixed
- Fix for missing default params `appStyles`, `preBootstrapCustomizations`, and `bootstrapCustomizations` [#151](https://github.com/shakacode/bootstrap-loader/issues/151) by [bmancini42](https://github.com/bmancini42)

## [1.1.2] - 2016-08-29
##### Fixed
- Fixes regression for supporting the default location of the .bootstraprc by [justin808](https://github.com/justin808) and [alexkval](https://github.com/alexkval).
- Major cleanup of code in [#147](https://github.com/shakacode/bootstrap-loader/pull/147) by [alexkval](https://github.com/alexkval).

## [1.1.1] - 2016-08-28
##### Fixed
- Only logging configuration file name if DEBUG is enabled.
- Properly support both the DEBUG env variable so that it is something like TRUE, true, Yes, yes.

## [1.1.0] - 2016-08-01
##### Added
- Support for custom .bootstraprc location. [#114](https://github.com/shakacode/bootstrap-loader/pull/114) by [justin808](https://github.com/justin808) and [pherris](https://github.com/pherris).

## [1.0.10] - 2016-03-17
##### Fixed
- Fixes polyfill require for node < v4.0.0. [#72](https://github.com/shakacode/bootstrap-loader/pull/72) by [mdgraser](https://github.com/mdgraser).

## [1.0.9] - 2016-02-28
##### Fixed
- Updated to support Bootstrap 4, Alpha 2, including examples. See [#56](https://github.com/shakacode/bootstrap-loader/pull/56) by [justin808](https://github.com/justin808).

## [1.0.8]

[Unreleased]: https://github.com/shakacode/bootstrap-loader/compare/v3.0.0...master
[v3.0.0]: https://github.com/shakacode/bootstrap-loader/compare/2.3.0...v3.0.0
[2.2.0]: https://github.com/shakacode/bootstrap-loader/compare/2.1.0...2.2.0
[2.1.0]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0...2.1.0
[2.0.0]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.22...2.0.0
[2.0.0.beta.22]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.21...2.0.0-beta.22
[2.0.0.beta.21]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.20...2.0.0-beta.21
[2.0.0.beta.20]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.19...2.0.0-beta.20
[2.0.0.beta.19]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.18...2.0.0-beta.19
[2.0.0.beta.18]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.17...2.0.0-beta.18
[2.0.0.beta.17]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.16...2.0.0-beta.17
[2.0.0.beta.16]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.15...2.0.0-beta.16
[2.0.0.beta.15]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.14...2.0.0-beta.15
[2.0.0.beta.14]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.13...2.0.0-beta.14
[2.0.0.beta.13]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.12...2.0.0-beta.13
[2.0.0.beta.12]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.11...2.0.0-beta.12
[2.0.0.beta.11]: https://github.com/shakacode/bootstrap-loader/compare/2.0.0-beta.10...2.0.0-beta.11
[2.0.0.beta.10]: https://github.com/shakacode/bootstrap-loader/compare/v2.0.0-beta.2...2.0.0-beta.10
[2.0.0.beta.2]: https://github.com/shakacode/bootstrap-loader/compare/1.1.0...v2.0.0-beta.2
[1.1.6]: https://github.com/shakacode/bootstrap-loader/compare/1.1.5...1.1.6
[1.1.5]: https://github.com/shakacode/bootstrap-loader/compare/1.1.4...1.1.5
[1.1.4]: https://github.com/shakacode/bootstrap-loader/compare/1.1.3...1.1.4
[1.1.3]: https://github.com/shakacode/bootstrap-loader/compare/1.1.2...1.1.3
[1.1.2]: https://github.com/shakacode/bootstrap-loader/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/shakacode/bootstrap-loader/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/shakacode/bootstrap-loader/compare/1.0.10...1.1.0
[1.0.10]: https://github.com/shakacode/bootstrap-loader/compare/1.0.9...1.0.10
[1.0.9]: https://github.com/shakacode/bootstrap-loader/compare/1.0.8...1.0.9
[1.0.8]: https://github.com/shakacode/bootstrap-loader/compare/1.0.7...1.0.8
