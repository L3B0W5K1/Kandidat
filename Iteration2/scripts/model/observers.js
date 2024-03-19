function Observable() {
  this.observers = []; //Array of observer functions
}

Observable.prototype = {
  subscribe: function (fn) {
    this.observers.push(fn);
  },

  unsubsribe: function (fnToRemove) {
    this.observers = this.observers.filter((fn) => {
      if (fn != fnToRemove) {
        return fn;
      }
    });
  },

  update: function (data) {
    this.observers.forEach((fn) => {
      fn.call(null, data);
    });
  },
};

export default Observable;
