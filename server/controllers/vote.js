const { response } = require('express');
const Vote = require('../models/vote')

exports.addVote = (req, res, next) => {
  const id_candidate = req.params.id_candidate;
  const Votes = new Vote(id_candidate)
  Votes.addVote(req.body.vote)
  res.status(201).send()
};

exports.getVotes = (req, res, next) => {
  const id_candidate = req.params.id_candidate;
  const Votes = new Vote(id_candidate)

  Votes.fetchAll(votes => {
    const total = votes.length
    const positives = votes.filter(vote => {
      return vote.vote == true
    }).length;
    const negatives = total-positives;

    res.send({
      total: total,
      yes: positives,
      no: negatives
    })
  });
};
