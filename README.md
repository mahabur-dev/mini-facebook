# Fred Social Feed

A full-stack social feed application built with Next.js and NestJS. The project converts the provided login, register, and feed UI into a working application with authentication, posts, media upload, comments, replies, reactions, and profile updates.

## What Is Implemented

### Authentication

- User registration and login
- Password hashing
- JWT access tokens
- Refresh-token sessions stored in the database
- HTTP-only refresh-token cookie
- Logout and current-user endpoint
- Protected feed and profile routes on the frontend

### Feed and Posts

- Authenticated feed page
- Cursor-based feed pagination
- Public/private post visibility
- Create, update, delete, and view posts
- Single post details page
- Post ownership checks
- Soft delete for posts
- Post statistics for like, comment, and reply counts

### Media

- Authenticated media upload endpoint
- Cloudinary-backed storage
- Stored media metadata in PostgreSQL
- Supported uploads include images, videos, PDFs, text/CSV, Word, and Excel files
- Frontend previews images/videos and shows file attachments

### Comments, Replies, and Reactions

- Add, list, update, and delete comments
- One-level replies
- Like/unlike posts, comments, and replies
- Paginated liker lists
- Duplicate likes prevented by database constraints
- Comment/reply ownership and visibility checks

### Users

- Current user profile endpoint
- Update own profile
- Update avatar image

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Zustand

### Backend

- NestJS
- TypeScript
- Prisma ORM with modular schema files
- PostgreSQL
- JWT authentication
- Cloudinary media storage
- Swagger API documentation
- Docker and Railway deployment config

## Architecture

The frontend uses a feature-based structure:

```text
auth
feed
posts
comments
reactions
media
users
```

Each feature keeps its API functions, hooks, components, schemas, and types close together.

The backend is a modular monolith. Main modules include:

```text
authentication
users
sessions
posts
feed
media
comments
reactions
health
```

Backend modules are organized around presentation, application, domain, and infrastructure concerns. Domain policies handle ownership, visibility, reply-depth, and reaction rules so controllers stay thin and business logic stays reusable.

## Database

PostgreSQL stores the application data through Prisma. Main tables:

```text
users
user_sessions
posts
post_media
comments
post_likes
comment_likes
post_statistics
comment_statistics
```

The Prisma schema is split by domain under:

```text
server/prisma/schema
```

## API Summary

```text
GET    /api/v1/health

POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
DELETE /api/v1/auth/logout
GET    /api/v1/auth/me

GET    /api/v1/feed

POST   /api/v1/posts
GET    /api/v1/posts/:postId
PATCH  /api/v1/posts/:postId
DELETE /api/v1/posts/:postId

POST   /api/v1/media
POST   /api/v1/media/images

POST   /api/v1/posts/:postId/comments
GET    /api/v1/posts/:postId/comments
POST   /api/v1/comments/:commentId/replies
GET    /api/v1/comments/:commentId/replies
PATCH  /api/v1/comments/:commentId
DELETE /api/v1/comments/:commentId

PUT    /api/v1/posts/:postId/like
DELETE /api/v1/posts/:postId/like
GET    /api/v1/posts/:postId/likes

PUT    /api/v1/comments/:commentId/like
DELETE /api/v1/comments/:commentId/like
GET    /api/v1/comments/:commentId/likes

PATCH  /api/v1/users/me
PATCH  /api/v1/users/me/avatar
```


## Local Setup

Install and run the backend:

```bash
cd server
npm install
npm run prisma:generate
npm run start:dev
```

Install and run the frontend:

```bash
cd client
npm install
npm run dev
```

Run database migrations:

```bash
cd server
npx prisma migrate deploy --schema prisma/schema
```

## Deployment Notes

- Backend Dockerfile is configured for Railway and modular Prisma schema generation.
- Set `CLIENT_ORIGINS` to the deployed frontend URL.
- Set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend `/api/v1` URL.
- For cross-domain frontend/backend deployments, refresh-token cookie settings may need `sameSite: "none"` with secure HTTPS.
