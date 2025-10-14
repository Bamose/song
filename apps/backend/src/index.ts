import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db";
import songRoutes from "./routes/song";
import { openApiSpec } from "./openapi";
import { logger } from "@song-app/utils";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/songs", songRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.get("/openapi.json", (_req, res) => {
  res.json(openApiSpec);
});

app.get("/docs", (_req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Song Manager API Documentation</title>
    <style>
      body {
        margin: 0;
        background-color: #0b1520;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
      }
      #app {
        height: 100vh;
      }
      .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: #9ca3af;
        font-size: 1.125rem;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div class="loader">Loading API documentation…</div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    <script>
      window.addEventListener("DOMContentLoaded", () => {
        if (!window.Scalar || !window.Scalar.createApiReference) {
          console.error("Scalar API Reference library did not load.");
          return;
        }

        window.Scalar.createApiReference("#app", {
          spec: {
            url: "/openapi.json",
          },
          theme: "midnight",
          hideDownloadButton: false,
        });
      });
    </script>
  </body>
</html>`);
});

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      logger.log(`Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Failed to connect to database:", error);
    process.exit(1);
  });
