# Mini Facebook Backend

Professional NestJS backend scaffold for the assignment.

## What is included

- Modular NestJS application structure
- Prisma schema for auth sessions
- Authentication module foundation
- Shared database, cache, and storage abstractions
- Swagger setup at `/docs`

## Local run

1. Copy `.env.example` to `.env`
2. Install dependencies
3. Generate Prisma client
4. Run the app

Example:

```bash
npm install
npx prisma generate
npm run start:dev
```

The API starts at:

- `http://localhost:4000/api/v1`
- Swagger: `http://localhost:4000/docs`

## Current feature slice

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `DELETE /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/health`

## Next feature slices

1. Users module read model
2. Posts module and Prisma schema expansion
3. Feed query and cursor pagination
4. Comments and replies
5. Reactions and liker lists
6. Cloudinary upload integration
