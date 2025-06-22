import React from "react";

import TeamView from "@/app/components/team/TeamView";
const Page = async ({ params }: { params: Promise<{ teamId: string }> }) => {
	const { teamId } = await params;
	return <TeamView teamId={teamId} />;
};

export default Page;
