<template>
  <!-- class="bg-white sticky top-0 border-gray-200 px-2 sm:px-4 py-2.5 flex items-center" -->
  <nav
    class="bg-white fixed border-gray-200 px-4 sm:px-4 py-2.5 flex items-center"
  >
    <div class="container mx-auto flex items-center justify-between">
      <div>
        <router-link to="/">
          <a href="https://flowbite.com/" class="flex items-center">
            <span
              class="logo-text self-center text-2xl font-semibold whitespace-nowrap"
              >Bojio</span
            >
          </a></router-link
        >
      </div>

      
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    getClubId() {
      return this.$store.getters.userClub;
    },
  },
  watch: {
    $route() {
      this.isOpen = false;
    },
  },
  methods: {
    onClickAway() {
      this.isOpen = false;
    },
    dropDown() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
nav {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #eee;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  background: transparent;
  cursor: pointer;
}

.bg-custom:hover {
  background-color: #f56a01;
}

.logo-text {
  font-family: "Fredoka One";
  letter-spacing: 2px;
}
</style>
