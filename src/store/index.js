import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      employees: [],
    };
  },
  getters: {},
  mutations: {
    getEmployees(state, data) {
      state.employees = data;
    },
  },
  actions: {
    getEmployees({commit}){
      axios.get("./server/data.json").then(res=>{
        commit("getEmployees", res.data.items)
      })
    }
  },
  modules: {},
});
