// src/utils/dateUtils.js
/**
 * Formats a date string into a more readable format
 * @param {string} dateStr - Date string in MM/DD/YYYY format
 * @returns {string} - Formatted date
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "";

  const [month, day, year] = dateStr.split("/");
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Checks if a date is today
 * @param {string} dateStr - Date string in MM/DD/YYYY format
 * @returns {boolean} - True if date is today
 */
export const isToday = (dateStr) => {
  if (!dateStr) return false;

  const [month, day, year] = dateStr.split("/");
  const date = new Date(year, month - 1, day);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
