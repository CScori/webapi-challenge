const p_router = require('express').Router()
const Projects = require('../helpers/actionModel.js')

p_router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({ error: `The project could not be retrieved: ${err}`})
    })
})
p_router.get('/:id', validatePId, (req,res) => {
    Projects.get(req.params.id)
    .then(project => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({error: `Server could not get data: ${err}`})
    })
})
p_router.get('/:id/actions', validProject, (req, res) => {
    Projects.getProjectActions(req.params,id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({error: `Server error: ${err}`})
    })
})
p_router.post('/', validProject, (req,res) => {
    Projects.insert(req.body)
    .then(newP => {
        res.status(201).json(newP)
    })
    .catch(err => {
        res.status(500).json({error: `Server error adding : ${err}`})
    })
})
p_router.delete('/:id', validatePId, (req, res) => {
    const pid = req.params.id
    Projects.get(id)
    .then(project => {
        Projects.remove(pid)
        .then(presp => {
            if (presp === 1) {
                res.status(204).json({message: 'deleted p'})
            } else {
                res.status(500).json({message: 'not deleted p '})
            }
        })
    })
    .catch(err => {
        res.status(500).json({error: `Server error: ${err}`})
    })
})
p_router.put('/:id', validatePId, (req, res) => {
    const id = req.params.id
    Projects.update(id, req.body)
    .then(updateP => {
        if (updateP) {
            res.status(200).json(updateP)
        } else {
            res.status(500).json({error: 'Project not updated'})
        }
    })
    .catch(err => {
        res.status(500).json({error: `Server error: ${err}`})
    })
})


function validatePId(req, res, next) {
    const id = req.params.id
    Projects.get(id)
    .then(project => {
        if(project) {
            next();
        } else {
            res.status(404).json({Messgae: "invalid project id"})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error: ${error}`})
    )
};

function validProject(req, res, next) {
    if (req.body) {
        if (req.body.name && req.body.description) {
            next ();
        } else {
            res.status(400).json({ message: "missing required name or description field"  })
        }
    } else {
        res.status(400).json({ message: "missing project data" })
    }
    
};
module.exports = p_router