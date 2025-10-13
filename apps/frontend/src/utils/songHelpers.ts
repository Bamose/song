import type { Song, SongSortField, SortOrder } from "@song-app/types";

/**
 * Helper function to calculate pagination info
 */
export const calculatePaginationInfo = (
  currentPage: number,
  totalPages: number,
  pageSize: number,
  songsLength: number,
  totalItems: number
) => {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const from = songsLength ? (currentPage - 1) * pageSize + 1 : 0;
  const to = songsLength ? (currentPage - 1) * pageSize + songsLength : 0;

  return {
    hasPrevPage,
    hasNextPage,
    from,
    to,
  };
};

/**
 * Helper function to validate sort field
 */
export const validateSortField = (sortBy: string): SongSortField => {
  const validSortFields: SongSortField[] = [
    "title",
    "artist",
    "album",
    "genre",
    "createdAt",
    "updatedAt",
  ];

  return validSortFields.includes(sortBy as SongSortField)
    ? (sortBy as SongSortField)
    : "createdAt";
};

/**
 * Helper function to validate sort order
 */
export const validateSortOrder = (sortOrder: string): SortOrder => {
  const validSortOrders: SortOrder[] = ["asc", "desc"];

  return validSortOrders.includes(sortOrder as SortOrder)
    ? (sortOrder as SortOrder)
    : "desc";
};

/**
 * Helper function to format song display data
 */
export const formatSongForDisplay = (song: Song) => ({
  id: song._id,
  title: song.title,
  artist: song.artist,
  album: song.album,
  genre: song.genre,
});

/**
 * Helper function to check if filters have changed
 */
export const hasFiltersChanged = (
  currentFilters: Record<string, any>,
  newFilters: Record<string, any>
): boolean => {
  return Object.keys(newFilters).some(
    (key) => currentFilters[key] !== newFilters[key]
  );
};

/**
 * Helper function to create filter change handler
 */
export const createFilterChangeHandler =
  (
    updateFilters: (updates: Record<string, string | number | null>) => void,
    key: "artist" | "album" | "genre"
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    updateFilters({ [key]: value || null, page: 1 });
  };

/**
 * Helper function to create sort change handler
 */
export const createSortChangeHandler = (
  updateSort: (sortBy: string, sortOrder?: string) => void,
  currentSortBy: string,
  currentSortOrder: string
) => ({
  sortBy: (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SongSortField;
    updateSort(value, currentSortOrder);
  },
  sortOrder: (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortOrder;
    updateSort(currentSortBy, value);
  },
});

/**
 * Helper function to create pagination handlers
 */
export const createPaginationHandlers = (
  updatePage: (page: number) => void,
  updatePageSize: (limit: number) => void,
  currentPage: number,
  totalPages: number
) => ({
  pageChange: (nextPage: number) => {
    if (nextPage < 1 || nextPage === currentPage) {
      return;
    }
    updatePage(nextPage);
  },
  pageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    updatePageSize(value);
  },
});

/**
 * Helper function to create action handlers
 */
export const createActionHandlers = (
  dispatch: any,
  onAddClick: () => void
) => ({
  handleDelete: (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch({ type: "songs/deleteSongRequest", payload: id });
    }
  },
  handleEdit: (song: Song) => {
    dispatch({ type: "songs/selectSong", payload: song });
    onAddClick();
  },
});
