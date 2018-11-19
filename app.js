const express = require('express')
const productsrouter = require('./api/routes/products')
const ordersrouter = require('./api/routes/orders')
const morgan = require('morgan')
var cors=require('cors');
var mongoose = require('mongoose');

var uri = 'mongodb://arnab:Nov@2018@nodeapicluster-shard-00-00-zaytg.mongodb.net:27017,nodeapicluster-shard-00-01-zaytg.mongodb.net:27017,nodeapicluster-shard-00-02-zaytg.mongodb.net:27017/test?ssl=true&replicaSet=NodeApiCluster-shard-0&authSource=admin&retryWrites=true'

// mongoose.connect(uri,{ useNewUrlParser: true })
mongoose.connect(
    'mongodb+srv://nodeapicluster-zaytg.mongodb.net/test?retryWrites=true',
    {
      auth: {
        user: 'arnab',
        password: 'Nov@2018'
      },
      useNewUrlParser: true
    },
    function(err, client) {
      if (err) {
        console.log(err);
      }
      else
        console.log('connected!!!');
    }
  );

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({origin:true,credentials: true}))


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