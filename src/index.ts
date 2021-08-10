import express from 'express';
import cors from 'cors';

import searchStoryRoute from './routes/searchstory';
import chapterRoute from './routes/chapter';
import storyRoute from './routes/story';

const app = express();
const PORT = 4000;

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server is running`);
});

app.use(cors());
app.use(express.urlencoded({extended: true})); //handles form-encoded post data in req.body
app.use(express.json()); //handles json post data in req.body
app.use('/searchstory', searchStoryRoute);
app.use('/chapter', chapterRoute);
app.use('/story', storyRoute);