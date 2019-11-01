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

module.exports = p_router