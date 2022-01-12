import { themeState } from "atoms/themeAtom";
import { useCursor } from "hooks/useCursor";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Container, Flex } from "styles/globalStyles";
import { HeaderNav, Logo, Menu } from "styles/headerStyles";

interface HeaderProps {
  toggleMenu: boolean;
  setToggleMenu: (value: boolean) => void;
  setHamburgerPosition: (value: any) => void;
}

export const Header = ({
  toggleMenu,
  setToggleMenu,
  setHamburgerPosition,
}: HeaderProps) => {
  const { onCursor } = useCursor();
  const [theme, setTheme] = useRecoilState(themeState);
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      setTheme("light");
    } else {
      setTheme(localStorage.getItem("theme") as string);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <HeaderNav
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 0 }}
      transition={{ type: "spring", duration: 1, damping: 10, stiffness: 55 }}
    >
      <Container>
        <Flex spaceBetween noHeight>
          <Logo
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={() => onCursor(false)}
          >
            <Link href="/">FURR</Link>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => onCursor("pointer")}
              onMouseLeave={() => onCursor(false)}
            ></span>
            <Link href="/">W</Link>
          </Logo>
          <Menu onClick={() => setToggleMenu(!toggleMenu)}>
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </Flex>
      </Container>
    </HeaderNav>
  );
};
