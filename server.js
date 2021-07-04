const express = require('express');
const Joi = require('joi');

// custom middlewares
const logger = require('./src/middlewares/logger');
const authenticate = require('./src/middlewares/authenticate');

// process env config
const dotenv = require('dotenv');
dotenv.config();


const app = express();

// middleware
app.use(express.json());
app.use(logger);
app.use(authenticate);


const products = [
    { id: 1, name: 'hamam' },
    { id: 2, name: 'rexona' },
    { id: 3, name: 'nature power' },
    { id: 4, name: 'cinthol' },
]

app.get('/', (req, res) => {
    res.send('Api running..');
})

app.get('/api/products', (req, res) => {
    res.send(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === Number(req.params.id));
    if (!product) return res.status(404).send('data not found')

    res.send(product)
})

app.post('/api/products', (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);

    const product = {
        id: products.length + 1,
        name: req.body.name
    };
    products.push(product);

    res.send(product);
})


app.put('/api/products/:id', (req, res) => {

    const product = products.find(product => product.id === Number(req.params.id));
    if (!product) return res.status(404).send('data not found')

    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error);

    product.name = req.body.name;
    res.send(product);
})


app.delete('/api/products/:id', (req, res) => {

    const product = products.find(product => product.id === Number(req.params.id));
    if (!product) return res.status(404).send('data not found')

    const productIndex = products.indexOf(product);
    products.splice(productIndex, 1);
    res.send(product);
})






const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening to the port ${port}`);
})




function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(product);
}