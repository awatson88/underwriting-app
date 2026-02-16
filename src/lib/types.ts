export interface PolicyData {
  policyNumber: string;
  policyholderName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  policyStartDate: string;
  currentCoverage: number;
  annualPremium: number;
  deductible: number;
}

export interface HomeDetails {
  squareFootage: number;
  yearBuilt: number;
  stories: number;
  bedrooms: number;
  bathrooms: number;
  garageType: 'none' | 'attached' | 'detached';
  garageCars: number;
  roofType: 'asphalt_shingle' | 'metal' | 'tile' | 'slate' | 'flat';
  roofAge: number;
  exteriorType: 'brick' | 'vinyl' | 'wood' | 'stucco' | 'fiber_cement';
  heatingType: 'forced_air' | 'radiant' | 'heat_pump' | 'boiler';
  coolingType: 'central_ac' | 'window_units' | 'none';
  hasBasement: boolean;
  basementFinished: boolean;
  hasPool: boolean;
  kitchenQuality: 'standard' | 'upgraded' | 'premium';
  bathroomQuality: 'standard' | 'upgraded' | 'premium';
}

export interface CostCategory {
  name: string;
  category: 'material' | 'labor';
  icon: string;
  data: YearlyData[];
}

export interface YearlyData {
  year: number;
  value: number;
  percentChange: number;
}

export interface CoverageAnalysis {
  originalCoverage: number;
  rebuildCostOriginal: number;
  rebuildCostCurrent: number;
  materialInflation: number;
  laborInflation: number;
  totalInflation: number;
  coverageGap: number;
  recommendedCoverage: number;
  isUnderinsured: boolean;
  underinsuredPercent: number;
}

export interface PropertyImage {
  url: string;
  source: string;
  alt: string;
}
