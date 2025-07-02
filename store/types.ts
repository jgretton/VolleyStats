import { VolleyballPosition } from "@/types";

export interface Player {
	id: string;
	name: string;
	number: number | undefined;
	position: VolleyballPosition[];
	isActive: boolean;
}
export interface Team {
	id: string;
	name: string;
}

export interface Match {
	id: string;
	teamId: string;
	seasonId: string;
	opponent: string;
	date: string;
	selectedPlayers: string[];
	status: "upcoming" | "in-progress" | "completed" | "cancelled";
	teamScore?: number;
	opponentScore?: number;
	setScores?: SetScore[];
}
export interface MatchStats {
	id: string;
	matchId: string;
	playerId: string;

	// Attack efficiency
	kills: number;
	attackErrors: number;
	attackAttempts: number; // total attacks (kills + errors + continues)

	// Serve efficiency
	aces: number;
	pressureServes: number; // caused out-of-system attack
	easyServes: number; // all attack options available
	serviceErrors: number;
	serviceAttempts: number; // total serves

	// Serve receive efficiency (1-3 scale)
	perfectPasses: number; // 3 - all attack options
	goodPasses: number; // 2 - limited options
	poorPasses: number; // 1 - no attack options
	receptionErrors: number; // 0 - point lost
	receptionAttempts: number;

	// Block efficiency
	blockKills: number; // stuff blocks
	blockTouches: number; // deflections/slows
	blockErrors: number;
	blockAttempts: number;

	// Dig efficiency
	perfectDigs: number; // to setter
	playableDigs: number; // ball up but chased
	digErrors: number; // ball down
	digAttempts: number;

	// Set efficiency (if tracking)
	assists: number; // sets resulting in kills
	settingErrors: number;
	setAttempts: number;
}
export interface TeamMembership {
	id: string;
	playerId: string;
	teamId: string;
	seasonId: string;
	isActive: boolean;
}
export interface SetScore {
	setNumber: number;
	teamScore: number;
	opponentScore: number;
}

export interface Season {
	id: string;
	name: string;
}

export interface Club {
	id: string;
	name: string;
	currentSeasonId: string;
	teams: Team[];
	players: Player[];
	seasons: Season[];
	teamMemberships: TeamMembership[];
	matches: Match[];
	matchStats: MatchStats[];
}

export interface ClubStore {
	club: Club;

	createSeason: (seasonName: string) => void;
	removeSeason: (seasonId: string) => void;
	updateSeasonName: (seasonName: string, seasonId: string) => void;
	setCurrentSeason: (seasonId: string) => void;

	calculateMatchesPerSeason: (seasonId: string) => number;
	calculatePlayersPerSeason: (seasonId: string) => number;
	calculatePlayersPerTeam: (teamId: string) => number;
	calculateMatchesPerTeam: (teamId: string) => number;

	addTeam: (teamName: string) => void;
	removeTeam: (teamName: string) => void;
	updateTeam: (teamId: string, teamName: string) => void;

	addPlayer: (player: Omit<Player, "id">, teamId?: string) => void;
	getPlayerTeams: (playerId: string, seasonId?: string) => string[];

	createMatch: (match: Omit<Match, "id" | "seasonId">) => void;

	addTeamMembership: (
		playerId: string,
		teamId: string,
		seasonId: string
	) => void;

	// need to remove.
}

// type VolleyballPosition = "OH" | "S" | "OP" | "MB" | "LI";
