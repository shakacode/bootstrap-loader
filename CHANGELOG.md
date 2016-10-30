# Change Log
All notable changes to this project will be documented in this file. Items under `Unreleased` is upcoming features that will be out in next version.

Contributors: please follow the recommendations outlined at [keepachangelog.com](http://keepachangelog.com/). Please use the existing headings and styling as a guide, and add a link for the version diff at the bottom of the file. Also, please update the `Unreleased` link to compare to the latest release version.

## [Unreleased]

## [1.3.0] - 2016-10-30
##### Added
Support for multiple config files allowing both BS3 and BS4 in the same build. [#194](https://github.com/shakacode/bootstrap-loader/pull/184) by [navarroaxel](https://github.com/navarroaxel).

## [1.2.1] - 2016-10-02
##### Added
Support for disabling injection of SASS sourceMap or resolve-url-loader. [#176](https://github.com/shakacode/bootstrap-loader/pull/184) by [judahmeek](https://github.com/judahmeek).

## [1.2.0] - 2016-09-24
##### Changed
Support for Bootstrap 4.0.0-alpha.4. [#167](https://github.com/shakacode/bootstrap-loader/pull/167/files) by [rmobis](https://github.com/rmobis) and [#170](https://github.com/shakacode/bootstrap-loader/pull/170/files) by [justin808](https://github.com/justin808)..

## [1.1.6] - 2016-09-08
##### Fixed
- Allows chaining with some style loaders such as the isomorphic-style-loader. [#98](https://github.com/shakacode/bootstrap-loader/pulls/98) by [horyd](https://github.com/horyd).

## [1.1.5] - 2016-09-07
##### Fixed
- Fix for false could be interpretted as true for config file, scripts option [#159](https://github.com/shakacode/bootstrap-loader/pulls/159) by [justin808](https://github.com/justin808).

## [1.1.4] - 2016-08-31
##### Fixed
- Fix for [improper handling of defaults](https://github.com/shakacode/bootstrap-loader/issues/152) when the default .bootstraprc location is used [#154](https://github.com/shakacode/bootstrap-loader/issues/154) by [justin808](https://github.com/justin808).

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

[Unreleased]: https://github.com/shakacode/bootstrap-loader/compare/1.3.0...v1
[1.3.0]: https://github.com/shakacode/bootstrap-loader/compare/1.2.1...1.3.0
[1.2.1]: https://github.com/shakacode/bootstrap-loader/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/shakacode/bootstrap-loader/compare/1.1.6...1.2.0
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
