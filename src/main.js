import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import { Controller, up, down, left, right, click } from "./controller/Controller.js";
import { setupSocketIOClient } from "./socket/socket-client.js";
import { BackendURL } from "./backend";
// import anime from "animejs/lib/anime.es.js";

const appData = {
	gameCanvasID: "game-canvas",
	chatBoxContainerID: "chatbox-container",
	gameBoardSize: {
		width: 1000,
		height: 650
	},
	chatBoxSize: {
		width: 300,
		height: 650
	}
};

// Create and mount the main application.
const app = createApp(App, appData);
app.use(router);
app.mount("#app-wrapper");

// Target the Gameboard Canvas and the chatbox system.
const gameCanvas = document.getElementById(appData.gameCanvasID);
// const chatBox = document.getElementById(appData.chatBoxContainerID); //////////////////////////

// Add the canvas size attribute independently of vue's rendering.
gameCanvas.width = appData.gameBoardSize.width;
gameCanvas.height = appData.gameBoardSize.height;

const controller = new Controller(gameCanvas); // setup the game controllers
controller.activeListeners();
let prev = { ...controller.inputState };
setInterval(() => {
	if (controller.inputState[up] !== prev[up] ||
		controller.inputState[down] !== prev[down] ||
		controller.inputState[left] !== prev[left] ||
		controller.inputState[right] !== prev[right] ||
		controller.inputState[click] !== prev[click]) {
		console.log(controller.inputState);
		prev = { ...controller.inputState };
	}
}, 100);

setupSocketIOClient(gameCanvas); // returns the socket object

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
