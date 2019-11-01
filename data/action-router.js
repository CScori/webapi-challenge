const router = require('express').Router()
const Actions = require('./helpers/actionModel')

router.get('/', (req, res) => {

    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({ error: `The action information could not be retrieved error: ${error}.` })
    })
})


module.exports = router