<template>
  <base-dialog v-if="sharePopup" classes="customWidth">
    <template #default>
      <div class="relative p-4 w-full">
        <h1 class="text-lg mb-6 text-center font-medium uppercase">
          Don't say <span class="customColor">bojio</span> hor!
          <span class="customColor">Jio</span>
          your FRIENDS now!
        </h1>
        <div id="socialIcons" class="flex justify-center mb-6">
          <a :href="getSocialShareLink('FACEBOOK')" target="blank">
            <img
              class="h-6 w-6 mr-5 text-gray-300"
              src="../../assets/facebook.svg"
            />
          </a>
          <a :href="getSocialShareLink('TELEGRAM')" target="blank">
            <img
              class="h-6 w-6 mr-5 text-gray-300"
              src="../../assets/telegram.svg"
            />
          </a>
          <a href="mailto:?subject=<SUBJECT>&body=<BODY>" target="blank">
            <img
              class="h-6 w-6 mr-5 text-gray-300"
              src="../../assets/envelope-solid.svg"
            />
          </a>
        </div>

        <div class="flex">
          <input
            type="url"
            id="eventLink"
            class="border border-r-0 border-gray-300 text-gray-900 block w-full text-sm border-gray-300 p-2.5 outline-0"
            :value="currentUrl"
          />
          <span
            class="inline-flex items-center px-3 text-sm text-gray-900 rounded-r-md border border-l-0 border-gray-300"
          >
            <div class="tooltip">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
              <span class="tooltiptext">{{ copiedLinkMethod() }}</span>
            </div>
          </span>
        </div>
      </div>
    </template>

    <template #actions>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 cursor-pointer"
        @click="closedSharePopup()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </template>
  </base-dialog>

  <base-dialog v-if="confirmWithdrawnPopup" classes="customWidth">
    <template #default>
      <div class="relative p-4 w-full">
        <h1 class="text-lg mb-6 text-center font-medium uppercase">
          <span class="customColor">Are you sure to withdraw?</span><br />Will
          you be <span class="customColor">missing out</span> on all the
          goodness!
        </h1>
        <base-button
          mode="flat"
          :class="{
            'w-full': true,
            'my-3': true,
            'py-2': true,
            'sm:mr-0': true,
            'md:mr-3': true,
          }"
          @click="withdrawnEvent()"
          >Confirm</base-button
        >
      </div>
    </template>

    <template #actions>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 cursor-pointer"
        @click="closedSharePopup()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </template>
  </base-dialog>

  <base-dialog v-if="confirmLoginPopup" classes="customWidth">
    <template #default>
      <div class="relative p-4 w-full">
        <h1 class="text-lg mb-6 text-center font-medium uppercase">
          Oops looks like you
          <span class="customColor">not login</span>.<br />
          <span class="customColor">Login now</span> to
          <span class="customColor">join the fun</span>!
        </h1>
        <base-button
          mode="flat"
          :class="{
            'w-full': true,
            'my-3': true,
            'py-2': true,
            'sm:mr-0': true,
            'md:mr-3': true,
          }"
          @click="login()"
          >Log In</base-button
        >
      </div>
    </template>

    <template #actions>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 cursor-pointer"
        @click="closedLoginPopup()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </template>
  </base-dialog>

  <section :style="backgroundImage" class="cover px-4">
    <div id="img" class="container mx-auto py-1">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div>
          <h1 class="text-2xl md:text-4xl text-white font-medium mb-3">
            {{ event.eventName }}
          </h1>
          <div
            id=""
            class="text-white"
            v-html="limitStr(event.eventDescription, 240)"
          ></div>
        </div>
        <div class="hidden sm:block">
          <div style="display: flex; justify-content: flex-end">
            <div class="bg-white rounded-lg p-5 w-82">
              <h2 class="text-xl font-medium mb-3 uppercase">Date & Time</h2>
              <p class="text-sm">{{ getWeekday }}, {{ getTime }}</p>
              <button
                id="button"
                class="w-full my-3 py-2 rounded-xl"
                @click="registerUserId()"
              >
                {{ eventRegisterStatusLabel }}
              </button>
              <base-button
                mode="secondary"
                class="w-full py-2 sm:mr-0 md:mr-3"
                @click="openedSharePopup()"
                >Share</base-button
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="block sm:hidden fixed inset-x-0 bottom-0 z-10 bg-white shadow"
      >
        <div class="bg-white p-5 border-t border-slate-200">
          <h2 class="text-base font-medium mb-2 uppercase">Date & Time</h2>
          <p class="text-sm">{{ getWeekday }}, {{ getTime }}</p>
          <button
            id="button"
            class="w-full my-3 py-2 rounded-xl"
            @click="registerUserId()"
          >
            {{ eventRegisterStatusLabel }}
          </button>
          <base-button
            mode="secondary"
            class="w-full py-2 sm:mr-0 md:mr-3"
            @click="openedSharePopup()"
            >Share</base-button
          >
        </div>
      </div>
    </div>
  </section>

  <div class="container mx-auto py-10 px-4 sm:px-0">
    <div class="grid gap-4 grid-cols-3">
      <div class="col-span-3 sm:col-span-2">
        <h2 class="text-xl font-medium mb-3">Description</h2>
        <div
          id="textContent"
          class="sm:mr-5"
          v-html="event.eventDescription"
        ></div>
      </div>
      <div class="col-span-3 sm:col-span-1">
        <h2 class="text-xl font-medium mb-3">Location</h2>
        <div style="width: 100%">
          <iframe
            width="100%"
            height="300"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            :src="getMapAddress()"
          ></iframe>
        </div>
        <p class="mt-3 text-zinc-600">
          {{ event.eventLocation }}
        </p>

        <div class="tag mt-10">
          <h2 class="text-xl font-medium mb-3">Tags</h2>
          <ul class="flex flex-wrap">
            <li class="m-1.5" v-for="tag in event.eventTags" :key="tag">
              <span
                class="bg-zinc-100 text-zinc-700 text-sm my-2 px-2.5 py-1.5 rounded"
                >{{ tag }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/UI/BaseButton.vue";

export default {
  components: { BaseButton },
  data() {
    return {
      id: this.$route.params.id,
      currentUrl: "",
      copiedLinkStatus: false,
      sharePopup: false,
      event: [],
      eventRegisterStatus: false,
      confirmWithdrawn: false,
      confirmWithdrawnPopup: false,
      confirmLoginPopup: false,
    };
  },
  computed: {
    eventRegisterStatusLabel() {
      if (this.eventRegisterStatus) {
        return "Withdraw";
      } else {
        return "Register";
      }
    },
    getTime() {
      let date = new Date(this.event.eventDateTime);
      let dateString = date.toLocaleTimeString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return dateString.toUpperCase();
    },
    getWeekday() {
      var days = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ];
      var dt = new Date(this.event.eventDateTime);
      return days[dt.getDay()];
    },
    backgroundImage() {
      return {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url(${this.event.eventImage})`,
      };
    },
  },
  methods: {
    limitStr(string, limit) {
      let str = string;
      if (typeof str === "string" && str.length > limit) {
        str = str.slice(0, limit) + "...";
      }
      return str;
    },
    copiedLinkMethod() {
      if (!this.copiedLinkStatus) {
        navigator.clipboard.writeText(this.currentUrl);
        return "Copied";
      }
      return "Copy";
    },
    openedSharePopup() {
      this.sharePopup = true;
    },
    closedSharePopup() {
      this.sharePopup = false;
    },
    closedConfirmWithdrawnPopup() {
      this.confirmWithdrawnPopup = false;
    },
    closedLoginPopup() {
      this.confirmLoginPopup = false;
    },
    login() {
      const route = `events/${this.$route.params.id}`;
      localStorage.setItem("eventHistory", route);

      this.$router.replace("/login");
    },
    getMapAddress() {
      const params = this.event.eventLocation;
      return `https://maps.google.com/maps?q=${params}&z=14&ie=UTF8&output=embed`;
    },
    getSocialShareLink(type) {
      const url = this.currentUrl;
      const info = `That time you say “bojio”, this is me jioing you now! Come sign up and join me for ${this.event.eventName}!`;
      if (type === "FACEBOOK") {
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      } else if (type === "TELEGRAM") {
        return `https://telegram.me/share/url?url=${url}&text=${info}`;
      }
    },

    registerUserId() {
      if (localStorage.getItem("userId")) {
        const userId = localStorage.getItem("userId");
        let eventAttendees = this.event.eventAttendees;

        if (eventAttendees.includes(userId)) {
          if (!this.confirmWithdrawn) {
            this.confirmWithdrawnPopup = true;
          } else {
            eventAttendees = eventAttendees.filter(
              (attendees) => attendees != userId
            );
            this.submitUserId(Object.values(eventAttendees));
          }
        } else {
          // ADD USER TO DB
          eventAttendees.push(localStorage.getItem("userId"));
          console.log(eventAttendees);
          this.submitUserId(Object.values(eventAttendees));
          this.eventRegisterStatus = true;
          if (localStorage.getItem("eventHistory") != null) {
            localStorage.removeItem("eventHistory");
          }
        }
      } else {
        this.confirmLoginPopup = true;
      }
    },
    withdrawnEvent() {
      const userId = localStorage.getItem("userId");
      let eventAttendees = this.event.eventAttendees;

      if (eventAttendees.includes(userId)) {
        eventAttendees = eventAttendees.filter(
          (attendees) => attendees != userId
        );
        this.submitUserId(Object.values(eventAttendees));
      }
      this.eventRegisterStatus = false;
      this.closedConfirmWithdrawnPopup();
    },
    async submitUserId(eventAttendees) {
      try {
        const result = await this.$store.dispatch("editParticipants", {
          eventId: this.id,
          eventAttendees: eventAttendees,
        });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("loadAllEvent");
      let event = Object.values(this.$store.getters.getEventDataById(this.id));
      this.event = event[0];
      if (localStorage.getItem("userId")) {
        let userId = localStorage.getItem("userId");
        if (Object.values(this.event.eventAttendees).includes(userId)) {
          this.eventRegisterStatus = true;
        } else {
          this.eventRegisterStatus = false;
        }
      }
    } catch (err) {
      this.error = err.message || "Failed to load events, try later";
      console.log(this.error);
    }
  },
  created() {
    this.currentUrl = window.location.href;
  },
};
</script>

<style scoped>
.btn_disabled {
  background-color: rgba(232, 157, 144, 0.8);
  border: none;
  pointer-events: none;
}
.cover {
  display: flex;
  align-items: center;
  min-height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.customColor {
  color: #f56a01;
}

#button {
  background-color: #f56a01;
  color: white;
  width: 100%;
}

#button:hover,
#button:active {
  background-color: rgba(255, 99, 71, 0.8);
  color: #ffffff;
}
p,
input[text] {
  overflow-wrap: break-word;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: fit-content;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

<!-- localstrong.getitems  -->
