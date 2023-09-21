export default {
  userName(state) {
    return state.userName;
  },
  userEmail(state) {
    return state.userEmail;
  },
  userPhone(state) {
    return state.userPhone;
  },
  userClub(state) {
    return !!state.userClub;
  },
  getUserData(state) {
    return state;
  },
};
