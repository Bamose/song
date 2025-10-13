import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  createSongRequest,
  updateSongRequest,
  selectSong,
} from "../store/slices/songSlice";
import { SongFormData } from "@song-app/types";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #667eea;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Button = styled.button<{ variant?: "cancel" }>`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) =>
    props.variant === "cancel" ? "#e0e0e0" : "#667eea"};
  color: ${(props) => (props.variant === "cancel" ? "#666" : "white")};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SongForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedSong, loading } = useAppSelector((state) => state.songs);

  const [formData, setFormData] = useState<SongFormData>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    if (selectedSong) {
      setFormData({
        title: selectedSong.title,
        artist: selectedSong.artist,
        album: selectedSong.album,
        genre: selectedSong.genre,
      });
    }
  }, [selectedSong]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSong?._id) {
      dispatch(updateSongRequest({ id: selectedSong._id, data: formData }));
    } else {
      dispatch(createSongRequest(formData));
    }

    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      artist: "",
      album: "",
      genre: "",
    });
    dispatch(selectSong(null));
  };

  return (
    <Container>
      <Title>{selectedSong ? "✏️ Edit Song" : "➕ Add New Song"}</Title>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Song Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter song title"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="artist">Artist</Label>
          <Input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
            placeholder="Enter artist name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="album">Album</Label>
          <Input
            type="text"
            id="album"
            name="album"
            value={formData.album}
            onChange={handleChange}
            required
            placeholder="Enter album name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="genre">Genre</Label>
          <Input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            placeholder="Enter genre"
          />
        </FormGroup>

        <ButtonGroup>
          {selectedSong && (
            <Button type="button" variant="cancel" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {selectedSong ? "Update Song" : "Add Song"}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default SongForm;
