/// 9. Ana Bileşen Yapısı - src/App.jsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./i18n";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, FormControl, IconButton } from "@mui/material";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const App = () => {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px", alignItems: "center" }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <FormControl variant="outlined" size="small" style={{ marginLeft: "10px" }}>
            <Select
              value={i18n.language}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Select Language" }}
            >
              <MenuItem value="tr">TR</MenuItem>
              <MenuItem value="en">EN</MenuItem>
            </Select>
          </FormControl>
        </div>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
