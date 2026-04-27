document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleBtn = document.getElementById("toggle-btn");
    const siteHeader = document.querySelector(".site-header");
    const themeStorageKey = "theme";

    function setTheme(theme) {
        if (theme === "light") {
            body.classList.add("light-mode");
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.classList.remove("light-mode");
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    const savedTheme = localStorage.getItem(themeStorageKey);
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (preferredDark ? "dark" : "light");
    setTheme(initialTheme);

    toggleBtn.addEventListener("click", () => {
        const nextTheme = body.classList.contains("light-mode") ? "dark" : "light";
        setTheme(nextTheme);
        localStorage.setItem(themeStorageKey, nextTheme);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const href = anchor.getAttribute("href");
            if (!href) {
                return;
            }
            const target = document.querySelector(href);
            if (!target) {
                return;
            }
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (siteHeader) {
        const handleHeaderState = () => {
            if (window.scrollY > 10) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        };
        handleHeaderState();
        window.addEventListener("scroll", handleHeaderState);
    }

    const revealSections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealSections.forEach((section) => {
        section.classList.add("reveal");
        observer.observe(section);
    });

    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = String(new Date().getFullYear());
    }
});
