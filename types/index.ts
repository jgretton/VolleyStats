import { Player, Team } from "@/store/types";

export type VolleyballPosition = "OH" | "S" | "OP" | "MB" | "LI";

export const VOLLEYBALL_POSITIONS = {
	OH: "Outside Hitter",
	S: "Setter",
	OP: "Opposite",
	MB: "Middle Blocker",
	LI: "Libero",
} as const;

export type ModalType =
	| "editPlayer"
	| "addPlayer"
	| "editTeam"
	| "addTeam"
	| "addSeason"
	| "editSeason"
	| "setCurrentSeason"
	| "createMatch";

export type ModalData =
	| { type: "editPlayer"; player: Player; teamId: string }
	| { type: "addPlayer" }
	| { type: "editTeam"; team: Team }
	| { type: "addTeam"; data: null }
	| { type: "addSeason"; data: null }
	| { type: "editSeason"; seasonId: string }
	| { type: "setCurrentSeason"; seasonId: string }
	| { type: "createMatch"; data: null }
	| null;

export interface ModalState {
	isOpen: boolean;
	type: ModalType | null;
	data:
		| Player
		| Team
		| { teamId: string }
		| { player: Player; teamId: string }
		| { seasonId: string }
		| null;
}
