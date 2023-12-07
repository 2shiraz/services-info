import express from 'express';
import { timeFancy } from './src/utils.js';
import ytVideoInfo from './src/services/youtube/videoInfo.js'
import ytSearch from './src/services/youtube/search.js'
const app = express()
const port = 3000

app.get('/yt/search/:query', async (req, res) => {
    try{
        const query = req.params.query;
        const info = await ytSearch(query);
        const jsonData = {
            'status' : true,
            'items' : info
        }
        res.json(jsonData)
    }catch(error){
        // Handle unexpected errors
        res.status(500).json({ error: 'UnexpectedError' });
    }

})
app.get('/yt/video/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const info = await ytVideoInfo(id);

        if (typeof info === 'object' && !info.error) {
            const title = info.basic_info.title;
            const channelTitle = info.basic_info.author;
            const duration = timeFancy(info.basic_info.duration);
            const videoId = info.basic_info.id;
            const thumbnail = info.basic_info.thumbnail[1].url;
            const jsonData = {
                'title' : title,
                'channelTitle' : channelTitle,
                'duration' : duration,
                'videoId' : videoId,
                'thumbnail' : thumbnail
            } 
            res.json(jsonData);
        } else {
            res.status(500).json(info);
        }
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ error: 'UnexpectedError' });
    }
});
app.listen(port, ()=>{
    console.log("Server running!")
})