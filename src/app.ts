import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler, AppError } from "./middlewares/errorHandler";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: env.corsOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use("/api/v1", routes);

app.use((_req, _res, next) => {
  next(new AppError(404, "Route not found"));
});

app.use(errorHandler);

export default app;
