import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
const app = express();
const port = 3000

app.use(cors());

import * as discord from './api/discord.js';
import * as githubAPI from './api/githubAPI.js';
import * as lastfm from './api/lastfm.js';
import * as news from './api/news.js';

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

// Blogs API
app.get('/api/news/fetchall', async (req, res) => {
  try {
    const newsList = await news.fetchAll();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.get('/api/news/fetch', async (req, res) => {
  const newsName = req.query.news;
  if (!newsName) {
    res.status(400).json({ error: 'news parameter is required' });
    return;
  }
  try {
    const content = await news.fetch(newsName);
    res.type('text/markdown').send(content);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
})

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Dave's API server running locally at http://localhost:${port}`);
  });
}

export const handler = serverless(app);
