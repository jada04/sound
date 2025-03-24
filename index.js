const express = require('express');
const ytSearch = require('yt-search');
const playdl = require('play-dl');


const app = express();
const PORT = process.env.PORT || 3000;



app.get('/search', async (req, res) => {
  const searchTerm = req.query.search;
  
  if (!searchTerm) {
    return res.status(400).json({ error: 'search query parameter is required' });
  }
  
  try {
    // YouTube'da arama yapılıyor
    const results = await ytSearch(searchTerm);
    
    // İlk 10 video bilgisi alınıyor (başlık, URL, thumbnail, süre)
    const videoDetails = results.videos.slice(0, 10).map(video => ({
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration // örn: "3:45"
    }));
    
    res.json(videoDetails);
  } catch (error) {
    console.error('Error during YouTube search:', error);
    res.status(500).json({ error: 'An error occurred while searching YouTube' });
  }
});






app.get('/play', async (req, res) => {
  let url = req.query.url || '';
  
  if (!url) {
    return res.status(400).json({ error: 'url required' });
  }

  if (!url.startsWith('http')) {
    url = `https://www.youtube.com/watch?v=${url}`;
  }

  try {
    const info = await playdl.video_basic_info(url);
    const stream = await playdl.stream(url, { quality: 2 }); // Audio only

    res.json({
      title: info.video_details.title,
      audioUrl: stream.url,
      thumbnailUrl: info.video_details.thumbnails[0].url,
      duration: (info.video_details.durationInSec / 60).toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Video bilgisi alınamadı.', details: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
