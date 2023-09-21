export default {
  getAllEvents(state) {
    // console.log(state.events);
    return state.events;
  },

  getAllEventOrderByDate(state) {
    const orderByDate = Object.values(state.events).sort((a, b) => {
      return new Date(a.eventDateTime) - new Date(b.eventDateTime);
    });

    const result = Object.values(orderByDate).filter(
      (event) => new Date(event.eventDateTime) > new Date()
    );

    return result;
  },

  getEventDataByClubId(state) {
    const clubId = localStorage.getItem("userClub");
    const eventData = JSON.parse(JSON.stringify(state.events));

    const resultById = Object.values(eventData).filter(
      (event) => event.eventCreatedByClubId == clubId
    );

    const result = Object.values(resultById).sort((a, b) => {
      return new Date(a.eventDateTime) - new Date(b.eventDateTime);
    });

    // console.log(result);
    return result;
  },

  getEventDataById: (state) => (id) => {
    const eventData = JSON.parse(JSON.stringify(state.events));

    const result = Object.values(eventData).filter(
      (event) => event.eventId == id
    );
    return result;
  },

  getUserRegisterEvents(state) {
    const userId = localStorage.getItem("userId");
    const eventData = JSON.parse(JSON.stringify(state.events));
    const result = Object.values(eventData).filter((event) =>
      event.eventAttendees.includes(userId)
    );
    return result;
  },
};
