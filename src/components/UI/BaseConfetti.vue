<template>
  <div></div>
</template>

<script>
import Confetti from "vue-confetti/src/confetti.js";
export default {
  data: () => ({
    confetti: new Confetti(),
  }),
  mounted: function () {
    this.confetti.start({
      colors: ["#FF6F61", "#004C83", "#55C6A9", "#FFC82B"],
    });
    setTimeout(() => {
      this.confetti.stop();
    }, 4000);
  },
};
</script>
