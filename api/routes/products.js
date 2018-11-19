const express = require('express')
const Product = require('../models/product')
const productsrouter = express.Router();
const mongoose = require('mongoose')

productsrouter.get('/', (req,resp,next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(result => {
        const respbody = {
            count: result.length,
            products: result.map(prd => {
                return {
                    name: prd.name,
                    price: prd.price,
                    _id: prd._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3030/products/' + prd._id
                    }
                }
            })
        }
        resp.status(200).json(respbody)
    })
    .catch(err => {
        resp.status(500).json(err);
    })
} )

productsrouter.post('/', (req,resp,next) => {
    const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      resp.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: {
            _id: result._id,
            request: {
                type: 'GET',
                url: 'http://localhost:3030/products/' + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      resp.status(500).json({
        error: err
      });
    });
} )

productsrouter.get('/:id', (req,resp,next) => {
    Product.findById(req.params.id).exec()
    .then(result => {
        if(result)
            resp.status(200).json(result)
        else
            resp.status(404).json('No matching id found')

    })
    .catch(err => {
        resp.status(500).json(err);
    })
} )

productsrouter.patch('/:id', (req,resp,next) => {
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        price: req.body.price
      });
    product.isNew = false;
    product.save().then(result => {
        console.log(result);
        resp.status(201).json({
          message: "Handling PATCH requests to /products",
          createdProduct: result
        });
      })
      .catch(err => {
        console.log(err);
        resp.status(500).json({
          error: err
        });
      });
} )

productsrouter.delete('/:id', (req,resp,next) => {
    const msg = 'Handling DELETE request with id ' + req.params.id;
    Product.remove({_id: req.params.id})
            .then(result => {
                resp.status(200).json('Deleted the record with id ' + req.params.id)
            })
            .catch(err => {
                resp.status(500).json(err);
            })
} )

module.exports = productsrouter;