const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();
  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();
  res.json({ originalUrl, shortUrl });
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
