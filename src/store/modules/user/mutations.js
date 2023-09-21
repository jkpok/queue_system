export default {
  setUserData(state, payload) {
    state.userName = payload.userName;
    state.userEmail = payload.userEmail;
    state.userPhone = payload.userPhone;
    state.userClub = payload.userClub;
  },
};
