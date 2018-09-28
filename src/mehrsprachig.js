class Mehrsprachig {
    constructor({
        fallback = 'de',
        language = 'de',
        fetch = true,
        sources = {
            de: '/api/de/site',
            en: '/api/en/site'
        },
        selector = '[data-mehrsprachig]',
        attributes = '[data-mehrsprachig-attributes]'
    } = {}) {
        this.fetch = fetch;
        this.sources = sources;
        this.fallback = fallback;
        this.language = language;
        this.locales = {};
        this.nodes = document.querySelectorAll(selector);
        this.attributes = document.querySelectorAll(attributes);

        this.bootstrap();
    }

    async setLanguage(language) {
        this.language = language;
        localStorage.setItem('mehrsprachig', language);

        if (!this.locales[this.language]) {
            await this.getLocale();
        }

        this.localize();
    }

    async bootstrap() {
        this.language = localStorage.getItem('mehrsprachig') ? localStorage.getItem('mehrsprachig') : this.language;
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
            const prop = node.dataset.mehrsprachig;
            node.textContent = this.locales[this.language][prop]
        }

        for (const node of this.attributes.values()) {
            const atrributesArray = node.dataset.mehrsprachigAttributes.replace(/ /g, '').split(',');

            for (const attributeValuePair of atrributesArray) {
                const attribute = attributeValuePair.split(':')[0];
                const value = attributeValuePair.split(':')[1];

                node.setAttribute(attribute, this.locales[this.language][value]);
            }
        }
    }
}

export default Mehrsprachig;
