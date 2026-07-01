const translations = {
    en,
    pt,
    fr
};

const flags = {
    en: "images/flags/gb.png",
    pt: "images/flags/pt.png",
    fr: "images/flags/fr.png"
};

const languages = ["en", "pt", "fr"];

let currentLanguage =
    localStorage.getItem("language") ||
    navigator.language.substring(0, 2);

if (!languages.includes(currentLanguage)) {
    currentLanguage = "en";
}

const languageFlag = document.getElementById("languageFlag");
const languageSwitcher = document.getElementById("languageSwitcher");

function getTranslation(obj, path) {
    return path.split(".").reduce((o, key) => {
        return o ? o[key] : undefined;
    }, obj);
}

function translatePage() {

    const lang = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;

    // Page title
    const title = document.querySelector("[data-i18n-title]");

    if (title) {
        const key = title.dataset.i18nTitle;
        const value = getTranslation(lang, key);

        if (value) {
            document.title = value;
        }
    }

    // Translate every element
    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        const value = getTranslation(lang, key);

        if (value !== undefined) {
            element.textContent = value;
        } else {
            console.warn("Missing translation:", key);
        }

    });

    // Update flag
    if (languageFlag) {
        languageFlag.src = flags[currentLanguage];
        languageFlag.alt = currentLanguage.toUpperCase();
    }

}

// Initial translation
translatePage();

// Click on flag
if (languageSwitcher) {

    languageSwitcher.addEventListener("click", () => {

        let index = languages.indexOf(currentLanguage);

        index = (index + 1) % languages.length;

        currentLanguage = languages[index];

        localStorage.setItem("language", currentLanguage);

        translatePage();

    });

}
