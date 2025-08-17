// app/data/who-standards.ts

export interface WHOStandardEntry {
  ageMonths: number;
  l: number;
  m: number;
  s: number;
}

export interface WHOStandards {
  male: WHOStandardEntry[];
  female: WHOStandardEntry[];
}

// WHO Child Growth Standards: Height-for-age (0-60 months)
// Source: WHO Anthro Survey Analyser
export const WHO_HEIGHT_FOR_AGE: WHOStandards = {
  male: [
    { ageMonths: 0, l: 1, m: 49.8842, s: 0.03795 },
    { ageMonths: 1, l: 1, m: 54.7244, s: 0.03557 },
    { ageMonths: 2, l: 1, m: 58.4249, s: 0.03424 },
    { ageMonths: 3, l: 1, m: 61.4292, s: 0.03328 },
    { ageMonths: 4, l: 1, m: 63.886, s: 0.03257 },
    { ageMonths: 5, l: 1, m: 65.9026, s: 0.03204 },
    { ageMonths: 6, l: 1, m: 67.6236, s: 0.03165 },
    { ageMonths: 7, l: 1, m: 69.1645, s: 0.03137 },
    { ageMonths: 8, l: 1, m: 70.5994, s: 0.03117 },
    { ageMonths: 9, l: 1, m: 71.9687, s: 0.03104 },
    { ageMonths: 10, l: 1, m: 73.2812, s: 0.03097 },
    { ageMonths: 11, l: 1, m: 74.5388, s: 0.03095 },
    { ageMonths: 12, l: 1, m: 75.7488, s: 0.03097 },
    { ageMonths: 13, l: 1, m: 76.9186, s: 0.03103 },
    { ageMonths: 14, l: 1, m: 78.0497, s: 0.03111 },
    { ageMonths: 15, l: 1, m: 79.1458, s: 0.03122 },
    { ageMonths: 16, l: 1, m: 80.2113, s: 0.03135 },
    { ageMonths: 17, l: 1, m: 81.2487, s: 0.03151 },
    { ageMonths: 18, l: 1, m: 82.2587, s: 0.03168 },
    { ageMonths: 19, l: 1, m: 83.2418, s: 0.03187 },
    { ageMonths: 20, l: 1, m: 84.1996, s: 0.03207 },
    { ageMonths: 21, l: 1, m: 85.1348, s: 0.03228 },
    { ageMonths: 22, l: 1, m: 86.0477, s: 0.0325 },
    { ageMonths: 23, l: 1, m: 86.9385, s: 0.03273 },
    { ageMonths: 24, l: 1, m: 87.8161, s: 0.03297 },
    { ageMonths: 25, l: 1, m: 87.972, s: 0.03542 },
    { ageMonths: 26, l: 1, m: 88.8065, s: 0.03576 },
    { ageMonths: 27, l: 1, m: 89.6197, s: 0.0361 },
    { ageMonths: 28, l: 1, m: 90.412, s: 0.03642 },
    { ageMonths: 29, l: 1, m: 91.1828, s: 0.03674 },
    { ageMonths: 30, l: 1, m: 91.9327, s: 0.03704 },
    { ageMonths: 31, l: 1, m: 92.6631, s: 0.03733 },
    { ageMonths: 32, l: 1, m: 93.3753, s: 0.03761 },
    { ageMonths: 33, l: 1, m: 94.0711, s: 0.03787 },
    { ageMonths: 34, l: 1, m: 94.7532, s: 0.03812 },
    { ageMonths: 35, l: 1, m: 95.4236, s: 0.03836 },
    { ageMonths: 36, l: 1, m: 96.0835, s: 0.03858 },
    { ageMonths: 37, l: 1, m: 96.7337, s: 0.03879 },
    { ageMonths: 38, l: 1, m: 97.3749, s: 0.039 },
    { ageMonths: 39, l: 1, m: 98.0073, s: 0.03919 },
    { ageMonths: 40, l: 1, m: 98.631, s: 0.03937 },
    { ageMonths: 41, l: 1, m: 99.2459, s: 0.03954 },
    { ageMonths: 42, l: 1, m: 99.8515, s: 0.03971 },
    { ageMonths: 43, l: 1, m: 100.4485, s: 0.03986 },
    { ageMonths: 44, l: 1, m: 101.0374, s: 0.04002 },
    { ageMonths: 45, l: 1, m: 101.6186, s: 0.04016 },
    { ageMonths: 46, l: 1, m: 102.1933, s: 0.04031 },
    { ageMonths: 47, l: 1, m: 102.7625, s: 0.04045 },
    { ageMonths: 48, l: 1, m: 103.3273, s: 0.04059 },
    { ageMonths: 49, l: 1, m: 103.8886, s: 0.04073 },
    { ageMonths: 50, l: 1, m: 104.4473, s: 0.04086 },
    { ageMonths: 51, l: 1, m: 105.0041, s: 0.041 },
    { ageMonths: 52, l: 1, m: 105.5596, s: 0.04113 },
    { ageMonths: 53, l: 1, m: 106.1138, s: 0.04126 },
    { ageMonths: 54, l: 1, m: 106.6668, s: 0.04139 },
    { ageMonths: 55, l: 1, m: 107.2188, s: 0.04152 },
    { ageMonths: 56, l: 1, m: 107.7697, s: 0.04165 },
    { ageMonths: 57, l: 1, m: 108.3198, s: 0.04177 },
    { ageMonths: 58, l: 1, m: 108.8689, s: 0.0419 },
    { ageMonths: 59, l: 1, m: 109.417, s: 0.04202 },
    { ageMonths: 60, l: 1, m: 109.9638, s: 0.04214 },
  ],
  female: [
    { ageMonths: 0, l: 1, m: 49.1477, s: 0.0379 },
    { ageMonths: 1, l: 1, m: 53.6872, s: 0.0364 },
    { ageMonths: 2, l: 1, m: 57.0673, s: 0.03568 },
    { ageMonths: 3, l: 1, m: 59.8029, s: 0.0352 },
    { ageMonths: 4, l: 1, m: 62.0899, s: 0.03486 },
    { ageMonths: 5, l: 1, m: 64.0301, s: 0.03463 },
    { ageMonths: 6, l: 1, m: 65.7311, s: 0.03448 },
    { ageMonths: 7, l: 1, m: 67.2873, s: 0.03441 },
    { ageMonths: 8, l: 1, m: 68.7498, s: 0.03439 },
    { ageMonths: 9, l: 1, m: 70.1435, s: 0.03442 },
    { ageMonths: 10, l: 1, m: 71.4818, s: 0.03449 },
    { ageMonths: 11, l: 1, m: 72.771, s: 0.03459 },
    { ageMonths: 12, l: 1, m: 74.0152, s: 0.03472 },
    { ageMonths: 13, l: 1, m: 75.2176, s: 0.03487 },
    { ageMonths: 14, l: 1, m: 76.3817, s: 0.03503 },
    { ageMonths: 15, l: 1, m: 77.5099, s: 0.03522 },
    { ageMonths: 16, l: 1, m: 78.6055, s: 0.03542 },
    { ageMonths: 17, l: 1, m: 79.6716, s: 0.03563 },
    { ageMonths: 18, l: 1, m: 80.7079, s: 0.03585 },
    { ageMonths: 19, l: 1, m: 81.7182, s: 0.03608 },
    { ageMonths: 20, l: 1, m: 82.7036, s: 0.03632 },
    { ageMonths: 21, l: 1, m: 83.6654, s: 0.03657 },
    { ageMonths: 22, l: 1, m: 84.6045, s: 0.03683 },
    { ageMonths: 23, l: 1, m: 85.5202, s: 0.03709 },
    { ageMonths: 24, l: 1, m: 85.7153, s: 0.03764 },
    { ageMonths: 25, l: 1, m: 86.5904, s: 0.03786 },
    { ageMonths: 26, l: 1, m: 87.4462, s: 0.03808 },
    { ageMonths: 27, l: 1, m: 88.283, s: 0.0383 },
    { ageMonths: 28, l: 1, m: 89.1004, s: 0.03851 },
    { ageMonths: 29, l: 1, m: 89.8991, s: 0.03872 },
    { ageMonths: 30, l: 1, m: 90.6797, s: 0.03893 },
    { ageMonths: 31, l: 1, m: 91.443, s: 0.03913 },
    { ageMonths: 32, l: 1, m: 92.1906, s: 0.03933 },
    { ageMonths: 33, l: 1, m: 92.9239, s: 0.03952 },
    { ageMonths: 34, l: 1, m: 93.6444, s: 0.03971 },
    { ageMonths: 35, l: 1, m: 94.3533, s: 0.03989 },
    { ageMonths: 36, l: 1, m: 95.0515, s: 0.04006 },
    { ageMonths: 37, l: 1, m: 95.7399, s: 0.04024 },
    { ageMonths: 38, l: 1, m: 96.4187, s: 0.04041 },
    { ageMonths: 39, l: 1, m: 97.0885, s: 0.04057 },
    { ageMonths: 40, l: 1, m: 97.7493, s: 0.04073 },
    { ageMonths: 41, l: 1, m: 98.4015, s: 0.04089 },
    { ageMonths: 42, l: 1, m: 99.0448, s: 0.04105 },
    { ageMonths: 43, l: 1, m: 99.6795, s: 0.0412 },
    { ageMonths: 44, l: 1, m: 100.3058, s: 0.04135 },
    { ageMonths: 45, l: 1, m: 100.9238, s: 0.0415 },
    { ageMonths: 46, l: 1, m: 101.5337, s: 0.04164 },
    { ageMonths: 47, l: 1, m: 102.136, s: 0.04179 },
    { ageMonths: 48, l: 1, m: 102.7312, s: 0.04193 },
    { ageMonths: 49, l: 1, m: 103.3197, s: 0.04206 },
    { ageMonths: 50, l: 1, m: 103.9021, s: 0.0422 },
    { ageMonths: 51, l: 1, m: 104.4786, s: 0.04233 },
    { ageMonths: 52, l: 1, m: 105.0494, s: 0.04246 },
    { ageMonths: 53, l: 1, m: 105.6148, s: 0.04259 },
    { ageMonths: 54, l: 1, m: 106.1748, s: 0.04272 },
    { ageMonths: 55, l: 1, m: 106.7295, s: 0.04285 },
    { ageMonths: 56, l: 1, m: 107.2788, s: 0.04298 },
    { ageMonths: 57, l: 1, m: 107.8227, s: 0.0431 },
    { ageMonths: 58, l: 1, m: 108.3613, s: 0.04322 },
    { ageMonths: 59, l: 1, m: 108.8948, s: 0.04334 },
    { ageMonths: 60, l: 1, m: 109.4233, s: 0.04347 },
  ],
};

