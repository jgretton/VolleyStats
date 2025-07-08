export const getPlayerInitials = (playerName: string) => {
	return playerName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();
};
