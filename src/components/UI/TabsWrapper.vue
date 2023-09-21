<template>
  <div class="tabs container mx-auto">
    <ul class="tabs__header">
      <li
        v-for="title in tabTitles"
        :key="title"
        :class="{ selected: title == selectedTitle }"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import { provide, ref } from "vue";
export default {
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitles.value[0]);

    provide("selectedTitle", selectedTitle);
    return {
      selectedTitle,
      tabTitles,
    };
  },
};
</script>

<style scoped>
.tabs {
  max-width: 800px;
}

.tabs__header {
  margin-bottom: 10px;
  list-style: none;
  padding: 16px 0px;
  display: flex;
  border-bottom: 1px solid #eee;
}

.tabs__header li {
  display: flex;
  align-items: center;
  font-size: 14px;
  text-align: center;
  padding: 8px 28px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s all ease-out;
}

.tabs__header li.selected {
  background-color: #ececec;
  color: #000;
}
</style>
