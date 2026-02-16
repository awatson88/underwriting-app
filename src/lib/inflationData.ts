import { CostCategory } from './types';

// Chicago Metro Construction Cost Data (BLS-style)
// Based on Producer Price Index and Bureau of Labor Statistics data patterns

export const materialCostData: CostCategory[] = [
  {
    name: 'Lumber & Wood Products',
    category: 'material',
    icon: '🪵',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 108.5, percentChange: 8.5 },
      { year: 2021, value: 172.3, percentChange: 58.8 },
      { year: 2022, value: 145.2, percentChange: -15.7 },
      { year: 2023, value: 128.6, percentChange: -11.4 },
      { year: 2024, value: 135.4, percentChange: 5.3 },
      { year: 2025, value: 142.8, percentChange: 5.5 },
    ],
  },
  {
    name: 'Brick & Masonry',
    category: 'material',
    icon: '🧱',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 103.2, percentChange: 3.2 },
      { year: 2021, value: 112.8, percentChange: 9.3 },
      { year: 2022, value: 124.5, percentChange: 10.4 },
      { year: 2023, value: 133.7, percentChange: 7.4 },
      { year: 2024, value: 141.2, percentChange: 5.6 },
      { year: 2025, value: 148.9, percentChange: 5.5 },
    ],
  },
  {
    name: 'Roofing Materials',
    category: 'material',
    icon: '🏠',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 105.8, percentChange: 5.8 },
      { year: 2021, value: 118.4, percentChange: 11.9 },
      { year: 2022, value: 135.6, percentChange: 14.5 },
      { year: 2023, value: 148.2, percentChange: 9.3 },
      { year: 2024, value: 156.8, percentChange: 5.8 },
      { year: 2025, value: 164.5, percentChange: 4.9 },
    ],
  },
  {
    name: 'Concrete & Cement',
    category: 'material',
    icon: '🪨',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 102.4, percentChange: 2.4 },
      { year: 2021, value: 108.6, percentChange: 6.1 },
      { year: 2022, value: 119.8, percentChange: 10.3 },
      { year: 2023, value: 128.4, percentChange: 7.2 },
      { year: 2024, value: 135.6, percentChange: 5.6 },
      { year: 2025, value: 142.3, percentChange: 4.9 },
    ],
  },
  {
    name: 'Windows & Glass',
    category: 'material',
    icon: '🪟',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 104.2, percentChange: 4.2 },
      { year: 2021, value: 115.8, percentChange: 11.1 },
      { year: 2022, value: 128.4, percentChange: 10.9 },
      { year: 2023, value: 138.6, percentChange: 7.9 },
      { year: 2024, value: 145.2, percentChange: 4.8 },
      { year: 2025, value: 151.8, percentChange: 4.5 },
    ],
  },
  {
    name: 'Electrical Materials',
    category: 'material',
    icon: '⚡',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 106.8, percentChange: 6.8 },
      { year: 2021, value: 125.4, percentChange: 17.4 },
      { year: 2022, value: 142.8, percentChange: 13.9 },
      { year: 2023, value: 152.6, percentChange: 6.9 },
      { year: 2024, value: 159.4, percentChange: 4.5 },
      { year: 2025, value: 166.2, percentChange: 4.3 },
    ],
  },
  {
    name: 'Plumbing Fixtures',
    category: 'material',
    icon: '🚿',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 104.5, percentChange: 4.5 },
      { year: 2021, value: 116.2, percentChange: 11.2 },
      { year: 2022, value: 129.8, percentChange: 11.7 },
      { year: 2023, value: 140.2, percentChange: 8.0 },
      { year: 2024, value: 148.6, percentChange: 6.0 },
      { year: 2025, value: 155.8, percentChange: 4.8 },
    ],
  },
  {
    name: 'HVAC Equipment',
    category: 'material',
    icon: '❄️',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 103.8, percentChange: 3.8 },
      { year: 2021, value: 112.4, percentChange: 8.3 },
      { year: 2022, value: 125.6, percentChange: 11.7 },
      { year: 2023, value: 136.8, percentChange: 8.9 },
      { year: 2024, value: 145.2, percentChange: 6.1 },
      { year: 2025, value: 152.4, percentChange: 5.0 },
    ],
  },
];

