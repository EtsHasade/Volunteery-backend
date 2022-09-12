const eventiService = require('./eventi.service')
const logger = require('../../services/logger.service')

async function getEventi(req, res) {
    const eventi = await eventiService.getById(req.params.id)
    res.send(eventi)
}

async function getEventis(req, res) {
    const eventis = await eventiService.query(req.query)
    logger.debug(eventis);
    res.send(eventis)
}

async function deleteEventi(req, res) {
    await eventiService.remove(req.params.id)
    res.end()
}

async function updateEventi(req, res) {
    const eventi = req.body;
    await eventiService.update(eventi)
    res.json(eventi)
}

async function addEventi(req, res) {
    var eventi = req.body;
    eventi = await eventiService.add(eventi)
    res.json(eventi)
}


module.exports = {
    getEventi,
    getEventis,
    deleteEventi,
    updateEventi,
    addEventi
}