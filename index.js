const express = require('express');
const ytSearch = require('yt-search');
const cors = require('cors');
const ytdl = require('youtube-dl-exec');



// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 3000;



// app.get('/search', async (req, res) => {
//   const searchTerm = req.query.search;
  
//   if (!searchTerm) {
//     return res.status(400).json({ error: 'search query parameter is required' });
//   }
  
//   try {
//     // YouTube'da arama yapılıyor
//     const results = await ytSearch(searchTerm);

    
//     // İlk 10 video bilgisi alınıyor (başlık, URL, thumbnail, süre)
//     const videoDetails = results.videos.slice(0, 10).map(video => ({
//       title: video.title,
//       url: video.url,
//       thumbnail: video.thumbnail,
//       duration: video.duration // örn: "3:45"
//     }));
    
//     res.json(videoDetails);
//   } catch (error) {
//     console.error('Error during YouTube search:', error);
//     res.status(500).json({ error: 'An error occurred while searching YouTube' });
//   }
// });




app.get('/play', async (req, res) => {
  let url = req.query.url || '';

  if (!url) {
    return res.status(400).json({ error: 'URL gerekli' });
  }

  // Eğer URL 'http' ile başlamıyorsa, video ID olarak kabul edip tam URL'ye dönüştürüyoruz.
  if (!url.startsWith('http')) {
    url = `https://www.youtube.com/watch?v=${url}`;
  }


  youtubedl('https://www.youtube.com/watch?v=IfijOvGyWfA', {
  dumpSingleJson: true,
  noCheckCertificate: true,
  noWarnings: true,
  format: 'bestaudio'
}).then(output => {
  console.log('Ses URL:', output.url);
     res.json({
      title: output.title,
      audioUrl: output.url,
      
    });
}).catch(error => {
  console.error('Hata:', error);
});


  

  // try {
  //   const output = await ytdl(url, {
  //     dumpJson: true,
  //     format: 'bestaudio',
  //     skipDownload: true,
  //     addHeader: [
  //       'referer: https://www.youtube.com/',
  //       'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
  //       'Accept: */*',
  //       'origin: https://www.youtube.com'
  //     ],
  //     // Cookie dosyanızın yolunu belirtin; bu dosyanın Docker imajınıza dahil edildiğinden emin olun.
  //     cookies: 'cookies.txt'
  //   });

  //   // Dönüşte output içindeki tüm verileri döndürmek isterseniz:
  //   res.json({
  //     title: output.title,
  //     audioUrl: output.url,
      
  //   });
  // } catch (error) {
  //   console.error('youtube-dl-exec ile hata:', error);
  //   res.status(500).json({ error: 'Video bilgisi alınamadı', details: error.message });
  // }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});











