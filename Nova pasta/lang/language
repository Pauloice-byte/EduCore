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

function translatePage() {

    const lang = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;

    document.title = lang.pageTitle;

    for (const id in lang) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = lang[id];
        }
    }

    languageFlag.src = flags[currentLanguage];
    languageFlag.alt = currentLanguage;

}

translatePage();

languageSwitcher.addEventListener("click", () => {

    let index = languages.indexOf(currentLanguage);

    index = (index + 1) % languages.length;

    currentLanguage = languages[index];

    localStorage.setItem("language", currentLanguage);

    translatePage();

});
