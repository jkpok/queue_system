import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      userName: null,
      userEmail: null,
      userPhone: null,
      userClub: null,
    };
  },
  mutations,
  actions,
  getters,
};
