const currentGameStatus = "current game status";
const newPlayerJoined = "new user joined";

function setupSocketIOClient(io) {
	const socket = io("http://localhost:9000/");

	socket.on(currentGameStatus, (players) => {
		console.log(players);
	});

	socket.on(newPlayerJoined, (player) => {
		console.log(player.id, "has joined us");
	});
	return socket;
}

export {
	setupSocketIOClient
};
