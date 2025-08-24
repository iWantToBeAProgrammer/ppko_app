// growth-charts.ts

export interface GrowthChartData {
  Day: number;
  L: number;
  M: number;
  S: number;
}

export interface ZScoreResult {
  zScore: number;
  percentile: number;
  measurement: number;
  ageInDays: number;
}

export class GrowthChartCalculator {
  private data: GrowthChartData[];
  
  constructor(data: GrowthChartData[]) {
    this.data = data.sort((a, b) => a.Day - b.Day);
  }

  /**
   * Find the closest data point for a given age in days
   */
  private findClosestDataPoint(ageInDays: number): GrowthChartData {
    // For ages beyond the data range, use the last available data point
    if (ageInDays >= this.data[this.data.length - 1].Day) {
      return this.data[this.data.length - 1];
    }
    
    // For ages before the data range, use the first available data point
    if (ageInDays <= this.data[0].Day) {
      return this.data[0];
    }
    
    // Find the closest data point using binary search for efficiency
    let left = 0;
    let right = this.data.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (this.data[mid].Day === ageInDays) {
        return this.data[mid];
      } else if (this.data[mid].Day < ageInDays) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    // Return the closest data point (left is now the insertion point)
    if (left === 0) return this.data[0];
    if (left === this.data.length) return this.data[this.data.length - 1];
    
    const prev = this.data[left - 1];
    const next = this.data[left];
    
    // Return the closer of the two data points
    return (ageInDays - prev.Day) < (next.Day - ageInDays) ? prev : next;
  }

  /**
   * Calculate z-score using the LMS method
   * Formula: z = [(measurement/M)^L - 1] / (L * S)
   * For L = 0, the formula becomes: z = [ln(measurement/M)] / S
   */
  calculateZScore(measurement: number, ageInDays: number): ZScoreResult {
    const dataPoint = this.findClosestDataPoint(ageInDays);
    const { L, M, S } = dataPoint;
    
    let zScore: number;
    
    if (L === 0) {
      // When L = 0, use the logarithmic formula
      zScore = Math.log(measurement / M) / S;
    } else {
      // Standard LMS formula
      zScore = (Math.pow(measurement / M, L) - 1) / (L * S);
    }
    
    // Calculate percentile (assuming normal distribution)
    const percentile = this.calculatePercentile(zScore);
    
    return {
      zScore: this.roundToDecimal(zScore, 2),
      percentile: this.roundToDecimal(percentile, 1),
      measurement,
      ageInDays
    };
  }

  /**
   * Calculate percentile from z-score using the cumulative distribution function
   */
  private calculatePercentile(zScore: number): number {
    // This is a simplified approximation of the normal CDF
    // For more precise results, you might want to use a more accurate method
    const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
    const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
    let probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    
    if (zScore > 0) {
      probability = 1 - probability;
    }
    
    return probability * 100;
  }

  /**
   * Round a number to specified decimal places
   */
  private roundToDecimal(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  /**
   * Get measurement for a specific z-score at a given age
   */
  getMeasurementForZScore(zScore: number, ageInDays: number): number {
    const dataPoint = this.findClosestDataPoint(ageInDays);
    const { L, M, S } = dataPoint;
    
    let measurement: number;
    
    if (L === 0) {
      // When L = 0, use the logarithmic formula
      measurement = M * Math.exp(zScore * S);
    } else {
      // Standard LMS formula
      measurement = M * Math.pow(1 + L * S * zScore, 1 / L);
    }
    
    return this.roundToDecimal(measurement, 2);
  }

  /**
   * Get all percentiles for a given age (3rd, 10th, 25th, 50th, 75th, 90th, 97th)
   */
  getAllPercentiles(ageInDays: number): {[percentile: string]: number} {
    const percentiles = [3, 10, 25, 50, 75, 90, 97];
    const result: {[key: string]: number} = {};
    
    percentiles.forEach(p => {
      // Convert percentile to z-score (approximation)
      const zScore = this.percentileToZScore(p);
      const measurement = this.getMeasurementForZScore(zScore, ageInDays);
      result[`p${p}`] = measurement;
    });
    
    return result;
  }

  /**
   * Convert percentile to z-score (approximation)
   */
  private percentileToZScore(percentile: number): number {
    // This is a simplified approximation
    // For more precise results, use a proper quantile function
    const p = percentile / 100;
    
    if (p <= 0 || p >= 1) {
      throw new Error('Percentile must be between 0 and 100');
    }
    
    // Approximation for the normal quantile function
    const sign = p < 0.5 ? -1 : 1;
    const t = Math.sqrt(-2 * Math.log(p < 0.5 ? p : 1 - p));
    
    const z = sign * (t - ((0.010328 * t + 0.802853) * t + 2.515517) / 
                     (((0.001308 * t + 0.189269) * t + 1.432788) * t + 1.0));
    
    return this.roundToDecimal(z, 3);
  }
}

// Example usage with the provided boys data
// You would import this and use it with your actual data

// Example:
// import boysData from './boys.json';
// const boysCalculator = new GrowthChartCalculator(boysData);
// const result = boysCalculator.calculateZScore(60, 365); // 60cm at 1 year old
// console.log(result);