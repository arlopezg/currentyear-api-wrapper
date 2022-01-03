# CurrentYear API wrapper

[![npm](https://img.shields.io/npm/v/currentyear-api-wrapper)](https://www.npmjs.com/package/currentyear-api-wrapper)
[![coverage report](https://coveralls.io/repos/github/arlopezg/currentyear-api-wrapper/badge.svg?branch=master)](https://coveralls.io/github/arlopezg/currentyear-api-wrapper?branch=master)
[![bundle size](https://img.shields.io/bundlephobia/minzip/currentyear-api-wrapper)](https://bundlephobia.com/package/currentyear-api-wrapper)

Get the current year for either UTC or specific timezone(s).

---

## Getting started

**NPM**

`npm i currentyear-api-wrapper@latest`

**CDN (no installation required)**

`<script src="https://unpkg.com/currentyear-api-wrapper"></script>`

## Usage

You will most likely be using the `CurrentYearService` which you can import as:

```javascript
import { CurrentYearService } from "currentyear-api-wrapper";

const service = new CurrentYearService();
service.getCurrentYear("America/New_York").then(console.log); // e.g. "2022"
```

### Reference

Documentation is generated using [TypeDoc](https://typedoc.org/) and it's available at https://arlopezg.github.io/currentyear-api-wrapper

---

In the words of the wise Adam Green,

> Where is the NPM package?
>
> Don't tempt me.

Well, I was tempted.
