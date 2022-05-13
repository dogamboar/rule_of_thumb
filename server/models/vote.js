const fs = require('fs');
const path = require('path');

module.exports = class Candidate {
  constructor(id_candidate) {
    this.p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'votes',
      id_candidate + '.json'
    );
  }

  addVote(vote) {
    this.fetchAll(votes => {
      votes.push({
        vote : vote,
        creation : Date.now()
      });
      fs.writeFile(this.p, JSON.stringify(votes), err => {
        console.log(err);
      });
    });
  }

  fetchAll(cb){
    fs.readFile(this.p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
};
