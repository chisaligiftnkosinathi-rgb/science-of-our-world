import { LessonPedagogy, ScienceMapNode } from "../types";

export const LESSON_PEDAGOGIES: Record<string, LessonPedagogy> = {
  systems: {
    moduleId: "systems",
    bigQuestion: "What makes a system work, and what happens when you remove one part?",
    storyAnchor: "You are not an isolated spectator. Your body, your home, and planet Earth are all systems of parts working in harmony.",
    simpleExplanation: "A system is a team of parts that work together to accomplish something that none of the parts could do alone.",
    realWorldExample: {
      title: "Riding a Bicycle",
      icon: "🚲",
      description: "A bicycle is a mechanical system. If you take away the pedals, chain, or tires, the remaining parts cannot roll forward on their own!",
    },
    vocabulary: [
      {
        term: "System",
        phonetic: "SIS-təm",
        definition: "A collection of interacting parts forming a complex whole.",
        memoryTip: "Think: Parts + Rules = A Working Whole!",
      },
      {
        term: "Boundary",
        phonetic: "BOWN-də-ree",
        definition: "The dividing perimeter between a system and its surrounding environment.",
        memoryTip: "Think: The walls of a house or your skin.",
      },
      {
        term: "Open System",
        phonetic: "OH-pən SIS-təm",
        definition: "A system where both matter (substances) and energy cross the boundary freely.",
        memoryTip: "Think: A human breathing and eating!",
      },
      {
        term: "Closed System",
        phonetic: "KLOHZD SIS-təm",
        definition: "A system where energy can enter or leave, but matter stays sealed inside.",
        memoryTip: "Think: A sealed water bottle warming in the sun.",
      },
    ],
    prediction: {
      prompt: "If you place a healthy green plant inside an airtight glass jar with plenty of sunlight and water, what will happen?",
      options: [
        {
          id: "opt_a",
          text: "It will survive as a self-contained closed system, recycling oxygen and carbon dioxide.",
          feedback: "Spot on! The terrarium acts as a closed system: sunlight (energy) enters, while water and gases recycle internally.",
          isCorrectPrediction: true,
        },
        {
          id: "opt_b",
          text: "It will instantly vanish because glass blocks all physical existence.",
          feedback: "Glass only creates a physical boundary; it allows light energy to pass right through.",
          isCorrectPrediction: false,
        },
        {
          id: "opt_c",
          text: "Matter will magically teleport into the jar from outer space.",
          feedback: "In a closed system, matter cannot cross the sealed boundary.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Switch between Open, Closed, and Isolated boundaries to observe how energy and matter flows change.",
    systemConnection: {
      earthLink: "Earth is nearly a closed system: sunlight enters and radiates out, but Earth's rock and water mass stays within our gravitational boundary.",
      humanLink: "Your human body is an open system: you continuously take in food, water, and oxygen, and release heat and carbon dioxide.",
    },
    synthesisChallenge: {
      prompt: "Why is your classroom or bedroom considered an OPEN system?",
      hints: [
        "What comes in through doors and windows? (Air, food, people, sunlight)",
        "What leaves the room? (Heat, sound, trash, exhaled breath)",
        "What forms the boundary of the room?",
      ],
      modelExplanation: "My classroom is an open system because its boundary (walls, windows, doors) allows matter (students, snacks, fresh air) and energy (sunlight, electric lights, warmth) to enter and leave continuously.",
    },
  },

  human: {
    moduleId: "human",
    bigQuestion: "Why doesn't your body run out of energy even when you are running or fast asleep?",
    storyAnchor: "Inside your body, trillions of microscopic cells are working as specialized teams to keep you alive, warm, and thinking.",
    simpleExplanation: "Your body is a living open system. It takes in food and oxygen, converts them into usable energy in every cell, and removes waste products.",
    realWorldExample: {
      title: "Pedaling Uphill",
      icon: "🏃‍♂️",
      description: "When you sprint up a hill, your leg muscles demand more fuel and oxygen. Instantly, your brain commands your heart to pump faster and your lungs to breathe deeper!",
    },
    vocabulary: [
      {
        term: "Circulatory System",
        phonetic: "SUR-kyə-lə-tor-ee",
        definition: "The highway of blood vessels that transports oxygen, nutrients, and waste throughout your body.",
        memoryTip: "Think: The Heart is the pump, Blood vessels are the roads!",
      },
      {
        term: "Cellular Respiration",
        phonetic: "SEL-yə-ler res-pə-RAY-shən",
        definition: "The chemical process inside cells where glucose and oxygen combine to produce energy (ATP).",
        memoryTip: "Food + Oxygen = Energy for You!",
      },
      {
        term: "Homeostasis",
        phonetic: "hoh-mee-oh-STAY-sis",
        definition: "The internal balance your body maintains (like staying at 37°C / 98.6°F) despite outside weather.",
        memoryTip: "Think: Your body's automatic thermostat!",
      },
    ],
    prediction: {
      prompt: "What do you predict will happen to your breathing rate when you jump rope for two straight minutes?",
      options: [
        {
          id: "p_h1",
          text: "Breathing rate will increase to deliver more oxygen to working muscle cells.",
          feedback: "Exact science! Working muscles burn glucose and require oxygen, so your respiratory system ramps up.",
          isCorrectPrediction: true,
        },
        {
          id: "p_h2",
          text: "Breathing rate will drop to zero because muscles stop using air.",
          feedback: "Muscles consume more oxygen during intense activity, not less!",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Select different human organ systems to see how inputs (oxygen, water, food) are distributed and processed.",
    systemConnection: {
      earthLink: "The oxygen your lungs breathe was produced by ocean phytoplankton and terrestrial rainforests via photosynthesis!",
      humanLink: "Every breath links you directly to the planetary atmosphere and biosphere.",
    },
    synthesisChallenge: {
      prompt: "Explain how your digestive system and circulatory system work as a team.",
      hints: [
        "What does the digestive system do with food?",
        "How do nutrients get from your stomach/intestines to your arm and leg muscles?",
      ],
      modelExplanation: "The digestive system breaks food down into tiny nutrient molecules (like glucose). Then, the circulatory system absorbs these nutrients into the bloodstream and delivers them to every cell in the body for energy.",
    },
  },

  earth: {
    moduleId: "earth",
    bigQuestion: "How do Earth's air, oceans, mountains, and forests talk to each other?",
    storyAnchor: "Earth is not a dead rock hurtling through space; it is an active, living super-system made of four interconnected spheres.",
    simpleExplanation: "Earth works through four main spheres: Atmosphere (air), Hydrosphere (water), Geosphere (rocks/land), and Biosphere (life). An event in one sphere always ripples into the others.",
    realWorldExample: {
      title: "A Mountain Rainstorm",
      icon: "⛈️",
      description: "Moist ocean air (Hydrosphere/Atmosphere) hits a tall mountain (Geosphere), rises, cools, and rains down to nourish a dense forest (Biosphere)!",
    },
    vocabulary: [
      {
        term: "Atmosphere",
        phonetic: "AT-məs-feer",
        definition: "The protective envelope of gases (Nitrogen, Oxygen, CO₂) surrounding Earth.",
        memoryTip: "The Air we breathe!",
      },
      {
        term: "Hydrosphere",
        phonetic: "HY-droh-sfeer",
        definition: "All liquid, frozen, and gaseous water on Earth (oceans, lakes, rivers, glaciers).",
        memoryTip: "Hydro = Water!",
      },
      {
        term: "Geosphere",
        phonetic: "JEE-oh-sfeer",
        definition: "The solid rock, soil, mantle, and core of Earth.",
        memoryTip: "Geo = Rock & Land!",
      },
      {
        term: "Biosphere",
        phonetic: "BY-oh-sfeer",
        definition: "The zone of all living organisms on Earth (plants, animals, fungi, microbes).",
        memoryTip: "Bio = Life!",
      },
    ],
    prediction: {
      prompt: "If a volcanic eruption spews massive ash clouds into the upper atmosphere, what happens to global plant growth?",
      options: [
        {
          id: "p_e1",
          text: "Sunlight is temporarily blocked, lowering temperatures and slowing plant photosynthesis.",
          feedback: "Correct! The volcanic geosphere interacts with the atmosphere (blocking sunlight), impacting the biosphere (plants).",
          isCorrectPrediction: true,
        },
        {
          id: "p_e2",
          text: "Nothing happens because rocks have zero connection to air or plants.",
          feedback: "All Earth's spheres are linked; ash in the air alters sunlight and soil chemistry.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Click on any of the 4 Earth Spheres to discover cross-sphere interactions and cascading planetary feedback.",
    systemConnection: {
      earthLink: "Earth's magnetic core (Geosphere) shields our Atmosphere from solar wind, allowing the Biosphere to thrive.",
      humanLink: "You live in the Biosphere, stand on the Geosphere, drink from the Hydrosphere, and breathe the Atmosphere.",
    },
    synthesisChallenge: {
      prompt: "Describe how a single ocean wave touching a sandy beach connects all 4 spheres.",
      hints: [
        "Where did the wind that made the wave come from? (Atmosphere)",
        "What is the wave made of? (Hydrosphere)",
        "What is the sand? (Geosphere)",
        "Who lives in the sand or water? (Biosphere)",
      ],
      modelExplanation: "Wind in the Atmosphere pushes ocean water in the Hydrosphere into waves. The waves crash onto the sandy Geosphere, eroding rock and providing habitat for crabs and seaweed in the Biosphere.",
    },
  },

  food: {
    moduleId: "food",
    bigQuestion: "Where does the energy in your breakfast really come from?",
    storyAnchor: "Every meal you eat is sunlight captured by green plants, converted into sugars, and passed through living chains.",
    simpleExplanation: "Food chains trace how solar radiant energy flows from green producers (plants) to herbivores, predators, and decomposers. A useful rule of thumb is that only a small fraction of energy is passed to the next level — scientists often use ~10% as a simple model, while real ecosystems vary.",
    realWorldExample: {
      title: "An Oak Tree & Squirrel",
      icon: "🐿️",
      description: "An oak tree turns sunlight into acorns (producer). A squirrel eats the acorns (herbivore), and a hawk hunts the squirrel (predator).",
    },
    vocabulary: [
      {
        term: "Producer",
        phonetic: "proh-DOO-ser",
        definition: "An autotroph (like a plant or algae) that makes its own food using sunlight.",
        memoryTip: "Plants produce energy from light!",
      },
      {
        term: "Primary Consumer",
        phonetic: "KAHN-soo-mer",
        definition: "An herbivore that eats green producers for energy.",
        memoryTip: "First eaters (caterpillars, deer, rabbits).",
      },
      {
        term: "Apex Predator",
        phonetic: "AY-peks PRED-ə-ter",
        definition: "A carnivore at the top of the food web with no natural predators.",
        memoryTip: "Eagles, lions, killer whales!",
      },
      {
        term: "Decomposer",
        phonetic: "dee-kəm-POH-zer",
        definition: "Organisms (fungi, bacteria) that recycle dead material back into fertile soil nutrients.",
        memoryTip: "Nature's recycling cleanup crew!",
      },
    ],
    prediction: {
      prompt: "Why are there far fewer eagles in a forest than grasshoppers or mice?",
      options: [
        {
          id: "p_f1",
          text: "Because a large majority of energy is used for living or lost as heat at each step, leaving only a small fraction for apex predators.",
          feedback: "Brilliant! Because only a small fraction (often modeled as ~10% as a rule of thumb) passes between levels, the energy pyramid gets much narrower at the top.",
          isCorrectPrediction: true,
        },
        {
          id: "p_f2",
          text: "Because eagles are shy and prefer not to show up in counts.",
          feedback: "Ecosystem populations are limited by thermodynamic energy availability, not shyness!",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Assemble realistic food chains from producers to apex predators and observe how energy diminishes across trophic levels.",
    systemConnection: {
      earthLink: "Without decomposers breaking down fallen logs and dead matter, soil minerals would stay locked up forever.",
      humanLink: "When you eat an apple, bread, or beans, you are absorbing solar energy captured just weeks or months ago!",
    },
    synthesisChallenge: {
      prompt: "What would happen to an ecosystem if all decomposers (mushrooms, bacteria) vanished?",
      hints: [
        "What happens to dead leaves and fallen trees?",
        "Where do plants get soil nitrogen and minerals from?",
      ],
      modelExplanation: "Without decomposers, dead plants and animals would pile up without decaying. Vital nutrients like nitrogen and phosphorus would remain trapped in dead matter, leaving the soil infertile and preventing new plants from growing.",
    },
  },

  energy: {
    moduleId: "energy",
    bigQuestion: "Can energy ever disappear completely, and where does it go when a ball stops rolling?",
    storyAnchor: "Energy is the ability to do work or cause change. It never disappears — it only shifts from one form to another.",
    simpleExplanation: "The First Law of Thermodynamics (Conservation of Energy) states that energy cannot be created or destroyed. When a moving object stops, its kinetic energy has converted into thermal heat and friction!",
    realWorldExample: {
      title: "A Roller Coaster",
      icon: "🎢",
      description: "At the highest peak, the coaster has high gravitational potential energy. As it plunges down, that potential transforms into thrilling kinetic speed!",
    },
    vocabulary: [
      {
        term: "Kinetic Energy",
        phonetic: "kə-NET-ik",
        definition: "The energy an object possesses because of its motion.",
        memoryTip: "Moving energy (running, falling water, flying baseball).",
      },
      {
        term: "Potential Energy",
        phonetic: "pə-TEN-shəl",
        definition: "Stored energy ready to be released (height, stretched rubber band, chemical bonds).",
        memoryTip: "Energy waiting to happen!",
      },
      {
        term: "Conservation of Energy",
        phonetic: "kahn-ser-VAY-shən",
        definition: "Fundamental physical law: Total energy in an isolated system remains strictly constant.",
        memoryTip: "Energy transforms, but never vanishes!",
      },
    ],
    prediction: {
      prompt: "When you slide down a plastic slide, why does the seat of your pants feel warm at the bottom?",
      options: [
        {
          id: "p_n1",
          text: "Friction between the slide and your pants converted kinetic motion energy into thermal heat energy.",
          feedback: "Spot on! Energy was not lost; it transformed from kinetic motion into thermal heat.",
          isCorrectPrediction: true,
        },
        {
          id: "p_n2",
          text: "The slide absorbed magic heating beams from outer space.",
          feedback: "It's physics in action: mechanical friction creates thermal heat.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Convert potential energy to kinetic speed and measure the thermal heat produced by friction.",
    systemConnection: {
      earthLink: "The Sun's nuclear fusion radiates photons across 93 million miles, driving Earth's winds, waves, and weather.",
      humanLink: "Your muscles convert chemical energy stored in food molecules into kinetic movement and 37°C body heat.",
    },
    synthesisChallenge: {
      prompt: "Trace the energy conversions when you turn on a battery-powered flashlight.",
      hints: [
        "What kind of energy is inside a battery? (Chemical potential)",
        "What flows through the wire? (Electrical)",
        "What comes out of the bulb? (Light & Heat)",
      ],
      modelExplanation: "Chemical potential energy stored inside the battery transforms into electrical kinetic energy as electrons flow through the circuit. In the bulb filament/LED, electrical energy transforms into radiant light energy and thermal heat.",
    },
  },

  cycles: {
    moduleId: "cycles",
    bigQuestion: "Could the water in your glass today have been drunk by a dinosaur 70 million years ago?",
    storyAnchor: "Earth doesn't get new water or carbon delivered by trucks. Every single atom is recycled over and over.",
    simpleExplanation: "Matter moves in endless circles called biogeochemical cycles. Water evaporates, condenses into clouds, and falls as rain; carbon moves between air, plants, animals, and soil.",
    realWorldExample: {
      title: "A Sunlit Puddle",
      icon: "🌧️",
      description: "After a storm, a puddle dries up. The liquid water didn't disappear; it evaporated into invisible water vapor and joined the clouds overhead!",
    },
    vocabulary: [
      {
        term: "Evaporation",
        phonetic: "ih-vap-ə-RAY-shən",
        definition: "Liquid water heating up and transforming into invisible water vapor gas.",
        memoryTip: "Liquid ➔ Gas rising up!",
      },
      {
        term: "Condensation",
        phonetic: "kahn-den-SAY-shən",
        definition: "Water vapor cooling in the high atmosphere and clumping into liquid cloud droplets.",
        memoryTip: "Gas ➔ Liquid cloud droplets!",
      },
      {
        term: "Precipitation",
        phonetic: "prih-sip-ə-TAY-shən",
        definition: "Water falling from clouds as rain, snow, sleet, or hail.",
        memoryTip: "Rain falling down to Earth!",
      },
      {
        term: "Carbon Cycle",
        phonetic: "KAHR-bən SY-kəl",
        definition: "The continuous movement of carbon atoms through air, living organisms, oceans, and rocks.",
        memoryTip: "Air (CO₂) ➔ Plants ➔ Food ➔ Breath ➔ Air!",
      },
    ],
    prediction: {
      prompt: "If all rainwater immediately sank into deep underground rock and never evaporated, what would happen?",
      options: [
        {
          id: "p_c1",
          text: "The water cycle would stop: clouds could not form, ending rain and collapsing land ecosystems.",
          feedback: "Correct! The continuous loop of evaporation is essential for cloud formation and rain.",
          isCorrectPrediction: true,
        },
        {
          id: "p_c2",
          text: "Clouds would just buy water from the moon.",
          feedback: "Earth's water cycle is a closed planetary system with no extraterrestrial refills.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Vary solar temperature to watch evaporation, cloud condensation, and rainfall in the cycle simulator.",
    systemConnection: {
      earthLink: "The Amazon rainforest generates its own local rain clouds through plant transpiration (releasing water vapor).",
      humanLink: "The water you drink today will be exhaled as vapor and eventually rain over mountains thousands of miles away.",
    },
    synthesisChallenge: {
      prompt: "Explain how you and a leafy tree are connected through the carbon-oxygen cycle.",
      hints: [
        "What gas do you exhale when you breathe? (CO₂)",
        "What gas does the tree absorb and what does it release during photosynthesis? (O₂)",
      ],
      modelExplanation: "When I breathe out, I release Carbon Dioxide (CO₂). A leafy tree absorbs that CO₂ and uses sunlight to turn it into sugars, releasing fresh Oxygen (O₂) as a byproduct for me to breathe in again.",
    },
  },

  matter: {
    moduleId: "matter",
    bigQuestion: "Why is ice a hard solid, water a flowing liquid, and steam an invisible floating gas?",
    storyAnchor: "Everything in the universe is made of tiny building blocks called atoms and molecules in constant motion.",
    simpleExplanation: "The state of matter depends on how fast its particles are jiggling and how strongly they stick together. Adding thermal heat makes particles vibrate faster and spread farther apart.",
    realWorldExample: {
      title: "An Ice Cream Cone Melting",
      icon: "🍦",
      description: "On a warm day, heat energy flows into the frozen ice cream. The tightly locked solid molecules begin jiggling and sliding past each other, turning into liquid!",
    },
    vocabulary: [
      {
        term: "Solid",
        phonetic: "SAHL-id",
        definition: "Particles are packed tightly in fixed positions, vibrating in place. Has fixed shape and volume.",
        memoryTip: "Tightly locked like bricks in a wall!",
      },
      {
        term: "Liquid",
        phonetic: "LIK-wid",
        definition: "Particles are close together but have enough energy to slide and flow past one another.",
        memoryTip: "Flows and takes the shape of its container!",
      },
      {
        term: "Gas",
        phonetic: "GAS",
        definition: "Particles have high kinetic energy, flying freely in all directions to fill any container.",
        memoryTip: "Bouncing freely with lots of space!",
      },
    ],
    prediction: {
      prompt: "What happens to the motion of water molecules when you put a pot of water on a hot stove burner?",
      options: [
        {
          id: "p_m1",
          text: "Molecules absorb thermal kinetic energy and vibrate much faster until they break free as steam gas.",
          feedback: "Spot on! Higher temperature equals greater kinetic speed of particles.",
          isCorrectPrediction: true,
        },
        {
          id: "p_m2",
          text: "Molecules freeze into solid cubes instantly.",
          feedback: "Adding heat speeds up particles; freezing requires cooling down.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Adjust the thermal temperature slider from -50°C to 150°C to watch solid, liquid, and gas molecular lattices.",
    systemConnection: {
      earthLink: "Water is one of the only natural substances found in all three states (ice glaciers, liquid oceans, atmospheric steam) on Earth's surface!",
      humanLink: "Your body is approximately 60% liquid water, providing the fluid medium for chemical reactions in your cells.",
    },
    synthesisChallenge: {
      prompt: "Explain why steam burns can hurt more than boiling water at the exact same temperature (100°C).",
      hints: [
        "Think about the extra latent heat energy required to turn liquid water into gas.",
        "What happens when steam condenses back to liquid on your skin?",
      ],
      modelExplanation: "Steam contains extra latent heat energy that was absorbed to break liquid bonds into gas. When steam touches skin, it condenses back into liquid, releasing that huge burst of stored heat directly onto the skin.",
    },
  },

  chemistry: {
    moduleId: "chemistry",
    bigQuestion: "How do plants create sweet apples and sturdy tree wood out of invisible air and water?",
    storyAnchor: "Chemistry is the atomic puzzle of nature: chemical reactions rearrange atoms into brand new molecules!",
    simpleExplanation: "In a chemical reaction, bonds between reactant atoms break and reform into new products. Crucially, no atoms are created or destroyed (Law of Conservation of Mass) — they just change partners!",
    realWorldExample: {
      title: "Baking a Cake",
      icon: "🎂",
      description: "When flour, sugar, eggs, and baking powder are heated in an oven, chemical reactions create bubbles of carbon dioxide, turning sticky batter into a fluffy cake!",
    },
    vocabulary: [
      {
        term: "Reactants",
        phonetic: "ree-AK-tənts",
        definition: "The starting chemical substances that enter into a reaction.",
        memoryTip: "The ingredients before the chemical change!",
      },
      {
        term: "Products",
        phonetic: "PRAHD-əkts",
        definition: "The brand new chemical substances produced after the reaction finishes.",
        memoryTip: "The finished result of the chemical change!",
      },
      {
        term: "Photosynthesis",
        phonetic: "foh-toh-SIN-thə-sis",
        definition: "The chemical reaction: 6CO₂ + 6H₂O + Sunlight ➔ Glucose (C₆H₁₂O₆) + 6O₂.",
        memoryTip: "Air + Water + Sunlight ➔ Food + Oxygen!",
      },
    ],
    prediction: {
      prompt: "If you burn a 2 kg piece of wood in a campfire, why does the leftover ash weigh only 0.1 kg?",
      options: [
        {
          id: "p_ch1",
          text: "The remaining 1.9 kg escaped into the atmosphere as invisible Carbon Dioxide gas and water vapor.",
          feedback: "Exactly! Conservation of mass holds true: ash + gases = original wood + oxygen!",
          isCorrectPrediction: true,
        },
        {
          id: "p_ch2",
          text: "The mass was destroyed and erased from the universe forever.",
          feedback: "Mass can never be destroyed; it merely transformed into gaseous reaction products.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Balance the chemical equations for Photosynthesis and Cellular Respiration and track atomic counts.",
    systemConnection: {
      earthLink: "Every breath you take connects your body's cellular respiration directly to global plant photosynthesis.",
      humanLink: "Your stomach uses hydrochloric acid ($HCl$) and enzymes to chemically break down proteins into amino acids.",
    },
    synthesisChallenge: {
      prompt: "Explain why plants are often called 'Earth's greatest solar-powered chemical factories'.",
      hints: [
        "What raw materials do plants take in? (Carbon dioxide from air, water from roots)",
        "What power source do they use? (Sunlight photons)",
        "What valuable products do they manufacture? (Glucose and Oxygen)",
      ],
      modelExplanation: "Plants are nature's factories because they take in simple raw materials (carbon dioxide gas and liquid water) and use solar radiant energy to manufacture complex glucose food molecules while releasing fresh oxygen for the entire planet.",
    },
  },

  forces: {
    moduleId: "forces",
    bigQuestion: "Why do you lurch forward when a car or bus suddenly hits the brakes?",
    storyAnchor: "Invisible forces push, pull, steer, and balance everything in our physical universe.",
    simpleExplanation: "A force is a push or a pull. Newton's First Law (Inertia) explains that objects keep doing what they are doing unless a net force acts on them. Newton's Second Law shows that Force equals Mass times Acceleration ($F = ma$).",
    realWorldExample: {
      title: "Kicking a Soccer Ball",
      icon: "⚽",
      description: "A soccer ball sits at rest until your foot applies an unbalanced forward force. It speeds up, flies through the air, and gravity + air friction pull it back to the grass!",
    },
    vocabulary: [
      {
        term: "Inertia",
        phonetic: "ih-NUR-shə",
        definition: "The natural tendency of an object to resist any change in its state of motion.",
        memoryTip: "Objects want to keep doing what they're doing!",
      },
      {
        term: "Gravity",
        phonetic: "GRAV-ih-tee",
        definition: "The universal attractive force between all objects with mass.",
        memoryTip: "Pulls objects toward Earth's center!",
      },
      {
        term: "Friction",
        phonetic: "FRIK-shən",
        definition: "The resistive force that opposes motion between two surfaces touching each other.",
        memoryTip: "Slows down sliding objects and generates heat!",
      },
    ],
    prediction: {
      prompt: "If you push an empty shopping cart and a cart loaded with 50 kg of bricks with the exact same force, which one accelerates faster?",
      options: [
        {
          id: "p_fo1",
          text: "The empty cart accelerates much faster because it has less mass ($a = F / m$).",
          feedback: "Correct! Newton's 2nd Law proves that smaller mass equals greater acceleration for the same force.",
          isCorrectPrediction: true,
        },
        {
          id: "p_fo2",
          text: "The heavy cart accelerates faster because bricks love moving.",
          feedback: "Greater mass creates more inertia and resists acceleration.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Adjust applied force and mass to test $Speed = Distance / Time$ and $Acceleration = Force / Mass$ on the motion track.",
    systemConnection: {
      earthLink: "Gravity holds Earth's atmosphere, oceans, and moon in place, creating ocean tides twice every day.",
      humanLink: "Your muscles and bones work as mechanical levers, exerting forces against gravity so you can stand and jump.",
    },
    synthesisChallenge: {
      prompt: "Explain why seatbelts in cars are a direct application of Newton's First Law of Motion.",
      hints: [
        "When a car is driving at 50 km/h, how fast is your body moving inside it?",
        "If the car suddenly stops, what does your body naturally tend to do?",
        "How does the seatbelt provide the needed unbalanced force?",
      ],
      modelExplanation: "Because of inertia (Newton's 1st Law), when a car is moving at 50 km/h, your body is also moving forward at 50 km/h. If the car brakes abruptly, your body naturally tends to keep moving forward. The seatbelt provides the necessary opposing force to safely stop your body with the car.",
    },
  },

  electricity: {
    moduleId: "electricity",
    bigQuestion: "How does flipping a small wall switch instantly light up a dark room?",
    storyAnchor: "Electricity is the flow of invisible subatomic particles called electrons carrying energy across closed conductive loops.",
    simpleExplanation: "For electricity to flow and power devices, there must be a continuous, unbroken path called a closed circuit. If a switch opens the circuit, the electron flow halts instantly.",
    realWorldExample: {
      title: "A Flashlight",
      icon: "🔦",
      description: "When you slide the flashlight switch, metal contacts touch to complete a closed loop. Electrons flow from the battery through the bulb's LED filament, producing bright light!",
    },
    vocabulary: [
      {
        term: "Electric Current",
        phonetic: "ih-LEK-trik KUR-ənt",
        definition: "The continuous flow of electric charge (electrons) through a conductor.",
        memoryTip: "A river of flowing electrons!",
      },
      {
        term: "Closed Circuit",
        phonetic: "KLOHZD SUR-kit",
        definition: "A complete, unbroken conductive loop that allows current to travel from source to load.",
        memoryTip: "No gaps: power is ON!",
      },
      {
        term: "Conductor",
        phonetic: "kən-DUK-ter",
        definition: "A material (like copper, aluminum, or water) that allows electrons to flow freely.",
        memoryTip: "Copper wires let electricity zoom!",
      },
      {
        term: "Insulator",
        phonetic: "IN-sə-lay-ter",
        definition: "A material (like rubber, plastic, or glass) that strongly resists electron flow.",
        memoryTip: "Rubber keeps us safe from shocks!",
      },
    ],
    prediction: {
      prompt: "In a series circuit with two light bulbs, what happens if one bulb is unscrewed or burns out?",
      options: [
        {
          id: "p_el1",
          text: "The circuit is broken (opened), so the other bulb turns off immediately.",
          feedback: "Correct! In a single series loop, any break stops current for all connected devices.",
          isCorrectPrediction: true,
        },
        {
          id: "p_el2",
          text: "The other bulb glows ten times brighter forever.",
          feedback: "Without a closed return path, current cannot flow anywhere in the loop.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Toggle switches, test conductors vs insulators, and build closed series loops on the virtual circuit board.",
    systemConnection: {
      earthLink: "Lightning is a massive natural electrical discharge between charged atmospheric clouds and the ground.",
      humanLink: "Your nervous system uses tiny electrical impulses traveling along neurons to control muscles and send thoughts!",
    },
    synthesisChallenge: {
      prompt: "Why are electrical wires in your house coated in rubber or plastic?",
      hints: [
        "What is inside the wire? (Copper conductor)",
        "What does plastic act as? (Insulator)",
        "What would happen if two bare wires touched?",
      ],
      modelExplanation: "Copper inside the wire is an excellent conductor that carries electrical current. The outer rubber or plastic coating is an insulator that prevents the electric current from leaking out, causing short circuits, or shocking people who touch the cord.",
    },
  },

  laws: {
    moduleId: "laws",
    bigQuestion: "How do we truly know what is real, and why do scientific ideas get updated over time?",
    storyAnchor: "Science is not a collection of unquestionable rules; it is humanity's collaborative method of observing, measuring, and testing reality.",
    simpleExplanation: "Scientists observe repeatable patterns in nature, form testable hypotheses, conduct controlled experiments, and build scientific models. Scientific Laws describe WHAT happens; Scientific Theories explain WHY it happens.",
    realWorldExample: {
      title: "Galileo Dropping Spheres",
      icon: "🔭",
      description: "Galileo tested ancient claims by dropping different weights from the Leaning Tower of Pisa, proving that in the absence of air resistance, all masses fall with the exact same gravitational acceleration!",
    },
    vocabulary: [
      {
        term: "Scientific Method",
        phonetic: "sy-ən-TIF-ik METH-əd",
        definition: "A systematic process: Observe ➔ Question ➔ Hypothesize ➔ Test ➔ Analyze ➔ Conclude.",
        memoryTip: "Look, Ask, Measure, Test, Learn!",
      },
      {
        term: "Scientific Law",
        phonetic: "sy-ən-TIF-ik LAW",
        definition: "A concise statement or mathematical equation describing a universal pattern (e.g. Gravity, Conservation of Mass).",
        memoryTip: "Describes WHAT happens under conditions.",
      },
      {
        term: "Scientific Theory",
        phonetic: "THEE-ə-ree",
        definition: "A well-tested, deeply supported explanation of natural phenomena based on vast evidence (e.g. Germ Theory, Plate Tectonics).",
        memoryTip: "Explains WHY and HOW things happen.",
      },
      {
        term: "Empirical Evidence",
        phonetic: "em-PEER-ih-kəl EV-ih-dəns",
        definition: "Information obtained by direct observation, measurement, and reproducible experimentation.",
        memoryTip: "Real measurements you can verify!",
      },
    ],
    prediction: {
      prompt: "If thousands of past experiments matched an old hypothesis, but a new verified experiment contradicts it, what must scientists do?",
      options: [
        {
          id: "p_la1",
          text: "Carefully re-verify the new evidence, repeat the test, and update or replace the hypothesis.",
          feedback: "Brilliant! Science is self-correcting. Evidence always outranks tradition or opinion.",
          isCorrectPrediction: true,
        },
        {
          id: "p_la2",
          text: "Hide the new data because old ideas are not allowed to change.",
          feedback: "Science thrives on honest evidence; updating our models is the very definition of progress.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Explore the scientific timeline from Archimedes to Newton and Einstein, comparing Laws, Models, and Theories.",
    systemConnection: {
      earthLink: "The laws of physics and chemistry discovered in Earth labs apply everywhere in the cosmos, from our moon to distant galaxies.",
      humanLink: "When you ask 'Why?', make a guess, and test it with an experiment, you are acting as a true scientist!",
    },
    synthesisChallenge: {
      prompt: "Explain why a scientific law is NOT just a theory that got 'promoted'.",
      hints: [
        "What does a Law do? (Describes a mathematical/physical pattern: WHAT happens)",
        "What does a Theory do? (Provides a comprehensive explanation: WHY it happens)",
        "Can a theory turn into a law?",
      ],
      modelExplanation: "A scientific law and a scientific theory do two different jobs. A Law describes WHAT happens under specific conditions (often as a mathematical equation, like F = ma). A Theory explains WHY and HOW it happens based on overwhelming evidence (like Atomic Theory). A theory never 'becomes' a law; they work together.",
    },
  },

  connected: {
    moduleId: "connected",
    bigQuestion: "How do physics, chemistry, biology, and Earth science tell one single magnificent story?",
    storyAnchor: "You are a living, thinking subsystem inside Earth's biosphere, sustained by the sun and governed by universal physical laws.",
    simpleExplanation: "Systems thinking means seeing the whole web: Physics gives us energy and forces; Chemistry gives us atomic bonds; Earth Science gives us habitats and cycles; Biology gives us life. Everything connects!",
    realWorldExample: {
      title: "Drinking a Glass of Water",
      icon: "💧",
      description: "When you drink water: Earth's Hydrosphere provided the water, Solar Energy evaporated it into clouds, Chemical bonds ($H_2O$) hold it together, and your Human Body uses it to power living cells!",
    },
    vocabulary: [
      {
        term: "Systems Thinking",
        phonetic: "SIS-təmz THINGK-ing",
        definition: "Understanding how components influence one another within a complete, interconnected whole.",
        memoryTip: "See the whole forest, not just one tree!",
      },
      {
        term: "Interdependence",
        phonetic: "in-ter-dih-PEN-dəns",
        definition: "The mutual reliance between living organisms and physical earth cycles for survival.",
        memoryTip: "All living things rely on each other!",
      },
      {
        term: "Stewardship",
        phonetic: "STOO-ərd-ship",
        definition: "The responsible care and protection of Earth's ecosystems and resources for future generations.",
        memoryTip: "Caring for our shared planetary home!",
      },
    ],
    prediction: {
      prompt: "If humanity protects wetlands and plant biodiversity, how does that ripple through the whole Earth system?",
      options: [
        {
          id: "p_co1",
          text: "Wetlands filter water, plants absorb CO₂, wildlife thrives, and climate stability is supported.",
          feedback: "Perfect systems thinking! Beneficial actions cascade positively through all 4 spheres.",
          isCorrectPrediction: true,
        },
        {
          id: "p_co2",
          text: "It only affects frogs and has zero impact on water or climate.",
          feedback: "Everything in nature is linked: water filtration, carbon cycling, and climate all connect.",
          isCorrectPrediction: false,
        },
      ],
    },
    experimentGoal: "Click on ecosystem nodes to simulate ecological disruptions and observe cascading feedback across spheres.",
    systemConnection: {
      earthLink: "Earth is the only known planet where all these systems align in perfect equilibrium to sustain conscious life.",
      humanLink: "Every action you take—conserving energy, planting seeds, asking questions—makes you an active steward of Earth.",
    },
    synthesisChallenge: {
      prompt: "Summarize how YOU are connected to the Sun, plants, water, and atoms right now.",
      hints: [
        "Where did the energy in your body originate? (The Sun via plant photosynthesis)",
        "What are your cells made of? (Atoms of carbon, hydrogen, oxygen)",
        "What cycle provides your drinking water? (Hydrological water cycle)",
      ],
      modelExplanation: "My body is built from atoms recycled by Earth's natural cycles. The energy fueling my thoughts and movements came from the Sun, captured by plants through photosynthesis and eaten as food. I drink water that has cycled Earth for billions of years, making me an active part of this connected living world.",
    },
  },
};
