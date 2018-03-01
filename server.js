"use strict";
const express = require('express');
const database = require('./server-lib/database');

main();

function main() {
  const app = buildExpressApp();
  const server = app.listen(3000, function (err) {
    if (err) {
      console.error("Unable to start server", err);
      process.exitCode = 1;
    } else {
      console.log("Server listening on http://localhost:3000/")
    }
  });

  process.once('SIGINT', function () {
    console.log("CTRL+C received. Shutting down server...");
    server.close()
  })
}

function buildExpressApp() {
  return express()
    .use(express.json())
    .post("/api/check-password", function (req, res) {
      if (req.body.password === "mypass") {
        res.json({ok: true})
      } else {
        res.json({ok: false})
      }
    })
    .get("/api/load-data", function (req, res) {
      database.loadDb(function (err, db) {
        if (err) {
          console.error(err);
          res.status(500).send("error");
        } else {
          // We delay the response so we can experience a "loading screen"
          setTimeout(function(){
            res.status(200).json(db);
          }, 500);
        }
      });
    })
    .post("/api/save-data", function (req, res) {
      database.saveDb(req.body, function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("error");
        } else {
          res.status(200).json({ok: true});
        }
      })
    })
    .use(express.static("assets"))
    ;
}
