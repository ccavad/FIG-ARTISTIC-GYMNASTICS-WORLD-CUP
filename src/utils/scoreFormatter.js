// src/utils/scoreFormatter.js
/**
 * Formats score numbers to ensure consistent display
 * @param {number} score - The score to format
 * @param {number} decimals - Number of decimal places to display
 * @returns {string} - Formatted score
 */
export const formatScore = (score, decimals = 3) => {
  if (score === undefined || score === null) return "-";

  // Format to specified number of decimal places
  return Number(score).toFixed(decimals);
};

/**
 * Adds visual styling to scores based on their value
 * @param {number} score - The score to evaluate
 * @param {number} maxScore - The maximum possible score (for comparison)
 * @returns {string} - CSS class name or color
 */
export const getScoreColor = (score, maxScore = 10) => {
  if (score === undefined || score === null) return "brand.text.secondary";

  const percentage = score / maxScore;

  if (percentage >= 0.9) return "green.400";
  if (percentage >= 0.7) return "brand.primary";
  if (percentage >= 0.5) return "yellow.400";
  return "red.400";
};
