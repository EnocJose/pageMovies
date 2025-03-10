const {Router} = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('title', 'invalid.title').not().isEmpty(),
    check('movieUrl', 'invalid.movieUrl').not().isEmpty().isURL(),
    check('releaseYear', 'invalid.releaseYear').not().isEmpty().isInt(),
    check('mainGenre', 'invalid.mainGenre').not().isEmpty().isMongoId(),
    check('mainDirector', 'invalid.mainDirector').not().isEmpty().isMongoId(),
    check('producer', 'invalid.producer').not().isEmpty().isMongoId(),
    check('type', 'invalid.type').not().isEmpty().isMongoId()
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({message: errors.array()});
        }
        const mediaExist = await Media.findOne({ serial: req.body.serial });
        if (mediaExist) {
            return res.status(400).json({ message: 'Media already exists' });
        }

    let media = new Media();
    media.serial = new Media()._id;
    media.title = req.body.title;
    media.movieUrl = req.body.movieUrl;
    media.releaseYear = req.body.releaseYear;
    media.mainGenre = req.body.mainGenre;
    media.mainDirector = req.body.mainDirector;
    media.producer = req.body.producer;
    media.type = req.body.type;
    media.createdAt =new Date();
    media.updatedAt =new Date();
    
    media = await media.save();
    res.status(201).send(media);
    
} catch (error) {
    console.log(error);
    res.status(500).send('message error');
}
});

router.get('/', async function(req, res) {
    try {
        const medias = await Media.find()
            .populate('mainGenre', 'name')
            .populate('mainDirector', 'name')
            .populate('producer', 'name')
            .populate('type', 'name');
        
        res.send(medias);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:serialId', [
    check('title', 'invalid.title').not().isEmpty(),
    check('movieUrl', 'invalid.movieUrl').not().isEmpty().isURL(),
    check('releaseYear', 'invalid.releaseYear').not().isEmpty().isInt(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({message: errors.array()});
        }

        // Find the media by serial ID
        let media = await Media.findOne({ serial: req.params.serialId });
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        // Update the media fields
        media.title = req.body.title;
        media.movieUrl = req.body.movieUrl;
        media.releaseYear = req.body.releaseYear;
        media.updatedAt = new Date();
        
        media = await media.save();
        res.status(200).send(media);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});
module.exports = router;