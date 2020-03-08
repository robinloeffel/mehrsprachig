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
            const name = selector.match(/^\[(.*)-(.*)\]$/)[2];
            const props = node.dataset[name].split('.');

            props.forEach(prop => {
                locale = locale[prop];
            });
            node.innerText = locale;
        });
    };

    const getLocale = async langKey => {
        if (!locales[langKey]) {
            const response = await fetch(sources[langKey]);
            const data = await response.json();

            locales[langKey] = data;
        }

        translate(langKey);
    };

    const changeLang = langKey => {
        getLocale(langKey);
    };

    const listener = event => {
        event.preventDefault();
        changeLang(event.target.dataset.mehrsprachigTrigger);
    };

    toListen.forEach(node => {
        node.addEventListener('click', listener);
    });

    changeLang(standard);
};

export default mehrsprachig;
