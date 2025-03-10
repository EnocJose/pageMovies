const {Router} = require('express');
const Productora = require('../models/Productora');
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

        const productoraExists = await Productora.findOne({ name: req.body.name });
        if (productoraExists) {
            return res.status(400).json({ message: 'El género ya existe' });
        }

        let productora = new Productora();
            productora.id = new Productora()._id;
            productora.name = req.body.name;
            productora.state = req.body.state;
            productora.slogan = req.body.slogan;
            productora.createdAt =new Date();
            productora.updatedAt =new Date();
            productora.description = req.body.description;

        productora = await productora.save();
        res.status(201).send(productora);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/', async function (req, res) {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

router.put('/:productoraId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').not().isEmpty().isIn(['Activo', 'Inactivo']),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(404).json({ message: 'productora no esta registrada' });
        }

        const productoraExists = await Productora.findOne({ name: req.body.name });
        if (productoraExists) {
            return res.status(400).json({ message: 'La productora ya existe' });
        }

            productora.name = req.body.name;
            productora.state = req.body.state;
            productora.slogan = req.body.slogan;
            productora.updatedAt =new Date();
            productora.description = req.body.description;

        productora = await productora.save();
        res.status(201).send(productora);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;