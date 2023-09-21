<template>
  <navigation-bar id="nav" />
  <!-- 60PX IS TO OFFSET THE NAVIGATION BAR-->
  <main style="padding-top: 60px">
    <!-- PLACEHOLDER TELLING VUE ROUTER THAT THIS IS THE PLACE TO ROUTE THE COMPONENT AND LOAD IT -->
    <router-view />
    <!-- Back to top button -->
    <div
      id="pagetop"
      v-show="scY > 300"
      class="fixed text-white bottom-5 right-5"
    >
      <button class="bg-white rounded-full customShadow p-3" @click="toTop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  </main>
  <the-footer></the-footer>
</template>

<script>
import TheFooter from "./components/Layout/TheFooter.vue";
export default {
  components: {
    TheFooter,
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      // events: [
      //   {
      //     eventId: "eventId1",
      //     eventName: "Event 1",
      //     eventDescription:
      //       "'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      //     eventDateTime: "2022-09-02T18:25:43.511Z",
      //     eventCreatedBy: "SMU Club",
      //     eventTags: ["tag1", "tag2", "tag3"],
      //     eventAttendees: [
      //       "studentId1",
      //       "studentId2",
      //       "studentId3",
      //       "studentId4",
      //     ],
      //   },
      //   {
      //     eventId: "eventId2",
      //     eventName: "Event 2",
      //     eventDescription:
      //       "'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      //     eventDateTime: "2022-09-02T18:25:43.511Z",
      //     eventCreatedBy: "SMU Club",
      //     eventTags: ["tag2", "tag4", "tag1"],
      //     eventAttendees: ["studentId1", "studentId3", "studentId5"],
      //   },
      //   {
      //     eventId: "eventId3",
      //     eventName: "Event 3",
      //     eventDescription:
      //       "'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      //     eventDateTime: "2022-09-02T18:25:43.511Z",
      //     eventCreatedBy: "SMU",
      //     eventTags: ["tag2", "tag4", "tag1"],
      //     eventAttendees: [
      //       "studentId1",
      //       "studentId3",
      //       "studentId4",
      //       "studentId5",
      //     ],
      //   },
      //   {
      //     eventId: "eventId4",
      //     eventName: "Event 4",
      //     eventDescription:
      //       "'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      //     eventDateTime: "2022-09-02T18:25:43.511Z",
      //     eventCreatedBy: "SMU",
      //     eventTags: ["tag2", "tag4", "tag2"],
      //     eventAttendees: [
      //       "studentId1",
      //       "studentId3",
      //       "studentId4",
      //       "studentId5",
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@300;400;500;600;700;800&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto Flex", sans-serif;
}

body {
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#nav {
  z-index: 30;
}

#confetti-canvas {
  z-index: 999 !important;
}

footer {
  margin-top: auto;
}

.customShadow {
  box-shadow: 0 8px 24px 0 rgb(0 0 0 / 16%);
}
</style>
