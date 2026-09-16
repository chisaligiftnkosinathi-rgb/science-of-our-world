import { RealityModelEvidence } from "../types";

export const REALITY_MODEL_MAP: Record<string, RealityModelEvidence> = {
  ecosystem: {
    reality:
      "A real forest or meadow contains millions of organisms spanning bacteria, fungi, insects, plants, birds, and mammals, influenced by shifting weather, soil microbes, seasons, wind, and microclimates.",
    model:
      "We simplify the ecosystem into 4 manageable components: Sunlight Flux, Rainfall, Herbivore Density, and Predator Density, calculating biomass and stability.",
    whySimplify:
      "If we included all 10,000 species at once, the mathematical equations would be too chaotic to see cause-and-effect. Simplifying lets us isolate the predator-prey feedback loop clearly.",
    evidence:
      "Field ecologists measure real tree ring widths, satellite green-canopy NDVI data, and wildlife camera tracking counts to check if real forests follow the model's population oscillation curves.",
    explanation:
      "Energy flows in one direction (radiant solar ➔ chemical glucose ➔ metabolic heat) while matter cycles continuously. Negative feedback loops stabilize populations around carrying capacity.",
  },
  human: {
    reality:
      "Your real body contains 37 trillion cells, hundreds of hormones, immune cascades, genetic variations, trillions of microbiome bacteria, and complex organ crosstalk.",
    model:
      "We model the body as an open thermodynamic system balancing Food Calories, Hydration, Oxygen, and Physical Exertion to regulate Core Temperature, Heart Rate, and ATP.",
    whySimplify:
      "Isolating energy intake, gas exchange, and thermal dissipation allows learners to directly witness how homeostasis maintains life without getting lost in biochemical minutiae.",
    evidence:
      "Pulse oximeters, metabolic cart breath analyzers (measuring VO₂ and VCO₂), core thermal sensors, and blood lactate tests confirm that human physiology adjusts cardiac output and sweating in direct proportion to muscular exertion.",
    explanation:
      "Mitochondria use glucose and O₂ to synthesize ATP. Cellular work generates metabolic heat; the hypothalamus triggers autonomic negative feedback (sweating, vasodilation) to lock core temperature near 37°C.",
  },
  circuit: {
    reality:
      "In a real physical wire, sextillions (10²²) of quantum electrons bounce through vibrating metallic crystal lattices with electromagnetic fields propagating along transmission lines at near the speed of light.",
    model:
      "We use classical DC Circuit Theory (Ohm's Law: I = V / R) treating current as a uniform fluid drift through an idealized continuous closed loop.",
    whySimplify:
      "Quantum electrodynamics is unnecessary for engineering circuits. Ohm's macro-model accurately predicts lamp brightness, current draw, and power dissipation with elementary math.",
    evidence:
      "Laboratory digital multimeters and oscilloscopes confirm that measured amperes and voltage drops match Ohm's Law (V = IR) and Joule heating (P = I²R) within tiny measurement tolerances.",
    explanation:
      "Voltage creates an electric potential gradient that exerts Coulomb electrostatic force on free conduction electrons, driving them through the resistor where collisions convert kinetic electrical energy into light and thermal heat.",
  },
  earth_system: {
    reality:
      "Planet Earth is an immense, chaotic spherical heat engine with turbulent jet streams, ocean thermal conveyor belts, tectonic volcanic outgassing, and living biogeochemical cycles spanning billions of square kilometers.",
    model:
      "We model Earth as a 4-Sphere coupled heat engine balancing Solar Irradiance, Atmospheric Greenhouse Gas Concentrations, and Global Vegetation Cover to calculate Surface Temperature and Hydrological Flux.",
    whySimplify:
      "A full Navier-Stokes climate supercomputer model takes weeks to calculate. Our simplified energy-balance model makes global thermodynamic feedback loops directly intuitive in real-time.",
    evidence:
      "NASA satellite infrared radiometers (CERES), Antarctic ice core carbon bubbles, and ocean buoy temperature networks (Argo floats) provide empirical ground-truth verifying planetary radiative balance.",
    explanation:
      "Incoming shortwave solar photons warm Earth's surface; Earth radiates longwave infrared back out to space. Greenhouse gases absorb and re-emit infrared, acting as a thermal blanket that establishes global thermodynamic equilibrium.",
  },
  systems: {
    reality:
      "Natural systems are open, nested networks where every sub-component exchanges matter, energy, and information with adjacent systems across space and time.",
    model:
      "The Universal 6-Stage System Pipeline: Inputs ➔ System Boundary ➔ Internal Processes ➔ Outputs ➔ Feedback Loops ➔ Equilibrium.",
    whySimplify:
      "By identifying inputs, transformations, and outputs, scientists can analyze any system — from a single living cell to a planetary climate — using one universal conceptual toolkit.",
    evidence:
      "Systems engineering, control theory, and ecological field studies repeatedly show that self-regulating systems display predictable feedback behavior, threshold tipping points, and damping.",
    explanation:
      "Systems maintain local order and low entropy by taking in free energy from their environment, converting it to work, and exporting higher entropy heat.",
  },
  energy: {
    reality:
      "Energy manifests across cosmological, quantum, and mechanical scales — nuclear fusion inside stars, gravitational waves, thermal vibration of atoms, and photon electromagnetic fields.",
    model:
      "Conservation of Energy: Energy cannot be created or destroyed, only transformed between potential, kinetic, radiant, thermal, and chemical states.",
    whySimplify:
      "Tracking total Joules across transformations lets us calculate exactly how much work a system can perform and where energy dissipates as waste heat.",
    evidence:
      "Calorimeter experiments, James Prescott Joule's mechanical heat apparatus, and nuclear mass-defect measurements all confirm total energy conservation to absolute precision.",
    explanation:
      "According to Noether's Theorem in physics, the Law of Conservation of Energy is the direct mathematical consequence of the time-translation symmetry of physical laws across the universe.",
  },
  food: {
    reality:
      "Natural food webs are dense, entangled networks with omnivores, scavengers, parasites, and seasonal dietary shifts across thousands of species.",
    model:
      "A stepped Trophic Chain (Producers ➔ Herbivores ➔ Predators ➔ Apex ➔ Decomposers) with an educational ~10% rule-of-thumb energy transfer between levels.",
    whySimplify:
      "A linear trophic chain illustrates the thermodynamic constraint on food webs: why top predators are always rare compared to abundant green plants.",
    evidence:
      "Raymond Lindeman's classic ecological measurements of Cedar Bog Lake and modern ecosystem biomass pyramids prove that available chemical energy drops dramatically at each successive trophic tier.",
    explanation:
      "Organisms use the majority of consumed food energy for their own cellular respiration, muscle locomotion, and body heat, leaving only a fraction of biomass available for the next consumer level.",
  },
  chemistry: {
    reality:
      "Chemical bonds involve complex quantum wavefunctions, electron probability clouds (orbitals), resonance hybridization, and dynamic thermal collisions.",
    model:
      "Ball-and-stick atomic models with valence electron sharing (covalent bonds) and transfer (ionic bonds) obeying the Law of Conservation of Mass.",
    whySimplify:
      "Representing atoms as spheres with specific bonding rules lets chemists predict molecular structures, reaction stoichiometry, and chemical properties without solving Schrödinger wave equations.",
    evidence:
      "Antoine Lavoisier's sealed flask combustion experiments, X-ray crystallography, and mass spectrometry prove that atoms are never destroyed during reactions — they simply rearrange into new molecules.",
    explanation:
      "Atoms bond to achieve stable, lower-energy valence electron configurations. The total number and mass of elemental nuclei remain constant during chemical reactions.",
  },
  laws: {
    reality:
      "The universe operates through fundamental quantum forces, space-time curvature, and thermodynamic probabilities across 13.8 billion years.",
    model:
      "Scientific Laws and Theories: Mathematical equations (e.g. F = ma, V = IR, E = mc²) and explanatory frameworks tested through controlled experimentation.",
    whySimplify:
      "Scientific models distill universal invariants — patterns that remain true regardless of who is testing them or where in the universe they occur.",
    evidence:
      "Centuries of reproducible, peer-reviewed experiments, astronomical observations of distant galaxies, and modern particle accelerator collisions.",
    explanation:
      "The universe is governed by consistent, mathematically describable fundamental physical laws that human reason and empirical evidence can uncover.",
  },
};

