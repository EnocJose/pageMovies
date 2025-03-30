const {Router} = require('express');
const Genero = require('../models/Genero');
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

        const generoExists = await Genero.findOne({ name: req.body.name });
        if (generoExists) {
            return res.status(400).json({ message: 'El género ya existe' });
        }

        let genero = new Genero();
            genero.id = new Genero()._id;
            genero.name = req.body.name;
            genero.state = req.body.state;
            genero.coverImage = req.body.coverImage
            genero.createdAt =new Date();
            genero.updatedAt =new Date();
            genero.description = req.body.description;

        genero = await genero.save();
        res.status(201).send(genero);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/', async function (req, res) {

    try {

        const generos = await Genero.find();
        res.send(generos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});


router.put('/:generoId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').not().isEmpty().isIn(['Activo', 'Inactivo']),

], async function (req, res) {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genero = await Genero.findById({_id:req.params.generoId});

        if (!genero) {
            return res.status(404).json({ message: 'genero de pelicula no esta registrado' });
        }

        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.coverImage = req.body.coverImage
        genero.updatedAt =new Date();
        genero.description = req.body.description;
        genero = await genero.save();

        res.status(201).send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});


module.exports = router;