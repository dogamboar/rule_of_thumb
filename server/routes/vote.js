const express = require("express")

const Vote = require('../controllers/vote')

const router = express.Router();

router.get('/:id_candidate', Vote.getVotes)
router.post('/:id_candidate', Vote.addVote)

module.exports = router