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

        if (!this.locales[this.language]) {
            await this.getLocale();
        }

        this.localize();
    }

    async bootstrap() {
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
    }
}

export default Mehrsprachig;
