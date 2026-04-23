import React from "react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    style={{
      padding: "7px 14px",
      borderRadius: 20,
      border: "none",
      background:
        theme === "dark" ? "rgba(26,36,86,0.85)" : "rgba(255, 215, 80, 0.18)",
      color: theme === "dark" ? "#FFD750" : "#E8A020",
      fontWeight: 700,
      fontSize: 22,
      boxShadow:
        theme === "light" ? "0 2px 12px #e8b02022" : "0 2px 12px #0002",
      cursor: "pointer",
      marginLeft: 10,
      transition: "background 0.2s, color 0.2s",
      outline: "none",
      borderColor: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    aria-label={
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    }
    title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  >
    <span
      style={{
        filter: theme === "light" ? "drop-shadow(0 0 4px #FFD750)" : "none",
      }}
    >
      ☀️
    </span>
  </button>
);

export default ThemeToggle;
