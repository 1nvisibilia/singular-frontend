import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import anime from "animejs/lib/anime.es.js";

// Create and mount the main application.
const app = createApp(App);
app.use(router);
app.mount("#app-wrapper");

// anime({
// 	targets: "#app",
// 	translateX: 250,
// 	rotate: "1turn",
// 	backgroundColor: "#FFF",
// 	duration: 800
// });
