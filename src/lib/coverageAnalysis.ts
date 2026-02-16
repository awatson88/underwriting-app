import { PolicyData, HomeDetails, CoverageAnalysis } from './types';
import { materialCostData, laborCostData, calculateAverageInflation } from './inflationData';

// Cost per square foot by home quality (2019 baseline in Chicago metro)
const BASE_COST_PER_SQFT: Record<string, number> = {
  economy: 125,
  standard: 175,
  premium: 250,
  luxury: 350,
};

// Multipliers for various home features
const ROOF_MULTIPLIERS: Record<string, number> = {
  asphalt_shingle: 1.0,
  metal: 1.15,
  tile: 1.25,
  slate: 1.40,
  flat: 0.95,
};

const EXTERIOR_MULTIPLIERS: Record<string, number> = {
  vinyl: 0.95,
  wood: 1.05,
  brick: 1.20,
  stucco: 1.10,
  fiber_cement: 1.12,
};

const KITCHEN_MULTIPLIERS: Record<string, number> = {
  standard: 1.0,
  upgraded: 1.08,
  premium: 1.18,
};

const BATHROOM_MULTIPLIERS: Record<string, number> = {
  standard: 1.0,
  upgraded: 1.05,
  premium: 1.12,
};

export function calculateHomeQuality(home: HomeDetails): string {
  let qualityScore = 0;
  
  // Age factor
  const age = new Date().getFullYear() - home.yearBuilt;
  if (age < 5) qualityScore += 3;
  else if (age < 15) qualityScore += 2;
  else if (age < 30) qualityScore += 1;
  
  // Kitchen quality
  if (home.kitchenQuality === 'premium') qualityScore += 3;
  else if (home.kitchenQuality === 'upgraded') qualityScore += 2;
  else qualityScore += 1;
  
  // Bathroom quality
  if (home.bathroomQuality === 'premium') qualityScore += 3;
  else if (home.bathroomQuality === 'upgraded') qualityScore += 2;
  else qualityScore += 1;
  
  // Exterior type
  if (home.exteriorType === 'brick' || home.exteriorType === 'fiber_cement') qualityScore += 2;
  else if (home.exteriorType === 'stucco' || home.exteriorType === 'wood') qualityScore += 1;
  
  // Roof type
  if (home.roofType === 'slate' || home.roofType === 'tile') qualityScore += 2;
  else if (home.roofType === 'metal') qualityScore += 1;
  
  if (qualityScore >= 12) return 'luxury';
  if (qualityScore >= 8) return 'premium';
  if (qualityScore >= 5) return 'standard';
  return 'economy';
}

export function calculateRebuildCost(home: HomeDetails, year: number, fromYear: number = 2019): number {
  const quality = calculateHomeQuality(home);
  let baseCost = BASE_COST_PER_SQFT[quality] * home.squareFootage;
  
  // Apply multipliers
  baseCost *= ROOF_MULTIPLIERS[home.roofType] || 1.0;
  baseCost *= EXTERIOR_MULTIPLIERS[home.exteriorType] || 1.0;
  baseCost *= KITCHEN_MULTIPLIERS[home.kitchenQuality] || 1.0;
  baseCost *= BATHROOM_MULTIPLIERS[home.bathroomQuality] || 1.0;
  
  // Adjustments for features
  if (home.hasBasement) {
    baseCost += home.squareFootage * 0.3 * (home.basementFinished ? 80 : 40);
  }
  
  if (home.garageType !== 'none') {
    const garageSqft = home.garageCars * 250;
    baseCost += garageSqft * 75;
  }
  
  if (home.hasPool) {
    baseCost += 45000;
  }
  
  // Stories adjustment (multi-story more expensive per sqft)
  if (home.stories > 1) {
    baseCost *= 1 + (home.stories - 1) * 0.05;
  }
  
  // Apply inflation from policy year to target year
  if (year > fromYear) {
    const materialInflation = calculateAverageInflation(materialCostData, fromYear, year) / 100;
    const laborInflation = calculateAverageInflation(laborCostData, fromYear, year) / 100;
    // Construction is roughly 40% materials, 60% labor
    const totalInflation = materialInflation * 0.4 + laborInflation * 0.6;
    baseCost *= (1 + totalInflation);
  }
  
  return Math.round(baseCost);
}

