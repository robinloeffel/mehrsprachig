# `mehrsprachig`

[![latest version on npm](https://img.shields.io/npm/v/mehrsprachig.svg)](https://www.npmjs.com/package/mehrsprachig)
[![npm downloads a month](https://img.shields.io/npm/dm/mehrsprachig.svg)](https://www.npmjs.com/package/mehrsprachig)
[![required node version](https://img.shields.io/node/v/mehrsprachig)](https://github.com/nodejs/Release)
[![dependency status](https://img.shields.io/david/robinloeffel/mehrsprachig)](https://david-dm.org/robinloeffel/mehrsprachig)
[![package license](https://img.shields.io/github/license/rbnlffl/mehrsprachig.svg)](license)

"Mehrsprachig" is the German word for multilingual. So as you might've already guessed, this package allows you to add several localizations to your app or website in just the blink of an eye. It will make your creation _mehrsprachig_, so to speak.

## Installation

Install it via `yarn add mehrsprachig` or `npm i mehrsprachig` and use it as follows:

```js
import mehrsprachig from 'mehrsprachig';

mehrsprachig();
```

```html
<button data-mehrsprachig-trigger="de" data-mehrsprachig="german">
  Wechsel auf Deutsch
</button>

<button data-mehrsprachig-trigger="en" data-mehrsprachig="english">
  Switch to English
</button>
```

If that whole module bundling stuff is not your thing, don't worry! Add [`<script src="https://unpkg.com/mehrsprachig"></script>`](https://unpkg.com/mehrsprachig) at the end of your document body instead.

## Configuration

The following options, and their defaults, are available:

```js
mehrsprachig({
  selector: '[data-mehrsprachig]',
  trigger: '[data-mehrsprachig-trigger]',
  standard: 'en',
  sources: {}
})
```

### `selector`

Type: `string` ([`CSS selector`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors))<br>
Default: `'[data-mehrsprachig]'`<br>
Description: Is used to identify all the nodes that should be translated.

### `trigger`

Type: `string` ([`CSS selector`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors))<br>
Default: `'[data-mehrsprachig-trigger]'`<br>
Description: The nodes matching this selector will be attached a `click` event listener, triggering the change of the current language to whatever the attribute value of the selector is.

### `standard`

Type: `string`<br>
Default: `'en'`<br>
Description: The language that gets fetched if no `localStorage` item has been found. Schould match one of the keys of [`sources`](#sources).

### `sources`

Type: `object`<br>
Default: `{}`<br>
Description: An object containing key-value pairs pointing to the endpoints (URLs) of where the [localizations](#localizations) can be consumed from.

## Localizations

By "localization" I mean an object containing all of your translated texts in one specific language. Heres an example config for German, `de`, and English, `en`:

```js
mehrsprachig({
  sources: {
    de: 'https://domain.io/api/de',
    en: 'https://domain.io/api/en'
  }
});
```

```json
// https://domain.io/api/de
{
  "greeting": "Hallo, Welt!",
  "question": "How are you?"
}
```
```json
// https://domain.io/api/en
{
  "greeting": "Hello, world!",
  "question": "How are you?"
}
```

You'll need to structure all your localizations the same way, so that `mehrsprachig` can easily and efficiently search through them.

## Can it manipulate attributes?

You betcha! If you want `mehrsprachig` to localize the `content` attribute of some `meta` tag in the document head, for example, you totally can!

```html
<meta name="description" data-mehrsprachig="content=meta.description">
```

## What if i need to use HTML?

`mehrsprachig`'s got you covered! If you have a `<p>` with an `<strong>` inside it, you might find it's a bit complicated to translate everything separately. So just write HTML as you would normally! But make sure to add prefix your localization key with `html:`. This will look like so:

```html
<p data-mehrsprachig="html:footer.paragraphWithAnchor"></p>
```

```json
{
  "footer": {
    "paragraphWithAnchor": "I contain <strong>HTML</strong>, yo!"
  }
}
```

## Events

`mehrsprachig` emits a `mehrsprachigTranslated` event on the `document` on page load, as well as on every language page. It contains the language key of the locale to which has been switched to in the `detail` property.

```js
document.addEventListener('mehrsprachigTranslated', e => {
  console.log(`the language has been switched to ${e.detail}`);
});
```

## License
MIT
