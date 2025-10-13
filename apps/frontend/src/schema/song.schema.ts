import { z } from "zod";

export const songFormSchema = z.object({
  title: z.string().trim().min(1, "Song title is required"),
  artist: z.string().trim().min(1, "Artist name is required"),
  album: z.string().trim().min(1, "Album name is required"),
  genre: z.string().trim().min(1, "Genre is required"),
});

export type SongFormValues = z.infer<typeof songFormSchema>;
