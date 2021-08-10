import express from 'express';
import StoryService from '../services/StoryService';
const router = express.Router();

router.get('/:storyID', async (req, res) =>{
    try{
        const storyService = await StoryService.fetchPageByID(req.params.storyID);
    
        res.status(200);
        res.json({
            storyID: req.params.storyID,
            title: storyService.getTitle(),
            author: storyService.getAuthor(),
            altTitle: storyService.getAltTitle(),
            chapters: storyService.getChapters(),
            genres: storyService.getGenres(),
            status: storyService.getStoryStatus(),
            description: storyService.getDescription(),
            lastUpdated: storyService.getLastUpdated(),
            image: storyService.getImageURL()
        });
    }
    catch(err){
        res.status(400);
        res.send(err);
    }  
});

export default router;