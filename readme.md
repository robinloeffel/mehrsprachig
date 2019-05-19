# mehrsprachig
[![](https://img.shields.io/github/license/rbnlffl/mehrsprachig.svg)](https://github.com/rbnlffl/mehrsprachig/blob/master/license.md) [![](https://img.shields.io/npm/v/mehrsprachig.svg)](https://www.npmjs.com/package/mehrsprachig) [![](https://img.shields.io/npm/dm/mehrsprachig.svg)](https://www.npmjs.com/package/mehrsprachig)

_Mehrsprachig_ is the German word for multilingual. So as you might've already guessed, this little package here (11kb minified + gzip/br) allows you to add several localizations to your app or website in just the blink of an eye. It will make your creation _mehrsprachig_, so to speak.

## But how, hermano?
Mira! Install it via `yarn add mehrsprachig` or `npm i mehrsprachig` and use it as follows:
```js
import Mehrsprachig from 'mehrsprachig';

const mehrsprachig = new Mehrsprachig();
```
Or if that whole module bundling thingy is not your thang, don't worry! Add `<script src="//unpkg.com/mehrsprachig"></script>` at the end of your document body instead. Then you can use it via:
```js
var mehrsprachig = new Mehrsprachig();
```

`Mehrsprachig` is a class you'll have to instatiate. After that it's as easy as attaching an event listener to some nodes, calling the one exposed method, `setLanguage`, and marking your to-be-translated nodes by giving them `[data-mehrsprachig]`:
```js
const koreanButton = document.querySelector('[data-korean-button]');

koreanButton.addEventListener('click', () => mehrsprachig.setLanguage('kr'));
```
```html
<button data-korean-button>Switch to Korean</button>
<h1 data-mehrsprachig="greeting">I'm a placeholder. I'll get replaced with ${kr.greeting}<h1>
```
For the most basic use cases, that's it! All your texts will be dynamically changed whenever you call `setLanguage` on one of your language switchers!

## What about attributes?
Of course you can localize attributes, if you wish to do so, fratello! This makes sense for `meta` attributes, for example. Dis can be achieved like dat:
```html
<!-- translate an the content attribute with language.description -->
<meta name="description" data-mehrsprachig="content=description">

<!-- translate an attribute and the text content -->
<h2 data-mehrsprachig="data-node-language=language, heading">
```

You can localize as many attributes as you want. Just make sure you follow the pattern of `attribute=localizationKey` inside `data-mehrsprachig` and separate them with a `,`. A single `localizationKey` key will always try and change the text content of the node.

**It is not recommended to localize the class attribute, as _mehrsprachig_ will completely overwrite the attributes its set to change!**

## And what if I want to inject HTML?
_mehrsprachig_'s got you! If you have a `<p>` with an `<a>` inside it, you might find it's a bit complicated to translate everything separately. So just write HTML in your `localizationKey`! But make sure to add `:html` to your `localizationKey`. It'll look something like this:
```html
<p data-mehrsprachig="firstParagraph:html"></p>
```
```js
{
    fr: {
        firstParagraph: 'Je peux contenir <strong>HTML</strong>, mec!'
    }
}
```

## Et la configuration?
Naturellement, tu peux configurer _mehrsprachig_! The following options are available when instantiating:
```js
const mehrsprachig = new Mehrsprachig({
    selector: '[data-mehrsprachig]',
    language: 'browser',
    sources: {
        'de-ch': '/api/de',
        'fr-ch': '/api/en',
        'it-ch': '/api/it',
        'en-gb': '/api/en'
    }
});
```
You can pick and choose which one of these properties you want to change. The values you see here, except for `sources`, are the defaults.

- `selector` [cssSelector]: tells _mehrsprachig_ what elements to localize
- `language` [string]: the language you want to start off with; it gets fetched immediately; can be either `'browser'` or one of the keys of `sources`
- `sources` [object]: shows _mehrsprachig_ where to fetch the mentioned languages from

## Localizations?
Ja, Brudi. With `localization` I mean an object containing all of your translated texts in a specific language. Heres two example localizations, for German and English:
```js
const mehrsprachig = new Mehrsprachig({
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

// domain.io/api/en
{
    "greeting": "Hello, world!",
    "question": "How are you?"
}
```
You'll need to structure all your localizations the same way, so _mehrsprachig_ can easily and performantly search through them.
