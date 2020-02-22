const mehrsprachig = ({
    selector = '[data-mehrsprachig]',
    trigger = '[data-mehrsprachig-trigger]'
} = {}) => {
    let currentLang;
    const toTranslate = document.querySelectorAll(selector);
    const toListen = document.querySelectorAll(trigger);

    const translate = () => {
        toTranslate.forEach(node => {
            node.innerText = currentLang;
        });
    };

    const changeLang = event => {
        event.preventDefault();
        currentLang = event.target.dataset.mehrsprachigTrigger;
        translate();
    };

    toListen.forEach(node => {
        node.addEventListener('click', changeLang);
    });
};

export default mehrsprachig;
