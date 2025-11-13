// Theme configuration
const themes = {
  green: "green",
  blue: "blue",
  orange: "orange",
  red: "red",
  purple: "purple",
  teal: "teal",
};

// Get current theme from localStorage or default to green
function getCurrentTheme() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "green";
  }
  return "green";
}

// Set theme
function setTheme(themeName) {
  if (typeof window !== "undefined") {
    const root = document.documentElement;

    // Remove all theme classes and data attributes
    Object.values(themes).forEach((theme) => {
      root.classList.remove(`theme-${theme}`);
    });

    // Set new theme
    if (themeName !== "green") {
      root.setAttribute("data-theme", themeName);
      root.classList.add(`theme-${themeName}`);
    } else {
      root.removeAttribute("data-theme");
    }

    // Save to localStorage
    localStorage.setItem("theme", themeName);
  }
}

// Initialize theme on page load
function initTheme() {
  const savedTheme = getCurrentTheme();
  setTheme(savedTheme);
}

// Theme switcher component
function createThemeSwitcher() {
  return `
    <div class="theme-switcher">
      <label for="theme-select" class="block text-sm font-medium mb-2">Choose Theme:</label>
      <select id="theme-select" class="px-3 py-2 border border-border bg-card text-foreground rounded-md">
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="orange">Orange</option>
        <option value="red">Red</option>
        <option value="purple">Purple</option>
        <option value="teal">Teal</option>
      </select>
    </div>
  `;
}

// Initialize theme switcher functionality
function initThemeSwitcher() {
  if (typeof window !== "undefined") {
    const themeSelect = document.getElementById("theme-select");
    if (themeSelect) {
      // Set current theme as selected
      themeSelect.value = getCurrentTheme();

      // Listen for theme changes
      themeSelect.addEventListener("change", (e) => {
        setTheme(e.target.value);
      });
    }
  }
}

// Auto-initialize when DOM is loaded
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
}

// Export functions for manual use
export {
  setTheme,
  getCurrentTheme,
  initTheme,
  createThemeSwitcher,
  initThemeSwitcher,
};
