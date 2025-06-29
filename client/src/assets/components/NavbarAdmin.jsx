import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>Incident Tracker</h2>
      <button onClick={() => setDarkMode(!darkMode)} style={styles.toggleBtn}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#eee",
    borderBottom: "1px solid #ccc",
  },
  title: {
    margin: 0,
  },
  toggleBtn: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
};
