const express = require('express')

const ordersrouter = express.Router();

ordersrouter.get('/', (req,resp,next) => {
    resp.status(200).json({
        'message': 'Handling GET request'
    })
} )

ordersrouter.post('/', (req,resp,next) => {
    const order = {
        productId : req.body.productId,
        quantity: req.body.quqntity
    }
    resp.status(200).json({
        'message': 'Handling POST request',
        placedOrder: order
    })
} )

ordersrouter.get('/:id', (req,resp,next) => {
    const msg = 'Handling GET request with id ' + req.params.id;
    resp.status(200).json({
        'message': msg
    })
} )

ordersrouter.patch('/:id', (req,resp,next) => {
    const msg = 'Handling PATCH request with id ' + req.params.id;
    resp.status(200).json({
        'message': msg
    })
} )

ordersrouter.delete('/:id', (req,resp,next) => {
    const msg = 'Handling DELETE request with id ' + req.params.id;
    resp.status(200).json({
        'message': msg
    })
} )

module.exports = ordersrouter;