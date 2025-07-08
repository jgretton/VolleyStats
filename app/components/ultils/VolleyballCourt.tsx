import React from "react";

const VolleyballCourt = () => {
	return (
		<>
			<div className="relative w-72 h-80 bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg border border-slate-200">
				{/* Net line */}
				<div className="absolute left-0 right-0 top-0 h-px bg-slate-400"></div>

				{/* 3m line */}
				<div
					className="absolute left-4 right-4 h-px bg-amber-400"
					style={{ top: "37.5%" }}
				></div>

				{/* Court outline */}
				<div className="absolute left-4 right-4 bottom-4 top-4 border-l border-r border-b border-slate-300 rounded-b"></div>

				{/* Positions */}
				<div className="h-full grid grid-cols-3 grid-rows-[3fr_5fr] gap-2 p-4 ">
					{[4, 3, 2, 5, 6, 1].map((pos, index) => (
						<button
							key={pos}
							className={`${
								index < 3 ? "h-10" : "h-14"
							} bg-white border border-slate-300 rounded-md hover:border-blue-400 hover:bg-blue-50 transition-all duration-150 flex items-center justify-center font-medium text-slate-700 hover:text-blue-600 shadow-sm`}
						>
							{pos}
						</button>
					))}
				</div>
			</div>

			<div className="mt-4 flex justify-center">
				<button className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 text-sm font-medium hover:border-purple-400 hover:text-purple-600 transition-colors shadow-sm">
					Libero
				</button>
			</div>
		</>
	);
};

export default VolleyballCourt;
