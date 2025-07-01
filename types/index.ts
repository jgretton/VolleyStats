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
	| "addSeason";
export type ModalData =
	| { type: "editPlayer"; player: Player; teamId: string }
	| { type: "addPlayer"; teamId: string }
	| { type: "editTeam"; team: Team }
	| { type: "addTeam"; data: null }
	| { type: "addSeason"; seasonName: string }
	| null;
export interface ModalState {
	isOpen: boolean;
	type: ModalType | null;
	data:
		| Player
		| Team
		| { teamId: string }
		| { player: Player; teamId: string }
		| null;
}
