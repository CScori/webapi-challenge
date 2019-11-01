const router = require('express').Router()
const Actions = require('./helpers/actionModel')

router.get('/', (req, res) => {

    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({ error: `The action information could not be retrieved error: ${err}.` })
    })
})
router.get('/:id', validId, (req, res) => {
    const need = req.params.id
    Actions.get(need)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({ error: `The action information could not be retrieved error: ${err}.` })
    })
})
router.delete('/:id', validId, (req, res) => {
    const needId = req.params.id
    Actions.get(needId)
    .then(action => {
        Actions.remove(needId)
        .then (resps => {
            if (resps === 1) {
                res.status(204).json({message: 'deleted'})
            } else {
                res.status(500).json({message: 'not deleted'})
            }
        })
    })
    .catch(err => {
        res.status(500).json({ error: `The action could not be deleted error: ${err}.` })
    })
})
function validId(req, res, next) {
    const id = req.params.id

   Actions.get(id)
    .then(action => {
        if(action) {
            next();
        } else {
            res.status(404).json({Messgae: "invalid action id"})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error: ${error}`})
    )
};

module.exports = router