export const CUSTOM_BUILDER_STARTER_PRESETS = [
  {
    id: "plant",
    name: "A Living Houseplant",
    icon: "🪴",
    category: "BOTANY",
    description: "A single autotrophic plant converting light and water into leaves and oxygen.",
    suggestedInputs: [
      { name: "Sunlight (Hours/Day)", icon: "☀️", unit: "hrs", value: 6, min: 0, max: 14, step: 1, description: "Hours of direct window light" },
      { name: "Watering Frequency", icon: "💧", unit: "ml/wk", value: 250, min: 0, max: 800, step: 50, description: "Weekly moisture added to soil" },
      { name: "Soil Nutrients", icon: "🌱", unit: "% quality", value: 70, min: 10, max: 100, step: 5, description: "Fertilizer minerals (N, P, K)" },
    ],
    processes: [
      { name: "Chloroplast Photosynthesis", icon: "🍃", description: "Leaf cells capture photons to synthesize glucose.", formula: "Light + CO₂ + H₂O ➔ Sugar + O₂" },
      { name: "Root Nutrient Uptake", icon: "🪵", description: "Osmosis pulls water and dissolved minerals up xylem vessels." },
      { name: "Stomatal Transpiration", icon: "🫧", description: "Leaf pores release water vapor and oxygen gas." },
    ],
    outputs: [
      {
        name: "New Leaf Growth Rate",
        icon: "🌿",
        unit: "mm/week",
        description: "Speed of stem elongation and new leaf sprouting.",
        calculate: (inputs: Record<string, number>) => {
          const sun = inputs["Sunlight (Hours/Day)"] || 6;
          const water = inputs["Watering Frequency"] || 250;
          const nut = inputs["Soil Nutrients"] || 70;
          // Overwatering or underwatering hurts
          const waterScore = Math.max(0, 100 - Math.abs(water - 300) * 0.3);
          const growth = (sun * 1.5) * (waterScore / 100) * (nut / 100) * 3.5;
          return Number(Math.max(0, growth).toFixed(1));
        },
      },
      {
        name: "Oxygen Exhaled",
        icon: "🫧",
        unit: "L/day",
        description: "Fresh oxygen gas released into the room.",
        calculate: (inputs: Record<string, number>) => {
          const sun = inputs["Sunlight (Hours/Day)"] || 6;
          const water = inputs["Watering Frequency"] || 250;
          return Number((sun * 0.4 * Math.min(1.2, water / 200)).toFixed(2));
        },
      },
      {
        name: "Plant Health Score",
        icon: "💚",
        unit: "/100",
        description: "Overall vitality and leaf turgor pressure.",
        calculate: (inputs: Record<string, number>) => {
          const sun = inputs["Sunlight (Hours/Day)"] || 6;
          const water = inputs["Watering Frequency"] || 250;
          const waterScore = Math.max(0, 100 - Math.abs(water - 300) * 0.35);
          const sunScore = Math.max(0, 100 - Math.abs(sun - 7) * 12);
          return Math.round(waterScore * 0.5 + sunScore * 0.5);
        },
      },
    ],
    feedbackRule: "If underwatered, leaf stomata close to save moisture, slowing photosynthesis and oxygen release until rain returns.",
    homeostasisTarget: "Leaf Turgor & Hydration Equilibrium",
  },
  {
    id: "campfire",
    name: "A Campfire (Combustion)",
    icon: "🔥",
    category: "CHEMISTRY & THERMODYNAMICS",
    description: "A thermal chemical system transforming wood fuel and oxygen into radiant heat, light, and smoke.",
    suggestedInputs: [
      { name: "Dry Wood Fuel", icon: "🪵", unit: "kg", value: 5, min: 1, max: 20, step: 1, description: "Cellulose biomass fuel loaded into fire pit" },
      { name: "Oxygen Airflow (Wind)", icon: "🌬️", unit: "m/s", value: 3, min: 0, max: 15, step: 1, description: "Breeze feeding O₂ gas to embers" },
      { name: "Initial Spark Temp", icon: "⚡", unit: "°C", value: 300, min: 50, max: 600, step: 50, description: "Kindling activation energy ignition" },
    ],
    processes: [
      { name: "Thermal Pyrolysis", icon: "♨️", description: "Heat breaks solid wood cellulose into volatile gases." },
      { name: "Rapid Exothermic Oxidation", icon: "💥", description: "Volatile hydrocarbons react with O₂ to release heat photons.", formula: "C₆H₁₀O₅ + 6O₂ ➔ 6CO₂ + 5H₂O + Heat" },
    ],
    outputs: [
      {
        name: "Flame Temperature",
        icon: "🌡️",
        unit: "°C",
        description: "Core combustion temperature of the glowing flames.",
        calculate: (inputs: Record<string, number>) => {
          const wood = inputs["Dry Wood Fuel"] || 5;
          const air = inputs["Oxygen Airflow (Wind)"] || 3;
          if (air > 12) return 150; // Blown out by gale
          return Math.min(1100, Math.round(450 + wood * 25 + air * 40));
        },
      },
      {
        name: "Radiant Heat Output",
        icon: "☀️",
        unit: "Kilowatts (kW)",
        description: "Infrared heat warming anyone sitting nearby.",
        calculate: (inputs: Record<string, number>) => {
          const wood = inputs["Dry Wood Fuel"] || 5;
          const air = inputs["Oxygen Airflow (Wind)"] || 3;
          if (air > 12) return 0.5;
          return Number((wood * 0.8 * (1 + air * 0.15)).toFixed(1));
        },
      },
      {
        name: "Smoke & Ash Rate",
        icon: "💨",
        unit: "g/min",
        description: "Particulate carbon and carbon dioxide released.",
        calculate: (inputs: Record<string, number>) => {
          const wood = inputs["Dry Wood Fuel"] || 5;
          const air = inputs["Oxygen Airflow (Wind)"] || 3;
          const incomplete = Math.max(1, 10 - air * 1.5);
          return Math.round(wood * incomplete * 0.8);
        },
      },
    ],
    feedbackRule: "Higher heat accelerates wood vaporization (positive feedback), but burning through all wood fuel causes self-limiting fuel depletion (negative feedback).",
    homeostasisTarget: "Self-Sustaining Combustion State",
  },
  {
    id: "pond",
    name: "Freshwater Pond Ecosystem",
    icon: "🐸",
    category: "AQUATIC ECOLOGY",
    description: "An aquatic system balancing algae, tadpoles, fish, and dissolved oxygen in water.",
    suggestedInputs: [
      { name: "Solar Light to Water", icon: "☀️", unit: "%", value: 75, min: 10, max: 100, step: 5, description: "Sunlight penetrating water surface" },
      { name: "Agricultural Runoff (Nitrates)", icon: "🧪", unit: "ppm", value: 15, min: 0, max: 100, step: 5, description: "Nutrients entering pond from nearby fields" },
      { name: "Fish Population", icon: "🐟", unit: "count", value: 25, min: 0, max: 80, step: 5, description: "Consumers eating aquatic insects and algae" },
    ],
    processes: [
      { name: "Phytoplankton Bloom", icon: "🦠", description: "Micro-algae multiply using sunlight and dissolved nitrates." },
      { name: "Dissolved Gas Equilibrium", icon: "🫧", description: "Oxygen diffuses across water surface and is produced by aquatic plants." },
      { name: "Benthic Decomposition", icon: "🍂", description: "Bacteria at the muddy pond floor consume organic debris." },
    ],
    outputs: [
      {
        name: "Dissolved Oxygen (DO)",
        icon: "🫧",
        unit: "mg/L",
        description: "Oxygen available for fish and frogs to breathe under water.",
        calculate: (inputs: Record<string, number>) => {
          const sun = inputs["Solar Light to Water"] || 75;
          const nitrates = inputs["Agricultural Runoff (Nitrates)"] || 15;
          const fish = inputs["Fish Population"] || 25;
          // Too many nitrates cause eutrophication (algae bloom then rot, crashing DO)
          const base = 8.5 + sun * 0.02;
          const rotPenalty = nitrates > 40 ? (nitrates - 40) * 0.15 : 0;
          const fishDemand = fish * 0.04;
          return Number(Math.max(1.0, base - rotPenalty - fishDemand).toFixed(1));
        },
      },
      {
        name: "Water Clarity",
        icon: "💎",
        unit: "Secchi Depth (cm)",
        description: "How deep you can see through the clear water.",
        calculate: (inputs: Record<string, number>) => {
          const nitrates = inputs["Agricultural Runoff (Nitrates)"] || 15;
          const sun = inputs["Solar Light to Water"] || 75;
          const algae = (nitrates * 0.6 + sun * 0.3);
          return Math.max(10, Math.round(180 - algae * 1.3));
        },
      },
      {
        name: "Pond Biodiversity Score",
        icon: "🌿",
        unit: "/100",
        description: "Health of frogs, dragonfly larvae, and water lilies.",
        calculate: (inputs: Record<string, number>) => {
          const nitrates = inputs["Agricultural Runoff (Nitrates)"] || 15;
          const fish = inputs["Fish Population"] || 25;
          const doLevel = 8.5 - (nitrates > 40 ? (nitrates - 40) * 0.15 : 0) - fish * 0.04;
          if (doLevel < 4.0) return 20; // Anoxic dead zone!
          const fishScore = Math.max(0, 100 - Math.abs(fish - 30) * 2);
          return Math.round(Math.min(100, doLevel * 8 + fishScore * 0.3));
        },
      },
    ],
    feedbackRule: "Excess nitrate runoff causes explosive algae blooms; when algae dies, decomposing bacteria consume all dissolved oxygen, suffocating fish (Eutrophication).",
    homeostasisTarget: "Balanced Dissolved Oxygen & Trophic Web",
  },
];
