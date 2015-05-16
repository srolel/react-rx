var React = require('react');
var Rx = require('rx');

var nextState = require('./store');
var Root = require('./views/root');

nextState.subscribe((appState) => {
  React.render(
    <Root {...appState}/>,
    document.getElementById('app')
  );
});
