var Keys = require('./keys');
var Actions = require('./actions');

class RxStore extends Rx.BehaviorSubject {
  constructor(initialState, actions) {
    super(initialState);
    Rx.Observable.merge(actions)
        .flatMap(action => (this[action] || this.default).call(this, this.getState(), action))
        .subscribe(this);
  }

  getState() {
    return this.getValue();
  }

  default(state, action) {
      console.warn(`${action} not recognized in model.`);
      return [state];
  }
}

class CounterModel extends RxStore {
  constructor(counter, actions) {
    super({counter}, actions);
    this.counterPauser = new Rx.BehaviorSubject(true);
  }

  [Keys.INCREMENT_COUNTER](state) {
    state.counter++;
    return [state];
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