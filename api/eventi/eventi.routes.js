const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware.js')
const { getEventi, getEventis, deleteEventi, updateEventi, addEventi } = require('./eventi.controller.js')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getEventis)
router.get('/:id', getEventi)
router.put('/:id', requireAuth, updateEventi)
router.post('/', requireAuth, addEventi)
router.delete('/:id', requireAuth, requireAdmin, deleteEventi)

module.exports = router