/* eslint-disable */
import type { SongSortField, SortOrder } from "@song-app/types";
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useSongFilters } from "../hooks/useSongFilters";
import { fetchSongsRequest } from "../store/slices/songSlice";
import {
  ActionsCell,
  AlbumCell,
  ArtistCell,
  ButtonGroup,
  Container,
  EmptyState,
  GenreBadge,
  GenreCell,
  Header,
  IconButton,
  LoadingState,
  Table,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
  Title,
  TitleCell,
} from "../styles/SongList.styles";
import { createActionHandlers } from "../utils";
import {
  EntityFilter,
  EntityPagination,
  EntitySearch,
  EntitySort,
} from "./filters";

interface SongListProps {
  onAddClick: () => void;
}

const SongList: React.FC<SongListProps> = ({ onAddClick }) => {
  const dispatch = useAppDispatch();
  const { songs, isFetching, pagination } = useAppSelector(
    (state) => state.songs
  );

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

  useEffect(() => {
    dispatch(fetchSongsRequest(filters));
  }, []);

  useEffect(() => {
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

  const { handleDelete, handleEdit } = createActionHandlers(
    dispatch,
    onAddClick
  );

  const handleSearchChange = (value: string) => {
    updateSearchImmediate(value);
  };

  const handleDebouncedSearch = (value: string) => {
    dispatch(fetchSongsRequest({ ...filters, search: value }));
    if (value !== rawFilters.search) {
      updatePage(1);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    updateFilters({ [key]: value || null, page: 1 });
  };

  const handleSortChange = (sortBy: SongSortField, sortOrder: SortOrder) => {
    updateSort(sortBy, sortOrder);
  };

  const handlePageChange = (page: number) => {
    updatePage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    updatePageSize(pageSize);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const pageSize = filters.limit;
  const totalItems = pagination?.total ?? songs.length;

  const filterFields = [
    {
      key: "artist",
      label: "Artist",
      placeholder: "Filter by artist",
      value: rawFilters.artist,
    },
    {
      key: "album",
      label: "Album",
      placeholder: "Filter by album",
      value: rawFilters.album,
    },
    {
      key: "genre",
      label: "Genre",
      placeholder: "Filter by genre",
      value: rawFilters.genre,
    },
  ];

  return (
    <Container>
      <Header>
        <Title>Your Song Library</Title>
      </Header>

      <EntitySearch
        value={rawFilters.search}
        onSearchChange={handleSearchChange}
        onDebouncedSearch={handleDebouncedSearch}
        placeholder="Search for a song"
      />

      <EntityFilter
        filters={filterFields}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        isResetDisabled={isFetching}
      >
        <EntitySort
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSortChange={handleSortChange}
        />
      </EntityFilter>

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

      <EntityPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        itemsCount={songs.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isDisabled={isFetching}
      />
    </Container>
  );
};

export default SongList;
