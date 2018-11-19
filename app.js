const express = require('express')
const productsrouter = require('./api/routes/products')
const ordersrouter = require('./api/routes/orders')
const morgan = require('morgan')


const app = express();

app.use(morgan('dev'))
app.use('/products', productsrouter)
app.use('/orders', ordersrouter)
app.use((req,resp,next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use((err, req,resp,next) => {
    resp.status(err.status || 500);
    resp.json({
        'message': err.message
    })
})

module.exports = app;