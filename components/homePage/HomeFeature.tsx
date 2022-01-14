import { motion, useAnimation } from "framer-motion";
import { useCursor } from "hooks/useCursor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { Container, Flex } from "styles/globalStyles";
import {
  FeaturedContent,
  FeaturedProjects,
  FeaturedVideo,
  HomeFeaturedSection,
} from "styles/homePageStyles";

export const HomeFeature = () => {
  const { onCursor } = useCursor();
  const [hovered, setHovered] = useState(false);
  const animation = useAnimation();
  const [featured, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-300px",
  });

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    }
  }, [animation, inView]);

  return (
    <HomeFeaturedSection
      ref={featured}
      animate={animation}
      initial="hidden"
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        hidden: { opacity: 0, y: 72 },
      }}
    >
      <Container>
        <Link href="/" passHref>
          <FeaturedContent
            onHoverStart={() => setHovered(!hovered)}
            onHoverEnd={() => setHovered(!hovered)}
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={() => onCursor("")}
          >
            <Flex spaceBetween>
              <h3>Featured Project</h3>
              <motion.div
                className="meta"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
              >
                <h3>PEI Seafood</h3>
                <h3>2019</h3>
              </motion.div>
            </Flex>
            <h2 className="featured-title">
              NOT <br />
              HUMBLE
              <span className="arrow">
                <motion.svg
                  animate={{ x: hovered ? 48 : 0 }}
                  transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 101 57"
                >
                  <path
                    d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                    fill="#FFF"
                    fillRule="evenodd"
                  ></path>
                </motion.svg>
              </span>
            </h2>
          </FeaturedContent>
        </Link>
        <Link href="/" passHref>
          <FeaturedVideo>
            {/* <ReactPlayer
              url="https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641847955/efpjgjnmgfobpxt2njwu.mp4"
              width="100%"
              height="100%"
              loop
              playing
            /> */}
            <video
              src="https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641847955/efpjgjnmgfobpxt2njwu.mp4"
              loop
              autoPlay
            />
          </FeaturedVideo>
        </Link>
      </Container>
      <Container>
        <FeaturedProjects>
          <Flex flexEnd>
            <button>
              <span>All Projects</span>
            </button>
          </Flex>
        </FeaturedProjects>
      </Container>
    </HomeFeaturedSection>
  );
};
