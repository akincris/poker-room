import { getLSValue, setLSValue } from "./localStorage";

export const toggleTheme = () => {
  const selectedTheme = getLSValue("theme") == "light" ? "dark" : "light";
  setLSValue("theme", selectedTheme);
  document.documentElement.setAttribute("data-theme",selectedTheme);
};
