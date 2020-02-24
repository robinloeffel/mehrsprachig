'use strict';

var mehrsprachig = function (ref) {
    if ( ref === void 0 ) ref = {};
    var selector = ref.selector; if ( selector === void 0 ) selector = '[data-mehrsprachig]';
    var trigger = ref.trigger; if ( trigger === void 0 ) trigger = '[data-mehrsprachig-trigger]';

    var currentLang;
    var toTranslate = document.querySelectorAll(selector);
    var toListen = document.querySelectorAll(trigger);

    var translate = function () {
        toTranslate.forEach(function (node) {
            node.innerText = currentLang;
        });
    };

    var changeLang = function (event) {
        event.preventDefault();
        currentLang = event.target.dataset.mehrsprachigTrigger;
        translate();
    };

    toListen.forEach(function (node) {
        node.addEventListener('click', changeLang);
    });
};

module.exports = mehrsprachig;
//# sourceMappingURL=mehrsprachig.cjs.js.map
