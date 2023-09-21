import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      clubs: [
        {
          clubId: "clubId1",
          clubName: "SMU Club",
          clubEmail: "ellipsis@smu.edu.sg",
          clubMembers: ["studentId1, studentId2"],
        },
        {
          clubId: "clubId2",
          clubName: "SMU",
          clubEmail: "SMUA@smu.edu.sg",
          clubMembers: ["studentId3, studentId4"],
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
