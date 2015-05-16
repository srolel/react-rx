var Keys = require('./keys');
var Actions = require('./actions');
var RxStore = require('./utils/rx-store');

var Rx = require('rx');

class CounterModel extends RxStore {
  constructor(counter, actions) {
    super({counter}, actions);
    this.counterPauser = new Rx.BehaviorSubject(true);
  }

  [Keys.INCREMENT_COUNTER](state) {
    state.counter++;
    return state;
  }

  [Keys.DECREMENT_COUNTER](state) {
    state.counter--;  
    return Rx.Observable.return(state);
  }

  [Keys.DOUBLE_COUNTER](state) {
    state.counter*=2;
    return Promise.resolve(state);
  }

  [Keys.START_COUNTER](state) {
    this.counterPauser.onNext(true);
    //don't create another timer
    if (this.timer) return [];
    this.timer = Rx.Observable.interval(100)
    .pausable(this.counterPauser)
    .map(() => {
      let state = this.getState();
      state.counter++;
      return state;
    });
    return this.timer;
  }

  [Keys.STOP_COUNTER](state) {
    this.counterPauser.onNext(false);
    return [state];
  }
}

module.exports = new CounterModel(6, Actions);