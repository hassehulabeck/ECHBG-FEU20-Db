const router = require('express').Router()
const Notation = require('./notation')

// Hämta alla noteringar
router.get('/', async(req, res) => {
    const result = await Notation.find({})
    res.json(result)
})

// Hämta alla noteringar för en person
router.get('/:name', async(req, res) => {
    // Ingen const-variabel, eftersom jag kan behöva ändra den
    let result = await Notation.find({ person: req.params.name })
    if (result.length == 0) {
        result = { msg: 'No data for this person' }
    }
    res.json(result)
})

// Hämta alla noteringar för en dag - format 'YYYY-MM-DD'
// Observera att URL har /datum, detta för att annars 'fångar' :name upp alla datum. 
router.get('/datum/:date', async(req, res) => {

    /* Date är ofta lite lurigt. 
    Här behöver vi söka efter ett specifikt datum, vilket man kan göra genom att söka ett datum som både är större eller lika med parametern date, samt mindre än den parametern + 1 dag.
    Därför definierar jag två variabler, och konstruerar ett date-objekt av parametern date. 
    Därefter sätter jag värdet på stopDate till + 1 dag baserat på startDate. 
    */
    let startDate = new Date(req.params.date)
    let stopDate = new Date()
    stopDate.setDate(startDate.getDate() + 1)
    const result = await Notation.find({
        "time": {
            "$gte": startDate,
            $lt: stopDate
        }
    })
    if (result.length == 0) {
        result = { msg: 'No data for this date' }
    }
    res.json(result)
})

router.post('/', async(req, res) => {
    let time = new Date()
    let newNotation = new Notation({
        person: req.body.person,
        time: time,
        event: req.body.event
    })
    const result = await newNotation.save()
    res.json(result)
})


module.exports = router