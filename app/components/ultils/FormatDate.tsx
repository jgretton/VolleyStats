const FormatDate = ({ date }: { date: string }) => {
	return new Date(date).toLocaleDateString("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	});
};

export default FormatDate;
