import React from "react";

const VenueBadge = ({ venue }: { venue: "home" | "away" }) => {
	switch (venue) {
		case "home":
			return (
				<span className="text-xs text-green-800 bg-green-100 rounded-full py-1 px-2 font-medium capitalize">
					{venue}
				</span>
			);
		case "away":
			return (
				<span className="text-xs text-blue-800 bg-blue-100 rounded-full py-1 px-2 font-medium capitalize">
					{venue}
				</span>
			);
	}
};

export default VenueBadge;
