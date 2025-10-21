require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint

let urlDatabase = [];
let nextShortUrl = 1;

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  try {
    new URL(originalUrl);
  } catch (error) {
    return res.json({ error: 'Invalid URL' });
  }

  const existingUrl = urlDatabase.find(item => item.original_url === originalUrl);
  if (existingUrl) {
    return res.json({
      original_url: existingUrl.original_url,
      short_url: existingUrl.short_url
    });
  }

  const newUrl = {
    original_url: originalUrl,
    short_url: nextShortUrl
  };

  urlDatabase.push(newUrl);
  
  res.json({
    original_url: originalUrl,
    short_url: nextShortUrl
  });

  nextShortUrl++;
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = parseInt(req.params.short_url);
  const urlEntry = urlDatabase.find(item => item.short_url === shortUrl);

  if (!urlEntry) {
    return res.json({ error: 'No short URL found for the given input' });
  }

  res.redirect(urlEntry.original_url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
