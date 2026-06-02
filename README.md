# Forms Hub — Centralized Multitenant Form Submission Backend

> A secure, API-key-gated backend for collecting form submissions from multiple landing pages into a single, centralized system.

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

<p align="center">
  <img src="media/hero.svg" alt="Forms Hub Architecture" width="100%">
</p>

---

## Architecture

```mermaid
flowchart TB
    subgraph Clients["Clients / Landing Pages"]
        LP1["Landing Page A"]
        LP2["Landing Page B"]
        LP3["Landing Page C"]
    end

    subgraph API["Forms Hub API"]
        direction TB
        GW["Express Server<br/>REST API v1"]
        MW["Middleware Stack<br/>CORS · JSON · Error Handler"]
        AK["API Key Validation<br/>(Planned)"]
        JWT["JWT Authentication<br/>(Planned)"]
        CTR["Controllers<br/>Health · Submissions · Projects"]
        SRV["Services<br/>(Planned)"]
    end

    subgraph DB["PostgreSQL"]
        PR["Prisma ORM"]
        USR["Users"]
        PRJ["Projects"]
        SUB["FormSubmissions<br/>(JSONB)"]
    end

    LP1 & LP2 & LP3 -->|"x-api-key"| GW
    GW --> MW --> AK --> CTR --> SRV
    CTR -->|"JWT Protected"| JWT
    SRV --> PR
    PR --> USR & PRJ & SUB

    USR -->|"1:N"| PRJ
    PRJ -->|"1:N"| SUB
```

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **🔐 API Key Authentication** — Each landing page (project) is issued a unique API key for secure, session-less form submission (planned).
- **🔑 JWT Authentication** — Admin dashboard authentication with bcrypt password hashing and signed JSON Web Tokens (planned).
- **📦 JSONB Payload Storage** — Flexible form data storage using PostgreSQL JSONB columns — no rigid schemas.
- **🏢 Multitenant Isolation** — Projects and submissions are isolated per user, ensuring data privacy.
- **⚡ Express 5 + TypeScript** — Modern, type-safe server with hot-reload development.
- **🗄️ Prisma ORM** — Type-safe database access with auto-generated migrations and client.
- **🧩 Modular Architecture** — Clean separation of routes, controllers, services, and middleware.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 22+ |
| **Language** | TypeScript 6.0 |
| **Framework** | Express 5.2 |
| **ORM** | Prisma 7.8 |
| **Database** | PostgreSQL 16 |
| **Auth** | bcrypt + jsonwebtoken (planned) |
| **Dev Runner** | ts-node-dev (hot-reload) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 22
- [npm](https://www.npmjs.com) >= 10
- [PostgreSQL](https://www.postgresql.org) >= 16 running locally or remotely

### Installation

```bash
git clone https://github.com/your-org/forms-hub-backend.git
cd forms-hub-backend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/forms_hub?schema=public"
PORT=3000
CORS_ORIGINS="http://localhost:5173,http://localhost:3000"
NODE_ENV=development
```

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | — | PostgreSQL connection string (required by Prisma) |
| `PORT` | `3000` | Server listening port |
| `CORS_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Comma-separated allowed origins |
| `NODE_ENV` | `development` | Environment name |

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init
```

### Running the Server

```bash
# Development (hot-reload)
npm run dev

# Production build
npm run build
npm start
```

The server starts at `http://localhost:3000`. Verify with the health endpoint:

```bash
curl http://localhost:3000/api/v1/health
```

---

## Project Structure

```
forms-hub-backend/
├── prisma/
│   ├── schema.prisma          # Database schema (User, Project, FormSubmission)
│   └── migrations/            # Auto-generated migrations
├── src/
│   ├── index.ts               # Entry point
│   ├── app.ts                 # Express app setup
│   ├── config/
│   │   └── env.ts             # Environment variables
│   ├── controllers/
│   │   └── health.controller.ts
│   ├── middlewares/
│   │   └── errorHandler.ts    # AppError class + global error handler
│   └── routes/
│       ├── index.ts           # Route aggregator
│       └── health.routes.ts
├── ROAMAD.md                  # Development roadmap (Spanish)
├── package.json
├── tsconfig.json
└── .env
```

### Naming Conventions

- **Files**: `kebab-case` (e.g., `health.controller.ts`, `errorHandler.ts`)
- **Classes**: `PascalCase` (e.g., `AppError`)
- **Exports**: Named exports for functions, default export for the Express `app`
- **Routing**: Resource-based paths under `/api/v1`

---

## API Reference

### Health Check

```
GET /api/v1/health
```

**Response** `200 OK`

```json
{
  "status": "ok",
  "timestamp": "2026-06-02T12:00:00.000Z",
  "uptime": 123.45
}
```

### Planned Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/submissions` | API Key | Submit form data (Module 3) |
| `POST` | `/api/v1/auth/register` | Public | Register admin user (Module 4) |
| `POST` | `/api/v1/auth/login` | Public | Login, returns JWT (Module 4) |
| `GET` | `/api/v1/projects` | JWT | List user's projects (Module 5) |
| `POST` | `/api/v1/projects` | JWT | Create project + generate API Key (Module 5) |
| `GET` | `/api/v1/projects/:id/submissions` | JWT | List submissions per project (Module 5) |

---

## Roadmap

| Module | Branch | Description | Status |
|--------|--------|-------------|--------|
| 1 | `feature/database-setup` | Node/TS init, PostgreSQL, Prisma schema & migration | ✅ Complete |
| 2 | `feature/server-architecture` | Express server, CORS, error handling, health check | ✅ Complete |
| 3 | `feature/submissions-api` | POST /api/v1/submissions with API key validation | 🔜 Planned |
| 4 | `feature/auth-dashboard` | Auth system (register/login, bcrypt, JWT) | 🔜 Planned |
| 5 | `feature/dashboard-api` | Private CRUD for projects & submissions | 🔜 Planned |
| 6 | `feature/production-deploy` | Build optimization, cloud deployment, docs | 🔜 Planned |

Full details in [`ROAMAD.md`](ROAMAD.md).

---

## Contributing

1. Create a feature branch from `develop`: `git checkout -b feature/your-feature`
2. Commit your changes following conventional commits
3. Open a pull request against `develop`

---

## License

This project is licensed under the [ISC License](LICENSE).
