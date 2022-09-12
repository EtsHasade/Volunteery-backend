const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    // TODO: Build the criteria with $regex
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('org')
    try {
        const orgs = await collection.find({}).toArray();
        // orgs = await collection.aggregate([{
        //         $match: criteria
        //     },
        //     {
        //         $lookup: {
        //             localField: 'byUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     // {
        //     //     $lookup: {
        //     //         localField: 'aboutEventiId',
        //     //         from: 'eventi',
        //     //         foreignField: '_id',
        //     //         as: 'aboutEventi'
        //     //     }
        //     // },
        //     // {
        //     //     $unwind: '$aboutEventi'
        //     // }
        // ]).toArray()

        // orgs = orgs.map(org => {
        //     org.byUser = { _id: org.byUser._id, username: org.byUser.username }
        //         // org.aboutEventi = { _id: org.aboutEventi._id, username: org.aboutEventi.username }
        //     delete org.byUserId;
        //     // delete org.aboutEventiId;
        //     return org;
        // })

        return orgs
    } catch (err) {
        console.log('ERROR: cannot find orgs')
        throw err;
    }
}

async function getById(orgId) {
    const collection = await dbService.getCollection('org')
    try {
        const org = await collection.findOne({ '_id': ObjectId(orgId) })
        return org
    } catch (err) {
        console.log(`ERROR: while finding org ${orgId}`)
        throw err;
    }
}

async function remove(orgId) {
    const collection = await dbService.getCollection('org')
    try {
        await collection.deleteOne({ "_id": ObjectId(orgId) })
    } catch (err) {
        console.log(`ERROR: cannot remove org ${orgId}`)
        throw err;
    }
}


async function add(org) {
    const collection = await dbService.getCollection('org')
    try {
        await collection.insertOne(org);
        return org;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.byUserId) {
        criteria.byUser = {
            _id: filterBy.byUserId
        }
    }
    // if (filterBy.aboutEventi) {
    //     criteria.balance = { $gte: filterBy.aboutEventi }
    // }
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    add
}