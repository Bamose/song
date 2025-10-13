import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useEffect, useRef } from "react";

// Types
import type { SongSortField, SortOrder } from "@song-app/types";

// Utils
import { validateSortField, validateSortOrder } from "../utils";

/**
 * Custom hook to manage song filters using URL query parameters via nuqs.
 * This eliminates the need for multiple useEffect hooks and keeps URL as source of truth.
 */
export const useSongFilters = () => {
  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      artist: parseAsString.withDefault(""),
      album: parseAsString.withDefault(""),
      genre: parseAsString.withDefault(""),
      sortBy: parseAsString.withDefault("createdAt"),
      sortOrder: parseAsString.withDefault("desc"),
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
    },
    {
      // Use 'replace' to avoid cluttering browser history with every filter change
      history: "replace",
      // Shallow option to prevent full page re-render
      shallow: true,
    }
  );

  // Track if this is the initial mount
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the initial mount to prevent double fetch
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, []);

  // Validate and normalize sortBy and sortOrder using helpers
  const normalizedSortBy = validateSortField(filters.sortBy);
  const normalizedSortOrder = validateSortOrder(filters.sortOrder);

  // Helper to update a single filter
  const updateFilter = async (key: string, value: string | number | null) => {
    if (value === null || value === "" || value === undefined) {
      // Remove the parameter from URL if empty
      await setFilters({ [key]: null });
    } else {
      await setFilters({ [key]: value });
    }
  };

  // Helper to update multiple filters at once
  const updateFilters = async (
    updates: Record<string, string | number | null>
  ) => {
    const cleanedUpdates = Object.entries(updates).reduce(
      (acc, [key, value]) => {
        acc[key] =
          value === null || value === "" || value === undefined ? null : value;
        return acc;
      },
      {} as Record<string, string | number | null>
    );

    await setFilters(cleanedUpdates);
  };

  // Helper to reset all filters to defaults
  const resetFilters = async () => {
    await setFilters({
      search: null,
      artist: null,
      album: null,
      genre: null,
      sortBy: "createdAt",
      sortOrder: "desc",
      page: 1,
      limit: 10,
    });
  };

  // Helper to update search immediately (for input value, no page reset)
  const updateSearchImmediate = async (value: string) => {
    await setFilters({
      search: value || null,
    });
  };

  // Helper to update pagination
  const updatePage = async (page: number) => {
    await setFilters({ page });
  };

  const updatePageSize = async (limit: number) => {
    await setFilters({ limit, page: 1 });
  };

  // Helper to update sorting
  const updateSort = async (sortBy: string, sortOrder?: string) => {
    await setFilters({
      sortBy,
      ...(sortOrder && { sortOrder }),
      page: 1,
    });
  };

  return {
    filters: {
      search: filters.search || undefined,
      artist: filters.artist || undefined,
      album: filters.album || undefined,
      genre: filters.genre || undefined,
      sortBy: normalizedSortBy,
      sortOrder: normalizedSortOrder,
      page: filters.page,
      limit: filters.limit,
    },
    // Raw filters for displaying in inputs
    rawFilters: filters,
    // Update methods
    updateFilter,
    updateFilters,
    updateSearchImmediate,
    updatePage,
    updatePageSize,
    updateSort,
    resetFilters,
    isInitialMount: isInitialMount.current,
  };
};
