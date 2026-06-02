import "dotenv/config";

export const env = {
  port: parseInt(process.env.PORT || "3000", 10),
  corsOrigins: process.env.CORS_ORIGINS?.split(",") || [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  nodeEnv: process.env.NODE_ENV || "development",
};
