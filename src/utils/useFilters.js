// src/hooks/useFilters.js
import { useCallback } from "react";
import useStore from "../store/store";

/**
 * Custom hook to handle filtering functionality
 * @returns {Object} - Filter-related properties and methods
 */
export const useFilters = () => {
  const { filters, setFilter, clearFilters } = useStore();

  // Helper function to check if any filters are active
  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some((val) => val !== null);
  }, [filters]);

  // Get count of active filters
  const activeFilterCount = useCallback(() => {
    return Object.values(filters).filter((val) => val !== null).length;
  }, [filters]);

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
};
