import { CourseModule, Organism, QuizQuestion, TimelineEvent } from "../types";

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "home",
    number: "00",
    category: "WELCOME",
    icon: "🏠",
    title: "Welcome to Science of Our World",
    shortTitle: "Overview",
    description: "Discover how systems, Earth, energy, life, and the laws of physics connect.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "map",
    number: "MAP",
    category: "MENTAL MODEL",
    icon: "🗺️",
    title: "The Unifying Science Map",
    shortTitle: "Science Map",
    description: "The complete storyline hierarchy: Cosmos ➔ Earth ➔ Life ➔ Human ➔ Science.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "systems",
    number: "01",
    category: "SYSTEMS",
    icon: "🧩",
    title: "What Is a System?",
    shortTitle: "Systems",
    description: "Parts working together with boundaries, inputs, and outputs.",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    id: "human",
    number: "02",
    category: "BIOLOGY",
    icon: "🧍",
    title: "The Human Body as an Open System",
    shortTitle: "Human Body",
    description: "Organs collaborating: energy intake, cellular work, and waste release.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    id: "earth",
    number: "03",
    category: "EARTH SCIENCE",
    icon: "🌍",
    title: "Earth as a Connected System",
    shortTitle: "Earth System",
    description: "Atmosphere, Hydrosphere, Geosphere, and Biosphere interacting.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "food",
    number: "04",
    category: "ECOLOGY",
    icon: "🌱",
    title: "Food Chains & Trophic Webs",
    shortTitle: "Food Chains",
    description: "How sunlight energy travels from producers to consumers and decomposers.",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "energy",
    number: "05",
    category: "PHYSICS",
    icon: "☀️",
    title: "Energy & Heat Transfer",
    shortTitle: "Energy",
    description: "Energy cannot be destroyed; it flows and transforms, driving work.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    id: "cycles",
    number: "06",
    category: "EARTH SYSTEMS",
    icon: "♻️",
    title: "Natural Cycles: Water, Carbon, & Oxygen",
    shortTitle: "Cycles",
    description: "Matter is recycled across the planet in continuous biogeochemical loops.",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  {
    id: "matter",
    number: "07",
    category: "CHEMISTRY",
    icon: "⚛️",
    title: "States of Matter & Particles",
    shortTitle: "States of Matter",
    description: "Solids, liquids, and gases: particle arrangement and thermal movement.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "chemistry",
    number: "08",
    category: "CHEMISTRY",
    icon: "🧪",
    title: "Chemistry in Life & Reactions",
    shortTitle: "Chemistry",
    description: "Reactants turn into products: Photosynthesis and Cellular Respiration.",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
  },
  {
    id: "forces",
    number: "09",
    category: "PHYSICS",
    icon: "⚙️",
    title: "Forces, Gravity & Motion",
    shortTitle: "Forces & Motion",
    description: "Pushes, pulls, friction, gravity, and the fundamental speed equation.",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    id: "electricity",
    number: "10",
    category: "PHYSICS",
    icon: "⚡",
    title: "Electricity & Complete Circuits",
    shortTitle: "Electricity",
    description: "Current flow, closed loops, switches, and electrical energy conversion.",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    id: "laws",
    number: "11",
    category: "SCIENTIFIC THINKING",
    icon: "🔬",
    title: "Laws of Nature & Scientific Discovery",
    shortTitle: "Nature Laws",
    description: "What a scientific law means: observation, hypothesis, testing, and evidence.",
    badgeColor: "bg-violet-100 text-violet-800 border-violet-200",
  },
  {
    id: "connected",
    number: "12",
    category: "SYSTEMS THINKING",
    icon: "🌎",
    title: "One Connected World",
    shortTitle: "Connected World",
    description: "The grand synthesis: how everything in nature is linked in one living web.",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    id: "journal",
    number: "LOG",
    category: "RESEARCH LOG",
    icon: "📓",
    title: "Young Scientist Field Notebook",
    shortTitle: "Field Notes",
    description: "Record hypotheses, test predictions, and analyze empirical graph data.",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
  },
  {
    id: "detective",
    number: "CASE",
    category: "FORENSIC SCIENCE",
    icon: "🔎",
    title: "Scientific Detective Mode",
    shortTitle: "Detective Mode",
    description: "Diagnose collapsed ecosystems with multi-sensor telemetry, evaluate hypotheses, and restore balance.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "sandbox",
    number: "BUILD",
    category: "INTERACTIVE SIMULATION",
    icon: "🏗️",
    title: "Ecosystem Sandbox & World Builder",
    shortTitle: "Sandbox",
    description: "Construct ecosystems, tune planetary spheres, and test trophic balance.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "laboratory",
    number: "LAB",
    category: "PRACTICAL LAB",
    icon: "🧪",
    title: "Young Scientist Virtual Lab",
    shortTitle: "Virtual Lab",
    description: "Interactive test benches for food chains, circuits, states of matter, and motion.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "capstone",
    number: "GRAD",
    category: "CAPSTONE DEFENSE",
    icon: "🎓",
    title: "The Young Scientist Capstone Defense",
    shortTitle: "Capstone Defense",
    description: "Investigate an unfamiliar hydrothermal vent ecosystem: observe, model, predict, experiment, and defend.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    id: "challenge",
    number: "🏆",
    category: "ASSESSMENT",
    icon: "🏆",
    title: "Young Scientist Challenge",
    shortTitle: "Final Challenge",
    description: "Test your scientific knowledge and earn your Young Scientist Certificate!",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
];

