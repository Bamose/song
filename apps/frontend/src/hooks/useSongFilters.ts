import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { validateSortField, validateSortOrder } from "../utils";

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
      history: "replace",
      shallow: true,
    }
  );

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, []);

  const normalizedSortBy = validateSortField(filters.sortBy);
  const normalizedSortOrder = validateSortOrder(filters.sortOrder);

  const updateFilter = async (key: string, value: string | number | null) => {
    if (value === null || value === "" || value === undefined) {
      await setFilters({ [key]: null });
    } else {
      await setFilters({ [key]: value });
    }
  };

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

  const updateSearchImmediate = async (value: string) => {
    await setFilters({
      search: value || null,
    });
  };

  const updatePage = async (page: number) => {
    await setFilters({ page });
  };

  const updatePageSize = async (limit: number) => {
    await setFilters({ limit, page: 1 });
  };

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
    rawFilters: filters,
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
