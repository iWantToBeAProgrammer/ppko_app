import { getWHOParameters } from "@/app/data/who-standards";

export class ZScoreCalculator {
  /**
   * Calculate Z-score using static WHO data
   */
  static calculateZScoreFromStatic(
    heightCm: number,
    sex: "MALE" | "FEMALE",
    ageMonths: number
  ): { zScore: number; params: any } | null {
    const whoParams = getWHOParameters(sex, ageMonths);

    if (!whoParams) {
      return null;
    }

    const zScore = this.calculateZScore(heightCm, whoParams);

    return {
      zScore,
      params: whoParams,
    };
  }

  static calculateZScore(
    measurement: number,
    params: { l: number; m: number; s: number }
  ): number {
    const { l, m, s } = params;

    if (l !== 0) {
      return (Math.pow(measurement / m, l) - 1) / (l * s);
    } else {
      return Math.log(measurement / m) / s;
    }
  }
  static getStuntingStatus(zScore: number) {
    if (zScore < -3) {
      return "SEVERE";
    } else if (zScore < -2) {
      return "MODERATE";
    } else {
      return "NORMAL";
    }
  }

  static calculateAgeInMonths(
    dateOfBirth: Date,
    assessmentDate: Date = new Date()
  ): number {
    const months =
      (assessmentDate.getFullYear() - dateOfBirth.getFullYear()) * 12 +
      (assessmentDate.getMonth() - dateOfBirth.getMonth());

    const dayDiff = assessmentDate.getDate() - dateOfBirth.getDate();

    // Adjust for partial months
    if (dayDiff < 0) {
      return months - 1;
    }

    return months;
  }

  static getPercentile(zScore: number): number {
    // Using approximation of normal distribution
    const sign = zScore < 0 ? -1 : 1;
    const absZ = Math.abs(zScore);

    const t = 1 / (1 + 0.2316419 * absZ);
    const d = 0.3989423 * Math.exp((-absZ * absZ) / 2);
    const probability =
      d *
      t *
      (0.31938153 +
        t *
          (-0.356563782 +
            t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));

    const percentile = zScore < 0 ? probability * 100 : (1 - probability) * 100;

    return Math.round(percentile * 10) / 10;
  }
}
