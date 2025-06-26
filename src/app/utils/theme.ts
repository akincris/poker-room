import { getSSValue, setSSValue } from "./localStorage";

export const toggleTheme = () => {
  const selectedTheme = getSSValue("theme") == "light" ? "dark" : "light";
  setSSValue("theme", selectedTheme);
  document.documentElement.setAttribute("data-theme",selectedTheme);
};
