import { Player } from "@/store/types";
import React from "react";

const PlayerItemCard = ({
	player,
	action,
	remove,
}: {
	player: Player;
	action: React.MouseEventHandler;
	remove?: boolean;
}) => {
	return (
		<li
			className={`border border-gray-200 rounded-lg py-3 px-2 hover:shadow-sm cursor-pointer transition-all inline-flex justify-between items-center ${
				remove
					? "hover:bg-red-50 hover:border-red-500"
					: "hover:border-blue-500 hover:bg-blue-100 "
			}`}
			onClick={action}
		>
			<span className="text-sm font-medium">
				{player.number} - {player.name}
			</span>
			{remove && <span className="text-red-500 text-xs">remove</span>}
		</li>
	);
};

export default PlayerItemCard;
