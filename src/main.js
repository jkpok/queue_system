import { createApp } from "vue";
import "./index.css";
import VueClickAway from "vue3-click-away";

// IMPORT MAIN APPLICATION COMPONENT
import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";

// IMPORT BASE COMPONENTS
import BaseButton from "./components/UI/BaseButton.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import BaseAlert from "./components/UI/BaseAlert.vue";
import NavigationBar from "./components/Layout/NavigationBar.vue";

// INITIALISE APPLICATION
const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueClickAway);

// INITIALISE BASE COMPONENTS
app.component("base-button", BaseButton);
app.component("base-dialog", BaseDialog);
app.component("navigation-bar", NavigationBar);
app.component("base-alert", BaseAlert);

// MOUNT APPLICATION
app.mount("#app");
