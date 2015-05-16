var React = require('react');
var Keys = require('../keys');

var Actions = require('../actions');

class Root extends React.Component {

  handleIncrement() {
    Actions.onNext(Keys.INCREMENT_COUNTER);
  }

  handleDecrement() {
    Actions.onNext(Keys.DECREMENT_COUNTER);
  }

  handleDouble  () {
    Actions.onNext(Keys.DOUBLE_COUNTER);
  }

  handleStart () {
    Actions.onNext(Keys.START_COUNTER);
  }

  handleStop () {
    Actions.onNext(Keys.STOP_COUNTER);
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>counter: {this.props.counter}</p>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
        <button onClick={this.handleDouble}>double</button>
        <button onClick={this.handleStart}>start</button>
        <button onClick={this.handleStop}>stop</button>
      </div>
    );
  }
}

module.exports = Root;
