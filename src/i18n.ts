import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fr from './translations/fr.json';
import en from './translations/en.json';

import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
	en: {
		translation: en
	},
	fr: {
		translation: fr
	}
};

const languageDetector = new LanguageDetector(null, {
    lookupLocalStorage: 'language',
});

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(languageDetector)
	.init({
		resources,
		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false // react already safes from xss
		}
});

export default i18n;