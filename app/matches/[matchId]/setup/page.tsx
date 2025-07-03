"use client";

import MatchInfoCard from "@/app/components/cards/MatchInfoCard";
import { PageLayout } from "@/app/components/layouts/PageLayout";
import React from "react";

import { useParams } from "next/navigation";
import { useClubStore } from "@/store";
import { Match } from "@/store/types";

const Page = () => {
	const { getSingleMatch } = useClubStore();
	const params = useParams();
	const matchId = params.matchId as string;

	const matchData: Match = getSingleMatch(matchId);
	return (
		<PageLayout
			title="Match Setup"
			subtitle="Select your squad and starting lineup"
		>
			<div className="size-full">
				<MatchInfoCard matchData={matchData} />{" "}
			</div>
		</PageLayout>
	);
};

export default Page;
