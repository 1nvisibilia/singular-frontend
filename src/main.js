import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import anime from "animejs/lib/anime.es.js";

const app = createApp(App);

app.use(router);

app.mount("#app");

// anime({
// 	targets: "#app",
// 	translateX: 250,
// 	rotate: "1turn",
// 	backgroundColor: "#FFF",
// 	duration: 800
// });