const logger = require('../../services/logger.service')
const orgService = require('./org.service')

// TODO: needs error handling! try, catch

async function getOrgs(req, res) {
    try {
        const orgs = await orgService.query(req.query)
        res.send(orgs)
    } catch (err) {
        logger.error('Cannot get orgs', err);
        res.status(500).send({ error: 'cannot get orgs' })

    }
}

async function getOrg(req, res) {
    const org = await orgService.getById(req.params.id)
    res.send(org)
}

async function deleteOrg(req, res) {
    try {
        await orgService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete org', err);
        res.status(500).send({ error: 'cannot delete org' })
    }
}

async function addOrg(req, res) {
    var org = req.body;
    org.byUser = {
            _id: req.session.user._id,
            username: req.session.user.username,
        }
        // const user = req.session.user
        // user.givenOrgs.push(org)
    org = await orgService.add(org)
        // TODO - need to find aboutEventi
    res.send(org)
}

module.exports = {
    getOrgs,
    getOrg,
    deleteOrg,
    addOrg
}