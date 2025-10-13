import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  fetchSongsRequest,
  deleteSongRequest,
  selectSong,
} from "../store/slices/songSlice";
import type { Song, SongSortField, SortOrder } from "@song-app/types";
import {
  Container,
  Header,
  Title,
  SearchContainer,
  SearchWrapper,
  SearchIconWrapper,
  SearchInput,
  FiltersContainer,
  FilterGroup,
  FilterControl,
  FilterLabel,
  FilterInput,
  FilterSelect,
  ControlsRow,
  ResetButton,
  TableContainer,
  TableWrapper,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TitleCell,
  ArtistCell,
  AlbumCell,
  GenreCell,
  GenreBadge,
  ActionsCell,
  ButtonGroup,
  IconButton,
  EmptyState,
  LoadingState,
  PaginationBar,
  PaginationControls,
  PaginationButton,
  PageInfo,
  PageSizeSelect,
} from "../styles/SongList.styles";

interface SongListProps {
  onAddClick: () => void;
}

const SongList: React.FC<SongListProps> = ({ onAddClick }) => {
  const dispatch = useAppDispatch();
  const { songs, isFetching, filters, pagination } = useAppSelector(
    (state) => state.songs
  );
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const skipInitialSearch = useRef(true);
  const suppressNextSearch = useRef(false);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  useEffect(() => {
    const nextValue = filters.search ?? "";
    if (nextValue === searchValue) {
      return;
    }
    suppressNextSearch.current = true;
    setSearchValue(nextValue);
  }, [filters.search, searchValue]);

  useEffect(() => {
    if (skipInitialSearch.current) {
      skipInitialSearch.current = false;
      return;
    }

    if (suppressNextSearch.current) {
      suppressNextSearch.current = false;
      return;
    }

    const handler = window.setTimeout(() => {
      const trimmedSearch = searchValue.trim();
      dispatch(
        fetchSongsRequest({
          search: trimmedSearch.length > 0 ? trimmedSearch : undefined,
          page: 1,
        })
      );
    }, 400);

    return () => {
      window.clearTimeout(handler);
    };
  }, [searchValue, dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongRequest(id));
    }
  };

  const handleEdit = (song: Song) => {
    dispatch(selectSong(song));
    onAddClick();
  };

  const handleFilterChange =
    (key: "artist" | "album" | "genre") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      dispatch(
        fetchSongsRequest({
          [key]: value.length > 0 ? value : undefined,
          page: 1,
        })
      );
    };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SongSortField;
    dispatch(
      fetchSongsRequest({
        sortBy: value,
        page: 1,
      })
    );
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as SortOrder;
    dispatch(
      fetchSongsRequest({
        sortOrder: value,
        page: 1,
      })
    );
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(event.target.value);
    dispatch(
      fetchSongsRequest({
        limit: value,
        page: 1,
      })
    );
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage === (pagination?.page ?? 1)) {
      return;
    }

    dispatch(
      fetchSongsRequest({
        page: nextPage,
      })
    );
  };

  const handleResetFilters = () => {
    suppressNextSearch.current = true;
    setSearchValue("");
    dispatch(
      fetchSongsRequest({
        search: undefined,
        artist: undefined,
        album: undefined,
        genre: undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
        page: 1,
        limit: filters.limit ?? 10,
      })
    );
  };

  const sortByValue: SongSortField = filters.sortBy ?? "createdAt";
  const sortOrderValue: SortOrder = filters.sortOrder ?? "desc";
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const pageSize = filters.limit ?? 10;
  const totalItems = pagination?.total ?? songs.length;
  const hasPrevPage = pagination?.hasPrevPage ?? currentPage > 1;
  const hasNextPage = pagination?.hasNextPage ?? currentPage < totalPages;
  const from = songs.length ? (currentPage - 1) * pageSize + 1 : 0;
  const to = songs.length ? (currentPage - 1) * pageSize + songs.length : 0;

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
              value={filters.artist ?? ""}
              onChange={handleFilterChange("artist")}
            />
          </FilterControl>
          <FilterControl>
            <FilterLabel htmlFor="album-filter">Album</FilterLabel>
            <FilterInput
              id="album-filter"
              type="text"
              placeholder="Filter by album"
              value={filters.album ?? ""}
              onChange={handleFilterChange("album")}
            />
          </FilterControl>
          <FilterControl>
            <FilterLabel htmlFor="genre-filter">Genre</FilterLabel>
            <FilterInput
              id="genre-filter"
              type="text"
              placeholder="Filter by genre"
              value={filters.genre ?? ""}
              onChange={handleFilterChange("genre")}
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
