const G_ENDPOINT = process.env.VUE_APP_G_ENDPOINT;

export default {
  async createEvent(context, payload) {
    const eventId = new Date().getTime().toString();
    const token = context.rootGetters.token;
    const response = await fetch(
      `${G_ENDPOINT}/events/${eventId}.json?auth=` + token,
      {
        method: "PUT",
        body: JSON.stringify({
          eventId: eventId,
          eventName: payload.eventName,
          eventDateTime: payload.eventDateTime,
          eventLocation: payload.eventLocation,
          eventContact: payload.eventContact,
          eventDescription: payload.eventDescription,
          eventTags: payload.eventTags,
          eventImage: payload.eventImage,
          eventAttendees: payload.eventAttendees,
          eventCreatedByClubId: payload.eventCreatedByClubId,
          participantsLimit: payload.participantsLimit,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to create event. Try again later"
      );
      throw error;
    }
    // console.log(responseData);
    return response.ok;
  },

  async loadAllEvent(context) {
    const response = await fetch(`${G_ENDPOINT}/events.json`, {
      method: "GET",
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to load event data. Try again later"
      );
      throw error;
    }
    context.commit("setEventData", responseData);
    // console.log(responseData);
    return response.ok;
  },

  async editEvent(context, payload) {
    const eventId = payload.eventId; //new Date().getTime().toString();
    const token = context.rootGetters.token; //AIzaSyAwfv0cPv34-F3iZG0VcyoPoH1ThhC3fUU
    const response = await fetch(
      `${G_ENDPOINT}/events/${eventId}.json?auth=` + token,
      {
        method: "PATCH",
        body: JSON.stringify({
          eventId: eventId, //default
          eventName: payload.eventName,
          eventDateTime: payload.eventDateTime,
          eventLocation: payload.eventLocation,
          eventContact: payload.eventContact,
          eventDescription: payload.eventDescription,
          eventTags: payload.eventTags,
          eventImage: payload.eventImage,
          eventCreatedByClubId: payload.eventCreatedByClubId, //default
          participantsLimit: payload.participantsLimit,
          // eventAttendees: payload.eventAttendees //default leave empty
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to create event. Try again later"
      );
      throw error;
    }
    // console.log(responseData);
    return response.ok;
  },

  async editParticipants(context, payload) {
    const eventId = payload.eventId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `${G_ENDPOINT}/events/${eventId}.json?auth=` + token,
      {
        method: "PATCH",
        body: JSON.stringify({
          eventAttendees: payload.eventAttendees,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = responseData.error.message;
      console.log(error);
      throw error;
    }
    // context.commit("setEventData", responseData);
    console.log(responseData);
    return response.ok;
  },

  async loadAllUserdata() {
    const response = await fetch(`${G_ENDPOINT}/users.json`, {
      method: "GET",
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to load user data. Try again later"
      );
      throw error;
    }
    return responseData;
  },
};
