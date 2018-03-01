"use strict";
// Wrap the app in a function so variables and functions are kept private to the app
(function () {
  class AppRoot extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        password: '',
        loadedData: null,
      }
    }

    render() {
      if (!this.state.loggedIn) {
        return React.createElement('div', {className: 'loginScreen'},
          "Password: ",
          React.createElement('input', {
            className: 'password',
            type: 'password',
            value: this.state.password,
            onChange: (e) => this.setState({password: e.target.value}),
            onKeyPress: (e) => {
              if(e.which === 13){
                this.doAttemptLogin()
              }
            },
          }),
          React.createElement('button', {className: 'loginButton', onClick: ()=> this.doAttemptLogin()},
            "try:",
            this.state.password,
          )
        );
      }

      return React.createElement('div', {className: 'entryScreen'},
        React.createElement('button', {className: 'addEntryButton', onClick: ()=> this.doAddEntry()}, 'Add Entry'),
        React.createElement('div', {className: 'entries'}, this.buildEntries())
      );
    }

    doAttemptLogin(){
      API.checkPassword(this.state.password, (err, isValid) => {
        if(err){
          window.alert("Unknown error while checking password");
          return;
        }

        if(!isValid) {
          this.setState({password: ''});
          // TODO message to the user
          return;
        }

        this.setState({loggedIn: true});
        API.loadData((loadErr, data) => {
          if(loadErr){
            window.alert("Unknown error while loading data");
            return;
          }

          this.setState({loadedData: data});
        });
      })
    }

    doAddEntry(){
      const loadedData = this.state.loadedData;
      if(loadedData == null){
        window.alert("Please wait until the data is loaded");
        return;
      }

      const message = window.prompt("Enter your message:");
      if (!message){
        // no message entered
        return;
      }

      const logEntry = {message: message, time: Date.now()};
      //react doesn't want us to modify it in place, so we create a new array
      // using concat and set the state with it.
      const newLoadedData = loadedData.concat([logEntry]);

      this.setState({loadedData: newLoadedData});
      API.saveData(newLoadedData, function(err){
        if(err){
          window.alert("The message you just entered didn't save properly");
        }
      })
    }

    buildEntries(){
      const divs = [];
      const loadedData = this.state.loadedData;
      if(loadedData == null) return divs;

      //reversed, so the newest is at the top
      for(var i = loadedData.length - 1; i >= 0; i--){
        divs.push(React.createElement('div', {className: 'logEntry'},
          React.createElement('div', {className: 'time'}, new Date(loadedData[i].time).toString()),
          React.createElement('div', {className: 'message'}, loadedData[i].message),
          ));
      }
      return divs;
    }
  }

  ReactDOM.render(
    React.createElement(AppRoot),
    document.querySelector('.root')
  );
})();
