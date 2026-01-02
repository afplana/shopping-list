import { createContext, useContext, useMemo, useState } from 'react';

export type Language = 'en' | 'de' | 'es';

const STORAGE_KEY = 'lang';

const translations: Record<Language, Record<string, string>> = {
    en: {
        'nav.list': 'List',
        'nav.info': 'Info',
        'nav.about': 'About',
        'nav.privacy': 'Privacy Policy',
        'nav.language': 'Language',
        'nav.languageSelector': 'Select language',
        'language.english': 'English',
        'language.german': 'Deutsch',
        'language.spanish': 'Español',
        'fastlist.title': 'Fast Items',
        'fastlist.placeholder': 'e.g. eggs',
        'fastlist.submit': 'submit',
        'fastlist.edit': 'edit',
        'fastlist.quickAdd': 'Quick add:',
        'fastlist.hideCompleted': 'Hide completed',
        'fastlist.clearAll': 'clear all',
        'fastlist.clearCompleted': 'clear completed',
        'fastlist.itemNameLabel': 'Item name',
        'fastlist.itemCategoryLabel': 'Item category',
        'fastlist.alert.enterValue': 'please enter value',
        'fastlist.alert.duplicate': 'item already exists',
        'fastlist.alert.updated': 'value updated',
        'fastlist.alert.added': 'item added to the list',
        'fastlist.alert.empty': 'empty list',
        'fastlist.alert.removed': 'item removed',
        'fastlist.alert.notFound': 'item not found',
        'fastlist.alert.clearedCompleted': 'completed items cleared',
        'fastlist.markDone': 'Mark {{title}} as done',
        'fastlist.markNotDone': 'Mark {{title}} as not done',
        'fastlist.editItem': 'Edit {{title}}',
        'fastlist.deleteItem': 'Delete {{title}}',
        'consent.bannerLabel': 'Consent for ads',
        'consent.message': 'We use Google AdSense to keep this free. Allow ads to load?',
        'consent.accept': 'Allow ads',
        'consent.decline': 'No thanks',
        'ad.label': 'Advertisement',
        'home.title': 'Welcome to Fast-List',
        'home.intro':
            'Fast-List is a minimalist, in-browser shopping-list tool designed for speed and simplicity. No sign-ups, no cloud backend—just open the app, add your items, and check them off as you go.',
        'home.storage':
            'Your list is stored in your browser session, so it’s always at your fingertips.',
        'home.linkIntro': 'Head over to the',
        'home.linkText': 'List App',
        'home.linkOutro': 'to try it now!',
        'home.whyTitle': 'Why Fast-List?',
        'home.why.zeroConfig': 'Zero-configuration: works instantly on desktop or mobile.',
        'home.why.lightweight': 'Lightweight: under 50 KB of JavaScript—loads in milliseconds.',
        'home.why.privacy': 'Privacy-first: your data never leaves your browser.',
        'home.outro':
            'Fast-List is perfect for grocery shopping, to-do lists, packing checklists, or any quick list you need. No distractions, no login walls—just a fast list.',
        'about.title': 'About Fast-List',
        'about.intro':
            'Fast-List was built by a solo developer who wanted a no-frills way to jot down lists on the go. As a Senior Software Engineer and productivity enthusiast, I found existing apps too heavy or privacy-invasive.',
        'about.bullets.fast': 'Lightning-fast interface that opens in under a second.',
        'about.bullets.local': 'No sign-in required—your data stays local to your browser.',
        'about.bullets.crossPlatform': 'Cross-platform support: works on any modern browser, desktop or mobile.',
        'about.outro':
            'Whether you’re at the grocery store, planning your next trip, or just making a quick to-do list, Fast-List is there in one click.',
        'about.signature': '— DevM2od, Creator of Fast-List',
        'privacy.title': 'Privacy Policy',
        'privacy.updated': 'Last updated: June 8, 2025',
        'privacy.collectTitle': 'Information We Collect',
        'privacy.storageLabel': 'Browser Storage:',
        'privacy.storageBodyPrefix': 'Your lists are saved in ',
        'privacy.storageBodySuffix': '. We never transmit them.',
        'privacy.adsLabel': 'Ads (opt-in):',
        'privacy.adsBody': 'Google AdSense loads only if you consent. AdSense may set cookies; see Google’s policy for details.',
        'privacy.consentLabel': 'Consent Storage:',
        'privacy.consentBody': 'Your ad consent choice is stored locally to honor your preference on return visits.',
        'privacy.analyticsTitle': 'Analytics',
        'privacy.analyticsBody': 'We do not use Google Analytics or other analytics tracking.',
        'privacy.contactTitle': 'Contact',
        'privacy.contactBody': 'Email us at',
    },
    de: {
        'nav.list': 'Liste',
        'nav.info': 'Info',
        'nav.about': 'Über',
        'nav.privacy': 'Datenschutz',
        'nav.language': 'Sprache',
        'nav.languageSelector': 'Sprache auswählen',
        'language.english': 'Englisch',
        'language.german': 'Deutsch',
        'language.spanish': 'Spanisch',
        'fastlist.title': 'Schnelle Einträge',
        'fastlist.placeholder': 'z. B. Eier',
        'fastlist.submit': 'hinzufügen',
        'fastlist.edit': 'bearbeiten',
        'fastlist.quickAdd': 'Schnell hinzufügen:',
        'fastlist.hideCompleted': 'Erledigte ausblenden',
        'fastlist.clearAll': 'alle löschen',
        'fastlist.clearCompleted': 'Erledigte löschen',
        'fastlist.itemNameLabel': 'Artikelname',
        'fastlist.itemCategoryLabel': 'Kategorie',
        'fastlist.alert.enterValue': 'Bitte einen Wert eingeben',
        'fastlist.alert.duplicate': 'Eintrag existiert bereits',
        'fastlist.alert.updated': 'Eintrag aktualisiert',
        'fastlist.alert.added': 'Eintrag zur Liste hinzugefügt',
        'fastlist.alert.empty': 'Liste geleert',
        'fastlist.alert.removed': 'Eintrag entfernt',
        'fastlist.alert.notFound': 'Eintrag nicht gefunden',
        'fastlist.alert.clearedCompleted': 'Erledigte Einträge gelöscht',
        'fastlist.markDone': '{{title}} als erledigt markieren',
        'fastlist.markNotDone': '{{title}} als nicht erledigt markieren',
        'fastlist.editItem': '{{title}} bearbeiten',
        'fastlist.deleteItem': '{{title}} löschen',
        'consent.bannerLabel': 'Zustimmung für Anzeigen',
        'consent.message': 'Wir verwenden Google AdSense, um dies kostenlos zu halten. Anzeigen laden?',
        'consent.accept': 'Anzeigen erlauben',
        'consent.decline': 'Nein danke',
        'ad.label': 'Anzeige',
        'home.title': 'Willkommen bei Fast-List',
        'home.intro':
            'Fast-List ist eine minimalistische Einkaufslisten-App im Browser, entwickelt für Geschwindigkeit und Einfachheit. Keine Anmeldung, kein Cloud-Backend—einfach öffnen, Artikel hinzufügen und abhaken.',
        'home.storage':
            'Deine Liste wird in der Browsersitzung gespeichert und ist jederzeit verfügbar.',
        'home.linkIntro': 'Gehe zur',
        'home.linkText': 'Listen-App',
        'home.linkOutro': 'und probiere sie aus!',
        'home.whyTitle': 'Warum Fast-List?',
        'home.why.zeroConfig': 'Keine Einrichtung: funktioniert sofort auf Desktop oder Mobilgerät.',
        'home.why.lightweight': 'Leichtgewichtig: unter 50 KB JavaScript—lädt in Millisekunden.',
        'home.why.privacy': 'Datenschutz zuerst: deine Daten verlassen nie den Browser.',
        'home.outro':
            'Fast-List ist perfekt für Einkäufe, To-do-Listen, Packlisten oder jede schnelle Liste. Keine Ablenkung, kein Login—nur eine schnelle Liste.',
        'about.title': 'Über Fast-List',
        'about.intro':
            'Fast-List wurde von einem Solo-Entwickler gebaut, der eine schlanke Lösung für Listen unterwegs wollte. Als Senior Software Engineer und Produktivitätsfan waren bestehende Apps mir zu schwer oder zu datensammelnd.',
        'about.bullets.fast': 'Blitzschnelles Interface, das in unter einer Sekunde lädt.',
        'about.bullets.local': 'Keine Anmeldung—deine Daten bleiben lokal im Browser.',
        'about.bullets.crossPlatform': 'Plattformübergreifend: funktioniert in jedem modernen Browser, Desktop oder Mobil.',
        'about.outro':
            'Egal ob im Supermarkt, bei der Reiseplanung oder für schnelle To-dos—Fast-List ist in einem Klick da.',
        'about.signature': '— DevM2od, Ersteller von Fast-List',
        'privacy.title': 'Datenschutzerklärung',
        'privacy.updated': 'Zuletzt aktualisiert: 8. Juni 2025',
        'privacy.collectTitle': 'Informationen, die wir sammeln',
        'privacy.storageLabel': 'Browser-Speicher:',
        'privacy.storageBodyPrefix': 'Deine Listen werden in ',
        'privacy.storageBodySuffix': ' gespeichert. Wir übertragen sie nicht.',
        'privacy.adsLabel': 'Anzeigen (Opt-in):',
        'privacy.adsBody': 'Google AdSense lädt nur mit deiner Zustimmung. AdSense kann Cookies setzen; siehe Googles Richtlinien.',
        'privacy.consentLabel': 'Zustimmung:',
        'privacy.consentBody': 'Deine Anzeigen-Einwilligung wird lokal gespeichert, um deine Wahl zu merken.',
        'privacy.analyticsTitle': 'Analytics',
        'privacy.analyticsBody': 'Wir verwenden kein Google Analytics oder anderes Tracking.',
        'privacy.contactTitle': 'Kontakt',
        'privacy.contactBody': 'Schreib uns an',
    },
    es: {
        'nav.list': 'Lista',
        'nav.info': 'Info',
        'nav.about': 'Acerca de',
        'nav.privacy': 'Privacidad',
        'nav.language': 'Idioma',
        'nav.languageSelector': 'Seleccionar idioma',
        'language.english': 'Inglés',
        'language.german': 'Alemán',
        'language.spanish': 'Español',
        'fastlist.title': 'Elementos rápidos',
        'fastlist.placeholder': 'p. ej., huevos',
        'fastlist.submit': 'agregar',
        'fastlist.edit': 'editar',
        'fastlist.quickAdd': 'Agregar rápido:',
        'fastlist.hideCompleted': 'Ocultar completados',
        'fastlist.clearAll': 'borrar todo',
        'fastlist.clearCompleted': 'borrar completados',
        'fastlist.itemNameLabel': 'Nombre del artículo',
        'fastlist.itemCategoryLabel': 'Categoría',
        'fastlist.alert.enterValue': 'Por favor ingresa un valor',
        'fastlist.alert.duplicate': 'El artículo ya existe',
        'fastlist.alert.updated': 'Artículo actualizado',
        'fastlist.alert.added': 'Artículo agregado a la lista',
        'fastlist.alert.empty': 'lista vacía',
        'fastlist.alert.removed': 'Artículo eliminado',
        'fastlist.alert.notFound': 'Artículo no encontrado',
        'fastlist.alert.clearedCompleted': 'Completados eliminados',
        'fastlist.markDone': 'Marcar {{title}} como hecho',
        'fastlist.markNotDone': 'Marcar {{title}} como no hecho',
        'fastlist.editItem': 'Editar {{title}}',
        'fastlist.deleteItem': 'Eliminar {{title}}',
        'consent.bannerLabel': 'Consentimiento para anuncios',
        'consent.message': 'Usamos Google AdSense para mantener esto gratis. ¿Permitir anuncios?',
        'consent.accept': 'Permitir anuncios',
        'consent.decline': 'No, gracias',
        'ad.label': 'Anuncio',
        'home.title': 'Bienvenido a Fast-List',
        'home.intro':
            'Fast-List es una herramienta minimalista de listas de compras en el navegador, diseñada para la velocidad y la simplicidad. Sin registros, sin backend en la nube: solo abre la app, agrega tus artículos y márcalos.',
        'home.storage':
            'Tu lista se guarda en la sesión del navegador, así que siempre está a mano.',
        'home.linkIntro': 'Ve a la',
        'home.linkText': 'App de Lista',
        'home.linkOutro': 'para probarla ahora.',
        'home.whyTitle': '¿Por qué Fast-List?',
        'home.why.zeroConfig': 'Cero configuración: funciona al instante en escritorio o móvil.',
        'home.why.lightweight': 'Ligera: menos de 50 KB de JavaScript—carga en milisegundos.',
        'home.why.privacy': 'Privacidad primero: tus datos nunca salen del navegador.',
        'home.outro':
            'Fast-List es perfecta para compras, listas de tareas, listas de viaje o cualquier lista rápida. Sin distracciones, sin inicios de sesión: solo una lista rápida.',
        'about.title': 'Acerca de Fast-List',
        'about.intro':
            'Fast-List fue creada por un desarrollador independiente que quería una forma sencilla de anotar listas al instante. Como Senior Software Engineer y entusiasta de la productividad, encontraba otras apps demasiado pesadas o invasivas.',
        'about.bullets.fast': 'Interfaz rapidísima que abre en menos de un segundo.',
        'about.bullets.local': 'Sin registro: tus datos permanecen en tu navegador.',
        'about.bullets.crossPlatform': 'Multiplataforma: funciona en cualquier navegador moderno, escritorio o móvil.',
        'about.outro':
            'Ya sea en el supermercado, planificando un viaje o creando un to-do rápido, Fast-List está a un clic.',
        'about.signature': '— DevM2od, creador de Fast-List',
        'privacy.title': 'Política de privacidad',
        'privacy.updated': 'Última actualización: 8 de junio de 2025',
        'privacy.collectTitle': 'Información que recopilamos',
        'privacy.storageLabel': 'Almacenamiento en el navegador:',
        'privacy.storageBodyPrefix': 'Tus listas se guardan en ',
        'privacy.storageBodySuffix': '. Nunca las transmitimos.',
        'privacy.adsLabel': 'Anuncios (opt-in):',
        'privacy.adsBody': 'Google AdSense se carga solo si das tu consentimiento. AdSense puede establecer cookies; consulta la política de Google.',
        'privacy.consentLabel': 'Consentimiento:',
        'privacy.consentBody': 'Tu elección de anuncios se guarda localmente para recordarla.',
        'privacy.analyticsTitle': 'Analítica',
        'privacy.analyticsBody': 'No usamos Google Analytics ni otro seguimiento.',
        'privacy.contactTitle': 'Contacto',
        'privacy.contactBody': 'Escríbenos a',
    },
};

type TranslateVars = Record<string, string>;

const interpolate = (template: string, vars?: TranslateVars) =>
    template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars?.[key] ?? '');

const translate = (language: Language, key: string, vars?: TranslateVars) => {
    const template = translations[language][key] ?? translations.en[key] ?? key;
    return interpolate(template, vars);
};

const getStoredLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    try {
        const value = window.localStorage.getItem(STORAGE_KEY);
        if (value === 'en' || value === 'de' || value === 'es') {
            return value;
        }
    } catch (error) {
        console.warn('Unable to read language from localStorage.', error);
    }
    return 'en';
};

type I18nContextValue = {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, vars?: TranslateVars) => string;
};

const I18nContext = createContext<I18nContextValue>({
    language: 'en',
    setLanguage: () => undefined,
    t: (key, vars) => translate('en', key, vars),
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(getStoredLanguage);

    const setLanguage = (next: Language) => {
        setLanguageState(next);
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch (error) {
            console.warn('Unable to write language to localStorage.', error);
        }
    };

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            t: (key: string, vars?: TranslateVars) => translate(language, key, vars),
        }),
        [language]
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
