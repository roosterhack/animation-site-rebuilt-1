import { themeState } from "atoms/themeAtom";
import { CustomCursor } from "components/CustomCursor";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Navigation } from "components/homePage/Navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { cursorTypeState } from "atoms/cursorTypeAtom";
import { useRecoilState } from "recoil";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";
import normalize from "styled-normalize";

//Global styles
const GlobalStyle = createGlobalStyle`
 ${normalize}
* {
  text-decoration: none;
  cursor: none;
}
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  
  
}
body {
  font-size: 16px;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  overscroll-behavior: none;
  overflow-x: hidden;
}
`;

const BasicLayout = ({ children }: { children: any }) => {
  const [hamburgerPosition, setHamburgerPosition] = useState({
    x: 0,
    y: 0,
  });
  const theme = useRecoilValue(themeState);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const darkTheme: DefaultTheme = {
    background: "#000",
    text: "#fff",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  };

  const lightTheme: DefaultTheme = {
    background: "#fff",
    text: "#000",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <CustomCursor toggleMenu={toggleMenu} />
      <Header
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        setHamburgerPosition={setHamburgerPosition}
      />
      <Navigation
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        setHamburgerPosition={setHamburgerPosition}
      />
      <main>{children}</main>
      <Footer setHamburgerPosition={setHamburgerPosition} />
    </ThemeProvider>
  );
};

export default BasicLayout;
