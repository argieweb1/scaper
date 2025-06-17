const router = require('express').Router();
const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/scrape', async (require, res) => {
  try {
    const response = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(response.data);
    const results = [];

    $('.athing').each((i, el) => {
      const title = $(el).find('.titleline a').text().trim();
      const link = $(el).find('.titleline a').attr('href');
      if (title && link) {
        results.push({ title, link, text: '' });
      }
    });

    res.json({
      status: 'success',
      count: results.length,
      articles: results
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Scraping failed' });
  }
});

module.exports = router;