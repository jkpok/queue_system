<template>
  <!-- ======= EventCard ======= -->
  <div
    class="relative bg-gray-50 rounded-lg border h-full cursor-pointer"
    :class="classes"
  >
    <router-link to="/">
      <p
        v-show="this.$route.path === '/dashboard'"
        class="absolute py-2 px-5 m-3 right-0 top-0 custom-bg text-white rounded-full"
      >
        Edit
      </p>
      <img class="h-48 w-full object-cover rounded-t-lg" src='../../images/background.jpg' />
      <div class="flex flex-col px-3 py-4">
        <p class="text-gray-400 text-sm mb-2">
          <span>{{ getTime }}</span>
        </p>
        <div>
          <h2 class="text-lg font-medium mb-2">{{ eventname }}</h2>
          <div
            id="textContent"
            class="mb-8"
            v-html="description.slice(0, 120)"
          ></div>
        </div>
        <div>
          <button @click="toggleQueue" :class="{ 'grey-button': isQueued }">{{ buttonText }}</button>
        </div>

        
      </div>
    </router-link>
  </div>
  <!--  ========== -->
</template>

<script>
export default {
  props: [
    "classes",
    "eventname",
    "description",
    "id",
    "dateTime",
    "location",
    "image",
    "eventAttendees",
    "participantsLimit",
  ],
  data() {
    return {isQueued: false,};
  },
  computed: {
    buttonText() {
      return this.isQueued ? 'Quit Queue' : 'Join Queue';
    },
    eventLink() {
      if (this.$route.path === "/dashboard") {
        return "/edit-event/" + this.id;
      } else {
        return "events" + "/" + this.id;
      }
    },
    getDate() {
      let eventDate = new Date(this.dateTime).getDate();
      let todayDate = new Date().getDate();
      if (eventDate != todayDate) {
        return eventDate;
      } else {
        return "Today";
      }
    },
    getMonth() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let date = new Date(this.dateTime);
      if (this.getDate == "Today") {
        return "";
      } else {
        return monthNames[date.getMonth()].toUpperCase();
      }
    },
    getYear() {
      let date = new Date(this.dateTime);
      return date.getYear();
    },
    getTime() {
      let date = new Date(this.dateTime);
      let dateString = date.toLocaleTimeString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return dateString.toUpperCase();
    },
    howManyDaysLeft() {
      let todaysDate = new Date();
      let day = String(todaysDate.getDate()).padStart(2, "0");
      let month = String(todaysDate.getMonth() + 1).padStart(2, "0"); //January is 0!
      let year = todaysDate.getFullYear();

      todaysDate = month + "/" + day + "/" + year;

      let str = this.dateTime;
      let dateTimeArray = str.split("T");
      let date_ = dateTimeArray[0];
      let eventDate = date_.replaceAll("-", "/");

      let todaysDate_ = new Date(todaysDate);
      let eventDate_ = new Date(eventDate);

      // To calculate the time difference of two dates
      var Difference_Time = eventDate_.getTime() - todaysDate_.getTime();

      // To calculate the no. of days between two dates
      var howManyDaysLeft = Difference_Time / (1000 * 3600 * 24);

      console.log(howManyDaysLeft);
      //To display the final no. of days (result)

      return howManyDaysLeft;
    },
  },methods: {
    toggleQueue() {
      this.isQueued = !this.isQueued;
    },
  },
};
</script>

<style scoped>
.grey-button {
  background-color: grey;
  /* Add any other CSS styles for the grey button here */
}
button {
  font-family: inherit;
  font-weight: 500;
  background-color: #f56a01;
  border: 2px solid #f56a01;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  min-width: 40px;
  width: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
}
button:hover,
button:active {
  background-color: rgba(255, 99, 71, 0.8);
  color: #ffffff;
}
.secondary {
  border: 2px solid #f56a01 !important;
  background-color: transparent;
  color: #f56a01;
  border: none;
}
.secondary:hover,
.secondary:active {
  background-color: rgba(255, 99, 71, 0.8);
  color: #ffffff;
}
.dateTime,
#location {
  color: #f56a01;
}
.custom-bg {
  background: #f56a01;
}

.red {
  color: red;
}

.green {
  color: green;
}

.customShadow:hover {
  box-shadow: 0 8px 24px 0 rgb(0 0 0 / 16%);
}
</style>
