module.exports = class RxStore extends Rx.BehaviorSubject {
  constructor(initialState, actions) {
    super(initialState);
    Rx.Observable.merge(actions)
        .flatMap(action => { 
            const fn = this[action] || this.default,
                  nextState = fn.call(this, this.getState(), action);
            return nextState;
        })
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