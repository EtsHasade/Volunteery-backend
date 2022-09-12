const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addOrg, getOrgs, getOrg, deleteOrg } = require('./org.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrgs)
router.get('/:id', getOrg)
router.post('/', requireAuth, addOrg)
router.delete('/:id', requireAuth, deleteOrg)

module.exports = router