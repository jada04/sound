const express = require('express');
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const iconv = require('iconv-lite');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.get('/search', function(req, res) {

    // Aranacak kelime
    const query = req.query.q+' song';

    if (req.query.id == '') {
     res.json('error HHG')
	    
 	}else{
    const options = {
      limit: 40,
    };
		    
    // YouTube araması yap
    ytsr(query, options).then(results => {

      const videos = results.items.filter(item => item.type === 'video' && item.duration != null   );

      const videoDetails = videos.map(video => ({
        id: video.id,
        type: video.type,
        title: iconv.decode(video.title.normalize('NFKD'), 'iso-8859-1'),
        duration: video.duration,
        views: video.views,
        uploadedAt: video.uploadedAt,
        author: video.author.name,
        channelUrl: video.author.url,
        thumbnailUrl: video.thumbnails[0].url,
        videoUrl: video.url
      }));


      
      res.json(videoDetails)

      


    }).catch(error => {
      console.error(error);
    });
	   

	}



});



app.get('/play', function(req, res) {

    // Aranacak kelime
    const id = req.query.id;
    // YouTube video ID'si
		const videoId = id;


		// YTDLOptions
		const options = {
		  filter: 'audioonly',
		  quality: 'highestaudio'
		};



      // Video bilgilerini al
      ytdl.getInfo(videoId, options).then(info => {

        const videoDetails = {
            id: videoId,
            title: info.videoDetails.title,
            viewCount: info.videoDetails.viewCount,
            thumbnailUrl: info.videoDetails.thumbnails[3].url,
            videoLength : info.videoDetails.lengthSeconds,
            audioUrl : info.formats.filter(f => f.mimeType.includes('audio'))[0].url
          };


          res.send(videoDetails);
          console.log(videoDetails);



			}).catch(error => {
			  console.error(error);
			});

    


});





// Bir GET isteği için route tanımlayın
app.get('/', function(req, res) {
	res.json('Error');
});






// Sunucuyu belirtilen port numarasında başlatın
app.listen(3000, function() {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
