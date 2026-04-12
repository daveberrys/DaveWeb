import 'dotenv/config';
import express from 'express';
const app = express();
const port = 3000

import * as discord from './api/discord.js';
import * as githubAPI from './api/githubAPI.js';
import * as lastfm from './api/lastfm.js';

app.get('/', (req, res) => {
  res.redirect("https://codedave.pages.dev");
})

app.get('/api/discord', (req, res) => {
  discord.GET()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
})

app.get('/api/github', (req, res) => {
  githubAPI.GET(req)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
})

app.get('/api/lastfm', (req, res) => {
  lastfm.GET()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
})

app.listen(port, () => {
  console.log(`Dave's API server running at ${port}`);
})
