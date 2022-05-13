const Candidates = require('./../models/candidates')


exports.postAddCandidate = (req, res, next) => {
    //TODO Routine to create a new candidate
};

exports.getCandidates = (req, res, next) => {
  Candidates.fetchAll(candidates => {
    res.send(candidates)
  });
};
