export interface Player {
	id: string;
	name: string;
	number: number;
	position: VolleyballPosition;
}

export type VolleyballPosition = "OH" | "S" | "OP" | "MB" | "LI";

export const VOLLEYBALL_POSITIONS = {
	OH: "Outside Hitter",
	S: "Setter",
	OP: "Opposite",
	MB: "Middle Blocker",
	LI: "Libero",
} as const;
