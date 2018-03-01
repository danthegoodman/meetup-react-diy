"use strict";
const fs = require('fs');
const dbFilename = __dirname + "/../db.json";

exports.loadDb = loadDb;
exports.saveDb = saveDb;

function loadDb(done) {
  fs.readFile(dbFilename, 'utf8', function (err, content) {
    if (err) {
      // ENOENT is reported if the file doesn't exist aka "NO ENTity"
      if (err.code === 'ENOENT') {
        //No error, just return an empty database.
        done(null, []);
      } else {
        // In case something else goes wrong, we should just pass along the error.
        done(err);
      }
      return;
    }

    // Empty file
    if(!content) {
      return [];
    }

    var jsonData;
    try {
      jsonData = JSON.parse(content);
    } catch (err) {
      // In case someone monkeyed with the file and gave it invalid json
      done(err);
      return;
    }

    if(!Array.isArray(jsonData)){
      done(new Error("Database file must contain only a JSON array"));
    }

    done(null, jsonData);
  });
}

function saveDb(dbContent, done) {
  if (!Array.isArray(dbContent)){
    done(new Error("Refusing to save database that isn't an array"));
  }

  fs.writeFile(dbFilename, JSON.stringify(dbContent), function (err) {
    if (err) {
      done(err);
    } else {
      done(null);
    }
  });
}
