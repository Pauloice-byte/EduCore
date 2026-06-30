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
