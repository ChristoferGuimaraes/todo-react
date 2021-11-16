import React, { useEffect, useState } from "react";
import "./index.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function DarkMode() {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const tempLocal = localStorage.getItem("theme");
    const loadedList = JSON.parse(tempLocal);

    if (loadedList) {
      setTheme(loadedList);
    }
  }, []);

  useEffect(() => {
    const tempLocal = JSON.stringify(theme);
    localStorage.setItem("theme", tempLocal);
  }, [theme]);

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      setTheme(lightTheme);
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      setTheme(darkTheme);
    }
  };

  return (
    <div>
      <button
        className={theme === "dark" ? clickedClass : ""}
        id="darkMode"
        onClick={(e) => switchTheme(e)}
      >
        {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </div>
  );
}

export default DarkMode;
