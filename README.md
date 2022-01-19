# React Hooks Elib

[![NPM](https://img.shields.io/npm/v/react-hooks-elib)](https://www.npmjs.com/package/react-hooks-elib)
[![License](https://img.shields.io/github/license/endalk200/react-hooks-elib)](/LICENSE)

A collection of hooks and utilities for React.

## Features

- 🔮 Typescript

  Written in typescript so you get the advantage of strong type safety

- 🧠 Server Side Ready

  All hooks handle SSR rendering and work well with frameworks like Next/Gatsby

## Installation

```bash
npm i react-hooks-elib
# or
yarn add react-hooks-elib
```

## Hooks

- **Sensor**
  - [`useWindowSize`](./docs/useWindowSize.md) &mdash; Tracks browser `Window` dimensions
  - [`useWindowScroll`](./docs/useWindowScroll.md) &mdash; Tracks `Window` scroll position.
  - [`useToggle` and `useBoolean`](./docs/useToggle.md) &mdash; Tracks and manages state of a boolean

## Utils

- **isClient** &mdash; Checks wether the current environment is browser of node environment. Use full when working with SSR
frameworks like `NextJs`
- **isHTMLElement** &mdash; Checks wether the passed in value is of type `HTML Element`

## License

[MIT](/LICENSE) © 2022
