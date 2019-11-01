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