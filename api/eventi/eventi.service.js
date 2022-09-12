const dbService = require('../../services/db.service')
const orgService = require('../org/org.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('eventi')
    try {
        const eventis = await collection.find({}).toArray();
        console.log(eventis);
        // eventis.forEach(eventi => delete eventi.password);

        return eventis
    } catch (err) {
        console.log('ERROR: cannot find eventis')
        throw err;
    }
}

async function getById(eventiId) {
    const collection = await dbService.getCollection('eventi')
    try {
        const eventi = await collection.findOne({ '_id': ObjectId(eventiId) })
        delete eventi.password
        return eventi
    } catch (err) {
        console.log(`ERROR: while finding eventi ${eventiId}`)
        throw err;
    }
}

async function remove(eventiId) {
    const collection = await dbService.getCollection('eventi')
    try {
        await collection.deleteOne({ '_id': ObjectId(eventiId) })
    } catch (err) {
        console.log(`ERROR: cannot remove eventi ${eventiId}`)
        throw err;
    }
}

async function update(eventi) {
    const collection = await dbService.getCollection('eventi')
    eventi._id = ObjectId(eventi._id);
    console.log(eventi);
    try {
        await collection.update({ _id: eventi._id }, { $set: eventi })
        return eventi
    } catch (err) {
        console.log(`ERROR: cannot update eventi ${eventi._id}`)
        throw err;
    }
}

async function add(eventi) {
    console.log(eventi);
    const collection = await dbService.getCollection('eventi')
    try {
        await collection.insertOne(eventi);
        return eventi;
    } catch (err) {
        console.log(`ERROR: cannot insert eventi`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.eventiname = { $regex: `/${filterBy.txt}/` }
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    }
    return criteria;
}