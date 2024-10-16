# Change Log

* [ShakaCode](https://www.shakacode.com) offers support for upgrading dependencies. If interested, contact Justin Gordon, [justin@shakacode.com](mailto:justin@shakacode.com).
* All notable changes to this project will be documented in this file. Items under `Unreleased` is upcoming features that will be out in next version.
* Contributors: please follow the recommendations outlined at [keepachangelog.com](http://keepachangelog.com/). Please use the existing headings and styling as a guide, and add a link for the version diff at the bottom of the file. Also, please update the `Unreleased` link to compare to the latest release version.

## [Unreleased]
*Please add entries here for your pull requests.*
#### Chore
- Specify package manager [PR426](https://github.com/shakacode/bootstrap-loader/pull/426) by [dargmuesli](https://github.com/dargmuesli).

## [4.0.4] - 2023-03-07
#### Fixed
- Remove `type` entry from `package.json` introduced in 4.0.3 [PR419](https://github.com/shakacode/bootstrap-loader/pull/419) by [ahangarha](https://github.com/ahangarha).

## [4.0.3] - 2023-03-03
#### Fixed
- Upgraded dependencies to fix vulnerabilities, included loader-utils [PR418](https://github.com/shakacode/bootstrap-loader/pull/418) by [ahangarha](https://github.com/ahangarha).

## [4.0.2] - 2023-01-04
#### Dependabot
- Bump is-my-json-valid from 2.15.0 to 2.20.6 (#406).
- Bump ini from 1.3.4 to 1.3.8 (#405).

## [4.0.1] - 2022-11-08
#### Improved
- update loader-utils to v1.4.1 to fix GHSA-76p3-8jx3-jpfq with CVSS 9.8 / 10. [PR 410](https://github.com/shakacode/bootstrap-loader/pull/410) by [dargmuesli](https://github.com/dargmuesli).

## [4.0.0] - 2022-09-03
#### Fixed
- Now compatible with Webpack 5. Removed relative bootstraprc paths & addition of `sourceMap` to `sass-loader` querystring [PR 401](https://github.com/shakacode/bootstrap-loader/pull/401) by [judahmeek](https://github.com/judahmeek).

## [3.0.3] - 2019-03-27
#### Fixed
- Upgraded dependencies for security advisories. [PR 365](https://github.com/shakacode/bootstrap-loader/pull/365) by [alecf](https://github.com/alecf).

## [3.0.2] - 2018-10-31
#### Fixed
- Make work with sass-resources-loader. sass-resources-loader imports specified SASS files load into every SASS file bootstrap-loader processes. [PR 357](https://github.com/shakacode/bootstrap-loader/pull/357) by [x-yuri](https://github.com/x-yuri).

## [3.0.1] - 2017-08-14
##### Improved
- Env specific settings will override default settings. [PR 356](https://github.com/shakacode/bootstrap-loader/pull/356) by [justin808](https://github.com/justin808).

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

[Unreleased]: https://github.com/shakacode/bootstrap-loader/compare/v4.0.4...master
[4.0.4]: https://github.com/shakacode/bootstrap-loader/compare/v4.0.3...v4.0.4
[4.0.3]: https://github.com/shakacode/bootstrap-loader/compare/v4.0.2...v4.0.3
[4.0.2]: https://github.com/shakacode/bootstrap-loader/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/shakacode/bootstrap-loader/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/shakacode/bootstrap-loader/compare/v3.0.3...v4.0.0
[3.0.3]: https://github.com/shakacode/bootstrap-loader/compare/v3.0.2...v3.0.3
[3.0.2]: https://github.com/shakacode/bootstrap-loader/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/shakacode/bootstrap-loader/compare/v3.0.0...v3.0.1
[v3.0.0]: https://github.com/shakacode/bootstrap-loader/compare/2.2.0...v3.0.0
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
