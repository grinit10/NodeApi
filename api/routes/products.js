const express = require('express')

const productsrouter = express.Router();

productsrouter.get('/', (req,resp,next) => {
    resp.status(200).json({
        'message': 'Handling GET request'
    })
} )

productsrouter.post('/', (req,resp,next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    resp.status(201).json({
        message: 'Handling POST request',
        createdProduct: product
    })
} )

productsrouter.get('/:id', (req,resp,next) => {
    const msg = 'Handling GET request with id ' + req.params.id;
    resp.status(200).json({
        'message': msg
    })
} )

productsrouter.patch('/:id', (req,resp,next) => {
    const msg = 'Handling PATCH request with id ' + req.params.id;
    resp.status(200).json({
        'message': msg
    })
} )

productsrouter.delete('/:id', (req,resp,next) => {
    const msg = 'Handling DELETE request with id ' + req.params.id;
    resp.status(200).json({
        'message': msg
    })
} )

module.exports = productsrouter;