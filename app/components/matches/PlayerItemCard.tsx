import React from "react";

type PlayerData = {
	id: string;
	name: string;
};

const PlayerItemCard = ({
	player,
	action,
	remove,
}: {
	player: PlayerData;
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
			<span className="text-sm font-medium">{player.name}</span>
			{remove && <span className="text-red-500 text-xs">remove</span>}
		</li>
	);
};

export default PlayerItemCard;
