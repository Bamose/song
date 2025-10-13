import React, { useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  createSongRequest,
  updateSongRequest,
  selectSong,
} from "../store/slices/songSlice";
import { type SongFormValues, songFormSchema } from "../schema/song.schema";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
  ErrorText,
} from "../styles/SongForm.styles";

interface SongFormProps {
  onClose: () => void;
}

const defaultValues: SongFormValues = {
  title: "",
  artist: "",
  album: "",
  genre: "",
};

const SongForm: React.FC<SongFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { selectedSong, isMutating } = useAppSelector((state) => state.songs);

  const formValues = useMemo<SongFormValues>(() => {
    if (selectedSong) {
      return {
        title: selectedSong.title,
        artist: selectedSong.artist,
        album: selectedSong.album,
        genre: selectedSong.genre,
      };
    }

    return { ...defaultValues };
  }, [selectedSong]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SongFormValues>({
    resolver: zodResolver(songFormSchema),
    values: formValues,
  });

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

  return (
    <Container>
      <Title>{selectedSong ? "Edit Song" : "Add New Song"}</Title>

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
            {selectedSong ? "Update Song" : "Add Song"}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default SongForm;
