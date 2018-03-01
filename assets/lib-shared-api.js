"use strict";

// All of these apis use callbacks only because they're more simple
// than promises. For the purpose of the meetup, I didn't want to
// cover promises, and I didn't want to confuse anyone who hadn't
// seen them before.
//
// I highly recommend learning and using promises, even if they can
// be a little confusing at times.
//
// The fetch function is a successor to the XMLHttpRequest.
window.API = {

  // Takes a password, and asks the server if it's valid or not.
  //
  // The callback function will receive an error as the first parameter and
  // a boolean as the second. The boolean will indicate if the password is valid.
  checkPassword: function checkPassword(password, callback) {
    return fetch("/api/check-password", {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({password: password})
    })
      .then(function (resp) {
        if(!resp.ok) throw new Error("Response not okay!");
        return resp.json();
      })
      .then(function (respData) { return respData.ok === true; })
      .then(function (value) { callback(null, value); }, function(err){ callback(err);});
  },

  // Loads the data from the database.
  //
  // The callback function will receive an error as the first parameter and
  // the database data as the second.
  loadData: function loadData(callback) {
    return fetch("/api/load-data")
      .then(function (resp) {
        if(!resp.ok) throw new Error("Response not okay!");
        return resp.json();
      })
      .then(function (value) { callback(null, value); }, function(err){ callback(err);});
  },

  // Saves the data into the database.
  //
  // The callback function will receive an error as the first parameter and nothing else.
  saveData: function saveData(data, callback) {
    return fetch("/api/save-data", {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(function (resp) {
        if(!resp.ok) throw new Error("Response not okay!");
      })
      .then(function () { callback(null); }, function(err){ callback(err);});
  },
};
