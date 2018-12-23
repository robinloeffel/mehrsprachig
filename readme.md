# mehrsprachig
_Mehrsprachig_ is the German word for multilingual. So as you might've already guessed, this little package here allows you to add several localizations to your app or website in just the blink of an eye. It will make your creation _mehrsprachig_, so to speak.

## But how, hermano?
Mira! Install it via `yarn add mehrsprachig` or `npm i mehrsprachig` and use it as follows:
```js
import Mehrsprachig from 'mehrsprachig';

const mehrsprachig = new Mehrsprachig();
```
Or if that whole module bundling thingy is not thang—no worries! Add `<script src="//unpkg.com/mehrsprachig"></script>` to your document instead of using yarn or npm. Then you can use it via
```js
var mehrsprachig = new Mehrsprachig();
```

`Mehrsprachig` is a class you'll have to instatiate. After that it's as easy as attaching an event listener to some nodes, calling the one exposed method, `setLanguage`, and marking your to-be-translated nodes by giving them `[data-mehrsprachig]`:
```js
const koreanButton = document.querySelector('[korean-button]');

koreanButton.addEventListener('click', () => mehrsprachig.setLanguage('kr'));
```

```html
<h1 data-mehrsprachig="greeting">I'll get replaced with ${language.greeting}<h1>
```
For the most basic use cases, that's it! All your texts will be dynamically changed whenever you call `setLanguage` on one of your language switchers!

## What about attributes?
Of course you can even localize attributes, if you wish to do so, fratello! This makes sense for `meta` attributes or the `lang` attribute of your `html` node. Dis can be achieved like dat:
```html
<!-- translate an attribute -->
<meta name="description" data-mehrsprachig="content=description">

<!-- translate an attribute and the text content -->
<h2 data-mehrsprachig="data-node-language=language, heading">
```

You can localize as many attributes as you want. Just make sure you follow the pattern of `attribute=localizationKey` inside `data-mehrsprachig` and separate them with a `,`. A single localizationKey key will always try and change the text content of the node.

**It is not recommended to localize the class attribute, as _mehrsprachig_ will completely overwrite the attributes its set to change!**

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
- `language` [string]: the language you want to start off with; it gets fetched immediately
- `sources` [object]: shows _mehrsprachig_ where to fetch the mentioned languages from. You can also directly put your JSON-formatted localizations here.

## Localizations?
Ja, Brudi. With `localization` I mean an object containing all of your translated texts in a specific language. Heres two example localizations, for German and English:
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
