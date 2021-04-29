type TColorVariants = {
  main: string;
  accent: string;
};
export type TTheme = {
  colors: {
    primary: TColorVariants;
    secondary: TColorVariants;
    font: TColorVariants;
    paper: string;
    layout: string;
    elevate: string;
    border: TColorVariants;
  };
};
