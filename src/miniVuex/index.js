import { reactive, computed, inject } from "vue";

const VUE_KEY = "__vuex__";

function useStore() {
  return inject(VUE_KEY);
}

function createStore(options) {
  return new Store(options);
}

class Store {
  constructor(options) {
    this.$options = options;
    this._state = reactive({
      data: options.state(),
    });

    this.getters = {};
    this._actions = options.actions;
    this._mutations = options.mutations;

    Object.keys(options.getters).forEach((name) => {
      const fn = options.getters[name];
      this.getters[name] = computed(() => fn(this.state));
    });
  }

  get state() {
    return this._state.data;
  }
  commit = (type, payload) => {
    const entry = this._mutations[type];
    entry && entry(this.state, payload);
  };
  dispatch(type, payload) {
    const entry = this._actions[type];
    return entry && entry(this, payload);
  }

  install(app) {
    app.provide(VUE_KEY, this);
  }
}

export { createStore, useStore };
