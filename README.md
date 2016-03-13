## What's this?

- [セキココで座席を新規作成する部分](http://sekico.co/create)をReactで書いてみたものです

## Getting Started

```
// Clone this repository
$ git clone git@github.com:synboo/sekicoco-react.git

// Change the directory
$ cd sekicoco-react

// Open html file
$ open index.html
```

### How to modify main.js

```
// Install local libraries
$ npm install

// Install browserify
$ npm install -g browserify

// If you modify main.js, you have to rebuild bundle.js
$ browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js
```
