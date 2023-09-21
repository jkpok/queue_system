<template>
  <section>
    <div class="jumbotron py-10 md:py-20 px-2">
      <div class="container w10/12 mx-auto">
        <div class="jumbo_header animate__animated animate__fadeInRight">
          <h1>
            <span class="text-2xl md:text-4xl lg:text-6xl text-left font-bold"
              >Don't Say Bojio</span
            >
          </h1>
          <p class="text-base md:text-xl lg:text-1xl mt-2">
            Connect by queuing          </p>
        </div>
      </div>
    </div>

   

    <div>
   

      <div
        v-if="events.length === 0"
        class="w-10/12 mx-auto grid sm:grid-cols-2 md:grid-cols-3 mt-4 mb-10 gap-5"
      >
        <div v-for="n in 6" :key="n">
          
          <EventCardSkeleton />
        </div>
      </div>

      <div
        class="w-10/12 mx-auto grid sm:grid-cols-2 md:grid-cols-3 mt-4 mb-10 gap-5"
        v-else
      >
        <div v-for="event in filteredEvents" :key="event.eventId">
          <EventCard
            :id="event.eventId"
            :eventname="event.eventName"
            :description="event.eventDescription"
            :dateTime="event.eventDateTime"
            :location="event.eventLocation"
            :image="event.eventImage"
          />
        </div>
        <div >
          <EventCard
            :id='sample'
            :eventname="eventname"
            :description="description"
            :dateTime="dateTime"
            :location="location"
            :image="Image"
          />
        </div>
      </div>

      <div
        class="w-10/12 mx-auto grid sm:grid-cols-2 md:grid-cols-3 mb-20 gap-5"
        v-if="filteredEvents.length === 0 && events.length !== 0"
      >
        
      </div>
    </div>
  </section>
</template>

<script>
import EventCard from "../../components/Events/EventCard.vue";
import EventCardSkeleton from "../../components/Events/EventCardSkeleton.vue";

export default {
  components: {  EventCard, EventCardSkeleton },
  data() {
    return {
      filterDataOptions: [`All`, `Today`, `Tommorrow`],
      search: "",
      events: [],
      filterOptions: "",
    };
  },
  computed: {
    filteredEvents() {
      //let tempEvents = Object.values(JSON.parse(JSON.stringify(this.events)));
      let tempEvents = {
       event: {   id:"Sample1",
            eventname:"Sample1",
            description:"Sample1",
            dateTime:"18/9/2023",
            location:"SMU",
            image:"image"},
            
      }
      if (this.search != "" && this.search) {
        tempEvents = tempEvents.filter((event) => {
          return (
            event.eventName.toUpperCase().includes(this.search.toUpperCase()) ||
            event.eventLocation
              .toUpperCase()
              .includes(this.search.toUpperCase())
          );
        });
      }
      return tempEvents;
    },
  },
  methods: {
    getSchoolNameFilter(schoolName) {
      this.filterOptions = schoolName;
    },
    loadMorePosts() {
      let newContent = this.events(this.counter, this.counter + 6);
      console.log(newContent);
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("loadAllEvent");
      setTimeout(() => {
        this.events = this.$store.getters.getAllEventOrderByDate;
      }, 1000);
    } catch (err) {
      this.error = err.message || "Failed to load events, try later";
      console.log(this.error);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans&display=swap");

.jumbotron {
  background-image: url("../../images/smu-connexion.jpeg");
  background-color: rgba(0, 0, 0, 0.2);
  background-size: cover;
}

.jumbo_header {
  background-color: white;
  width: fit-content;
  color: #f56a01;
  border-radius: 20px;
  padding: 50px;
}

.header {
  font-family: "DM Sans", sans-serif;
  -webkit-text-stroke: white;
}

#no_search {
  width: 150px;
}

.customPill {
  padding: 0 16px;
  border-radius: 8px;
  margin: 4px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.15 ease;
  height: 36px;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: inset rgb(0 0 0 / 15%) 0 0 0 1px;
}
</style>
