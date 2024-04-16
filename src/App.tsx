import { ThemeProvider } from "styled-components";
import useTheme from "./hooks/useThemes";
import Routes from "@utils/routes";
import { useEffect, useState } from "react";
import LoadingPage from "@pages/LoadingPage/LoadingPage";
import ThemeBtn from "./themes/ThemeBtn";

function App() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState(0);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prevRotate) => (prevRotate + 5) % 360);
    }, 10);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Routes />
          <ThemeBtn
            toggleSidebar={toggleSidebar}
            rotate={rotate}
            open={open ? "true" : "false"}
          />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
