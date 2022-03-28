import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import { BackendURL } from "./backend";
// import anime from "animejs/lib/anime.es.js";

const appData = {
	gameCanvasID: "game-canvas",
	chatBoxContainerID: "chatbox-container"
};

// Create and mount the main application.
const app = createApp(App, appData);
app.use(router);
app.mount("#app-wrapper");

// anime({
// 	targets: "#app",
// 	translateX: 250,
// 	rotate: "1turn",
// 	backgroundColor: "#FFF",
// 	duration: 800
// });

// console.log(BackendURL);

axios(BackendURL + "/api/sup", { method: "GET" })
	.then((data) => {
		console.log(data);
		// 	return data.text();
		// })
		// .then((response) => {
		// 	console.log(response);
	});
