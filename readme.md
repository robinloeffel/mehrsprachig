# mehrsprachig
_Mehrsprachig_ is the German word for multilingual. Fittingly enough, this little package here allows you to add several localizations to your app or website in just the blink of an eye. It will make your creation _mehrsprachig_, so to speak.

## But how, hermano?
Mira! Install it via `yarn add mehrsprachig` or `npm i mehrsprachig` and use it as follows:
```js
import Mehrsprachig from 'mehrsprachig';

const mehrsprachig = new Mehrsprachig();
```
It's just a class you'll have to instatiate. After that it's as easy as attaching an event listener to some node and calling the one exposed method, `setLanguage`:
```js
const koreanButton = document.querySelector('[data-mehrsprachig-korean]');

koreanButton.addEventListener('click', () => mehrsprachig.setLanguage('kr'));
```
Oh, well, one other thing! Of course you'll need to add the `data-mehrsprachig` attribute to your soon-to-be-translated node—with the value of the key of your wished-upon text property:
```html
<h1 data-mehrsprachig="greeting">I'll get replaced with language.greeting<h1>
```
But that's it, my dude, I promise!

## Et la configuration?
Naturellement, tu peux configurer _mehrsprachig_! The following options are available when instantiating:
```js
{
    selector: '[data-mehrsprachig]',
    fallback: 'de',
    language: 'de',
    fetch: true,
    sources: {
        de: '/api/de',
        en: '/api/en'
    }
}
```
You can pick and choose which one of these properties you want to change. The values you see here are the defaults.

- `selector` tells _mehrsprachig_ what elements to localize
- `fallback` tells _mehrsprachig_ what language it should fall back in case of an error
- `language` the language you want to start off with; it gets fetched immediately
- `fetch` whether or not you need _mehrsprachig_ to issue requests to get your localizations
- `sources` shows _mehrsprachig_ where to fetch the mentioned languages (in this example German and English) from. If `fetch` is `false`, put your localizations in here directly as an object

## Localizations?
Ja, Kollege. With `localization` I mean an object containing all of your translated texts in a specific language. Heres two example responses:
```js
// domain.io/i18n/english
{
    greeting: 'Hello, world!',
    question: 'How are you?'
}

// domain.io/i18n/german
{
    greeting: 'Hallo, Welt!',
    question: 'Wie geht\'s dir?'
}
```
You'll need to structure your localizations the same way, so _mehrsprachig_ can easily and performantly search through them. An example on how to configure _mehrsprachig_ so it doesn't fetch your localizations and with a different selector looks like this:
```js
import Mehrsprachig from 'mehrsprachig';

const mehrsprachig = new Mehrsprachig({
    selector: '[data-multilingual]',
    fetch: false,
    sources: {
        de: {
            hello: 'Hallo'
        },
        es: {
            hello: 'Hola'
        }
    }
});
```
