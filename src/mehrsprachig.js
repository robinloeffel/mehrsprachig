import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

class Mehrsprachig {
    constructor({
        language = 'browser',
        sources = {
            'de': '/api/de',
            'en': '/api/en'
        },
        selector = '[data-mehrsprachig]'
    } = {}) {
        this.sources = sources;
        this.language = language;
        this.selector = selector;
        this.locales = {};
        this.nodes = [];

        this.bootstrap();
    }

    async setLanguage(language) {
        this.language = language;

        if (!this.locales[this.language]) {
            await this.getLocale();
        }

        localStorage.setItem('mehrsprachig', language);

        this.localize();
    }

    async bootstrap() {
        this.determineLanguage();
        this.nodes = document.querySelectorAll(this.selector);

        await this.getLocale();
        this.localize();
    }

    async getLocale() {
        const req = await fetch(this.sources[this.language]);
        const res = await req.json();

        this.locales[this.language] = res;
    }

    localize() {
        for (const node of this.nodes.values()) {
            const values = node.dataset.mehrsprachig.replace(/ /g, '').split(',');

            for (const item of values) {
                if (item.includes('=')) {
                    // when an item be a attibute=value pair
                    const attribute = item.split('=')[0];
                    const value = item.split('=')[1];

                    node.setAttribute(attribute, this.getLocalized(value));
                } else {
                    // when it be a single value item
                    // sometimes it really do be like dat
                    node.textContent = this.getLocalized(item);
                }
            }
        }

        document.documentElement.setAttribute('lang', this.language);
    }

    determineLanguage() {
        if (this.language === 'browser') {
            this.language = navigator.language.toLowerCase();
        }

        if (localStorage.getItem('mehrsprachig')) {
            this.language = localStorage.getItem('mehrsprachig');
        }
    }

    getLocalized(value) {
        const properties = value.split('.');
        let localized = this.locales[this.language];

        for (const property of properties) {
            localized = localized[property];
        }

        return localized;
    }
}

export default Mehrsprachig;
