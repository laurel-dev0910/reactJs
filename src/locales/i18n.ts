import i18n, { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector, { DetectorOptions } from 'i18next-browser-languagedetector'
import { AVAILABLE_LANGUAGE, LANGUAGE_KEY } from 'constant/common'

import en from './en/translation.json'
import vi from './vi/translation.json'

const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
}

const options: DetectorOptions | undefined = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: LANGUAGE_KEY,
  lookupCookie: LANGUAGE_KEY,
  lookupLocalStorage: LANGUAGE_KEY,
  lookupSessionStorage: LANGUAGE_KEY,
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: '/', sameSite: 'strict' }
}

use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    fallbackLng: 'en',
    debug: false,
    resources: resources,
    supportedLngs: AVAILABLE_LANGUAGE,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
