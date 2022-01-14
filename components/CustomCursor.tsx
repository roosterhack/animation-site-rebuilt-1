import { cursorTypeState } from "atoms/cursorTypeAtom";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Cursor } from "styles/globalStyles";

interface CustomCursorProps {
  toggleMenu: boolean;
}

export const CustomCursor = ({ toggleMenu }: CustomCursorProps) => {
  const cursorType = useRecoilValue(cursorTypeState).type;
  const cursor: any = useRef(null);

  const onMouseMove = (e: { pageX: number; pageY: number }) => {
    const { clientX, clientY }: any = e;
    cursor.current.style.left = `${clientX}px`;
    cursor.current.style.top = `${clientY}px`;
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
        ref={cursor}
      />
    </>
  );
};
