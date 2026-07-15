# Jolynn Fred Backend

NestJS backend for the Jolynn Fred social feed application.

## Implemented

- JWT authentication with refresh-token sessions
- PostgreSQL persistence through Prisma
- Modular Prisma schema in `prisma/schema`
- Feed, posts, comments, replies, reactions, media, users, and health modules
- Cloudinary media upload
- Swagger docs at `/docs`
- Docker/Railway deployment config

## Local Run

```bash
npm install
npm run prisma:generate
npm run start:dev
```

Run migrations:

```bash
npx prisma migrate deploy --schema prisma/schema
```

API base URL:

```text
http://localhost:4000/api/v1
```

See the root `README.md` for the full project overview and feature list.
