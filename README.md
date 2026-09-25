# Sample Page — Full-Stack React + Node.js

A sample full-stack web application built with **React (Vite)** on the frontend and
**Node.js (Express)** on the backend. It includes a complete developer-tooling setup:
**ESLint**, **Prettier**, **Husky** pre-commit hooks with **lint-staged**, and
**PR-Agent** for automated pull-request reviews.

## Project structure

```
Sample page/
├── backend/                 # Node.js + Express API
│   ├── src/server.js        # Express API (health, message, products, contact)
│   ├── eslint.config.js
│   ├── .prettierrc.json
│   └── package.json
├── frontend/                # React (Vite) app — multi-page with React Router
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx   # Shared nav bar + footer (router outlet)
│   │   ├── pages/
│   │   │   ├── Home.jsx     # Hero + live message from the API
│   │   │   ├── About.jsx    # Static info page
│   │   │   ├── Products.jsx # Catalog fetched from /api/products
│   │   │   ├── Contact.jsx  # Form that POSTs to /api/contact
│   │   │   └── NotFound.jsx # 404 page
│   │   ├── main.jsx         # Router setup + app entry
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js       # Dev proxy: /api -> http://localhost:3001
│   ├── eslint.config.js
│   ├── .prettierrc.json
│   └── package.json
├── .github/workflows/
│   └── pr-agent.yml         # PR-Agent GitHub Actions workflow
├── .pr_agent.toml           # PR-Agent configuration
├── .husky/pre-commit        # Runs lint-staged before each commit
└── package.json             # Root: Husky + lint-staged orchestration
```

## Prerequisites

- Node.js 18+ (tested on Node 22)
- npm 9+

## Setup

Install dependencies for the root, backend, and frontend:

```bash
npm run install:all
```

This runs `npm install` at the root (installing Husky + lint-staged and setting up
git hooks via the `prepare` script), then installs the backend and frontend packages.

> Note: Husky only initializes hooks inside a git repository. Run `git init` first if
> this folder is not yet a repo.

## Running the app

Start the backend (port 3001):

```bash
npm run dev:backend
```

In a second terminal, start the frontend (port 5173):

```bash
npm run dev:frontend
```

Open http://localhost:5173. The app has four pages — **Home**, **About**,
**Products**, and **Contact** — navigable via the top nav bar. Vite proxies all
`/api/*` requests to the Express backend.

### API endpoints

- `GET /api/health` — health check
- `GET /api/message` — sample message shown on the Home page
- `GET /api/products` — product catalog shown on the Products page
- `POST /api/contact` — receives `{ name, email, message }` from the Contact form

## Linting & formatting

```bash
npm run lint      # Lint backend and frontend
npm run format    # Format backend and frontend with Prettier
```

Each workspace also exposes its own `lint`, `lint:fix`, `format`, and `format:check`
scripts.

## Pre-commit hooks (Husky + lint-staged)

On every `git commit`, Husky runs `lint-staged`, which formats and lints only the
staged files:

- `backend/**/*.js` → Prettier + ESLint (`--fix`)
- `frontend/**/*.{js,jsx}` → Prettier + ESLint (`--fix`)
- `*.{json,md,yml,yaml}` → Prettier

## PR-Agent integration

[PR-Agent](https://github.com/The-PR-Agent/pr-agent) is the original open-source PR
reviewer. It runs as a GitHub Action defined in `.github/workflows/pr-agent.yml` and
is configured via `.pr_agent.toml`.

On each pull request (and on issue comments), PR-Agent will automatically:

- **Review** the PR (`/review`) — highlights bugs, security, and test gaps
- **Describe** the PR (`/describe`) — generates a summary and labels
- **Improve** the code (`/improve`) — suggests concrete code improvements

You can also trigger tools manually by commenting on a PR, e.g. `/review`, `/describe`,
`/improve`, or `/ask "your question"`.

### Required setup

1. Push this repository to GitHub.
2. Add a model provider API key as a repository secret
   (**Settings → Secrets and variables → Actions → New repository secret**):
   - `OPENAI_KEY` for OpenAI (default), **or** switch to Anthropic/Gemini by editing
     the `env` block in `.github/workflows/pr-agent.yml`.
   - `GITHUB_TOKEN` is provided automatically by GitHub Actions.
3. Open a pull request — PR-Agent will comment with its review.

## License

MIT
