import express from 'express';
import ChapterService from '../services/ChapterService';
import Utils from '../Utils';
const router = express.Router();

router.get('/:storyID/:chapter', async (req, res) =>{
    try{
        const chapterService = await ChapterService.fetchPageByID(req.params.storyID, req.params.chapter);
    
        res.status(200);
        res.json({
            imageLinks: chapterService.getChapterImageLinks(),
            title: chapterService.getTitle(),
            storyID: req.params.storyID,
            previousChapterNumber: Utils.getChapterNumber(chapterService.getPreviousChapterLink()),
            nextChapterNumber: Utils.getChapterNumber(chapterService.getNextChapterLink())
        });
    }
    catch(err){
        res.status(400);
        res.send(err);
    }  
});

router.post('/getImageBuffer', async (req, res) =>{
    if(!req.body.imageBufferLink){
        res.status(400);
        res.send('No link provided');
        return;
    }

    try{
        const buffer = await ChapterService.getImageBuffer(req.body.imageBufferLink);

        // res.writeHead(200, {
        //     'Content-Type': "image/jpeg",
        //     'Content-Length': buffer.length
        // });
        // res.end(buffer, 'binary');
        

        //send buffer as an encoded base64 string
        res.send('data:image/jpg;base64,' + buffer.toString('base64'));
    }

    catch(err){
        res.status(400);
        res.send(err);
    }
});

export default router;