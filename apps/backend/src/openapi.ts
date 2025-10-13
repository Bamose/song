export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Song Manager API",
    version: "1.0.0",
    description:
      "API for managing songs and statistics within the Song Manager application.",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
  components: {
    schemas: {
      Song: {
        type: "object",
        required: ["_id", "title", "artist", "album", "genre", "createdAt", "updatedAt"],
        properties: {
          _id: {
            type: "string",
            description: "Unique identifier assigned by MongoDB.",
            example: "64f1c9d2f1a5c4b7e6781234",
          },
          title: {
            type: "string",
            example: "Imagine",
          },
          artist: {
            type: "string",
            example: "John Lennon",
          },
          album: {
            type: "string",
            example: "Imagine",
          },
          genre: {
            type: "string",
            example: "Rock",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      SongInput: {
        type: "object",
        required: ["title", "artist", "album", "genre"],
        properties: {
          title: {
            type: "string",
            example: "Imagine",
          },
          artist: {
            type: "string",
            example: "John Lennon",
          },
          album: {
            type: "string",
            example: "Imagine",
          },
          genre: {
            type: "string",
            example: "Rock",
          },
        },
      },
      Statistics: {
        type: "object",
        properties: {
          totalSongs: {
            type: "integer",
            example: 42,
          },
          totalArtists: {
            type: "integer",
            example: 12,
          },
          totalAlbums: {
            type: "integer",
            example: 10,
          },
          totalGenres: {
            type: "integer",
            example: 5,
          },
          songsByGenre: {
            type: "array",
            items: {
              $ref: "#/components/schemas/SongsByCategory",
            },
          },
          songsByArtist: {
            type: "array",
            items: {
              $ref: "#/components/schemas/SongsByCategory",
            },
          },
          songsByAlbum: {
            type: "array",
            items: {
              $ref: "#/components/schemas/SongsByAlbum",
            },
          },
        },
      },
      SongsByCategory: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "Rock",
          },
          count: {
            type: "integer",
            example: 10,
          },
        },
      },
      SongsByAlbum: {
        allOf: [
          {
            $ref: "#/components/schemas/SongsByCategory",
          },
          {
            type: "object",
            properties: {
              artist: {
                type: "string",
                example: "John Lennon",
              },
            },
          },
        ],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Song not found",
          },
        },
      },
    },
    parameters: {
      SongId: {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
        description: "MongoDB ObjectId of the song.",
      },
      ArtistQuery: {
        name: "artist",
        in: "query",
        schema: {
          type: "string",
        },
        description: "Filter songs by artist.",
      },
      GenreQuery: {
        name: "genre",
        in: "query",
        schema: {
          type: "string",
        },
        description: "Filter songs by genre.",
      },
      AlbumQuery: {
        name: "album",
        in: "query",
        schema: {
          type: "string",
        },
        description: "Filter songs by album.",
      },
    },
  },
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        description: "Returns the operational status of the backend.",
        responses: {
          "200": {
            description: "Backend is healthy.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "OK",
                    },
                    message: {
                      type: "string",
                      example: "Backend is running",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/songs": {
      get: {
        summary: "List songs",
        description: "Fetch a list of songs. Supports optional filtering.",
        parameters: [
          {
            $ref: "#/components/parameters/ArtistQuery",
          },
          {
            $ref: "#/components/parameters/GenreQuery",
          },
          {
            $ref: "#/components/parameters/AlbumQuery",
          },
        ],
        responses: {
          "200": {
            description: "Songs retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Song",
                  },
                },
              },
            },
          },
          "500": {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a song",
        description: "Add a new song to the catalogue.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SongInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Song created successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Song",
                },
              },
            },
          },
          "400": {
            description: "Validation error.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/songs/stats": {
      get: {
        summary: "Song statistics",
        description: "Return aggregated song statistics.",
        responses: {
          "200": {
            description: "Statistics generated successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Statistics",
                },
              },
            },
          },
          "500": {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/songs/{id}": {
      get: {
        summary: "Retrieve a song",
        description: "Get a song by its MongoDB ObjectId.",
        parameters: [
          {
            $ref: "#/components/parameters/SongId",
          },
        ],
        responses: {
          "200": {
            description: "Song retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Song",
                },
              },
            },
          },
          "404": {
            description: "Song not found.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update a song",
        description: "Update an existing song by its MongoDB ObjectId.",
        parameters: [
          {
            $ref: "#/components/parameters/SongId",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SongInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Song updated successfully.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Song",
                },
              },
            },
          },
          "400": {
            description: "Validation error.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "Song not found.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a song",
        description: "Delete a song by its MongoDB ObjectId.",
        parameters: [
          {
            $ref: "#/components/parameters/SongId",
          },
        ],
        responses: {
          "200": {
            description: "Song deleted successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Song deleted successfully",
                    },
                    song: {
                      $ref: "#/components/schemas/Song",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Song not found.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  },
};
