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

let urls = [];
let count = 1;

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  const urlRegex = /^https?:\/\/\w+/;
  
  if (!urlRegex.test(url)) {
    return res.json({ error: 'invalid url' });
  }

  const found = urls.find(u => u.original_url === url);
  if (found) return res.json(found);

  const newUrl = { original_url: url, short_url: count };
  urls.push(newUrl);
  res.json(newUrl);
  count++;
});

app.get('/api/shorturl/:id', (req, res) => {
  const url = urls.find(u => u.short_url == req.params.id);
  url ? res.redirect(url.original_url) : res.json({ error: 'No short URL found' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
