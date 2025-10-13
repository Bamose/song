import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";

// Types
import type { Song, SongSortField, SortOrder } from "@song-app/types";

// Hooks
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useSongFilters } from "../hooks/useSongFilters";

// Redux actions
import {
  deleteSongRequest,
  fetchSongsRequest,
  selectSong,
} from "../store/slices/songSlice";

// Utils
import {
  calculatePaginationInfo,
  createActionHandlers,
  createFilterChangeHandler,
  createPaginationHandlers,
  createSortChangeHandler,
} from "../utils";
import {
  ActionsCell,
  AlbumCell,
  ArtistCell,
  ButtonGroup,
  Container,
  ControlsRow,
  EmptyState,
  FilterControl,
  FilterGroup,
  FilterInput,
  FilterLabel,
  FiltersContainer,
  FilterSelect,
  GenreBadge,
  GenreCell,
  Header,
  IconButton,
  LoadingState,
  PageInfo,
  PageSizeSelect,
  PaginationBar,
  PaginationButton,
  PaginationControls,
  ResetButton,
  SearchContainer,
  SearchIconWrapper,
  SearchInput,
  SearchWrapper,
  Table,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
  Title,
  TitleCell,
} from "../styles/SongList.styles";

interface SongListProps {
  onAddClick: () => void;
}

