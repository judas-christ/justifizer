# Justifizer

Simple row based grid layout

## Usage

To layout the children of an element:

```js
justifize(container, [options])
```

To restore original layout:

```js
justifize.destroy(container)
```

Responsive layout (in modern browsers):

```js
window.onresize = justifize.bind(null, container);
```

### container

Type: `HTMLElement` or `String`

Either an element, or a selector.

### options

Options object.

#### minHeight

Type: `Number`

The minimum height of each row. The final height will depend on the items in the row.

## License

MIT