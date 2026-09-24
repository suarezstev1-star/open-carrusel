export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
}

export interface BrandFonts {
  heading: string;
  body: string;
}

export interface CustomFont {
  name: string;
  path: string;
}

export interface BrandConfig {
  name: string;
  colors: BrandColors;
  fonts: BrandFonts;
  customFonts: CustomFont[];
  logoPath: string | null;
  styleKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_BRAND: BrandConfig = {
  name: "Steven Suárez · Seguros de Vida",
  colors: {
    primary: "#EE2927",
    secondary: "#0E0E0F",
    accent: "#BA8A44",
    background: "#FAF6ED",
    surface: "#FFFDF8",
  },
  fonts: {
    heading: "Anton",
    body: "Montserrat",
  },
  customFonts: [],
  logoPath: null,
  styleKeywords: ["plano técnico marfil", "marcos dorados", "titulares 3D rojo y blanco", "pantallas negras con borde dorado"],
  createdAt: "",
  updatedAt: "",
};
