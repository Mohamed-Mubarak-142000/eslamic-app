import { useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../themes/Themes";

const useTheme = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const toggleTheme = () => {
    setIsLightTheme((prevIsLightTheme) => !prevIsLightTheme);
  };
  const theme = useMemo(
    () => (isLightTheme ? lightTheme : darkTheme),
    [isLightTheme]
  );
  return { theme, toggleTheme, isLightTheme };
};

export default useTheme;
