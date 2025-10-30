# Backend (Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and set values.
2. Install dependencies: `npm install`
3. Start server: `npm run dev` (requires nodemon) or `npm start`

## Notes
- Uses `x-auth-token` header or Authorization: Bearer <token> for protected routes.
- JWT secret is read from `JWT_SECRET` in .env.