export const ORGANISMS_LIST: Organism[] = [
  { id: "sun", icon: "☀️", name: "Sunlight (Energy Source)", type: "producer", tier: 0, description: "Provides electromagnetic radiant energy to power photosynthesis." },
  { id: "grass", icon: "🌱", name: "Grass", type: "producer", tier: 1, description: "Converts sunlight, CO2, and water into sugars via photosynthesis." },
  { id: "oak_tree", icon: "🌳", name: "Oak Tree", type: "producer", tier: 1, description: "Large terrestrial producer synthesizing nutrients from sunlight." },
  { id: "algae", icon: "🌿", name: "Water Algae", type: "producer", tier: 1, description: "Aquatic photosynthetic organism forming the base of marine chains." },
  { id: "caterpillar", icon: "🐛", name: "Caterpillar", type: "consumer", tier: 2, description: "Primary consumer / Herbivore feeding on leaves and plants.", diet: "Herbivore" },
  { id: "rabbit", icon: "🐇", name: "Rabbit", type: "consumer", tier: 2, description: "Primary consumer / Herbivore eating grass and vegetables.", diet: "Herbivore" },
  { id: "cow", icon: "🐄", name: "Cow", type: "consumer", tier: 2, description: "Primary consumer / Ruminant grazing on pasture grass.", diet: "Herbivore" },
  { id: "zooplankton", icon: "🦐", name: "Krill / Plankton", type: "consumer", tier: 2, description: "Aquatic primary consumer grazing on microscopic algae.", diet: "Herbivore" },
  { id: "bird", icon: "🐦", name: "Robin / Small Bird", type: "consumer", tier: 3, description: "Secondary consumer / Insectivore feeding on caterpillars.", diet: "Carnivore/Omnivore" },
  { id: "fish", icon: "🐟", name: "Small Fish", type: "consumer", tier: 3, description: "Secondary consumer feeding on aquatic krill and plankton.", diet: "Carnivore" },
  { id: "fox", icon: "🦊", name: "Fox", type: "consumer", tier: 3, description: "Secondary consumer / Omnivore preying on rabbits and rodents.", diet: "Carnivore/Omnivore" },
  { id: "eagle", icon: "🦅", name: "Eagle (Apex Predator)", type: "consumer", tier: 4, description: "Tertiary consumer hunting birds and small mammals at the top of the chain.", diet: "Carnivore" },
  { id: "shark", icon: "🦈", name: "Shark (Apex Predator)", type: "consumer", tier: 4, description: "Top marine predator regulating oceanic fish populations.", diet: "Carnivore" },
  { id: "human", icon: "🧍", name: "Human", type: "consumer", tier: 4, description: "Omnivorous consumer eating plants and animal products.", diet: "Omnivore" },
  { id: "fungus", icon: "🍄", name: "Mushroom / Fungus", type: "decomposer", tier: 5, description: "Decomposer breaking down dead organic matter to recycle minerals into soil." },
  { id: "bacteria", icon: "🦠", name: "Soil Bacteria", type: "decomposer", tier: 5, description: "Microscopic decomposers completing the cycle of matter." },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    period: "c. 350 BCE",
    pioneer: "Ancient Observers & Naturalists",
    icon: "🏛️",
    contribution: "Observed repeating patterns in star motions, seasons, animal behaviors, and material properties.",
    significance: "Began systematic cataloging of the natural world through careful notation.",
  },
  {
    period: "1564 – 1642",
    pioneer: "Galileo Galilei",
    icon: "🔭",
    contribution: "Used controlled experiments, timing devices, and telescope observations to analyze motion and gravity.",
    significance: "Established that scientific ideas must be verified through empirical measurement and data.",
  },
  {
    period: "1643 – 1727",
    pioneer: "Sir Isaac Newton",
    icon: "🍎",
    contribution: "Formulated the 3 Laws of Motion and the Universal Law of Gravitation.",
    significance: "Demonstrated that mathematical principles govern both terrestrial objects and planetary orbits.",
  },
  {
    period: "1791 – 1879",
    pioneer: "Michael Faraday & James Clerk Maxwell",
    icon: "⚡",
    contribution: "Discovered electromagnetic induction and unified electricity, magnetism, and light into field equations.",
    significance: "Paved the way for electric motors, generators, power grids, and modern radio communication.",
  },
  {
    period: "1850s – 1880s",
    pioneer: "Clausius, Kelvin & Boltzmann",
    icon: "🔥",
    contribution: "Established the Laws of Thermodynamics: conservation of energy and directional heat transfer.",
    significance: "Proved that energy changes forms and that heat naturally transfers from hot regions to cold regions.",
  },
  {
    period: "1879 – 1955",
    pioneer: "Albert Einstein",
    icon: "🌌",
    contribution: "Developed the Special and General Theories of Relativity ($E = mc^2$, curvature of spacetime).",
    significance: "Revealed the deep connection between matter, energy, speed of light, space, and time.",
  },
  {
    period: "1867 – 1934",
    pioneer: "Marie Curie",
    icon: "⚛️",
    contribution: "Pioneered radioactivity research, discovering polonium and radium, winning two Nobel Prizes.",
    significance: "Unlocked our understanding of atomic nuclei and high-energy physics.",
  },
];

