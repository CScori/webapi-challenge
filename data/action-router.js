const a_router = require('express').Router()
const Actions = require('./helpers/actionModel')

a_router.get('/', (req, res) => {

    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: `The action information could not be retrieved error: ${err}.` })
        })
})
a_router.get('/:id', validId, (req, res) => {
    const need = req.params.id
    Actions.get(need)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: `The action information could not be retrieved error: ${err}.` })
        })
})
a_router.delete('/:id', validId, (req, res) => {
    const needId = req.params.id
    Actions.get(needId)
        .then(action => {
            Actions.remove(needId)
                .then(resps => {
                    if (resps === 1) {
                        res.status(204).json({ message: 'deleted' })
                    } else {
                        res.status(500).json({ message: 'not deleted' })
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
            if (action) {
                next();
            } else {
                res.status(404).json({ Messgae: "invalid action id" })
            }
        }).catch(error =>
            res.status(500).json({ error: `Server error: ${error}` })
        )
};

a_router.post('/', validAction, (req, res) => {
    Actions.insert(req.body)
        .then(newaction => {
            res.status(201).json(newaction)
        })
        .catch(err => {
            res.status(500).json({ error: `Server could not create action. Error: ${err}` })
        })
});
a_router.put('/:id', validAction, (req, res) => {
    const id = req.params.id
    Actions.update(id, req.body)
    .then( update => {
        if (update) {
            res.status(200).json(update)
        } else {
            res.status(500).json({ error: 'Server could not update action.'})
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Server could not update action. Error: ${err}` })
    })
})
function validAction(req, res, next) {
    if (req.body) {
        if (req.body.project_id && req.body.description && req.body.notes) {
            next();
        } else {
            res.status(400).json({ message: "missing required name, description, or notes field" })
        }
    } else {
        res.status(400).json({ message: "missing action data" })
    }

};
module.exports = a_router