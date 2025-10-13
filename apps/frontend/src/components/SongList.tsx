import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  fetchSongsRequest,
  deleteSongRequest,
  selectSong,
  setFilters,
} from "../store/slices/songSlice";
import { Song } from "@song-app/types";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #667eea;
  font-size: 2rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SongGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const SongCard = styled.div`
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`;

const SongHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
`;

const SongTitle = styled.h3`
  color: #333;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`;

const SongArtist = styled.p`
  color: #667eea;
  font-weight: 500;
`;

const SongInfo = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button<{ variant?: "edit" | "delete" }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  background: ${(props) =>
    props.variant === "delete" ? "#ff4757" : "#667eea"};
  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #999;

  p {
    font-size: 1.2rem;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #667eea;
  font-size: 1.2rem;
`;

const SongList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { songs, loading, filters } = useAppSelector((state) => state.songs);

  const [localFilters, setLocalFilters] = useState({
    artist: "",
    genre: "",
    album: "",
  });

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongRequest(id));
    }
  };

  const handleEdit = (song: Song) => {
    dispatch(selectSong(song));
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);

    const activeFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== "")
    );

    dispatch(setFilters(activeFilters));
    dispatch(fetchSongsRequest(activeFilters));
  };

  const uniqueArtists = Array.from(new Set(songs.map((s) => s.artist)));
  const uniqueGenres = Array.from(new Set(songs.map((s) => s.genre)));
  const uniqueAlbums = Array.from(new Set(songs.map((s) => s.album)));

  return (
    <Container>
      <Title>🎵 Song Library</Title>

      <FilterBar>
        <Select
          value={localFilters.artist}
          onChange={(e) => handleFilterChange("artist", e.target.value)}
        >
          <option value="">All Artists</option>
          {uniqueArtists.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </Select>

        <Select
          value={localFilters.genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
        >
          <option value="">All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Select>

        <Select
          value={localFilters.album}
          onChange={(e) => handleFilterChange("album", e.target.value)}
        >
          <option value="">All Albums</option>
          {uniqueAlbums.map((album) => (
            <option key={album} value={album}>
              {album}
            </option>
          ))}
        </Select>
      </FilterBar>

      {loading ? (
        <LoadingState>Loading songs...</LoadingState>
      ) : songs.length === 0 ? (
        <EmptyState>
          <p>No songs found. Add your first song! 🎸</p>
        </EmptyState>
      ) : (
        <SongGrid>
          {songs.map((song) => (
            <SongCard key={song._id}>
              <SongHeader>
                <div>
                  <SongTitle>{song.title}</SongTitle>
                  <SongArtist>{song.artist}</SongArtist>
                </div>
                <ButtonGroup>
                  <Button variant="edit" onClick={() => handleEdit(song)}>
                    Edit
                  </Button>
                  <Button
                    variant="delete"
                    onClick={() => handleDelete(song._id!)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </SongHeader>
              <SongInfo>
                <span>📀 {song.album}</span>
                <span>🎼 {song.genre}</span>
              </SongInfo>
            </SongCard>
          ))}
        </SongGrid>
      )}
    </Container>
  );
};

export default SongList;
