const G_KEY = process.env.VUE_APP_G_KEY;
export default {
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${G_KEY}`;

    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${G_KEY}`;
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = responseData.error.message;
      // const error = new Error(
      //   responseData.message || "Failed to authenticate. Try again later"
      // );
      throw error;
    }
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
    return response.ok;
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userId");
    // Remove all localStorage item

    if (localStorage.getItem("userEmail") != null) {
      const userEmail = localStorage.getItem("userEmail");
      localStorage.clear();
      localStorage.setItem("userEmail", userEmail);
    } else {
      localStorage.clear();
    }

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },

  async passwordResetEmail(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${G_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: payload.email,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = responseData.error.message;
      // const error = new Error(
      //   responseData.message || "Failed to authenticate. Try again later"
      // );
      throw error;
    }
    console.log(responseData);
    return response.ok;
  },

  async resetPassword(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${G_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          oobCode: payload.oobCode,
          newPassword: payload.newPassword,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = responseData.error.message;
      throw error;
    }
    console.log(responseData);
    return response.ok;
  },

  async changePassword(context, payload) {
    const userId = localStorage.getItem("userId");

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${G_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userId,
          password: payload.newPassword,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = responseData.error.message;
      throw error;
    }
    console.log(responseData);
    return response.ok;
  },
};
