export interface Team {
	id: string;
	name: string;
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
}
