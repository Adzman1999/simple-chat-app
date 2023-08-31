import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { ChatState } from "./context/ChatProvider";
import Home from "./layout";
import GlobalStyles from "./style/GlobalStyles";
import { darkMode, lightMode } from "./style/ThemeModeStyle";

const App = () => {
  const { theme, colorPicker } = ChatState();
  const themeMode =
    theme === "light" ? lightMode(colorPicker) : darkMode(colorPicker);
  return (
    <Fragment>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/sign-up' element={<Register />} />
          <Route exact path='/chat' element={<Home />} />
        </Routes>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
