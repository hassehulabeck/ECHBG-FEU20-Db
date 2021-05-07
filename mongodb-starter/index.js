const express = require('express')
const app = express()
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId // Behövs för att söka efter _id.


const MongoClient = mongodb.MongoClient

const url = 'mongodb://localhost:27017';

// För att kunna ta emot post-requests och läsa req.body etc
app.use(express.urlencoded({ extended: true }))

// Callback.
app.get('/', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error(err)
        }

        const db = client.db('zoo')

        findDocuments(db, (animalDocuments) => {
            console.log("Dokument hämtade")
            res.json(animalDocuments)
            client.close()
        })

    })
})

/* ta emot id som en parameter */
app.get('/:animalid', async(req, res) => {
    if (ObjectId.isValid(req.params.animalid)) {

        const client = await MongoClient.connect(url, { useUnifiedTopology: true })

        let searchquery = req.params.animalid == null ? {} : {
            _id: new ObjectId(req.params.animalid)
        }

        const db = client.db('zoo')
        const animals = db.collection('animals')

        const result = animals.find(searchquery)
        let retur = []
        for await (const document of result) {
            retur.push(document)
        }
        res.json(retur)
        console.log(result)
        client.close()

    } else {
        res.send("Fanns inget sånt djur")
    }
})


// Async / await
app.get('/mammals', async(req, res) => {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true })

    const db = client.db('zoo')
    const animals = db.collection('animals')

    // Funktioner som .find() ger tillbaka en s.k. cursor. 
    // En cursor fungerar ungefär som en array, dvs det går att göra foreach eller i det här fallet, for-of. Bra vid async.
    const result = animals.find({ category: "Däggdjur" })
    let retur = []
    for await (const document of result) {
        retur.push(document)
    }
    res.json(retur)
    client.close()

})

// Async / await
app.post('/', async(req, res) => {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true })

    const db = client.db('zoo')
    const animals = db.collection('animals')

    console.log(req.body)

    const result = await animals.insertOne(req.body)
    if (result.insertedCount != 1) res.send("Nope")
    else res.send("Yay")

})

app.patch('/:animalid', async(req, res) => {
    if (ObjectId.isValid(req.params.animalid)) {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true })

        const db = client.db('zoo')
        const animals = db.collection('animals')

        let filter = {
            _id: new ObjectId(req.params.animalid)
        }

        const updateDocument = {
            $set: {
                name: req.body.name,
                category: req.body.category
            }
        }

        const result = await animals.updateOne(filter, updateDocument)

        if (result.modifiedCount != 1) res.send("Nope")
        else res.send("Yay")
    }

})




const findDocuments = function(db, callback) {

    // Get the documents collection
    const animals = db.collection('animals')

    // Find some documents
    animals.find({}).toArray(function(err, docs) {
        callback(docs);
    });
};


const findOneDocument = function(db, animalid = null, callback) {
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


app.listen(3000, () => {
    console.log("Det är igång.")
})