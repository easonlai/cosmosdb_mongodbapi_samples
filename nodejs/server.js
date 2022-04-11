const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// connectionString = 'PLEASE_ENTER_YOUR_OWN_CONNECTION_STRING'
connectionString = 'PLEASE_ENTER_YOUR_OWN_CONNECTION_STRING'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('testdb')
    const mdbCollection = db.collection('test1')

    app.use(bodyParser.json())

    app.post('/creates', (req, res) => {
      mdbCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
          console.log(result)
        })
        .catch(error => console.error(error))
      })

    app.post('/updates', (req, res) => {
      mdbCollection.findOneAndUpdate(
        { product_id: req.body.product_id },
        {
          $set: {
            product_id: req.body.product_id,
            recommend_product_id_1: req.body.recommend_product_id_1,
            recommend_product_id_2: req.body.recommend_product_id_2
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
          res.redirect('/')
          console.log(result)
        })
        .catch(error => console.error(error))
    })

    app.post('/delete', (req, res) => {
      mdbCollection.deleteOne(
        { product_id: req.body.product_id }
      )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No Product to Delete')
        }
        res.redirect('/')

      })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
      db.collection('test1').find().toArray()
        .then(results => {
          res.render('index.ejs', { products: results })
        })
        .catch(error => console.error(error))

      })

  })
  .catch(error => console.error(error))

app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//   })

app.listen(3000, function() {
    console.log('listening on 3000')
  })