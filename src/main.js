import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
import { io } from "socket.io-client";

import { BackendURL } from "./backend";
import anime from "animejs/lib/anime.es.js";


const socket = io("http://localhost:9000/");


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

console.log(BackendURL);

axios.get(BackendURL + "/api/sup", { method: "GET" })
	.then((data) => {
		console.log(data);
		// 	return data.text();
		// })
		// .then((response) => {
		// 	console.log(response);
	});
