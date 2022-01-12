import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useCursor } from "hooks/useCursor";
import { Instagram, Facebook, Vimeo } from "../../src/assets/svg/social-icons";
import { Container, Flex } from "styles/globalStyles";
import {
  CloseNav,
  Nav,
  NavFooter,
  NavHeader,
  NavList,
  NavVideos,
} from "styles/navStyles";
import { FooterContent, FooterSocial } from "styles/footerStyles";
import ReactPlayer from "react-player/lazy";

const navRoutes = [
  {
    id: 0,
    title: "not humble",
    path: "/not-humble",
    video:
      "https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641847961/ytokk7a9voibit5uovu9.mp4",
  },
  {
    id: 1,
    title: "bleeping easy",
    path: "/bleeping-easy",
    video:
      "https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641847955/efpjgjnmgfobpxt2njwu.mp4",
  },
  {
    id: 2,
    title: "make it zero",
    path: "/make-it-zero",
    video:
      "https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641847951/jmweeqbejwrujeu48zqt.mp4",
  },
  {
    id: 3,
    title: "it takes an island",
    path: "/it-takes-an-island",
    video:
      "https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641847951/yko36cgluzvfko9pkfbl.mp4",
  },
  {
    id: 4,
    title: "50 beaches",
    path: "/50-beaches",
    video:
      "https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641847955/efpjgjnmgfobpxt2njwu.mp4",
  },
];

interface RevealVideoProps {
  show: boolean;
  video: string;
  key: string | number;
}
interface NavigationProps {
  toggleMenu: boolean;
  setToggleMenu: (value: boolean) => void;
  setHamburgerPosition: (value: any) => void;
}

export const Navigation = ({
  toggleMenu,
  setToggleMenu,
  setHamburgerPosition,
}: NavigationProps) => {
  const { onCursor } = useCursor();
  const [revealVideo, setRevealVideo] = useState<RevealVideoProps>({
    show: false,
    video: "featured-video.mp4",
    key: "0",
  });

  return (
    <>
      <AnimatePresence>
        {toggleMenu && (
          <Nav
            initial={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            animate={{ x: toggleMenu ? 0 : "-100%" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
          >
            <Container>
              <NavHeader>
                <Flex spaceBetween noHeight>
                  <h2>Projects</h2>
                  <CloseNav
                    onClick={() => setToggleMenu(!toggleMenu)}
                    onMouseEnter={() => onCursor("pointer")}
                    onMouseLeave={() => onCursor("")}
                  >
                    <button>
                      <span></span>
                      <span></span>
                    </button>
                  </CloseNav>
                </Flex>
              </NavHeader>
              <NavList>
                <ul>
                  {navRoutes.map((route) => (
                    <motion.li
                      key={route.id}
                      onMouseEnter={() => onCursor("pointer")}
                      onMouseLeave={() => onCursor("")}
                      onHoverStart={() =>
                        setRevealVideo({
                          show: true,
                          video: route.video,
                          key: route.id,
                        })
                      }
                      onHoverEnd={() =>
                        setRevealVideo({
                          show: false,
                          video: route.video,
                          key: route.id,
                        })
                      }
                    >
                      <Link href={`/projects${route.path}`} passHref>
                        <motion.div
                          initial={{ x: -108 }}
                          className="link"
                          whileHover={{
                            x: -40,
                            transition: {
                              duration: 0.4,
                              ease: [0.6, 0.05, -0.01, 0.9],
                            },
                          }}
                        >
                          <span className="arrow">
                            <motion.svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 101 57"
                            >
                              <path
                                d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                fill="#000"
                                fillRule="evenodd"
                              ></path>
                            </motion.svg>
                          </span>
                          {route.title}
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </NavList>
              <NavFooter>
                <Flex spaceBetween>
                  <FooterContent>
                    <p>info@furrow.studio</p>
                  </FooterContent>
                  <FooterContent wider>
                    <p>902.315.1279</p>
                  </FooterContent>
                  <FooterSocial>
                    <a
                      onMouseEnter={() => onCursor("pointer")}
                      onMouseLeave={() => onCursor("")}
                      href="/"
                      target="_blank"
                    >
                      <Instagram />
                    </a>
                    <a
                      onMouseEnter={() => onCursor("pointer")}
                      onMouseLeave={() => onCursor("")}
                      href="/"
                      target="_blank"
                    >
                      <Facebook />
                    </a>
                    <a
                      onMouseEnter={() => onCursor("pointer")}
                      onMouseLeave={() => onCursor("")}
                      href="/"
                      target="_blank"
                    >
                      <Vimeo />
                    </a>
                  </FooterSocial>
                </Flex>
              </NavFooter>

              <NavVideos>
                <motion.div
                  className="reveal"
                  animate={{ width: revealVideo.show ? 0 : "100%" }}
                ></motion.div>
                <div className="video">
                  <AnimatePresence initial={false} exitBeforeEnter>
                    <motion.video
                      loop
                      autoPlay
                      src={revealVideo.video}
                      key={revealVideo.key}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  </AnimatePresence>

                  {/* <ReactPlayer
                  url={revealVideo.video}
                  height="100%"
                  loop
                  playing
                /> */}
                </div>
              </NavVideos>
            </Container>
          </Nav>
        )}
      </AnimatePresence>
    </>
  );
};
