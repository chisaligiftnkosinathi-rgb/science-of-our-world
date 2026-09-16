export interface SouthAfricanFlora {
  id: string;
  nameEnglish: string;
  nameIsiZulu: string;
  nameSiSwati: string;
  latinName: string;
  icon: string;
  biome: string;
  adaptation: string;
  ecosystemRole: string;
  matterAndEnergyStrategy: string;
}

export interface SouthAfricanBiome {
  id: string;
  name: string;
  localName: string;
  provinces: string[];
  icon: string;
  climate: string;
  rainfallPattern: "Summer rainfall" | "Winter rainfall" | "Year-round";
  solarIrradiance: string;
  keyPlants: string[];
  keyAnimals: string[];
  trophicChain: {
    sunEnergy: string;
    producer: string;
    primaryConsumer: string;
    secondaryConsumer: string;
    apexPredator: string;
    decomposer: string;
  };
  conservationChallenge: string;
  description: string;
}

export interface CapsStrand {
  id: string;
  strandNameEn: string;
  strandNameZu: string;
  grades: {
    grade: string;
    topics: {
      title: string;
      term: string;
      matchingCourseLessons: string[];
      keyConcepts: string[];
    }[];
  }[];
}

export const SOUTH_AFRICAN_FLORA: SouthAfricanFlora[] = [
  {
    id: "marula",
    nameEnglish: "Marula Tree",
    nameIsiZulu: "Umganu",
    nameSiSwati: "Umganu",
    latinName: "Sclerocarya birrea",
    icon: "🌳",
    biome: "Savanna / Bushveld",
    adaptation: "Deep taproots reach deep water tables; thick fire-resistant bark.",
    ecosystemRole: "Fruit produces massive seasonal biomass feeding elephants, baboons, and humans; leaves host emperor moths.",
    matterAndEnergyStrategy: "C3 photosynthesis with high water-use efficiency during hot Bushveld summers.",
  },
  {
    id: "aloe",
    nameEnglish: "Bitter Aloe",
    nameIsiZulu: "Inhlaba",
    nameSiSwati: "Inhlaba",
    latinName: "Aloe ferox",
    icon: "🌵",
    biome: "Eastern Cape & Karoo Thicket",
    adaptation: "Thick fleshy leaves with CAM photosynthesis; stomata open only at night to prevent water loss.",
    ecosystemRole: "Winter-blooming orange nectar provides critical energy for sunbirds (inqomfi) and honeybees.",
    matterAndEnergyStrategy: "CAM mechanism stores CO₂ as malic acid at night; runs photosynthesis during the day with sealed stomata.",
  },
  {
    id: "baobab",
    nameEnglish: "Baobab (Tree of Life)",
    nameIsiZulu: "Isimuku",
    nameSiSwati: "Isimuku",
    latinName: "Adansonia digitata",
    icon: "🌲",
    biome: "Limpopo Valley Savanna",
    adaptation: "Spongy trunk stores up to 120,000 litres of water to survive multi-year droughts.",
    ecosystemRole: "Night-blooming white flowers pollinated by fruit bats; hollow trunks shelter birds, bats, and mammals.",
    matterAndEnergyStrategy: "Deciduous strategy: drops all leaves during dry winter to halt transpiration entirely.",
  },
  {
    id: "rooibos",
    nameEnglish: "Rooibos",
    nameIsiZulu: "I-Rooibos",
    nameSiSwati: "I-Rooibos",
    latinName: "Aspalathus linearis",
    icon: "🌿",
    biome: "Cederberg Fynbos",
    adaptation: "Needle-like leaves reduce wind evaporation; root nodules house symbiotic nitrogen-fixing Rhizobium bacteria.",
    ecosystemRole: "Enriches poor, acidic quartz sandstone soils with nitrogen matter.",
    matterAndEnergyStrategy: "Forms proteoid root clusters to absorb trace phosphorus from nutrient-poor soils.",
  },
  {
    id: "mopane",
    nameEnglish: "Mopane Tree",
    nameIsiZulu: "Umopani",
    nameSiSwati: "Umophani",
    latinName: "Colophospermum mopane",
    icon: "🍃",
    biome: "Lowveld & Limpopo Basin",
    adaptation: "Butterfly-shaped paired leaflets fold together at midday to minimize direct solar heating.",
    ecosystemRole: "Exclusive host plant for Mopane Worms (Gonimbrasia belina), providing major protein transfer across trophic levels.",
    matterAndEnergyStrategy: "Survives poorly drained alkaline soils with high sodium concentrations.",
  },
  {
    id: "sorghum",
    nameEnglish: "Sorghum (African Grain)",
    nameIsiZulu: "Amabele",
    nameSiSwati: "Emaphasi",
    latinName: "Sorghum bicolor",
    icon: "🌾",
    biome: "Grassland & Cultivated Savanna",
    adaptation: "C4 photosynthesis; waxy leaf cuticle and root dormancy during extreme mid-season dry spells.",
    ecosystemRole: "Ancient indigenous staple grain sustaining soil structure and agricultural ecosystems.",
    matterAndEnergyStrategy: "C4 biochemical pathway concentrates CO₂ around RuBisCO, minimizing photorespiration in intense African heat.",
  },
];