// Helper function to get WHO parameters
export function getWHOParameters(
  sex: "MALE" | "FEMALE",
  ageMonths: number
): WHOStandardEntry | null {
  const standards =
    sex === "MALE" ? WHO_HEIGHT_FOR_AGE.male : WHO_HEIGHT_FOR_AGE.female;

  // Find exact match
  const exactMatch = standards.find((s) => s.ageMonths === ageMonths);
  if (exactMatch) return exactMatch;

  // For ages between data points, interpolate
  const lowerBound = standards.filter((s) => s.ageMonths <= ageMonths).pop();
  const upperBound = standards.find((s) => s.ageMonths > ageMonths);

  if (!lowerBound || !upperBound) {
    // If age is outside range, return closest boundary
    if (ageMonths < 0) return standards[0];
    if (ageMonths > 60) return standards[standards.length - 1];
    return null;
  }

  // Linear interpolation between two data points
  const fraction =
    (ageMonths - lowerBound.ageMonths) /
    (upperBound.ageMonths - lowerBound.ageMonths);

  return {
    ageMonths,
    l: lowerBound.l + (upperBound.l - lowerBound.l) * fraction,
    m: lowerBound.m + (upperBound.m - lowerBound.m) * fraction,
    s: lowerBound.s + (upperBound.s - lowerBound.s) * fraction,
  };
}
