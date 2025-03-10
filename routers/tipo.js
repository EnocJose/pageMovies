const {Router} = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const tipoExists = await Tipo.findOne({ name: req.body.name });
        if (tipoExists) {
            return res.status(400).json({ message: 'El tipo ya existe' });
        }

        let tipo = new Tipo();
            tipo.id = new Tipo()._id;
            tipo.name = req.body.name;
            tipo.createdAt =new Date();
            tipo.updatedAt =new Date();
            tipo.description = req.body.description;

        tipo = await tipo.save();
        res.status(201).send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/', async function (req, res) {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.put('/:tipoId', [
    check('name', 'invalid.name').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(404).json({ message: 'El tipo ya esta registrado' });
        }

        const tipoExists = await Tipo.findOne({ name: req.body.name });
        if (tipoExists) {
            return res.status(400).json({ message: 'El tipo ya existe' });
        }

            tipo.name = req.body.name;
            tipo.updatedAt =new Date();
            tipo.description = req.body.description;

        tipo = await tipo.save();
        res.status(201).send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;