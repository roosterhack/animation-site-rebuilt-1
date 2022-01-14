import { themeState } from "atoms/themeAtom";
import { useWindowSize } from "hooks/useWindowSize";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import {
  Banner,
  BannerTitle,
  Canvas,
  Headline,
  Video,
} from "styles/homePageStyles";
import ReactPlayer from "react-player/lazy";
import { useCursor } from "hooks/useCursor";

export const HomeBanner = () => {
  const { onCursor } = useCursor();
  let canvas = useRef<any>(null);
  const currentTheme = useRecoilValue(themeState);
  const size = useWindowSize();

  useEffect(() => {
    let renderingElement = canvas.current;
    // create an offscreen canvas only for the drawings

    let drawingElement = renderingElement.cloneNode();
    let drawingCtx = drawingElement.getContext("2d");
    let renderingCtx = renderingElement.getContext("2d");
    let lastX: number;
    let lastY: number;
    let moving = false;

    renderingCtx.globalCompositeOperation = "source-over";
    renderingCtx.fillStyle = currentTheme === "dark" ? "#000000" : "#ffffff";
    renderingCtx.fillRect(0, 0, size.width, size.height);

    renderingElement.addEventListener(
      "mouseover",
      (ev: { pageX: number; pageY: number }) => {
        moving = true;
        lastX = ev.pageX - renderingElement.offsetLeft;
        lastY = ev.pageY - renderingElement.offsetTop;
      }
    );

    renderingElement.addEventListener(
      "click",
      (ev: { pageX: number; pageY: number }) => {
        moving = true;
        lastX = ev.pageX - renderingElement.offsetLeft;
        lastY = ev.pageY - renderingElement.offsetTop;
      }
    );

    renderingElement.addEventListener(
      "mouseup",
      (ev: { pageX: number; pageY: number }) => {
        moving = false;
        lastX = ev.pageX - renderingElement.offsetLeft;
        lastY = ev.pageY - renderingElement.offsetTop;
      }
    );

    renderingElement.addEventListener(
      "mousemove",
      (ev: { pageX: number; pageY: number }) => {
        if (moving) {
          drawingCtx.globalCompositeOperation = "source-over";
          renderingCtx.globalCompositeOperation = "destination-out";
          let currentX = ev.pageX - renderingElement.offsetLeft;
          let currentY = ev.pageY - renderingElement.offsetTop;
          drawingCtx.lineJoin = "round";
          drawingCtx.moveTo(lastX, lastY);
          drawingCtx.lineTo(currentX, currentY);
          drawingCtx.closePath();
          drawingCtx.lineWidth = 120;
          drawingCtx.stroke();
          lastX = currentX;
          lastY = currentY;
          renderingCtx.drawImage(drawingElement, 0, 0);
        }
      }
    );
  }, [currentTheme, size.height, size.width]);

  const container = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <Banner>
      <Video>
        {/* <video
          width="100%"
          height="100%"
          autoPlay
          loop
          src="https://res.cloudinary.com/dwkgq1cl5/video/upload/ac_none,q_auto:good,vc_h264/v1641899971/uohieagyslyputmihuam.mp4"
        /> */}

        <ReactPlayer
          url="https://res.cloudinary.com/dwkgq1cl5/video/upload/v1641901489/gdm53rmpxu35d3scqlbk.mp4"
          width="100%"
          height="100%"
          loop
          playing
        />
      </Video>
      <Canvas
        width={size.width}
        height={size.height}
        ref={canvas}
        onMouseEnter={() => onCursor("hovered")}
        onMouseLeave={() => onCursor("")}
      />
      <BannerTitle variants={container} initial="initial" animate="animate">
        <Headline variants={item}>DIG</Headline>
        <Headline variants={item}>DEEP</Headline>
      </BannerTitle>
    </Banner>
  );
};