export const laborCostData: CostCategory[] = [
  {
    name: 'General Construction Workers',
    category: 'labor',
    icon: '👷',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 103.2, percentChange: 3.2 },
      { year: 2021, value: 108.8, percentChange: 5.4 },
      { year: 2022, value: 116.4, percentChange: 7.0 },
      { year: 2023, value: 124.8, percentChange: 7.2 },
      { year: 2024, value: 132.6, percentChange: 6.3 },
      { year: 2025, value: 139.8, percentChange: 5.4 },
    ],
  },
  {
    name: 'Electricians',
    category: 'labor',
    icon: '🔌',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 104.5, percentChange: 4.5 },
      { year: 2021, value: 112.6, percentChange: 7.8 },
      { year: 2022, value: 122.8, percentChange: 9.1 },
      { year: 2023, value: 133.4, percentChange: 8.6 },
      { year: 2024, value: 143.2, percentChange: 7.3 },
      { year: 2025, value: 152.6, percentChange: 6.6 },
    ],
  },
  {
    name: 'Plumbers',
    category: 'labor',
    icon: '🔧',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 104.8, percentChange: 4.8 },
      { year: 2021, value: 113.2, percentChange: 8.0 },
      { year: 2022, value: 124.6, percentChange: 10.1 },
      { year: 2023, value: 135.8, percentChange: 9.0 },
      { year: 2024, value: 146.2, percentChange: 7.7 },
      { year: 2025, value: 156.4, percentChange: 7.0 },
    ],
  },
  {
    name: 'HVAC Technicians',
    category: 'labor',
    icon: '🌡️',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 104.2, percentChange: 4.2 },
      { year: 2021, value: 111.8, percentChange: 7.3 },
      { year: 2022, value: 121.4, percentChange: 8.6 },
      { year: 2023, value: 131.6, percentChange: 8.4 },
      { year: 2024, value: 141.2, percentChange: 7.3 },
      { year: 2025, value: 150.4, percentChange: 6.5 },
    ],
  },
  {
    name: 'Roofers',
    category: 'labor',
    icon: '🏗️',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 105.2, percentChange: 5.2 },
      { year: 2021, value: 114.8, percentChange: 9.1 },
      { year: 2022, value: 126.4, percentChange: 10.1 },
      { year: 2023, value: 138.2, percentChange: 9.3 },
      { year: 2024, value: 149.6, percentChange: 8.2 },
      { year: 2025, value: 160.8, percentChange: 7.5 },
    ],
  },
  {
    name: 'Carpenters',
    category: 'labor',
    icon: '🪚',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 103.8, percentChange: 3.8 },
      { year: 2021, value: 110.6, percentChange: 6.6 },
      { year: 2022, value: 119.2, percentChange: 7.8 },
      { year: 2023, value: 128.4, percentChange: 7.7 },
      { year: 2024, value: 137.2, percentChange: 6.9 },
      { year: 2025, value: 145.6, percentChange: 6.1 },
    ],
  },
  {
    name: 'Painters',
    category: 'labor',
    icon: '🎨',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 102.8, percentChange: 2.8 },
      { year: 2021, value: 108.4, percentChange: 5.4 },
      { year: 2022, value: 115.2, percentChange: 6.3 },
      { year: 2023, value: 122.6, percentChange: 6.4 },
      { year: 2024, value: 129.8, percentChange: 5.9 },
      { year: 2025, value: 136.4, percentChange: 5.1 },
    ],
  },
  {
    name: 'Masons',
    category: 'labor',
    icon: '🧱',
    data: [
      { year: 2019, value: 100.0, percentChange: 0 },
      { year: 2020, value: 104.6, percentChange: 4.6 },
      { year: 2021, value: 112.8, percentChange: 7.8 },
      { year: 2022, value: 123.2, percentChange: 9.2 },
      { year: 2023, value: 134.6, percentChange: 9.3 },
      { year: 2024, value: 145.4, percentChange: 8.0 },
      { year: 2025, value: 155.8, percentChange: 7.2 },
    ],
  },
];

// Calculate average inflation for a category type
export function calculateAverageInflation(
  categories: CostCategory[],
  fromYear: number,
  toYear: number
): number {
  let totalInflation = 0;
  let count = 0;

  categories.forEach((category) => {
    const fromData = category.data.find((d) => d.year === fromYear);
    const toData = category.data.find((d) => d.year === toYear);
    if (fromData && toData) {
      totalInflation += ((toData.value - fromData.value) / fromData.value) * 100;
      count++;
    }
  });

  return count > 0 ? totalInflation / count : 0;
}

// Get combined inflation data for charts
export function getCombinedInflationData() {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  
  return years.map((year) => {
    let materialTotal = 0;
    let laborTotal = 0;
    
    materialCostData.forEach((cat) => {
      const yearData = cat.data.find((d) => d.year === year);
      if (yearData) materialTotal += yearData.value;
    });
    
    laborCostData.forEach((cat) => {
      const yearData = cat.data.find((d) => d.year === year);
      if (yearData) laborTotal += yearData.value;
    });
    
    return {
      year,
      materials: materialTotal / materialCostData.length,
      labor: laborTotal / laborCostData.length,
      combined: (materialTotal / materialCostData.length + laborTotal / laborCostData.length) / 2,
    };
  });
}
