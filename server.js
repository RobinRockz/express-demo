// process env config
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');

// routes
const products = require('./routes/products');
const home = require('./routes/home');

// custom middlewares
const authenticate = require('./middlewares/authenticate');

const app = express();

// template
app.set('view engine', 'pug');
// app.set('views', './views'); // default

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticate);
app.use(helmet());

// configuration
debug(`App name: ${config.get('name')}`);
// startupDebugger(`DB password: ${config.get('database.password')}`);

if (app.get('env') === 'development') {
    debug('Morgan enabled');
    app.use(morgan('tiny'));
}

// DB work...
// dbDebugger('database is connected...');

// routes
app.use('/api/products', products);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening to the port ${port}`);
})
