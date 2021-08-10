import express from 'express';
import search from '../services/SearchService';
const router = express.Router();

router.post('/', (req, res) =>{
    if(!req.body.searchword){
        res.status(400); //Bad req
        res.send('No searchwords provided');
        return;
    }
    
    search(req.body.searchword).then(searchRes => {
        res.status(200);
        res.send(searchRes);
    }).catch(err => {
        res.status(400);
        res.send(err);
    });
});

export default router;