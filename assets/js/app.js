// =====================================================
// Daksh ERP Website Core Script
// Theme
// Language
// FAQ
// Mobile Menu
// Dynamic Content
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();
    initializeLanguage();
    initializeMobileMenu();
    initializeFAQ();
    initializeScrollAnimations();
    initializeCounters();
    loadVersionInfo();

});

// =====================================================
// THEME
// =====================================================

function initializeTheme() {

    const themeBtn = document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("daksh_theme") || "light";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    updateThemeIcon(savedTheme);

    if (!themeBtn) return;

    themeBtn.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "daksh_theme",
            newTheme
        );

        updateThemeIcon(newTheme);

    });

}

function updateThemeIcon(theme) {

    const btn = document.getElementById("themeToggle");

    if (!btn) return;

    btn.textContent =
        theme === "dark"
            ? "☀"
            : "🌙";

}

// =====================================================
// LANGUAGE
// =====================================================

let currentLanguage = "en";

function initializeLanguage() {

    const langBtn =
        document.getElementById("languageToggle");

    currentLanguage =
        localStorage.getItem("daksh_language") || "en";

    applyLanguage(currentLanguage);

    if (!langBtn) return;

    langBtn.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "en"
                ? "hi"
                : "en";

        localStorage.setItem(
            "daksh_language",
            currentLanguage
        );

        applyLanguage(currentLanguage);

    });

}

function applyLanguage(language) {

    const elements =
        document.querySelectorAll("[data-lang-en]");

    elements.forEach(element => {

        const text =
            language === "en"
                ? element.dataset.langEn
                : element.dataset.langHi;

        if (text) {
            element.innerHTML = text;
        }

    });

    const button =
        document.getElementById("languageToggle");

    if (button) {
        button.textContent =
            language === "en"
                ? "हिं"
                : "EN";
    }

}

// =====================================================
// MOBILE MENU
// =====================================================

function initializeMobileMenu() {

    const menuButton =
        document.getElementById("mobileMenuButton");

    const navigation =
        document.getElementById("mainNavigation");

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        document.body.classList.toggle(
            "no-scroll"
        );

    });

    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                document.body.classList.remove(
                    "no-scroll"
                );

            });

        });

}

// =====================================================
// FAQ
// =====================================================

function initializeFAQ() {

    const items =
        document.querySelectorAll(".faq-item");

    items.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            item.classList.toggle("open");

        });

    });

}

// =====================================================
// SCROLL ANIMATION
// =====================================================

function initializeScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".feature-card, .workflow-card, .price-card, .section-heading, .invoice-preview"
        );

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

    elements.forEach(element => {

        element.classList.add("fade-up");

        observer.observe(element);

    });

}

// =====================================================
// COUNTER ANIMATION
// =====================================================

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    counters.forEach(counter => {

        const target =
            parseInt(
                counter.dataset.counter
            );

        animateCounter(
            counter,
            target
        );

    });

}

function animateCounter(
    element,
    target
) {

    let current = 0;

    const increment =
        Math.ceil(target / 60);

    const timer =
        setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            element.textContent =
                current.toLocaleString();

        }, 20);

}

// =====================================================
// VERSION CHECK
// =====================================================

async function loadVersionInfo() {

    try {

        const response =
            await fetch(
                "data/version.json"
            );

        if (!response.ok) return;

        const data =
            await response.json();

        const versionElements =
            document.querySelectorAll(
                ".current-version"
            );

        versionElements.forEach(element => {

            element.textContent =
                data.current_version;

        });

    }
    catch (error) {

        console.log(
            "Version info unavailable"
        );

    }

}

// =====================================================
// DOWNLOAD COUNTER
// =====================================================

async function loadDownloadInfo() {

    try {

        const response =
            await fetch(
                "data/downloads.json"
            );

        const data =
            await response.json();

        const target =
            document.getElementById(
                "downloadCount"
            );

        if (target) {

            target.textContent =
                data.total_downloads
                    .toLocaleString();

        }

    }
    catch (error) {

        console.log(error);

    }

}

// =====================================================
// RELEASE NOTES
// =====================================================

async function loadReleases() {

    try {

        const response =
            await fetch(
                "data/releases.json"
            );

        const releases =
            await response.json();

        const container =
            document.getElementById(
                "releaseContainer"
            );

        if (!container) return;

        container.innerHTML = "";

        releases.forEach(release => {

            const card =
                document.createElement("div");

            card.className =
                "release-card";

            card.innerHTML = `
                <h3>${release.version}</h3>
                <p>${release.date}</p>
                <ul>
                    ${release.notes
                        .map(
                            note =>
                                `<li>${note}</li>`
                        )
                        .join("")}
                </ul>
            `;

            container.appendChild(card);

        });

    }
    catch (error) {

        console.log(error);

    }

}

// =====================================================
// SMOOTH SCROLL
// =====================================================

document.addEventListener("click", event => {

    const target =
        event.target.closest(
            '[data-scroll]'
        );

    if (!target) return;

    event.preventDefault();

    const section =
        document.querySelector(
            target.dataset.scroll
        );

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth"
    });

});

// =====================================================
// FUTURE UPDATE NOTIFICATION
// =====================================================

async function checkForUpdate() {

    try {

        const response =
            await fetch(
                "data/version.json"
            );

        const data =
            await response.json();

        const currentVersion =
            document.body.dataset.version;

        if (
            currentVersion &&
            currentVersion !==
                data.current_version
        ) {

            console.log(
                "New version available"
            );

        }

    }
    catch (error) {

        console.log(error);

    }

}
