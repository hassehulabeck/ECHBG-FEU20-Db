const express = require('express')
const app = express()
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017'


// Med callback (hämta alla djur)
app.get('/', (req, res) => {

    // Options-objektet behövs eftersom vi annars får deprecated-error
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) console.error(err)

        // Vi har kontakt
        const db = client.db('zoo')

        getAll(db, (results) => {
            res.json(results)
            client.close()
        })
    })
})

const getAll = function(db, callback) {
    const animals = db.collection('animals')
    animals.find({}).toArray(function(err, docs) {
        if (err) throw err
        callback(docs);
    })
}


// Med async/await (hämta alla djur)
app.get('/animals', async(req, res) => {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true })

    const db = client.db('zoo')
    const animals = db.collection('animals')

    // Funktioner som .find() ger tillbaka en s.k. cursor. 
    // En cursor fungerar ungefär som en array, dvs det går att göra foreach eller i det här fallet, for-of. Bra vid async.
    const result = animals.find({})
    let retur = []
    for await (const document of result) {
        retur.push(document)
    }
    res.json(retur)
})


app.listen(3000, () => {
    console.log("Igång.")
})