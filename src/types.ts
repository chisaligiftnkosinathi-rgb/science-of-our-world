export type ModuleId =
  | "home"
  | "systems"
  | "human"
  | "earth"
  | "food"
  | "energy"
  | "cycles"
  | "matter"
  | "chemistry"
  | "forces"
  | "electricity"
  | "laws"
  | "connected"
  | "map"
  | "journal"
  | "detective"
  | "sandbox"
  | "laboratory"
  | "capstone"
  | "challenge";

export type MasteryLevel = "discover" | "explore" | "explain" | "build";

export interface CourseModule {
  id: ModuleId;
  number: string;
  category: string;
  icon: string;
  title: string;
  shortTitle: string;
  description: string;
  badgeColor: string;
}

export interface ScienceMapNode {
  id: string;
  label: string;
  icon: string;
  category: "cosmos" | "earth" | "life" | "human" | "science";
  tier: number;
  tagline: string;
  description: string;
  storySnippet: string;
  connectionToChild: string;
  targetLesson: ModuleId;
  childrenIds?: string[];
}

export interface VocabularyTerm {
  term: string;
  phonetic?: string;
  definition: string;
  memoryTip: string;
}

export interface ScientistPrediction {
  prompt: string;
  options: {
    id: string;
    text: string;
    feedback: string;
    isCorrectPrediction: boolean;
  }[];
}

export interface LessonPedagogy {
  moduleId: ModuleId;
  bigQuestion: string;
  storyAnchor: string;
  simpleExplanation: string;
  realWorldExample: {
    title: string;
    icon: string;
    description: string;
  };
  vocabulary: VocabularyTerm[];
  prediction: ScientistPrediction;
  experimentGoal: string;
  systemConnection: {
    earthLink: string;
    humanLink: string;
  };
  synthesisChallenge: {
    prompt: string;
    hints: string[];
    modelExplanation: string;
  };
  epistemology?: RealityModelEvidence;
}

export interface Organism {
  id: string;
  icon: string;
  name: string;
  type: "producer" | "consumer" | "decomposer";
  tier: number; // 1: producer, 2: primary consumer, 3: secondary consumer, 4: apex, 5: decomposer
  description: string;
  diet?: string;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  concept: string;
  options: QuizOption[];
}

export interface TimelineEvent {
  period: string;
  pioneer: string;
  icon: string;
  contribution: string;
  significance: string;
}

export interface LaboratoryExperiment {
  id: string;
  title: string;
  icon: string;
  category: string;
  tagline: string;
  description: string;
  controls: {
    label: string;
    description: string;
  }[];
}

export interface EcosystemState {
  sunlight: number; // 0 - 100%
  rainfall: number; // 0 - 100%
  plantBiomass: number; // 0 - 100
  herbivores: number; // count
  predators: number; // count
  hasDecomposers: boolean;
  temperature: number; // Celsius
}

export interface JournalEntry {
  id: string;
  moduleId: ModuleId;
  lessonTitle: string;
  timestamp: string;
  question: string;
  hypothesis: string;
  observation: string;
  conclusion: string;
  confidenceRating: number; // 1 to 5
}

export interface RealityModelEvidence {
  reality: string; // The rich, vast natural reality
  model: string; // The simplified variables & equations
  whySimplify: string; // Why scientists simplify reality to study it
  evidence: string; // Real-world measurements testing the model
  explanation: string; // The scientific mechanism and theory of WHY
}

export interface SystemEnginePreset {
  id: string;
  name: string;
  icon: string;
  category: string;
  tagline: string;
  inputs: {
    name: string;
    icon: string;
    unit?: string;
    value: number;
    min: number;
    max: number;
    step: number;
    description: string;
  }[];
  systemName: string;
  systemDescription: string;
  processes: {
    name: string;
    icon: string;
    description: string;
    formula?: string;
  }[];
  outputs: {
    name: string;
    icon: string;
    unit: string;
    calculate: (inputs: Record<string, number>) => number;
    description: string;
  }[];
  feedbackRule: string;
  homeostasisTarget: string;
  targetLesson: ModuleId;
  epistemology?: RealityModelEvidence;
}
