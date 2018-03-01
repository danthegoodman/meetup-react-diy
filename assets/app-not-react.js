"use strict";
// Wrap the app in a function so variables and functions are kept private to the app
(function(){
  const $loginScreen = document.querySelector(".loginScreen");
  const $passwordInput = document.querySelector(".password");
  const $loginButton = document.querySelector(".loginButton");
  const $entryScreen = document.querySelector(".entryScreen");
  const $addEntryButton = document.querySelector(".addEntryButton");
  const $entries = document.querySelector(".entries");

  var loadedData = null;

  //show login page, hide entry page
  $loginScreen.style.display = '';
  $entryScreen.style.display = 'none';

  $loginButton.onclick = () => doAttemptLogin();
  $passwordInput.onkeypress = (e) => {
    if(e.which === 13){ // enter
      doAttemptLogin()
    }
  };
  $addEntryButton.onclick = function(){ doAddEntry() };

  function doAttemptLogin(){
    API.checkPassword($passwordInput.value, function(err, isValid){
      if(err){
        window.alert("Unknown error while checking password");
        return;
      }

      if(!isValid) {
        $passwordInput.value = "";
        // TODO message to the user
        return;
      }

      $entryScreen.style.display = '';
      $loginScreen.style.display = 'none';
      API.loadData(function(loadErr, data) {
        if(loadErr){
          window.alert("Unknown error while loading data");
          return;
        }

        loadedData = data;

        //reversed, so the newest is at the top
        for(var i = loadedData.length - 1; i >= 0; i--){
          $entries.appendChild(buildEntryDiv(loadedData[i]));
        }
      });
    })
  }

  function doAddEntry(){
    if(loadedData == null){
      window.alert("Please wait until the data is loaded");
      return;
    }

    const message = window.prompt("Enter your message:");
    if (!message){
      // no message entered
      return;
    }

    const logEntry = {
      message: message,
      time: Date.now(),
    };
    loadedData.push(logEntry);
    $entries.insertAdjacentElement('afterbegin', buildEntryDiv(logEntry));
    API.saveData(loadedData, function(err){
      if(err){
        window.alert("The message you just entered didn't save properly");
      }
    })
  }

  function buildEntryDiv(logEntry){
    const $time = document.createElement('div');
    $time.className = "time";
    $time.innerText = new Date(logEntry.time).toString();

    const $msg = document.createElement('div');
    $msg.className = "message";
    $msg.innerText = logEntry.message;

    const $root = document.createElement('div');
    $root.className = "logEntry";
    $root.appendChild($time);
    $root.appendChild($msg);
    return $root;
  }
})();
