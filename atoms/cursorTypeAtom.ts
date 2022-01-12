import { atom } from "recoil";

export const cursorTypeState = atom({
  key: "cursorTypeState",
  default: {
    type: false,
    styles: ["pointer", "hovered"],
  },
});
