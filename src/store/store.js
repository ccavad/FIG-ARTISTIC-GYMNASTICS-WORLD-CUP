// src/store/store.js
import { create } from "zustand";
import { athletes, results, eventInfo } from "../../public/mock-data";

const useStore = create((set) => ({
  // Event information
  eventInfo: eventInfo,

  // Athletes data
  athletes: athletes,
  filteredAthletes: athletes,

  // Results data
  results: results,
  filteredResults: results,

  // UI state
  activeTab: "live",
  expandedAthleteId: null,

  // Filters
  filters: {
    category: null, // MAG, WAG
    apparatus: null, // Floor, Pommel, etc.
    ageGroup: null, // Seniors, Juniors
    phase: null, // Qualification, Final
    discipline: null, // All-around, Apparatus, Team
  },

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleExpandAthlete: (id) =>
    set((state) => ({
      expandedAthleteId: state.expandedAthleteId === id ? null : id,
    })),

  setFilter: (filterName, value) =>
    set((state) => {
      // Toggle filter: set to value if different or null if the same
      const newFilters = {
        ...state.filters,
        [filterName]: state.filters[filterName] === value ? null : value,
      };

      // Apply the filters
      return {
        filters: newFilters,
        filteredAthletes: filterAthletes(state.athletes, newFilters),
        filteredResults: filterResults(state.results, newFilters),
      };
    }),

  clearFilters: () =>
    set((state) => ({
      filters: {
        category: null,
        apparatus: null,
        ageGroup: null,
        phase: null,
        discipline: null,
      },
      filteredAthletes: state.athletes,
      filteredResults: state.results,
    })),
}));

// Helper functions for filtering
function filterAthletes(athletes, filters) {
  // Start with all athletes
  let filtered = [...athletes];

  // Apply category filter (MAG/WAG)
  if (filters.category) {
    // In a real app, you would have a category property on each athlete
    // For now, let's assume all athletes are visible regardless of category
  }

  // Apply apparatus filter
  if (filters.apparatus) {
    // Handle the difference between display names and code names
    const apparatusCodeMap = {
      "floor exercise": "floor",
      "pommel horse": "pommel",
      rings: "rings",
      vault: "vault",
      "parallel bars": "pbars",
      "horizontal bar": "hbar",
      "uneven bars": "bars",
      "balance beam": "beam",
    };

    const apparatusCode = apparatusCodeMap[filters.apparatus.toLowerCase()];
    if (apparatusCode) {
      filtered = filtered.filter(
        (athlete) => athlete.apparatus === apparatusCode
      );
    }
  }

  // Apply age group filter
  if (filters.ageGroup) {
    // In a real app, you would have an ageGroup property on each athlete
    // For now, let's assume all athletes are visible regardless of age group
  }

  // Apply phase filter
  if (filters.phase) {
    // In a real app, you would have a phase property on each athlete
    // For now, let's assume all athletes are visible regardless of phase
  }

  // Apply discipline filter
  if (filters.discipline) {
    // In a real app, you would have a discipline property on each athlete
    // For now, let's assume all athletes are visible regardless of discipline
  }

  return filtered;
}

function filterResults(results, filters) {
  // Start with all results
  let filtered = [...results];

  // Apply category filter (MAG/WAG)
  if (filters.category) {
    // In a real app, you would have a category property on each result
    // For now, let's assume results are filterable by country codes as a demo
    if (filters.category === "MAG") {
      filtered = filtered.filter((result) =>
        ["RU", "IL", "PT", "GB"].includes(result.country)
      );
    } else if (filters.category === "WAG") {
      filtered = filtered.filter((result) =>
        ["PL", "NL", "EE"].includes(result.country)
      );
    }
  }

  // Apply apparatus filter
  if (filters.apparatus) {
    // In a real app, you would have an apparatus property on each result
    // For now, we'll leave this as is since the mock data doesn't include apparatus info
  }

  // Apply age group filter
  if (filters.ageGroup) {
    // In a real app, you would have an ageGroup property on each result
  }

  return filtered;
}

function mapApparatusCodeToName(code) {
  const apparatusMap = {
    floor: "Floor exercise",
    pommel: "Pommel horse",
    rings: "Rings",
    vault: "Vault",
    pbars: "Parallel bars",
    hbar: "Horizontal bar",
    bars: "Uneven bars",
    beam: "Balance beam",
  };

  return apparatusMap[code] || code;
}

export default useStore;
