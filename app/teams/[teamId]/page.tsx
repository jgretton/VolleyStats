import React from "react";

const Page = async ({ params }: { params: Promise<{ teamId: string }> }) => {
	const { teamId } = await params;
	return <div className="">Teams Page - {teamId}</div>;
};

export default Page;
