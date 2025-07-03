import { create } from "zustand";

import { ClubStore, Match, MatchData, Player } from "./types";

import { persist, createJSONStorage } from "zustand/middleware";

export const useClubStore = create<ClubStore>()(
	persist(
		(set, get) => ({
			club: {
				id: "club-1",
				name: "Lincoln Cannons",
				currentSeasonId: "",
				teams: [],
				players: [],
				seasons: [],
				teamMemberships: [],
				matches: [],
				matchStats: [],
			},
			createSeason: (seasonName: string) => {
				const newSeason = { id: crypto.randomUUID(), name: seasonName };

				set((state) => ({
					club: {
						...state.club,
						currentSeasonId: state.club.currentSeasonId || newSeason.id, // If current season id is empty, make this the current season.
						seasons: [...state.club.seasons, newSeason],
					},
				}));
			},
			removeSeason: (seasonId: string) => {
				const currentState = get();
				const hasMatches = currentState.club.matches.some(
					(match) => match.seasonId === seasonId
				);
				const hasMemberships = currentState.club.teamMemberships.some(
					(membership) => membership.seasonId === seasonId
				);
				const isCurrentSeason = currentState.club.currentSeasonId === seasonId;

				if (hasMatches || hasMemberships) {
					throw new Error("Cannot delete season with existing data");
				} else if (isCurrentSeason) {
					throw new Error("Cannot delete season as this is the current seaon");
				} else {
					set((state) => ({
						club: {
							...state.club,
							seasons: currentState.club.seasons.filter(
								(season) => season.id !== seasonId
							),
						},
					}));
				}
			},
			updateSeasonName: (seasonName: string, seasonId: string) => {
				const currentState = get();
				const currentSeason = currentState.club.seasons.find(
					(season) => season.id === seasonId
				);

				console.log(currentSeason);
			},
			setCurrentSeason: (seasonId: string) => {
				console.log(seasonId);
				set((state) => ({
					club: { ...state.club, currentSeasonId: seasonId },
				}));
			},
			calculateMatchesPerSeason: (seasonId: string) => {
				const currentState = get();
				const matches = currentState.club.matches.filter(
					(season) => season.id === seasonId
				);
				return matches.length;
			},
			calculatePlayersPerSeason: (seasonId: string) => {
				const currentState = get();
				const players = currentState.club.players.filter(
					(season) => season.id === seasonId
				);
				return players.length;
			},
			calculatePlayersPerTeam: (teamId: string) => {
				const currentState = get();

				return currentState.club.teamMemberships.filter((membership) => {
					const isMember = membership.teamId === teamId;
					const matchesSeason =
						currentState.club.currentSeasonId === membership.seasonId;

					return isMember && matchesSeason && membership.isActive;
				}).length;
			},
			calculateMatchesPerTeam: (teamId: string) => {
				const currentState = get();

				return currentState.club.matches.filter((match) => {
					const isTeamMatch = match.teamId === teamId;
					const matchSeason =
						currentState.club.currentSeasonId === match.seasonId;

					return isTeamMatch && matchSeason;
				}).length;
			},
			addTeamMembership: (
				playerId: string,
				teamId: string,
				seasonId: string
			) => {
				const newMembership = {
					id: crypto.randomUUID(),
					playerId,
					teamId,
					seasonId,
					isActive: true,
				};

				set((state) => ({
					club: {
						...state.club,
						teamMemberships: [...state.club.teamMemberships, newMembership],
					},
				}));
			},
			addPlayer: (player: Omit<Player, "id">, teamId?: string) => {
				const currentState = get();

				//checking if teamid was an empty string
				const validTeamId = teamId?.trim() || undefined;

				if (validTeamId && !currentState.club.currentSeasonId) {
					throw new Error("No active season. Please create a season first.");
				}

				const newPlayer = {
					id: crypto.randomUUID(),
					name: player.name,
					number: player.number,
					position: player.position,
					isActive: !!validTeamId,
				};

				set((state) => ({
					club: {
						...state.club,
						players: [...state.club.players, newPlayer],
					},
				}));
				if (validTeamId) {
					const { addTeamMembership } = useClubStore.getState();

					addTeamMembership(
						newPlayer.id,
						validTeamId,
						currentState.club.currentSeasonId
					);
				}
			},
			// Returns the team name for the player provided.
			getPlayerTeams: (playerId: string, seasonId?: string) => {
				const currentState = get();
				// returns all players with matching ID and is Active. SeasonID is there incase later i want to filter using a current or previous season.
				const playerMemberships = currentState.club.teamMemberships.filter(
					(membership) => {
						const matchesPlayer = membership.playerId === playerId;
						const matchesSeason = seasonId
							? membership.seasonId === seasonId
							: true;
						return matchesPlayer && matchesSeason && membership.isActive;
					}
				);

				return playerMemberships
					.map((membership) => {
						const team = currentState.club.teams.find(
							(team) => team.id === membership.teamId
						);
						return team?.name || "";
					})
					.filter((name) => name !== "");
			},
			getActivePlayersByTeamId: (teamId: string) => {
				const currentState = get();

				//find all players that play for the team matching the teamId this current season
				const playerMemberships = currentState.club.teamMemberships.filter(
					(team) => {
						const matchingTeamId = team.teamId === teamId;
						const matchingSeason =
							team.seasonId === currentState.club.currentSeasonId;

						return matchingTeamId && matchingSeason && team.isActive;
					}
				);

				//Map through the playerMemberships and get the players information;
				//Remove any undefined players.
				return playerMemberships
					.map((player) => {
						return currentState.club.players.find(
							(p) => p.id === player.playerId
						);
					})
					.filter((player) => player !== undefined);
			},
			addTeam: (teamName: string) => {
				set((state) => ({
					club: {
						...state.club,
						teams: [
							...state.club.teams,
							{
								id: crypto.randomUUID(),
								name: teamName,
							},
						],
					},
				}));
			},
			removeTeam: (teamId: string) => {
				const currentState = get();
				const hasMembership = currentState.club.teamMemberships.find(
					(team) => team.teamId === teamId
				);
				if (hasMembership) {
					throw new Error(
						`This team cannot be deleted as it has data associated with it - ${hasMembership}`
					);
				} else {
					set((state) => ({
						club: {
							...state.club,
							teams: state.club.teams.filter((team) => team.id !== teamId),
						},
					}));
				}
			},
			updateTeam: (teamId: string, teamName: string) => {
				set((state) => {
					const currentTeamIndex = state.club.teams.findIndex(
						(team) => team.id === teamId
					);
					const newTeam = [...state.club.teams];
					newTeam[currentTeamIndex].name = teamName;
					return { club: { ...state.club, teams: newTeam } };
				});
			},
			createMatch: (match: Omit<Match, "id" | "seasonId">) => {
				const currentState = get();

				if (!currentState.club.currentSeasonId) {
					throw new Error("No active season. Please create a season first.");
				}

				const newMatch: Match = {
					id: crypto.randomUUID(),
					teamId: match.teamId,
					seasonId: currentState.club.currentSeasonId,
					opponent: match.opponent,
					date: match.date,
					selectedPlayers: match.selectedPlayers,
					status: match.status || "upcoming",
					venue: match.venue,
				};

				set((state) => ({
					club: { ...state.club, matches: [...state.club.matches, newMatch] },
				}));
			},
			getMatchesByTeamId: (teamId: string) => {
				const currentState = get();
				return currentState.club.matches.filter(
					(match) =>
						match.teamId === teamId &&
						match.seasonId === currentState.club.currentSeasonId
				);
			},

			getAllTeamMatches: () => {
				const currentState = get();

				if (currentState.club.matches.length < 1) return [];

				const matchData: MatchData[] = [];

				currentState.club.teams.forEach((team) => {
					const matches: Match[] = currentState.getMatchesByTeamId(team.id);

					// Only add team if it has matches
					if (matches.length > 0) {
						const teamData: MatchData = {
							teamId: team.id,
							teamName: team.name,
							upcoming: [],
							completed: [],
							inProgress: [],
						};

						matches.forEach((match: Match) => {
							if (match.status === "completed") teamData.completed.push(match);
							if (match.status === "upcoming") teamData.upcoming.push(match);
							if (match.status === "in-progress")
								teamData.inProgress.push(match);
						});

						matchData.push(teamData);
					}
				});

				return matchData;
			},
		}),
		{
			name: "Lincoln-cannons-club",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ club: state.club }), // Ensure club is always persisted
		}
	)
);
