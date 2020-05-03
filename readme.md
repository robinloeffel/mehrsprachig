# mehrsprachig
[![latest version on npm](https://img.shields.io/npm/v/mehrsprachig.svg)](https://www.npmjs.com/package/mehrsprachig) [![npm downloads a month](https://img.shields.io/npm/dm/mehrsprachig.svg)](https://www.npmjs.com/package/mehrsprachig) [![package license](https://img.shields.io/github/license/rbnlffl/mehrsprachig.svg)](license) [![dependency status](https://img.shields.io/david/robinloeffel/mehrsprachig)](https://david-dm.org/robinloeffel/mehrsprachig)

"Mehrsprachig" is the German word for multilingual. So as you might've already guessed, this package here allows you to add several localizations to your app or website in just the blink of an eye. It will make your creation _mehrsprachig_, so to speak.

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

`sources`, as you can see, is empty as per default. This is because you've got to define your localizations yourself.

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
// domain.io/api/de
{
  "greeting": "Hallo, Welt!",
  "question": "How are you?"
}
```
```json
// domain.io/api/en
{
  "greeting": "Hello, world!",
  "question": "How are you?"
}
```

You'll need to structure all your localizations the same way, so that `mehrsprachig` can easily and performantly search through them.

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

## License
MIT
