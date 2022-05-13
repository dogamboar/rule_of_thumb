const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'candidates.json'
);

const getCandidatesFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Candidate {
  constructor(name, description, image) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.image = image;
    this.creation = time();
  }

  save() {
    getCandidatesFromFile(candidate => {
      candidate.push(this);
      fs.writeFile(p, JSON.stringify(candidate), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getCandidatesFromFile(cb);
  }
};
