<template>
  <teleport to="body">
    <dialog open class="flex items-center">
      <div
        id="toast"
        class="flex items-center p-4 w-full"
        :class="classes"
        role="alert"
      >
        <!-- THIS IS THE DEFAULT SLOT WHICH SHOW THE MSG INFO-->
        <slot></slot>
        <menu class="pl-5">
          <slot name="actions"></slot>
        </menu>
      </div>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    classes: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
dialog {
  position: absolute;
  top: 1000px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  border: none;
  box-shadow: 0 2px 8px (0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  z-index: 1000;
}

menu {
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
</style>