export function analyzeCoverage(
  policy: PolicyData,
  home: HomeDetails
): CoverageAnalysis {
  const policyYear = new Date(policy.policyStartDate).getFullYear();
  const currentYear = 2025;
  
  // Calculate rebuild costs using policy year as baseline for inflation
  const rebuildCostOriginal = calculateRebuildCost(home, policyYear, policyYear); // No inflation at policy start
  const rebuildCostCurrent = calculateRebuildCost(home, currentYear, policyYear); // Inflation from policy year
  
  const materialInflation = calculateAverageInflation(materialCostData, policyYear, currentYear);
  const laborInflation = calculateAverageInflation(laborCostData, policyYear, currentYear);
  const totalInflation = (materialInflation * 0.4 + laborInflation * 0.6);
  
  const coverageGap = rebuildCostCurrent - policy.currentCoverage;
  const recommendedCoverage = Math.ceil(rebuildCostCurrent * 1.1 / 10000) * 10000; // 10% buffer, rounded
  
  const isUnderinsured = policy.currentCoverage < rebuildCostCurrent;
  const underinsuredPercent = isUnderinsured 
    ? ((rebuildCostCurrent - policy.currentCoverage) / rebuildCostCurrent) * 100 
    : 0;
  
  return {
    originalCoverage: policy.currentCoverage,
    rebuildCostOriginal,
    rebuildCostCurrent,
    materialInflation,
    laborInflation,
    totalInflation,
    coverageGap,
    recommendedCoverage,
    isUnderinsured,
    underinsuredPercent,
  };
}

export function generatePersonalizedMessage(
  policyholderName: string,
  policy: PolicyData,
  analysis: CoverageAnalysis
): string {
  const firstName = policyholderName.split(' ')[0];
  const policyYear = new Date(policy.policyStartDate).getFullYear();
  const yearsSince = 2025 - policyYear;
  
  if (!analysis.isUnderinsured) {
    return `Dear ${firstName},

Great news! Based on our analysis of your homeowner's insurance policy from ${policyYear}, your current coverage of ${formatCurrency(policy.currentCoverage)} appears to be adequate for today's rebuild costs.

While construction costs in the Chicago metro area have increased by approximately ${analysis.totalInflation.toFixed(0)}% since your policy was written, your coverage still meets or exceeds the estimated rebuild cost of ${formatCurrency(analysis.rebuildCostCurrent)}.

We recommend reviewing your policy annually to ensure you maintain this protection. If you've made any significant home improvements or additions, please let us know so we can update your coverage accordingly.

Best regards,
Your Insurance Team`;
  }
  
  return `Dear ${firstName},

I hope this message finds you well. I'm reaching out regarding your homeowner's insurance policy that was established in ${policyYear}, just before the pandemic began.

Over the past ${yearsSince} years, we've seen unprecedented changes in the construction industry. Based on Bureau of Labor Statistics data for the Chicago metropolitan area, I wanted to share some important findings with you:

📊 **Key Findings:**
• Construction material costs have increased by **${analysis.materialInflation.toFixed(0)}%** since ${policyYear}
• Contractor and labor costs have risen by **${analysis.laborInflation.toFixed(0)}%**
• Overall rebuild costs have increased by approximately **${analysis.totalInflation.toFixed(0)}%**

📋 **Your Current Coverage:**
• Policy Coverage: ${formatCurrency(policy.currentCoverage)}
• Estimated Current Rebuild Cost: ${formatCurrency(analysis.rebuildCostCurrent)}
• **Coverage Gap: ${formatCurrency(analysis.coverageGap)}**

This means that in the unfortunate event of a total loss, you could potentially be responsible for **${formatCurrency(analysis.coverageGap)}** in out-of-pocket expenses—that's ${analysis.underinsuredPercent.toFixed(0)}% of your home's rebuild value that wouldn't be covered.

🏠 **Our Recommendation:**
To ensure you and your family are fully protected, we recommend increasing your dwelling coverage to approximately **${formatCurrency(analysis.recommendedCoverage)}**. This includes a 10% buffer to account for any additional costs that may arise during reconstruction.

I understand that no one likes to think about worst-case scenarios, but my goal is to make sure you're properly safeguarded. The premium adjustment to achieve adequate coverage is typically much smaller than the financial risk of being underinsured.

**I'd love to schedule a brief call to discuss your options and answer any questions you may have.** There's no obligation—just a conversation to ensure you have the peace of mind you deserve.

Click here to schedule a call, or reply to this message and I'll reach out at your convenience.

Warm regards,

**Your Dedicated Insurance Advisor**
Continuous Underwriting Team

---
*This analysis is based on regional construction cost data and your policy details. Individual circumstances may vary. Please review your full policy documents for complete coverage information.*`;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
