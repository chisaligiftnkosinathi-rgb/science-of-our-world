export type AppLanguage = "en" | "zu" | "ss";

export interface TermTranslation {
  en: string;
  zu: string;
  ss: string;
  explanation: string;
}

export const SCIENTIFIC_TERMS_I18N: Record<string, TermTranslation> = {
  sun: {
    en: "Sun",
    zu: "Ilanga",
    ss: "Lilanga",
    explanation: "Primary source of radiant photon energy for all biospheres on Earth.",
  },
  water: {
    en: "Water",
    zu: "Amanzi",
    ss: "Ematse",
    explanation: "Universal solvent cycling continuously through evaporation, condensation, and precipitation.",
  },
  earth: {
    en: "Earth",
    zu: "Umhlaba",
    ss: "Umhlaba",
    explanation: "Our approximately closed system for matter, open system for solar energy.",
  },
  soil: {
    en: "Soil",
    zu: "Umhlabathi",
    ss: "Umhlabatsi",
    explanation: "Living matrix of weathered minerals and recycled organic humus.",
  },
  energy: {
    en: "Energy",
    zu: "Amandla",
    ss: "Emandla",
    explanation: "The capacity to perform physical work; conserved in all reactions.",
  },
  plant: {
    en: "Plant (Producer)",
    zu: "Isitshalo (Umenzi wokudla)",
    ss: "Sihlalo (Umenti wekudla)",
    explanation: "Autotroph converting solar photons into chemical glucose bonds.",
  },
  animal: {
    en: "Animal (Consumer)",
    zu: "Isilwane (Umdli)",
    ss: "Silwane (Umdli)",
    explanation: "Heterotroph that consumes other organisms for biochemical energy and carbon.",
  },
  rain: {
    en: "Rain",
    zu: "Imvula",
    ss: "Imvula",
    explanation: "Freshwater precipitation from condensed atmospheric water vapor.",
  },
  decomposer: {
    en: "Decomposer",
    zu: "Umbolisi",
    ss: "Umbolisi",
    explanation: "Fungi and bacteria that recycle dead organic matter into mineral nutrients.",
  },
  tree: {
    en: "Tree",
    zu: "Isihlahla",
    ss: "Sihlahla",
    explanation: "Perennial woody plant supporting complex vertical micro-ecosystems.",
  },
  fire: {
    en: "Fire",
    zu: "Umlilo",
    ss: "Umlilo",
    explanation: "Rapid chemical oxidation releasing heat, vital for renewing Grassland and Fynbos biomes.",
  },
  wind: {
    en: "Wind / Air",
    zu: "Umoya",
    ss: "Umoya",
    explanation: "Atmospheric convection currents driven by uneven solar thermal heating.",
  },
};

export const UI_I18N: Record<string, Record<AppLanguage, string>> = {
  courseTitle: {
    en: "Science of Our World",
    zu: "Isayensi Yomhlaba Wethu",
    ss: "Isayensi Yemhlaba Wetfu",
  },
  tagline: {
    en: "Young Scientist Systems & Discovery",
    zu: "Uhlelo Lwabasebancane Lokuhlola Isayensi",
    ss: "Luhlelo Lwebancane Lwekuhlola Isayensi",
  },
  offlineBadge: {
    en: "Offline Ready",
    zu: "Kusebenza Ngaphandle Kwe-inthanethi",
    ss: "Kusebenta Ngaphandle Kwe-inthanethi",
  },
  onlineBadge: {
    en: "Online & Synced",
    zu: "Kuxhumekile & Kulungisiwe",
    ss: "Kuxhumekile & Kulungisiwe",
  },
  localScience: {
    en: "🇿🇦 South African Ecosystems",
    zu: "🇿🇦 Imvelo YaseNingizimu Afrika",
    ss: "🇿🇦 Imvelo YaseNingizimu Afrika",
  },
  capsCurriculum: {
    en: "🇿🇦 CAPS Curriculum Map",
    zu: "🇿🇦 Uhlelo Lwezifundo lwe-CAPS",
    ss: "🇿🇦 Luhlelo Lwetifundvo lwe-CAPS",
  },
  scientistProfile: {
    en: "Scientist Profile",
    zu: "Iphrofayili Kasosayensi",
    ss: "Iphrofayili Yasosayensi",
  },
  installApp: {
    en: "Install Offline App",
    zu: "Faka Uhlelo Lokusebenza (PWA)",
    ss: "Faka Luhlelo Lwekusebenta (PWA)",
  },
  guestMode: {
    en: "Guest Scientist (100% Offline / Private)",
    zu: "Usosayensi Oyisivakashi (Kuphephile)",
    ss: "Usosayensi Loyisivakashi (Kuphephile)",
  },
  observe: {
    en: "Observe",
    zu: "Buka ngokucophelela",
    ss: "Buka ngekucophelela",
  },
  predict: {
    en: "Predict",
    zu: "Qagela",
    ss: "Gagela",
  },
  measure: {
    en: "Measure",
    zu: "Kala",
    ss: "Kala",
  },
};
