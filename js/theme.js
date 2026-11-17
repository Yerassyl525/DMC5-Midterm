const themeButtons = document.querySelectorAll("#themeToggleBtn, .theme-toggle");

function setTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("light-theme", isLight);

    localStorage.setItem("dmc5-theme", theme);

    themeButtons.forEach(button => {
        button.textContent = isLight ? "🌙 Dark mode" : "☀ Light mode";
        button.setAttribute("aria-pressed", isLight);
    });
}

const savedTheme = localStorage.getItem("dmc5-theme") || "dark";

setTheme(savedTheme);

themeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-mode");
        setTheme(isLight ? "dark" : "light");
    });
});