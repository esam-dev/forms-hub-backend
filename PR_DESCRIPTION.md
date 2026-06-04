# Pull Request — [Nombre del Módulo]

**Rama:** `[feature/nombre-de-rama]`

---

## Descripción general

<!-- Breve descripción de qué implementa este módulo y por qué es necesario -->

---

## Endpoints implementados

| Método | Ruta | Auth | Descripción | Response |
|--------|------|:---:|-------------|----------|
| `GET` | `/api/v1/...` | ❌ / ✅ | ... | `200` → `{ ... }` |
| `POST` | `/api/v1/...` | ❌ / ✅ | ... | `201` → `{ ... }` |

---

## Archivos del módulo

```
src/
├── services/
│   └── ...
├── controllers/
│   └── ...
├── middlewares/
│   └── ...
├── routes/
│   └── ...
└── types/
    └── ...
```

**Nuevos:** `...`  
**Modificados:** `...`

---

## Flujo de datos

### [Endpoint o funcionalidad]

```
Request → ... → ...
  → Validación → Error → HTTP XXX
  → Lógica de negocio
  → Response HTTP XXX
```

---

## Decisiones técnicas

| Aspecto | Decisión | Justificación |
|---------|----------|---------------|
| ... | ... | ... |

---

## Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `...` | `...` | ... |

---

## Dependencias

```json
{
  "dependencies": {
    "package-name": "^x.x.x"
  },
  "devDependencies": {
    "@types/package-name": "^x.x.x"
  }
}
```

---

## Commits

```
hash1 commit message
hash2 commit message
hash3 commit message
```

---

## Cómo probar

```bash
# Setup previo
npm run dev

# Test 1: ...
curl ...

# Test 2: ...
curl ...
```

#### Respuestas esperadas

| Test | Status | Body |
|------|--------|------|
| ... | `200` | `{ ... }` |
| ... | `400` | `{ ... }` |

---

## Notas

- ...
- ...

---

Closes #[issue-number]
