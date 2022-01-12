import { cursorTypeState } from "atoms/cursorTypeAtom";
import { ReactDOM, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Cursor } from "styles/globalStyles";

interface CustomCursorProps {
  toggleMenu: boolean;
}

export const CustomCursor = ({ toggleMenu }: CustomCursorProps) => {
  const cursorType = useRecoilValue(cursorTypeState).type;
  const [mousePosition, setMousePosition] = useState({
    x: 400,
    y: 400,
  });

  console.log(cursorType);

  const onMouseMove = (e: { pageX: number; pageY: number }) => {
    const { pageX: x, pageY: y } = e;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <Cursor
        className={`${!!cursorType ? "hovered" : ""} ${cursorType} ${
          toggleMenu ? "nav-open" : ""
        }`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </>
  );
};
