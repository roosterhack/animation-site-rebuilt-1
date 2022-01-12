import { cursorTypeState } from "atoms/cursorTypeAtom";
import { useRecoilState } from "recoil";

export const useCursor = () => {
  const [cursor, setCursor] = useRecoilState(cursorTypeState);

  const onCursor = (cursorType: any) => {
    cursorType = (cursor.styles.includes(cursorType) && cursorType) || false;
    setCursor({ type: cursorType, styles: cursor.styles });
  };

  return {
    onCursor,
  };
};
