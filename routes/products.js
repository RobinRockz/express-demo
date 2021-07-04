const express = require('express');
const Joi = require('joi');

const router = express.Router();


const products = [
    { id: 1, name: 'hamam' },
    { id: 2, name: 'rexona' },
    { id: 3, name: 'nature power' },
    { id: 4, name: 'cinthol' },
]

router.get('/', (req, res) => {
    res.send(products);
});

router.get('/:id', (req, res) => {
    const product = products.find(product => product.id === Number(req.params.id));
    if (!product) return res.status(404).send('data not found')

    res.send(product)
});

router.post('/', (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);

    const product = {
        id: products.length + 1,
        name: req.body.name
    };
    products.push(product);

    res.send(product);
});


router.put('/:id', (req, res) => {

    const product = products.find(product => product.id === Number(req.params.id));
    if (!product) return res.status(404).send('data not found')

    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);

    product.name = req.body.name;
    res.send(product);
});


router.delete('/:id', (req, res) => {

    const product = products.find(product => product.id === Number(req.params.id));
    if (!product) return res.status(404).send('data not found')

    const productIndex = products.indexOf(product);
    products.splice(productIndex, 1);
    res.send(product);
});


function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(product);
}

module.exports = router;