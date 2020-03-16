import 'whatwg-fetch';
import 'regenerator-runtime/runtime';

const mehrsprachig = ({
    selector = '[data-mehrsprachig]',
    trigger = '[data-mehrsprachig-trigger]',
    standard = 'en',
    sources = {}
} = {}) => {
    const locales = {};
    const toTranslate = document.querySelectorAll(selector);
    const toListen = document.querySelectorAll(trigger);

    const translate = langKey => {
        toTranslate.forEach(node => {
            let locale = locales[langKey];
            const name = selector.match(/^\[(.*)-(.*)]$/)[2];
            const properties = node.dataset[name].split('.');

            properties.forEach(property => {
                locale = locale[property];
            });
            node.textContent = locale;
        });
        localStorage.setItem('mehrsprachig', langKey);
    };

    const changeLang = async langKey => {
        if (!locales[langKey]) {
            const response = await fetch(sources[langKey]);
            const data = await response.json();
            locales[langKey] = data;
        }
        translate(langKey);
    };

    const listener = event => {
        event.preventDefault();
        const { mehrsprachigTrigger: langKey } = event.target.dataset;
        changeLang(langKey);
    };

    toListen.forEach(node => {
        node.addEventListener('click', listener);
    });

    if (localStorage.getItem('mehrsprachig')) {
        changeLang(localStorage.getItem('mehrsprachig'));
    } else {
        changeLang(standard);
    }
};

export default mehrsprachig;
