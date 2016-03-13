## What's this?

- [セキココで座席を新規作成する部分](http://sekico.co/create)をReactで書いてみたものです

## Getting Started

```
// Clone this repository
$ git clone git@github.com:synboo/sekicoco-react.git

// Change the directory
$ cd sekicoco-react

// Install libraries
$ npm install

// Open html file
$ open index.html
```

### Rebuild bundle.js

```
// Install browserify
$ npm install -g browserify

// Modify main.js and regenerate bundle.js
$ browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js
```
