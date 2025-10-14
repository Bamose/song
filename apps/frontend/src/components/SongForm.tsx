import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { type SongFormValues, songFormSchema } from "../schema/song.schema";
import {
  createSongRequest,
  selectSong,
  updateSongRequest,
  deleteSongRequest,
} from "../store/slices/songSlice";
import {
  Button,
  ButtonGroup,
  Container,
  ErrorText,
  Form,
  FormGroup,
  Input,
  Label,
  Title,
} from "../styles/SongForm.styles";
import Modal from "./Modal";

interface SongFormProps {
  onClose: () => void;
  mode?: "new" | "edit";
}

const defaultValues: SongFormValues = {
  title: "",
  artist: "",
  album: "",
  genre: "",
};

const SongForm: React.FC<SongFormProps> = ({ onClose, mode = "new" }) => {
  const dispatch = useAppDispatch();
  const { selectedSong, isMutating } = useAppSelector((state) => state.songs);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const formValues = useMemo<SongFormValues>(() => {
    if (mode === "edit" && selectedSong) {
      return {
        title: selectedSong.title,
        artist: selectedSong.artist,
        album: selectedSong.album,
        genre: selectedSong.genre,
      };
    }

    return { ...defaultValues };
  }, [mode, selectedSong]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SongFormValues>({
    resolver: zodResolver(songFormSchema),
    values: formValues,
  });

  // Reset form when mode is "new" or when no song is selected in edit mode
  useEffect(() => {
    if (mode === "new" || (mode === "edit" && !selectedSong)) {
      reset(defaultValues);
    }
  }, [mode, selectedSong, reset]);

  const onSubmit = (values: SongFormValues) => {
    if (selectedSong?._id) {
      dispatch(updateSongRequest({ id: selectedSong._id, data: values }));
    } else {
      dispatch(createSongRequest(values));
    }

    handleCancel();
  };

  const handleCancel = () => {
    reset({ ...defaultValues });
    dispatch(selectSong(null));
    onClose();
  };

  const handleConfirmClose = () => setConfirmOpen(false);

  const handleConfirmDelete = () => {
    if (selectedSong?._id) {
      dispatch(deleteSongRequest(selectedSong._id));
    }
    setConfirmOpen(false);
    handleCancel();
  };

  return (
    <Container>
      <Title>{mode === "edit" ? "Edit Song" : "Add New Song"}</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="title">Song Title</Label>
          <Input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Enter song title"
          />
          {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="artist">Artist</Label>
          <Input
            type="text"
            id="artist"
            {...register("artist")}
            placeholder="Enter artist name"
          />
          {errors.artist && <ErrorText>{errors.artist.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="album">Album</Label>
          <Input
            type="text"
            id="album"
            {...register("album")}
            placeholder="Enter album name"
          />
          {errors.album && <ErrorText>{errors.album.message}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="genre">Genre</Label>
          <Input
            type="text"
            id="genre"
            {...register("genre")}
            placeholder="Enter genre"
          />
          {errors.genre && <ErrorText>{errors.genre.message}</ErrorText>}
        </FormGroup>

        <ButtonGroup>
          <Button type="button" variant="cancel" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isMutating || isSubmitting}>
            {mode === "edit" ? "Update Song" : "Add Song"}
          </Button>
        </ButtonGroup>
      </Form>

      <Modal isOpen={confirmOpen} onClose={handleConfirmClose}>
        <Container>
          <Title>Delete Song</Title>
          <p style={{ color: "#96c5a9", marginBottom: "1rem" }}>
            Are you sure you want to delete
            {selectedSong?.title ? ` "${selectedSong.title}"` : " this song"}?
            This action cannot be undone.
          </p>
          <ButtonGroup>
            <Button type="button" variant="cancel" onClick={handleConfirmClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Container>
      </Modal>
    </Container>
  );
};

export default SongForm;
