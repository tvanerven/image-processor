/**
 * Calculates Euclidean distance between two RGB color values.
 */
export function rgbDistance(rgb1: number[], rgb2: number[]): number {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
    Math.pow(rgb1[1] - rgb2[1], 2) +
    Math.pow(rgb1[2] - rgb2[2], 2)
  );
}

/**
 * Finds the closest RGB color from a given array of colors.
 */
export function findMostSimilarRGB(targetRGB: number[], colorArray: number[][]): {
  closestColor: number[],
  colorIndex: number
} {
  let closestColor = colorArray[0];
  let smallestDistance = rgbDistance(targetRGB, closestColor);
  let index = 0;

  for (let i = 1; i < colorArray.length; i++) {
    const dist = rgbDistance(targetRGB, colorArray[i]);
    if (dist < smallestDistance) {
      smallestDistance = dist;
      closestColor = colorArray[i];
      index = i;
    }
  }

  return {
    closestColor,
    colorIndex: index
  };
}
