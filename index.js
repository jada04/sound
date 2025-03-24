const express = require('express');
const ytSearch = require('yt-search');
const playdl = require('play-dl');
const youtubedl = require('youtube-dl-exec');


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






// Play Endpoint (youtube-dl-exec)
app.get('/play', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: 'url required' });
  }

  try {
    const output = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      format: 'bestaudio',
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    });

    const audioUrl = output.url;
    const thumbnailUrl = output.thumbnail;
    const title = output.title;
    const durationSeconds = output.duration;
    const durationMinutes = (durationSeconds / 60).toFixed(2);

    res.json({
      title,
      audioUrl,
      thumbnailUrl,
      duration: durationMinutes
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Video info fetch error', details: err.message });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
