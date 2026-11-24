export type AnimalId =
  | 'komodo'
  | 'riko'
  | 'fennec'
  | 'snow-leopard'
  | 'hachi'
  | 'deer'
  | 'otter'
  | 'turtle';

export type GuideId = 'geo' | 'maya' | 'komodo' | 'riko';

export interface GuideCharacter {
  id: GuideId;
  name: string;
  role: string;
  badge: string;
  avatar: string;
  animalId?: AnimalId;
  speciesTag?: string;
  bio: string;
  fieldGear: string;
}

export interface RegionInfo {
  id: string;
  name: string;
  englishName: string;
  area: string;
  population: string;
  highestPoint: string;
  longestRiver: string;
  dominantClimate: string;
  description: string;
  geographicFacts: string[];
  keyCountries: string[];
  mapPin: { x: number; y: number };
  svgPath: string;
  pinCoordinates: string;
  hypsometricColor: string;
  storyboardColor: string;
  elevationZone: string;
  themeClass: string;
}

export interface WildlifeMascot {
  animalId: AnimalId;
  name: string;
  species: string;
  adaptationFact: string;
}

export interface CaseStudyLocation {
  id: string;
  title: string;
  subtitle: string;
  regionName: string;
  category: 'Gurun' | 'Pegunungan' | 'Hutan Hujan' | 'Megapolitan';
  icon: string;
  imageUrl: string;
  wildlife: WildlifeMascot;
  coordinates: string;
  mapPin: { x: number; y: number };
  climate: string;
  elevation: string;
  summary: string;
  keyFindings: string[];
  humanImpact: string;
  accentColor: string;
}

export interface LandformItem {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
  shortTag: string;
  wildlife: WildlifeMascot;
  elevation: string;
  process: string;
  description: string;
  examplesGlobal: string;
  examplesIndonesia: string;
  humanActivity: string;
  accentColor: string;
}

export interface ClimateZoneItem {
  id: string;
  name: string;
  avgTemp: string;
  icon: string;
  latitudeBand: string;
  rainfall: string;
  characteristics: string;
  vegetation: string;
  accentClass: string;
}

export interface CountryPopItem {
  rank: number;
  name: string;
  continent: string;
  populationMillions: number;
  densityPerKm2: number;
  highlight: string;
}

export interface ResourceCategory {
  id: 'hutan' | 'air' | 'mineral' | 'pangan';
  name: string;
  icon: string;
  status: 'Baik' | 'Sedang' | 'Kritis';
  goodPct: number;
  moderatePct: number;
  criticalPct: number;
  summary: string;
  challenges: string;
  conservationSolution: string;
  indonesiaExample: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  geographicConcept: string;
}

export type GeoEnvironmentKey =
  | 'ocean-global'
  | 'desert-sahara'
  | 'mountain-himalaya'
  | 'rainforest-amazon'
  | 'coast-tokyo'
  | 'continent-europe'
  | 'continent-africa'
  | 'continent-north-america'
  | 'continent-oceania'
  | 'continent-antarctica'
  | 'plains-river';

export interface ActiveGeoContext {
  environment: GeoEnvironmentKey;
  regionLabel: string;
  wildlifeSummary: string;
}
