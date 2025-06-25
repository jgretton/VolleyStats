export interface Player {
	id: string;
	name: string;
	number: number | undefined;
	position: string;
}
export interface Team {
	id: string;
	name: string;
	players: Player[];
}

export interface Club {
	id: string;
	name: string;
	teams: Team[];
}

export interface ClubStore {
	club: Club;
	addTeam: (teamName: string) => void;
	removeTeam: (teamName: string) => void;
	getTeamById: (teamId: string) => Team | undefined;
	addPlayerToTeam: (teamId: string, player: Omit<Player, "id">) => void;
	getPlayersByTeamId: (teamId: string) => Player[];
	removePlayerFromTeam: (teamId: string, playerId: string) => void;
	updatePlayer: (teamId: string, player: Player) => void;
}

// type VolleyballPosition = "OH" | "S" | "OP" | "MB" | "LI";
