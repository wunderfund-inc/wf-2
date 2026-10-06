# Wunderfund 2.0 Platform

Wunderfund is an equity crowdfunding platform that lets unaccredited investors invest in companies. This repo is the next iteration of the platform, built with [Nuxt 2](https://v2.nuxt.com) and [Bootstrap-Vue](https://bootstrap-vue.org).

## Getting Started

```bash
cp .env.example .env   # then fill in the values below
npm install
npm run dev            # http://localhost:3000
```

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `BASE_URL` | Public URL of the site | `http://localhost:3000` |
| `PLATFORM` | Platform/environment identifier | `TEST` |
| `SENDGRID_API_KEY` | SendGrid API key for transactional email | – |
| `SENDGRID_TEMPLATE_ID` | SendGrid template used for outgoing email | – |

Marketing content is served from [Prismic](https://prismic.io) (endpoint set in `nuxt.config.js`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run generate` | Generate a static site |
| `npm run lint` | ESLint + Stylelint |
| `npm test` | Jest unit tests |

Commits are checked by [commitlint](https://commitlint.js.org) (conventional commits, e.g. `fix: description`), and staged files are linted on commit via husky + lint-staged.

## Project Structure

```
assets/            Styles and images
components/        Vue components
content/           Static content (FAQs, investment limits)
layouts/ pages/    Nuxt layouts and routes
middleware/        Nuxt route middleware
modules/           Local Nuxt modules (crawler, static)
plugins/           Nuxt plugins
server-middleware/ Server endpoints (SendGrid email, TAPI webhook)
store/             Vuex store (auth, profile, investments, checkout, ...)
tests/             Jest tests
```

## Deployment

The app ships as a Docker image (`Dockerfile`, multi-stage, runs as non-root on port 3000 with a health check).

```bash
docker build -t wunderfund .
docker run -p 3000:3000 --env-file .env wunderfund
```

Heroku is also supported via container deploy (`heroku.yml`) and `Procfile` (`npm start`).
