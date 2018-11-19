const express = require('express')
const productsrouter = require('./api/routes/products')
const ordersrouter = require('./api/routes/orders')


const app = express();
// app.use((req, resp, next) => {
//     resp.status(200).json({
//         message: 'It works!'
//     })
// });

app.use('/products', productsrouter)
app.use('/orders', ordersrouter)

module.exports = app;