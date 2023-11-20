const router = require('express').Router();
const store = require('../db/dbData');


router.get('/notes', (req, res) => {
    store
    .getNotes()
    .then((notes) => {
        return res.json(notes)
    })
    .catch((err) => res.status(500).json(err))

})

router.post('/notes', (req, res) => {
    store
    .addNote(req.body)
    .then((notes) =>  res.json(notes))
    .catch((err) => res.json(err))
    
})

module.exports = router;