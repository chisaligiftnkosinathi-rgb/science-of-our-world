import { SystemEnginePreset } from "../types";
import { REALITY_MODEL_MAP } from "./realityModelData";

export const SYSTEM_ENGINE_PRESETS: SystemEnginePreset[] = [
  {
    id: "ecosystem",
    name: "Living Ecosystem System",
    icon: "🌱",
    category: "BIOLOGY & ECOLOGY",
    tagline: "Energy flows, matter cycles, and populations self-regulate.",
    systemName: "Forest & Grassland Ecological Web",
    epistemology: REALITY_MODEL_MAP.ecosystem,
    systemDescription:
      "A nested biological system where solar photons are fixed by plants, consumed by herbivores, regulated by predators, and recycled by soil microbes.",
    inputs: [
      {
        name: "Sunlight Flux",
        icon: "☀️",
        unit: "%",
        value: 80,
        min: 10,
        max: 100,
        step: 5,
        description: "Radiant solar photons providing raw thermodynamic energy for chloroplasts.",
      },
      {
        name: "Rainfall & Moisture",
        icon: "💧",
        unit: "%",
        value: 70,
        min: 10,
        max: 100,
        step: 5,
        description: "Water input essential for photosynthesis, sap transport, and cell turgor.",
      },
      {
        name: "Herbivore Density",
        icon: "🐇",
        unit: "count",
        value: 40,
        min: 5,
        max: 100,
        step: 5,
        description: "Primary consumers (rabbits, deer) eating plants for metabolic carbohydrates.",
      },
      {
        name: "Predator Density",
        icon: "🦊",
        unit: "count",
        value: 15,
        min: 1,
        max: 50,
        step: 1,
        description: "Secondary consumers (foxes, hawks) regulating herbivore population booms.",
      },
    ],
    processes: [
      {
        name: "Photosynthesis",
        icon: "🍃",
        description: "Producers capture sunlight + CO₂ + water to synthesize glucose and release O₂.",
        formula: "6CO₂ + 6H₂O + light ➔ C₆H₁₂O₆ + 6O₂",
      },
      {
        name: "Herbivory & Predation",
        icon: "⚡",
        description: "Trophic transfer of chemical energy between producers, consumers, and apex predators.",
      },
      {
        name: "Soil Nutrient Recycling",
        icon: "🍄",
        description: "Fungi and bacteria decompose organic waste into nitrogen and phosphorus minerals.",
      },
    ],
    outputs: [
      {
        name: "Plant Biomass",
        icon: "🌾",
        unit: "kg/m²",
        description: "Total living plant matter produced and sustained.",
        calculate: (inputs) => {
          const sun = inputs["Sunlight Flux"] || 80;
          const rain = inputs["Rainfall & Moisture"] || 70;
          const herbivores = inputs["Herbivore Density"] || 40;
          const growth = (sun * 0.6 + rain * 0.4) * 0.8;
          const grazed = herbivores * 0.45;
          return Math.max(5, Number((growth - grazed + 15).toFixed(1)));
        },
      },
      {
        name: "Oxygen Production",
        icon: "🫧",
        unit: "kg/day",
        description: "Clean O₂ released to the atmosphere by active vegetation.",
        calculate: (inputs) => {
          const sun = inputs["Sunlight Flux"] || 80;
          const rain = inputs["Rainfall & Moisture"] || 70;
          return Number(((sun * 0.55 + rain * 0.45) * 1.8).toFixed(1));
        },
      },
      {
        name: "Ecosystem Stability",
        icon: "⚖️",
        unit: "%",
        description: "Balance between food availability and predator pressures.",
        calculate: (inputs) => {
          const herbivores = inputs["Herbivore Density"] || 40;
          const predators = inputs["Predator Density"] || 15;
          const ratio = herbivores / (predators * 2.5);
          const score = Math.max(10, Math.min(100, 100 - Math.abs(ratio - 1) * 60));
          return Number(score.toFixed(0));
        },
      },
    ],
    feedbackRule:
      "If herbivore count surges too fast, plants are overgrazed, reducing food supply and triggering population self-correction. If predators rise, herbivores decline, stabilizing the plant layer.",
    homeostasisTarget: "Dynamic Predator-Prey Carrying Capacity Equilibrium",
    targetLesson: "food",
  },
  {
    id: "human",
    name: "Human Organism System",
    icon: "🧍",
    category: "PHYSIOLOGY & HUMAN BIOLOGY",
    tagline: "Trillions of cells coordinate to maintain internal balance (Homeostasis).",
    systemName: "Human Open Living Subsystem",
    epistemology: REALITY_MODEL_MAP.human,
    systemDescription:
      "A coordinated network of circulatory, respiratory, digestive, and nervous subsystems exchanging matter and energy with the environment.",
    inputs: [
      {
        name: "Food Calories",
        icon: "🍞",
        unit: "kcal/day",
        value: 2000,
        min: 1000,
        max: 4000,
        step: 100,
        description: "Chemical energy in carbohydrates, proteins, and lipids from diet.",
      },
      {
        name: "Water Intake",
        icon: "💧",
        unit: "L/day",
        value: 2.2,
        min: 0.5,
        max: 5.0,
        step: 0.1,
        description: "Hydration fluid enabling blood circulation, enzymatic reactions, and cooling.",
      },
      {
        name: "Oxygen Supply",
        icon: "🫁",
        unit: "L/min",
        value: 12,
        min: 5,
        max: 35,
        step: 1,
        description: "Atmospheric oxygen inhaled via lungs to fuel cellular respiration.",
      },
      {
        name: "Activity Level",
        icon: "🏃",
        unit: "% effort",
        value: 30,
        min: 0,
        max: 100,
        step: 5,
        description: "Musculoskeletal exertion (resting, walking, intense athletics).",
      },
    ],
    processes: [
      {
        name: "Cellular Respiration (ATP Synthesis)",
        icon: "⚡",
        description: "Mitochondria combine glucose with oxygen to synthesize ATP chemical energy currency.",
        formula: "Glucose + O₂ ➔ CO₂ + H₂O + ATP Energy",
      },
      {
        name: "Thermoregulation & Circulation",
        icon: "❤️",
        description: "Blood vessels dilate and sweat glands activate to dissipate surplus metabolic heat.",
      },
      {
        name: "Waste Clearance",
        icon: "🫘",
        description: "Lungs exhale CO₂; kidneys filter nitrogenous metabolic byproducts.",
      },
    ],
    outputs: [
      {
        name: "Body Temperature",
        icon: "🌡️",
        unit: "°C",
        description: "Core internal thermal equilibrium target.",
        calculate: (inputs) => {
          const effort = inputs["Activity Level"] || 30;
          const water = inputs["Water Intake"] || 2.2;
          const sweatEfficiency = Math.min(1.2, water / 2.0);
          const rise = (effort * 0.035) / sweatEfficiency;
          return Number((36.8 + Math.min(1.4, rise)).toFixed(1));
        },
      },
      {
        name: "Heart Pulse Rate",
        icon: "💓",
        unit: "BPM",
        description: "Cardiac speed delivering fuel and oxygen to muscle cells.",
        calculate: (inputs) => {
          const effort = inputs["Activity Level"] || 30;
          return Math.round(68 + effort * 0.95);
        },
      },
      {
        name: "Usable Energy (ATP)",
        icon: "🔋",
        unit: "%",
        description: "Immediate muscular and cognitive stamina availability.",
        calculate: (inputs) => {
          const cal = inputs["Food Calories"] || 2000;
          const o2 = inputs["Oxygen Supply"] || 12;
          const effort = inputs["Activity Level"] || 30;
          const stamina = Math.min(100, (cal / 2200) * 50 + (o2 / 15) * 40 - effort * 0.2);
          return Number(Math.max(15, stamina).toFixed(0));
        },
      },
    ],
    feedbackRule:
      "When muscles work hard, body temperature and CO₂ rise. The brain instantly commands deeper breathing and heart acceleration to maintain 37.0°C and 7.4 pH balance.",
    homeostasisTarget: "37.0°C Core Temp & Optimal Cellular Oxygenation",
    targetLesson: "human",
  },
  {
    id: "circuit",
    name: "Electrical Circuit System",
    icon: "⚡",
    category: "PHYSICS & ELECTROMAGNETISM",
    tagline: "Voltage drives charges through closed loops, producing light, heat, and motion.",
    systemName: "Closed Loop DC Electrical Circuit",
    epistemology: REALITY_MODEL_MAP.circuit,
    systemDescription:
      "A physical circuit where battery chemical potential drives electron drift through conductive copper wires to do work at load components.",
    inputs: [
      {
        name: "Battery Voltage",
        icon: "🔋",
        unit: "Volts (V)",
        value: 12,
        min: 1.5,
        max: 24,
        step: 1.5,
        description: "Electrical potential difference pushing free electrons.",
      },
      {
        name: "Wire Resistance",
        icon: "〰️",
        unit: "Ohms (Ω)",
        value: 4,
        min: 1,
        max: 20,
        step: 1,
        description: "Resistance in circuit components opposing electron flow.",
      },
      {
        name: "Switch State",
        icon: "🔒",
        unit: "closed/open",
        value: 1,
        min: 0,
        max: 1,
        step: 1,
        description: "1 = Closed circuit (complete path), 0 = Open circuit (broken loop).",
      },
    ],
    processes: [
      {
        name: "Ohm's Law Drift",
        icon: "📐",
        description: "Electric current is directly proportional to voltage and inversely proportional to resistance.",
        formula: "Current (I) = Voltage (V) ÷ Resistance (R)",
      },
      {
        name: "Electrical Energy Transformation",
        icon: "💡",
        description: "Kinetic energy of drifting electrons is transformed into photon emission (light) and thermal energy (heat).",
        formula: "Power (P) = V × I = I² × R",
      },
    ],
    outputs: [
      {
        name: "Current Flow (I)",
        icon: "⚡",
        unit: "Amperes (A)",
        description: "Rate of electric charge passing through the wire.",
        calculate: (inputs) => {
          const v = inputs["Battery Voltage"] || 12;
          const r = inputs["Wire Resistance"] || 4;
          const sw = inputs["Switch State"] !== undefined ? inputs["Switch State"] : 1;
          if (sw === 0) return 0;
          return Number((v / r).toFixed(2));
        },
      },
      {
        name: "Lamp Brightness",
        icon: "💡",
        unit: "Lumens",
        description: "Photons emitted by the glowing filament or LED.",
        calculate: (inputs) => {
          const v = inputs["Battery Voltage"] || 12;
          const r = inputs["Wire Resistance"] || 4;
          const sw = inputs["Switch State"] !== undefined ? inputs["Switch State"] : 1;
          if (sw === 0) return 0;
          const power = (v * v) / r;
          return Math.round(power * 14);
        },
      },
      {
        name: "Thermal Dissipation",
        icon: "🔥",
        unit: "Watts",
        description: "Heat energy radiated into surrounding air.",
        calculate: (inputs) => {
          const v = inputs["Battery Voltage"] || 12;
          const r = inputs["Wire Resistance"] || 4;
          const sw = inputs["Switch State"] !== undefined ? inputs["Switch State"] : 1;
          if (sw === 0) return 0;
          return Number(((v * v) / r).toFixed(1));
        },
      },
    ],
    feedbackRule:
      "Opening the switch breaks the loop, instantaneously dropping current to zero everywhere. Increasing resistance reduces current while maintaining total energy conservation.",
    homeostasisTarget: "Stable Ohm's Law Circuit Equilibrium",
    targetLesson: "electricity",
  },
  {
    id: "earth_system",
    name: "Planet Earth Mega-System",
    icon: "🌍",
    category: "EARTH & CLIMATE SCIENCE",
    tagline: "4 nested spheres exchanging heat, matter, and chemical elements.",
    systemName: "Earth 4-Sphere Thermodynamic Super-System",
    epistemology: REALITY_MODEL_MAP.earth_system,
    systemDescription:
      "Atmosphere (air), Hydrosphere (water), Geosphere (rock/soil), and Biosphere (life) operating as one unified planetary heat engine.",
    inputs: [
      {
        name: "Solar Irradiance",
        icon: "☀️",
        unit: "% base",
        value: 100,
        min: 80,
        max: 120,
        step: 2,
        description: "Baseline radiant heat arriving at the top of Earth's atmosphere.",
      },
      {
        name: "Greenhouse Gas Level",
        icon: "🌫️",
        unit: "PPM eq",
        value: 420,
        min: 280,
        max: 600,
        step: 10,
        description: "CO₂, methane, and water vapor trapping outgoing infrared radiation.",
      },
      {
        name: "Global Vegetation Cover",
        icon: "🌲",
        unit: "% land",
        value: 35,
        min: 10,
        max: 60,
        step: 2,
        description: "Forest and grassland area fixing carbon and transpiring moisture.",
      },
    ],
    processes: [
      {
        name: "Hydrological Water Cycle",
        icon: "💧",
        description: "Ocean evaporation ➔ Atmospheric cloud condensation ➔ Terrestrial precipitation ➔ River return.",
      },
      {
        name: "Planetary Carbon Cycle",
        icon: "🌱",
        description: "CO₂ fixed by photosynthesis, dissolved in oceans, and stored in rock carbonate reservoirs.",
      },
      {
        name: "Thermal Energy Redistribution",
        icon: "🌬️",
        description: "Atmospheric jet streams and ocean conveyor currents transporting equatorial heat to polar regions.",
      },
    ],
    outputs: [
      {
        name: "Mean Surface Temp",
        icon: "🌡️",
        unit: "°C",
        description: "Global average surface temperature envelope.",
        calculate: (inputs) => {
          const solar = inputs["Solar Irradiance"] || 100;
          const ghg = inputs["Greenhouse Gas Level"] || 420;
          const base = 15.0;
          const ghgDelta = ((ghg - 280) / 140) * 1.1;
          const solarDelta = ((solar - 100) / 10) * 0.8;
          return Number((base + ghgDelta + solarDelta).toFixed(1));
        },
      },
      {
        name: "Hydrological Flux Rate",
        icon: "🌧️",
        unit: "% normal",
        description: "Global precipitation and evaporation circulation intensity.",
        calculate: (inputs) => {
          const solar = inputs["Solar Irradiance"] || 100;
          const ghg = inputs["Greenhouse Gas Level"] || 420;
          return Math.round((solar * 0.6 + (ghg / 420) * 40));
        },
      },
      {
        name: "Biosphere Health Index",
        icon: "🌿",
        unit: "/100",
        description: "Ecosystem resilience and global biomass stability.",
        calculate: (inputs) => {
          const veg = inputs["Global Vegetation Cover"] || 35;
          const ghg = inputs["Greenhouse Gas Level"] || 420;
          const score = veg * 2.1 - Math.max(0, (ghg - 450) * 0.15);
          return Math.max(20, Math.min(100, Math.round(score + 25)));
        },
      },
    ],
    feedbackRule:
      "Warm air holds more water vapor (a greenhouse gas), accelerating warming (positive feedback), but also increases cloud albedo reflecting sunlight back to space (negative feedback).",
    homeostasisTarget: "Habitable Global Climate Envelope (14°C - 16°C)",
    targetLesson: "earth",
  },
];
