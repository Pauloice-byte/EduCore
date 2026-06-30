document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // SIDEBAR TOGGLE
    // =========================

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("active");
        });

        // Close sidebar when clicking a link
        sidebar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                sidebar.classList.remove("active");
            });
        });

        // Close sidebar when clicking outside
        document.addEventListener("click", (e) => {
            const clickedInside = sidebar.contains(e.target);
            const clickedButton = menuToggle.contains(e.target);

            if (sidebar.classList.contains("active") && !clickedInside && !clickedButton) {
                sidebar.classList.remove("active");
            }
        });
    }

    // =========================
    // SMOOTH SCROLL
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });

    // =========================
    // FAQ ACCORDION
    // =========================

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        button.addEventListener("click", () => {

            const isOpen = answer.style.display === "block";

            // Close all
            document.querySelectorAll(".faq-answer").forEach(a => {
                a.style.display = "none";
            });

            // Toggle current
            answer.style.display = isOpen ? "none" : "block";
        });

    });

    // =========================
    // SCROLL ANIMATIONS
    // =========================

    const elements = document.querySelectorAll(
        ".course-card, .feature-card, .review-card, .stat-card"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
    });

    });
// =========================
// COURSE CARD CLICK REDIRECT
// =========================

document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", () => {
        window.location.href = "courses.html";
    });
});
// =========================
// THEME TOGGLE
// =========================

const themeToggle = document.getElementById("themeToggle");

const sunIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
</svg>
`;

const moonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
</svg>
`;

function updateThemeIcon() {
    if (document.body.classList.contains("light-mode")) {
        themeToggle.innerHTML = moonIcon;
    } else {
        themeToggle.innerHTML = sunIcon;
    }
}

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}

updateThemeIcon();

// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }

    updateThemeIcon();

});
// =========================
// BACKGROUND SLIDESHOW
// =========================

const slides = document.querySelectorAll(".bg-slide");

let currentSlide = 0;

slides[currentSlide].classList.add("active");

setInterval(() => {

    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");

}, 3000);
