const express = require("express")

const Candidates = require('./../controllers/candidates')

const router = express.Router();

router.get('/list', Candidates.getCandidates)

module.exports = router