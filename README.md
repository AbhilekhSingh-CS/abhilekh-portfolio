# Abhilekh Singh — Portfolio

Personal portfolio built on the MERN stack: MongoDB, Express, React and Node.
No site builder, no template — every file is hand-written.

## How it is put together

```
abhilekh-portfolio/
├── package.json          # root scripts: `npm run setup`, `npm run dev`
├── server/               # Express API (Node)
│   ├── index.js          # app entry — middleware, static /uploads, routes
│   ├── store.js          # storage layer: MongoDB, with a JSON-file fallback
│   ├── models/Project.js # Mongoose schema for a project
│   ├── routes/projects.js# REST endpoints + video upload (multer)
│   ├── middleware/requireAdmin.js  # protects the write routes
│   ├── data/seedProjects.js        # starter content, used once on first run
│   ├── uploads/          # walkthrough videos land here
│   └── .env              # PORT, MONGO_URI, ADMIN_KEY
└── client/               # React app (Vite)
    └── src/
        ├── data/         # profile.js, skills.js, profiles.js, certificates.js
        └── components/   # one .jsx + .css pair per section
```

The React app runs on **http://localhost:5173** and proxies `/api` and
`/uploads` to the Express server on **:5001** (see `client/vite.config.js`),
so there are no CORS issues in development.

## Running it

```bash
npm run setup   # installs root, server and client dependencies (first time only)
npm run dev     # starts the API and the React app together
```

Then open http://localhost:5173.

MongoDB: the server connects to `mongodb://127.0.0.1:27017/abhilekh-portfolio`.
If MongoDB isn't running, the server automatically falls back to storing
projects in `server/data/projects.json` — the site keeps working either way.
On first run the database is seeded from `server/data/seedProjects.js`.

## Editing content

| What | Where |
|---|---|
| Name, email, phone, links | `client/src/data/profile.js` |
| Skills | `client/src/data/skills.js` |
| GitHub / LeetCode / LinkedIn / YouTube cards | `client/src/data/profiles.js` |
| Certificates | `client/src/data/certificates.js` |
| Projects | On the site itself — see below |

**Still to fill in:** your real LeetCode profile URL and YouTube handle in
`client/src/data/profile.js` (marked with `TODO`), the exact GitHub repo link
for each project, and credential URLs in `certificates.js`.

## Editing projects & uploading walkthrough videos

Projects live in the database, so you edit them from the site itself:

1. Click a project card → the detail view opens.
2. Under **Owner tools**, click **Edit details** or **Upload walkthrough video**.
3. The first time, it asks for the admin key — the `ADMIN_KEY` value from
   `server/.env` (change it from the default!). It is remembered in your
   browser afterwards.

Visitors never see a prompt unless they click the owner buttons, and the
server rejects any write without the correct key.

## API

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/api/projects` | – | list all projects |
| GET | `/api/projects/:id` | – | one project |
| POST | `/api/projects` | admin | add a project |
| PUT | `/api/projects/:id` | admin | update a project |
| DELETE | `/api/projects/:id` | admin | remove a project |
| POST | `/api/projects/:id/video` | admin | upload/replace walkthrough video (form field `video`, max 200 MB) |

## Deploying

Build the frontend with `npm run build --prefix client` and host the `dist`
folder anywhere static (Vercel, Netlify). Host the server on Render/Railway
with a MongoDB Atlas connection string in `MONGO_URI`. Point the frontend at
the API's URL (either serve `dist` from Express, or set up a rewrite on the
host). Remember to set a strong `ADMIN_KEY` in production.
