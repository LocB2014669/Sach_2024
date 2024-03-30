import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import 'primevue/resources/themes/aura-light-green/theme.css'

import router from "./routers";
import store from "./store";
import MultiSelect from "primevue/multiselect";
import PrimeVue from "primevue/config";
const app = createApp(App);
app.use(router);
app.use(store);
app.use(PrimeVue);
app.component("MultiSelect", MultiSelect);
app.mount("#app");