export const SOUTH_AFRICAN_BIOMES: SouthAfricanBiome[] = [
  {
    id: "bushveld",
    name: "Savanna & Bushveld",
    localName: "Ihlathi laseSavanna (Lowveld / Kruger)",
    provinces: ["Limpopo", "Mpumalanga", "North West", "KwaZulu-Natal"],
    icon: "🦁",
    climate: "Hot wet summers, dry mild winters",
    rainfallPattern: "Summer rainfall",
    solarIrradiance: "High (~5.5 - 6.5 kWh/m²/day)",
    keyPlants: ["Marula (Umganu)", "Baobab (Isimuku)", "Sweet Thorn (Umunga)", "Red Bushwillow"],
    keyAnimals: ["African Elephant (Indlovu)", "Impala (Inyala)", "Lion (Ibhubesi)", "Dung Beetle (Ibhungane)", "Martial Eagle (UKhozi)"],
    trophicChain: {
      sunEnergy: "100% High Solar Radiation",
      producer: "Marula & Acacia Leaves (Isitshalo)",
      primaryConsumer: "Impala & Zebra (Ezidla utshani)",
      secondaryConsumer: "Spotted Hyena & Leopard (Ezidla inyama)",
      apexPredator: "African Lion (Ibhubesi)",
      decomposer: "Dung Beetles & Soil Fungi (Ababolisi)",
    },
    conservationChallenge: "Poaching, habitat fragmentation, and woody bush encroachment due to altered fire regimes.",
    description: "The largest biome in Southern Africa, characterised by a continuous grassy ground layer and an open upper layer of woody trees.",
  },
  {
    id: "highveld",
    name: "Highveld Grasslands",
    localName: "Amathafa aseHighveld (Grasslands)",
    provinces: ["Gauteng", "Free State", "Mpumalanga", "Eastern Cape"],
    icon: "🌾",
    climate: "Frosty winters, intense summer thunderstorms",
    rainfallPattern: "Summer rainfall",
    solarIrradiance: "Very High (~6.0 kWh/m²/day)",
    keyPlants: ["Themeda triandra (Rooigras)", "Spekboom", "Wild Cosmos", "Bulbous herbs"],
    keyAnimals: ["Black Wildebeest", "Blesbok", "Suricate / Meerkat", "Harvester Termite", "Blue Crane (Indwe)"],
    trophicChain: {
      sunEnergy: "Intense High-Altitude Sunlight",
      producer: "C4 Rooigras Grasslands",
      primaryConsumer: "Harvester Termites & Blesbok",
      secondaryConsumer: "Yellow Mongoose & Meerkat",
      apexPredator: "Black-backed Jackal & Cape Eagle Owl",
      decomposer: "Soil Microbes & Earthworms",
    },
    conservationChallenge: "Coal mining, urban expansion, and heavy agricultural conversion leaving only 2% officially protected.",
    description: "Rolling open plains with virtually no indigenous trees due to severe winter frosts and regular natural fires that renew the grass layer.",
  },
  {
    id: "fynbos",
    name: "Cape Fynbos (Cape Floral Kingdom)",
    localName: "IFynbos yaseKapa",
    provinces: ["Western Cape", "Eastern Cape"],
    icon: "🌺",
    climate: "Mediterranean: wet cool winters, hot dry windy summers",
    rainfallPattern: "Winter rainfall",
    solarIrradiance: "High seasonal variation",
    keyPlants: ["King Protea (Isiphila)", "Rooibos", "Restios (Reeds)", "Ericaceae (Heaths)"],
    keyAnimals: ["Cape Sugarbird", "Orange-breasted Sunbird", "Geometric Tortoise", "Bontebok", "Cape Leopard"],
    trophicChain: {
      sunEnergy: "Winter Rain + Clear Summer Sun",
      producer: "Protea & Erica Nectar & Foliage",
      primaryConsumer: "Cape Sugarbird & Sunbirds (Nectar)",
      secondaryConsumer: "Chameleons & Agama Lizards",
      apexPredator: "Cape Leopard & Verreaux's Eagle",
      decomposer: "Litter Arthropods & Woodlice",
    },
    conservationChallenge: "Invasive alien wattles and pines, climate-driven drought, and unnaturally frequent wildfires.",
    description: "One of Earth's 6 botanical kingdoms located in a single country! Over 9,000 plant species, 69% found nowhere else on Earth.",
  },
  {
    id: "drakensberg",
    name: "Drakensberg Alpine & Wetlands",
    localName: "UKhahlamba (Barrier of Spears)",
    provinces: ["KwaZulu-Natal", "Free State", "Eastern Cape"],
    icon: "⛰️",
    climate: "Sub-alpine: frequent winter snow, cool summer rains",
    rainfallPattern: "Summer rainfall",
    solarIrradiance: "Moderate to high UV flux",
    keyPlants: ["Drakensberg Tufted Grass", "Alpine Protea", "Mountain Sponge Wetland Mosses"],
    keyAnimals: ["Bearded Vulture (Lammergeier)", "Drakensberg Rockjumper", "Mountain Reedbuck", "Ice Rat"],
    trophicChain: {
      sunEnergy: "High UV Alpine Radiation",
      producer: "Montane Sponge Bog Plants",
      primaryConsumer: "Ice Rat & Mountain Grasshoppers",
      secondaryConsumer: "Drakensberg Crag Lizard",
      apexPredator: "Bearded Vulture & Verreaux's Eagle",
      decomposer: "Peatland Benthic Decomposers",
    },
    conservationChallenge: "Over-grazing on mountain slopes and destruction of peat wetland water catchment sponges.",
    description: "South Africa's primary 'water tower' — the high altitude sponge wetlands store rain and feed rivers including the Tugela and Orange (Gariep).",
  },
];

