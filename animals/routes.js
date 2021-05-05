const express = require('express')
const router = express.Router()
const mongodbClient = require('mongodb').MongoClient
let ObjectId = require('mongodb').ObjectId // Behövs för att söka efter _id.

// Connection URL
const url = 'mongodb://localhost:27017';

mongodbClient.connect(url, {
        useUnifiedTopology: true
    })
    .then(client => {
        let db = client.db('zoo')
            // Routes
        router.get('/', (req, res) => {
            findDocument(db, null, (result) => {
                res.json(result)
            })
        })

        /* ta emot id som en parameter */
        router.get('/:animalid', (req, res) => {
            if (ObjectId.isValid(req.params.animalid)) {
                findDocument(db, req.params.animalid, (result) => {
                    // Hämta info om djuret
                    const collection = db.collection('animals')
                    collection.find({
                        "animals.animalid": req.params.animalId
                    }, {
                        name: 1,
                        art: 1,
                        _id: 0
                    }, (err, result, field) => {
                        console.error(err)
                    })
                    res.json(result)
                })
            }
        })
    })
    .catch(err => {
        if (err) throw err
    })


const findDocument = function(db, animalid = null, callback) {
    const collection = db.collection('animals');

    // Id or not, here I come...
    // Antingen är searchquery ett tomt objekt (visa alla), eller så är det ett objekt fyllt av _id och rätt horseid.
    let searchquery = animalid == null ? {} : {
            _id: new ObjectId(animalid)
        }
        // Find some documents
    collection.find(searchquery).toArray(function(err, docs) {
        if (err) throw err
        callback(docs);
    });
}

module.exports = router