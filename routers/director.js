const {Router} = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').not().isEmpty().isIn(['Activo', 'Inactivo']),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const directorExists = await Director.findOne({ name: req.body.name });
        if (directorExists) {
            return res.status(400).json({ message: 'El director ya existe' });
        }

        let director = new Director();
        director.id = new Director()._id;
        director.name = req.body.name;
        director.state = req.body.state;
        director.createdAt =new Date();
        director.updatedAt =new Date();

        director = await director.save();
        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.get('/', async function (req, res) {
    try {
        const director = await Director.find();
        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:directorId', [
    check('name', 'invalid.name').optional().not().isEmpty(),
    check('state', 'invalid.state').optional().isIn(['Activo', 'Inactivo']),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let director = await Director.findById(req.params.directorId);
        if (!director) {
            return res.status(404).json({ message: 'Director no esta registrado' });
        }

        const directorExists = await Director.findOne({ name: req.body.name });
        if (directorExists) {
            return res.status(400).json({ message: 'El director ya existe' });
        }

        director.name = req.body.name;
        director.state = req.body.state;
        director.updatedAt =new Date();

        director = await director.save();
        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});
module.exports = router;