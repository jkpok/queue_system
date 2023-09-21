const G_ENDPOINT = process.env.VUE_APP_G_ENDPOINT;

export default {
  async createUser(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `${G_ENDPOINT}/users/${userId}.json?auth=` + token,
      {
        method: "PUT",
        body: JSON.stringify({
          userName: payload.userName,
          userEmail: payload.userEmail,
          userPhone: payload.userPhone,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate. Try again later"
      );
      throw error;
    }
    //console.log(response);
    return response.ok;
  },

  async createUserByGoogle(context, payload) {
    const userId = payload.userId;
    const token = payload.accessToken;
    const response = await fetch(
      `${G_ENDPOINT}/users/${userId}.json?auth=` + token,
      {
        method: "PUT",
        body: JSON.stringify({
          userName: payload.userName,
          userEmail: payload.userEmail,
          userPhoneNumber: payload.userPhoneNumber,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate. Try again later"
      );
      throw error;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    context.commit("setUser", {
      token: token,
      userId: userId,
    });
    return response.ok;
  },

  async loadUserData(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `${G_ENDPOINT}/users/${userId}.json?auth=` + token,
      {
        method: "GET",
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate. Try again later"
      );
      throw error;
    }
    context.commit("setUserData", {
      userName: responseData.userName != null ? responseData.userName : null,
      userEmail: responseData.userEmail != null ? responseData.userEmail : null,
      userPhone: responseData.userPhone != null ? responseData.userPhone : null,
      userClub: responseData.userClub != null ? responseData.userClub : null,
    });
    localStorage.setItem("userClub", responseData.userClub);
    console.log(responseData);
    return response.ok;
  },

  async editUserData(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `${G_ENDPOINT}/users/${userId}.json?auth=` + token,
      {
        method: "PATCH",
        body: JSON.stringify({
          userName: payload.userName, //default
          userEmail: payload.userEmail,
          userPhone: payload.userPhone,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate. Try again later"
      );
      throw error;
    }
    console.log(responseData);
    return response.ok;
  },
};
