# winston-console-transport
provides a console transport for [winston][w-gh] logger.

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Total alerts][lgtm-alerts-badge]][lgtm-alerts-url]
[![Language grade][lgtm-lg-badge]][lgtm-lg-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]

# 🇺🇦 Help Ukraine
I woke up on my 26th birthday at 5 am from the blows of russian missiles. They attacked the city of Kyiv, where I live, as well as the cities in which my family and friends live. Now my country is a war zone. 

We fight for democratic values, for freedom, for our future! 
I am stopping any support of my packages by the time until all russians leave my country on trucks or in boxes. 

💛💙  Help Ukraine! We need your support! There are dozen ways to help us, just do it!

## Table of Contents
  - [Motivation](#motivation)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Attributes](#attributes)


## Motivation
Winston has its own console transport. But if you'll try to use it in the browser, you will find out its inconvenience. You can't access native [browser console][console] levels (ex. verbose), so it is impossible to filter those levels using the browser console.

## Requirements
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux and win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

To install the library, run the following command:
```
npm i --save winston-console-transport
```

## Usage
To use new transport, just add it to the transports option of your winston logger.

```javascript
import { createLogger } from 'winston';
import Console from 'winston-console-transport';

const logger = createLogger({
    level      : 'debug',
    transports : [ new Console() ]
});

logger.verbose('VERBOSE TEXT');

```

## Attributes

Some attributes can be passed to new ```Console({})```

* **name** - name of a transport (default 'console')
* **eol** - end of line (default os.EOL)
* **logger** - custom logger (default console)
* **levels** - custom level handlers (default {})
* **fallBackLogger** - default level handler (default console.log)
* **sanitizer** - input data sanitizer and transformator (default data => data)
* **maxListeners** - max number of listeners (default 30)

[console]: https://developer.mozilla.org/en-US/docs/Web/API/Console
[w-gh]: https://github.com/winstonjs/winston
## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/winston-console-transport
[github]: https://github.com/pustovitDmytro/winston-console-transport
[coveralls]: https://coveralls.io/github/pustovitDmytro/winston-console-transport?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/winston-console-transport.svg
[badge-vers]: https://img.shields.io/npm/v/winston-console-transport.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/winston-console-transport.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/winston-console-transport/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/winston-console-transport?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/winston-console-transport/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/winston-console-transport

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/winston-console-transport
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/winston-console-transport

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/winston-console-transport/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/winston-console-transport

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/winston-console-transport

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/winston-console-transport/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/winston-console-transport/?branch=master

[lgtm-lg-badge]: https://img.shields.io/lgtm/grade/javascript/g/pustovitDmytro/winston-console-transport.svg?logo=lgtm&logoWidth=18
[lgtm-lg-url]: https://lgtm.com/projects/g/pustovitDmytro/winston-console-transport/context:javascript

[lgtm-alerts-badge]: https://img.shields.io/lgtm/alerts/g/pustovitDmytro/winston-console-transport.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/pustovitDmytro/winston-console-transport/alerts/

[codacy-badge]: https://app.codacy.com/project/badge/Grade/d20e349b06da4b69abe242d6326f8e34
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/winston-console-transport/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/winston-console-transport&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_winston-console-transport&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_winston-console-transport

[npm-downloads-badge]: https://img.shields.io/npm/dw/winston-console-transport
[npm-size-badge]: https://img.shields.io/bundlephobia/min/winston-console-transport
[npm-size-url]: https://bundlephobia.com/result?p=winston-console-transport

[node-ver-test-badge]: https://github.com/pustovitDmytro/winston-console-transport/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/winston-console-transport/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Fwinston-console-transport.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Fwinston-console-transport?ref=badge_shield