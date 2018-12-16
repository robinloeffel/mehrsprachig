class Mehrsprachig {
    constructor({
        fallback = 'de',
        language = 'de',
        fetch = true,
        sources = {
            de: '/api/de/site',
            en: '/api/en/site'
        },
        selector = '[data-mehrsprachig]'
    } = {}) {
        this.fetch = fetch;
        this.sources = sources;
        this.fallback = fallback;
        this.language = language;
        this.locales = {};
        this.nodes = document.querySelectorAll(selector);

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
            const values = node.dataset.mehrsprachig.replace(/ /g, '').split(',');

            for (const item of values) {
                if (item.includes('=')) {
                    // when an item be a attibute=value pair
                    const attribute = item.split('=')[0];
                    const value = item.split('=')[1];

                    node.setAttribute(attribute, this.locales[this.language][value]);
                } else {
                    // when it be a single value item
                    // sometimes it really do be like dat
                    node.textContent = this.locales[this.language][item];
                }
            }
        }
    }
}

export default Mehrsprachig;