const SongList: React.FC<SongListProps> = ({ onAddClick }) => {
  const dispatch = useAppDispatch();
  const { songs, isFetching, pagination } = useAppSelector(
    (state) => state.songs
  );

  // Use nuqs hook for URL-based filter management
  const {
    filters,
    rawFilters,
    updateFilters,
    updateSearchImmediate,
    updatePage,
    updatePageSize,
    updateSort,
    resetFilters,
    isInitialMount,
  } = useSongFilters();

  // Debounce the search value for API calls
  const [debouncedSearchValue] = useDebounce(rawFilters.search, 400);

  // Initial fetch on mount with URL params
  useEffect(() => {
    dispatch(fetchSongsRequest(filters));
  }, []);

  // Fetch songs whenever filters change (URL changes)
  useEffect(() => {
    // Skip initial mount as we already fetched in the first useEffect
    if (isInitialMount) {
      return;
    }
    dispatch(fetchSongsRequest(filters));
  }, [
    filters.artist,
    filters.album,
    filters.genre,
    filters.sortBy,
    filters.sortOrder,
    filters.page,
    filters.limit,
    dispatch,
  ]);

  // Separate effect for debounced search
  useEffect(() => {
    // Skip initial mount as we already fetched in the first useEffect
    if (isInitialMount) {
      return;
    }
    // Only trigger API call when debounced search value changes
    dispatch(fetchSongsRequest({ ...filters, search: debouncedSearchValue }));
  }, [debouncedSearchValue, dispatch]);

  // Reset page to 1 when search changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount) {
      return;
    }
    if (debouncedSearchValue !== rawFilters.search) {
      updatePage(1);
    }
  }, [debouncedSearchValue, rawFilters.search, isInitialMount, updatePage]);

  // Create action handlers using helper
  const { handleDelete, handleEdit } = createActionHandlers(
    dispatch,
    onAddClick
  );

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateSearchImmediate(value);
  };

  // Create filter change handlers using helper
  const handleFilterChange = createFilterChangeHandler(updateFilters, "artist");
  const handleAlbumFilterChange = createFilterChangeHandler(
    updateFilters,
    "album"
  );
  const handleGenreFilterChange = createFilterChangeHandler(
    updateFilters,
    "genre"
  );

  // Create sort change handlers using helper
  const { sortBy: handleSortByChange, sortOrder: handleSortOrderChange } =
    createSortChangeHandler(updateSort, filters.sortBy, filters.sortOrder);

  // Create pagination handlers using helper
  const { pageChange: handlePageChange, pageSizeChange: handlePageSizeChange } =
    createPaginationHandlers(
      updatePage,
      updatePageSize,
      pagination?.page ?? 1,
      pagination?.totalPages ?? 1
    );

  const handleResetFilters = () => {
    resetFilters();
  };

  // Calculate pagination info using helper
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const pageSize = filters.limit;
  const totalItems = pagination?.total ?? songs.length;

  const { hasPrevPage, hasNextPage, from, to } = calculatePaginationInfo(
    currentPage,
    totalPages,
    pageSize,
    songs.length,
    totalItems
  );

  const sortByValue: SongSortField = filters.sortBy;
  const sortOrderValue: SortOrder = filters.sortOrder;

  return (
    <Container>
      <Header>
        <Title>Your Song Library</Title>
      </Header>

      <SearchContainer>
        <SearchWrapper>
          <SearchIconWrapper>
            <span className="material-symbols-outlined">search</span>
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="Search for a song"
            value={rawFilters.search}
            onChange={handleSearchChange}
          />
        </SearchWrapper>
      </SearchContainer>

      <FiltersContainer>
        <FilterGroup>
          <FilterControl>
            <FilterLabel htmlFor="artist-filter">Artist</FilterLabel>
            <FilterInput
              id="artist-filter"
              type="text"
              placeholder="Filter by artist"
              value={rawFilters.artist}
              onChange={handleFilterChange}
            />
          </FilterControl>
          <FilterControl>
            <FilterLabel htmlFor="album-filter">Album</FilterLabel>
            <FilterInput
              id="album-filter"
              type="text"
              placeholder="Filter by album"
              value={rawFilters.album}
              onChange={handleAlbumFilterChange}
            />
          </FilterControl>
          <FilterControl>
            <FilterLabel htmlFor="genre-filter">Genre</FilterLabel>
            <FilterInput
              id="genre-filter"
              type="text"
              placeholder="Filter by genre"
              value={rawFilters.genre}
              onChange={handleGenreFilterChange}
            />
          </FilterControl>
        </FilterGroup>

        <ControlsRow>
          <FilterControl>
            <FilterLabel htmlFor="sort-by">Sort By</FilterLabel>
            <FilterSelect
              id="sort-by"
              value={sortByValue}
              onChange={handleSortByChange}
            >
              <option value="createdAt">Newest</option>
              <option value="updatedAt">Recently Updated</option>
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
              <option value="genre">Genre</option>
            </FilterSelect>
          </FilterControl>
          <FilterControl>
            <FilterLabel htmlFor="sort-order">Order</FilterLabel>
            <FilterSelect
              id="sort-order"
              value={sortOrderValue}
              onChange={handleSortOrderChange}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </FilterSelect>
          </FilterControl>
          <FilterControl>
            <FilterLabel htmlFor="page-size">Page Size</FilterLabel>
            <PageSizeSelect
              id="page-size"
              value={String(pageSize)}
              onChange={handlePageSizeChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </PageSizeSelect>
          </FilterControl>
          <ResetButton
            type="button"
            onClick={handleResetFilters}
            disabled={isFetching}
          >
            Reset
          </ResetButton>
        </ControlsRow>
      </FiltersContainer>

      <TableContainer>
        {isFetching ? (
          <LoadingState>Loading songs...</LoadingState>
        ) : songs.length === 0 ? (
          <EmptyState>
            <p>No songs found.</p>
          </EmptyState>
        ) : (
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Title</TableHeader>
                  <TableHeader>Artist</TableHeader>
                  <TableHeader>Album</TableHeader>
                  <TableHeader>Genre</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {songs.map((song) => (
                  <TableRow key={song._id}>
                    <TitleCell>{song.title}</TitleCell>
                    <ArtistCell>{song.artist}</ArtistCell>
                    <AlbumCell>{song.album}</AlbumCell>
                    <GenreCell>
                      <GenreBadge>
                        <span>{song.genre}</span>
                      </GenreBadge>
                    </GenreCell>
                    <ActionsCell>
                      <ButtonGroup>
                        <IconButton onClick={() => handleEdit(song)}>
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </IconButton>
                        <IconButton onClick={() => handleDelete(song._id!)}>
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </IconButton>
                      </ButtonGroup>
                    </ActionsCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </TableContainer>

      <PaginationBar>
        <PageInfo>
          {totalItems > 0
            ? `Showing ${from}–${to} of ${totalItems} songs`
            : "No songs to display"}
        </PageInfo>
        <PaginationControls>
          <PaginationButton
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage || isFetching}
          >
            Previous
          </PaginationButton>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          <PaginationButton
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage || isFetching}
          >
            Next
          </PaginationButton>
        </PaginationControls>
      </PaginationBar>
    </Container>
  );
};

export default SongList;
