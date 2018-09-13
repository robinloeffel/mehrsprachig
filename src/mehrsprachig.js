class Mehrsprachig {
    constructor({fetch = true, sources = ['/i18n/de.json', '/i18n/en.json']} = {}) {
        this.fetch = fetch;
        this.sources = sources;

        if (this.fetch) {
            this.fetchSources();
        }
    }

    async fetchSources() {
        for (const source of this.sources) {
            const req = await fetch(source);
            const res = await req.json();

            console.log(res);
        }
    }
}

export default Mehrsprachig;
