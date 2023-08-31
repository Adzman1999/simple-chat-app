import { usePreset } from "./PresetStyle";

export const lightMode = (color) => ({
  body: "rgb(255, 255, 255)",
  text: "rgb(1, 4, 9)",
  subtext: "rgb(244, 244, 244)",
  subtitle: "rgb(1, 4, 9)",
  primary: usePreset.map((el) => {
    if (el.preset === color) return el.primary;
  }),
  secondary: usePreset.map((el) => {
    if (el.preset === color) return el.secondary;
  }),
  bg: "rgb(244, 244, 244)",
  hover: usePreset.map((el) => {
    if (el.preset === color) return el.outline;
  }),
});

export const darkMode = (color) => ({
  body: "rgb(1, 4, 9)",
  text: "rgb(244, 244, 244)",
  subtext: "rgb(244, 244, 244)",
  subtitle: "rgb(1, 4, 9)",
  primary: usePreset.map((el) => {
    if (el.preset === color) return el.primary;
  }),
  secondary: usePreset.map((el) => {
    if (el.preset === color) return el.secondary;
  }),
  bg: "rgb(13, 17, 23)",
  hover: () =>
    usePreset.map((el) => {
      if (el.preset === color) return el.outline;
    }),
});
