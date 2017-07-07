# html-table-column-hider

> Lightweight <1kb(minified) JavaScript library to hide/unhide html table columns

Demo: [https://tomaskikutis.github.io/html-table-column-hider/](https://tomaskikutis.github.io/html-table-column-hider/)

## Install

```
$ npm install --save html-table-column-hider
```


## Usage

```js
var HtmlTableColumnHider = require('html-table-column-hider');

var uniqueTableSelector = '#elements-table-1';
var hider = new TableColumnHider(uniqueTableSelector);
hider.hideColumns([0,1,2]);
hider.unhideColumns([1]);

```


## API

### .hideColumns(*array*)

Takes array of integers representing one-based column indexes


### .unhideColumns(*array*)

Takes array of integers representing one-based column indexes


### .unhideAllColumns()


### .getHiddenColumns()

Returns array of integers representing one-based column indexes


### .destroy()

Removes attached style element from document head

## License

MIT © Tomas Kikutis