export const CAPS_CURRICULUM_MAPPING: CapsStrand[] = [
  {
    id: "life_living",
    strandNameEn: "Life and Living (CAPS Natural Sciences)",
    strandNameZu: "Izinto Eziphilayo Nezokuhlala",
    grades: [
      {
        grade: "Grade 4",
        topics: [
          {
            title: "Living and Non-living Things",
            term: "Term 1",
            matchingCourseLessons: ["systems", "human"],
            keyConcepts: ["Characteristics of living things (feeding, breathing, reproducing)", "System boundaries and structure"],
          },
          {
            title: "Structure of Plants & Animals",
            term: "Term 1",
            matchingCourseLessons: ["earth", "food"],
            keyConcepts: ["Roots, stems, leaves, flowers", "Sensory systems and locomotion"],
          },
          {
            title: "Habitats of Animals & South African Biomes",
            term: "Term 2",
            matchingCourseLessons: ["food", "cycles"],
            keyConcepts: ["Grasslands, Savanna, Forests, Oceans", "Shelter, food, and water needs"],
          },
        ],
      },
      {
        grade: "Grade 5",
        topics: [
          {
            title: "Plants and Animals on Earth",
            term: "Term 1",
            matchingCourseLessons: ["food", "energy"],
            keyConcepts: ["Interdependence of plants and animals", "Food chains and herbivores/carnivores"],
          },
          {
            title: "Life Cycles of South African Organisms",
            term: "Term 1",
            matchingCourseLessons: ["cycles", "human"],
            keyConcepts: ["Growth and development cycles", "Seed germination and pollination by local birds/insects"],
          },
        ],
      },
      {
        grade: "Grade 6",
        topics: [
          {
            title: "Photosynthesis: The Food Factory",
            term: "Term 1",
            matchingCourseLessons: ["food", "energy", "chemistry"],
            keyConcepts: ["Plants convert radiant energy to chemical potential energy", "CO₂ + H₂O + Sunlight ➔ Glucose + O₂"],
          },
          {
            title: "Nutrients in Food & Ecosystem Balance",
            term: "Term 1",
            matchingCourseLessons: ["human", "food", "cycles"],
            keyConcepts: ["Food groups, digestion, and energy storage in the human body"],
          },
          {
            title: "Ecosystems and Food Webs",
            term: "Term 1",
            matchingCourseLessons: ["food", "detective", "sandbox"],
            keyConcepts: ["Producers, primary/secondary consumers, decomposers", "Trophic cascades and ecosystem balance"],
          },
        ],
      },
      {
        grade: "Grade 7",
        topics: [
          {
            title: "Biosphere & Biodiversity in South Africa",
            term: "Term 1",
            matchingCourseLessons: ["connected", "capstone"],
            keyConcepts: ["Classification of organisms", "Endemism in Cape Fynbos and Succulent Karoo"],
          },
          {
            title: "Sexual and Asexual Reproduction",
            term: "Term 1",
            matchingCourseLessons: ["human", "cycles"],
            keyConcepts: ["Plant floral structures, human endocrine and reproductive biology"],
          },
        ],
      },
    ],
  },
  {
    id: "matter_materials",
    strandNameEn: "Matter and Materials (CAPS Natural Sciences)",
    strandNameZu: "Izinto Nezakhi",
    grades: [
      {
        grade: "Grade 4",
        topics: [
          {
            title: "Materials Around Us & Solid, Liquid, Gas",
            term: "Term 2",
            matchingCourseLessons: ["matter"],
            keyConcepts: ["Properties of materials", "State transitions: melting, freezing, evaporating, condensing"],
          },
        ],
      },
      {
        grade: "Grade 5",
        topics: [
          {
            title: "Metals, Non-metals and Thermal Properties",
            term: "Term 2",
            matchingCourseLessons: ["matter", "chemistry"],
            keyConcepts: ["Thermal conductivity, magnetic attraction, mining in South Africa (Gold, Platinum, Iron)"],
          },
          {
            title: "Processing Materials & Chemical Reactions",
            term: "Term 2",
            matchingCourseLessons: ["chemistry"],
            keyConcepts: ["Combining materials to create new properties", "Traditional clay baking & metallurgy"],
          },
        ],
      },
      {
        grade: "Grade 6",
        topics: [
          {
            title: "Solids, Liquids and Solutions",
            term: "Term 2",
            matchingCourseLessons: ["matter", "chemistry"],
            keyConcepts: ["Solutes, solvents, solubility and saturation curves", "Separating mixtures (filtration, evaporation)"],
          },
        ],
      },
      {
        grade: "Grade 7",
        topics: [
          {
            title: "The Particle Model of Matter & Atoms",
            term: "Term 2",
            matchingCourseLessons: ["matter", "chemistry", "laws"],
            keyConcepts: ["Atoms, molecules, subatomic protons/neutrons/electrons", "Periodic Table of Elements"],
          },
        ],
      },
    ],
  },
  {
    id: "energy_change",
    strandNameEn: "Energy and Change (CAPS Natural Sciences)",
    strandNameZu: "Amandla Nokuguquka",
    grades: [
      {
        grade: "Grade 4",
        topics: [
          {
            title: "Energy and Energy Transfer",
            term: "Term 3",
            matchingCourseLessons: ["energy"],
            keyConcepts: ["Energy from the Sun", "Energy in food and movement (Kinetic and Potential)"],
          },
        ],
      },
      {
        grade: "Grade 5",
        topics: [
          {
            title: "Stored Energy & Movement",
            term: "Term 3",
            matchingCourseLessons: ["energy", "forces"],
            keyConcepts: ["Elastic energy, gravitational potential energy, kinetic motion"],
          },
        ],
      },
      {
        grade: "Grade 6",
        topics: [
          {
            title: "Electric Circuits & South African Power Grid",
            term: "Term 3",
            matchingCourseLessons: ["electricity"],
            keyConcepts: ["Cells, switches, conductive wires, bulbs/resistors", "Series vs Parallel circuits", "Solar energy & Eskom grid"],
          },
        ],
      },
      {
        grade: "Grade 7",
        topics: [
          {
            title: "Sources of Energy & Heat Transfer",
            term: "Term 3",
            matchingCourseLessons: ["energy", "forces", "laws"],
            keyConcepts: ["Conduction, convection, thermal radiation", "First Law of Thermodynamics (Energy Conservation)"],
          },
        ],
      },
    ],
  },
  {
    id: "planet_earth",
    strandNameEn: "Planet Earth and Beyond (CAPS Natural Sciences)",
    strandNameZu: "Umhlaba Nendawo Engaphandle",
    grades: [
      {
        grade: "Grade 4",
        topics: [
          {
            title: "Planet Earth and The Sun",
            term: "Term 4",
            matchingCourseLessons: ["earth", "cycles"],
            keyConcepts: ["Earth's rotation causing day and night", "The 4 Spheres: Geosphere, Hydrosphere, Atmosphere, Biosphere"],
          },
        ],
      },
      {
        grade: "Grade 6",
        topics: [
          {
            title: "The Solar System & Astronomy in South Africa",
            term: "Term 4",
            matchingCourseLessons: ["earth", "laws", "connected"],
            keyConcepts: ["Planets and orbits", "South African Large Telescope (SALT in Sutherland)", "Square Kilometre Array (SKA / MeerKAT in the Karoo)"],
          },
        ],
      },
    ],
  },
];
