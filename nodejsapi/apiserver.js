const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// connectionString = 'PLEASE_ENTER_YOUR_OWN_CONNECTION_STRING'
connectionString = 'PLEASE_ENTER_YOUR_OWN_CONNECTION_STRING'

MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('testdb')
    const mdbCollection = db.collection('test1')

    app.use(express.json())

    // [CREATE] Create new product via API
    app.post("/createproduct", (req, res) => {
        const PRODUCT_ID = req.body.product_id
        const RECOMMEND_PRODUCT_ID_1 = req.body.recommend_product_id_1
        const RECOMMEND_PRODUCT_ID_2 = req.body.recommend_product_id_2

        mdbCollection.insertOne({ product_id: PRODUCT_ID, recommend_product_id_1: RECOMMEND_PRODUCT_ID_1, recommend_product_id_2: RECOMMEND_PRODUCT_ID_2 }, (err, result) => {
            if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
            }
            console.log(result)
            res.status(200).json({ create: true })
        })
      })

    // [UPDATE] Update product via API
    app.post("/updateproduct", (req, res) => {
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
            res.status(200).json({ update: true })
            console.log(result)
          })
          .catch(error => {
            res.status(500).json({ err: err })
            console.error(error)
          })
        })

    // [DELETE] Delete product via API
    app.post('/deleteproduct', (req, res) => {
        mdbCollection.deleteOne(
            { product_id: req.body.product_id }
        )
        .then(result => {
            if (result.deletedCount === 0) {
            return res.json('No Product to Delete')
            }
            res.status(200).json({ delete: true })    
        })
        .catch(error => {
            res.status(500).json({ err: err })
            console.error(error)
          })
        })

    // [READ] List all the products via API
    app.get("/productlist", (req, res) => {
        mdbCollection.find().toArray((err, items) => {
          if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
          }
          res.status(200).json({ products: items })
        })
      })

  })
  .catch(error => console.error(error))

app.listen(3000, function() {
    console.log('listening on 3000')
  })
