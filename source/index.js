export default ({
  selector = '[data-mehrsprachig]',
  trigger = '[data-mehrsprachig-trigger]',
  fallback = 'en',
  sources = {}
} = {}) => {
  const cachedLocales = {};
  const toTranslate = document.querySelectorAll(selector);
  const triggers = document.querySelectorAll(trigger);

  const localize = (localeKey, propertyToFind) => {
    const newLocale = cachedLocales[localeKey];

    // find the provided prop, which may be nested,
    // inside newLocale and return that prop's value
    return propertyToFind.split('.').reduce(
      (previousValue, currentValue) => previousValue[currentValue], newLocale
    );
  };

  const translate = localeKey => {
    toTranslate.forEach(element => {
      const propertiesToLocalize = element.dataset.mehrsprachig.replace(/ /g, '').split(',');

      propertiesToLocalize.forEach(propertyToLocalize => {
        let localizedPropertyValue = '';

        if (propertyToLocalize.includes('=')) {
          // manipulating an element's property's content
          const [ elementPropertyName, elementPropertyValue ] = propertyToLocalize.split('=');
          localizedPropertyValue = localize(localeKey, elementPropertyValue);
          element[elementPropertyName] = localizedPropertyValue;
        } else if (propertyToLocalize.includes('html:')) {
          // manipulating an element's html content
          localizedPropertyValue = localize(localeKey, propertyToLocalize.replace('html:', ''));
          element.innerHTML = localizedPropertyValue;
        } else {
          // manipulating an element's text content
          localizedPropertyValue = localize(localeKey, propertyToLocalize);
          element.textContent = localizedPropertyValue;
        }

        const mehrsprachigTranslatedEvent = new CustomEvent('mehrsprachigTranslated', {
          bubbles: true,
          detail: {
            localeKey,
            element,
            propertyToLocalize,
            localizedPropertyValue
          }
        });
        element.dispatchEvent(mehrsprachigTranslatedEvent);
      });
    });

    localStorage.setItem('mehrsprachig', localeKey);
  };

  const changeLanguage = async localeKey => {
    if (!cachedLocales[localeKey]) {
      const fetchResponse = await fetch(sources[localeKey]);
      const fetchedLocale = await fetchResponse.json();
      cachedLocales[localeKey] = fetchedLocale;
    }

    translate(localeKey);
  };

  const handleTriggerClick = event => {
    const { mehrsprachigTrigger: localeKey } = event.target.dataset;
    changeLanguage(localeKey);
    event.preventDefault();
  };

  triggers.forEach(element => {
    element.addEventListener('click', handleTriggerClick);
  });

  if (localStorage.getItem('mehrsprachig')) {
    changeLanguage(localStorage.getItem('mehrsprachig'));
  } else {
    changeLanguage(fallback);
  }
};
