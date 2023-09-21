<template>
  <teleport to="body">
    <div><slot name="background"></slot></div>
    <dialog
      open
      class="flex flex-col items-center"
      :class="classes"
      :style="style"
    >
      <menu>
        <slot name="actions"></slot>
      </menu>
      <section class="content" :class="classes">
        <header>
          <slot name="header">
            <!-- THIS WILL APPEAR AS DEFAULT IF NO HTML IS INPUT -->
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <!-- THIS IS THE DEFAULT SLOT WHICH SHOW THE MSG INFO-->
          <slot></slot>
        </section>
      </section>
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
    style: {
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
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 99;
}

dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px (0, 0, 0, 0.26);
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  z-index: 1000;
}

@media screen and (max-width: 425px) {
  dialog {
    width: 90%;
  }
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

.content {
  padding-top: 2rem;
}

menu {
  position: absolute;
  right: 0;
  padding: 0.5rem;
}
</style>