export const FINAL_CHALLENGE_QUESTIONS: QuizQuestion[] = [
  {
    id: "q_sys_type",
    concept: "Systems & Boundaries",
    question: "Why is a living human considered an OPEN system in physics and biology?",
    options: [
      { text: "Because both matter (food, water, air) and energy (heat) cross the body's boundary.", isCorrect: true, explanation: "Correct! Living organisms take in food/water/oxygen and release waste/heat, exchanging both matter and energy with their surroundings." },
      { text: "Because a person only exchanges heat with the room, but never matter.", isCorrect: false, explanation: "We consume food and breathe air, which means matter constantly crosses our boundary!" },
      { text: "Because a human body never changes temperature.", isCorrect: false, explanation: "Humans maintain homeothermy by releasing excess thermal energy into the environment." },
      { text: "Because human bodies are completely isolated from outer space.", isCorrect: false, explanation: "While isolated systems prevent all exchange, humans constantly interact with their environment." }
    ]
  },
  {
    id: "q_food_producer",
    concept: "Ecology & Energy",
    question: "What is the primary role of a PRODUCER (like grass or algae) in a food chain?",
    options: [
      { text: "To hunt small animals for chemical nutrients.", isCorrect: false, explanation: "Producers do not hunt; they synthesize their own nutrients!" },
      { text: "To convert sunlight energy into chemical energy (sugars) via photosynthesis.", isCorrect: true, explanation: "Spot on! Producers harness radiant solar energy and convert it into carbohydrates that nourish the rest of the ecosystem." },
      { text: "To break down dead bones into soil minerals only.", isCorrect: false, explanation: "That is the role of decomposers such as fungi and soil bacteria." },
      { text: "To eliminate carbon dioxide completely from Earth.", isCorrect: false, explanation: "Plants absorb CO2 and release O2, balancing the carbon cycle." }
    ]
  },
  {
    id: "q_energy_law",
    concept: "Physics & Conservation",
    question: "According to the Law of Conservation of Energy, what happens to energy when you run a race?",
    options: [
      { text: "Energy is destroyed and permanently disappears forever.", isCorrect: false, explanation: "Energy cannot be destroyed according to the first law of thermodynamics!" },
      { text: "Chemical energy in food transforms into kinetic motion and thermal energy (body heat).", isCorrect: true, explanation: "Exactly! Energy transforms from chemical bonds in your breakfast into muscle kinetic movement and radiated heat." },
      { text: "Energy turns directly into solid matter in your shoes.", isCorrect: false, explanation: "Energy changes form between potential, kinetic, and thermal states." },
      { text: "New energy is magically created out of nothing.", isCorrect: false, explanation: "Energy cannot be created from nothing; it only converts from existing sources." }
    ]
  },
  {
    id: "q_water_cycle",
    concept: "Earth Science Cycles",
    question: "Which process in the water cycle turns liquid surface water into airborne water vapor?",
    options: [
      { text: "Precipitation", isCorrect: false, explanation: "Precipitation is when water falls back down as rain, snow, or hail." },
      { text: "Evaporation", isCorrect: true, explanation: "Yes! Solar thermal energy warms surface water, causing liquid molecules to evaporate into gas." },
      { text: "Condensation", isCorrect: false, explanation: "Condensation is water vapor cooling down into liquid cloud droplets." },
      { text: "Sedimentation", isCorrect: false, explanation: "Sedimentation refers to solid particles settling in geology." }
    ]
  },
  {
    id: "q_matter_particles",
    concept: "States of Matter",
    question: "How do particles behave when liquid water is heated until it boils into steam (gas)?",
    options: [
      { text: "Particles slow down and freeze into a stiff, locked crystal grid.", isCorrect: false, explanation: "That is what happens during freezing into solid ice." },
      { text: "Particles gain thermal kinetic energy, move much faster, and spread far apart.", isCorrect: true, explanation: "Correct! Heat increases kinetic energy, breaking intermolecular attractions and letting gas particles fly freely." },
      { text: "Particles disappear completely and leave empty space.", isCorrect: false, explanation: "Matter is conserved; the water molecules are still there as airborne gas!" },
      { text: "Particles stop moving entirely.", isCorrect: false, explanation: "Only at absolute zero (0 Kelvin) would thermal motion cease." }
    ]
  },
  {
    id: "q_chemical_formula",
    concept: "Chemistry in Life",
    question: "What are the two primary products created during plant PHOTOSYNTHESIS?",
    options: [
      { text: "Glucose sugar ($C_6H_{12}O_6$) and Oxygen gas ($O_2$)", isCorrect: true, explanation: "Correct! $6CO_2 + 6H_2O + \\text{light} \\rightarrow C_6H_{12}O_6 + 6O_2$." },
      { text: "Salt water and Carbon dioxide", isCorrect: false, explanation: "Carbon dioxide is a reactant that goes in, not a product that comes out." },
      { text: "Pure iron and nitrogen gas", isCorrect: false, explanation: "Photosynthesis operates on carbon, hydrogen, and oxygen atoms." },
      { text: "Electricity and liquid helium", isCorrect: false, explanation: "Photosynthesis produces biochemical sugars and breathable oxygen." }
    ]
  },
  {
    id: "q_forces_speed",
    concept: "Forces & Motion",
    question: "If a young scientist rides a bicycle 60 meters in 12 seconds, what is their speed?",
    options: [
      { text: "720 meters per second", isCorrect: false, explanation: "You multiplied instead of dividing: $\\text{Speed} = \\text{Distance} \\div \\text{Time}$." },
      { text: "5 meters per second", isCorrect: true, explanation: "Bravo! $\\text{Speed} = 60\\,\\text{m} \\div 12\\,\\text{s} = 5\\,\\text{m/s}$." },
      { text: "0.2 meters per second", isCorrect: false, explanation: "Remember: Distance is divided by Time, not time by distance." },
      { text: "48 meters per second", isCorrect: false, explanation: "Speed requires dividing distance by time." }
    ]
  },
  {
    id: "q_circuit_flow",
    concept: "Electricity",
    question: "Why does an electric lightbulb turn OFF when you open the circuit switch?",
    options: [
      { text: "Because the battery runs out of all chemicals instantly.", isCorrect: false, explanation: "The battery still holds chemical potential; only the path is broken." },
      { text: "Because the continuous electrical path is broken, stopping the flow of current.", isCorrect: true, explanation: "Correct! Electric current requires an uninterrupted closed conducting loop to flow." },
      { text: "Because gravity pulls the electrons onto the floor.", isCorrect: false, explanation: "Electrons remain inside the conductor wire." },
      { text: "Because the wire gets too hot and evaporates.", isCorrect: false, explanation: "Opening the switch simply creates a gap that electric charges cannot cross." }
    ]
  },
  {
    id: "q_nature_law",
    concept: "Scientific Thinking",
    question: "What is the fundamental difference between a SCIENTIFIC LAW and a government traffic law?",
    options: [
      { text: "A scientific law is a descriptive, repeatable pattern in nature tested by evidence; it cannot be 'broken' by decree.", isCorrect: true, explanation: "Outstanding! Scientific laws describe how the universe behaves based on empirical observation, whereas human laws are social rules." },
      { text: "Scientific laws are voted on by parliaments and changed every year.", isCorrect: false, explanation: "Nature operates independently of human legislative votes." },
      { text: "There is no difference; scientists write tickets to trees.", isCorrect: false, explanation: "A humorous thought, but scientific laws are natural universal descriptions!" },
      { text: "Scientific laws are only guesses made by one person without testing.", isCorrect: false, explanation: "Scientific laws require extensive mathematical and empirical verification across generations." }
    ]
  }
];
