import React from "react";

const Court = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex justify-center items-center size-full p-4 relative z-0">
			<div className="relative w-full max-w-2xl h-full">
				<div className="relative aspect-[5/6]">
					<div className="absolute inset-0 flex flex-col size-full">
						<div id="Net" className="h-[5%] w-full relative">
							<div className="bg-slate-600 rounded-md border-4 border-black/20 -inset-x-4 inset-0 absolute pointer-events-none" />
						</div>
						<div
							id="Court"
							className="flex-grow w-full bg-amber-700 border-white border-t-0 border-[6px] relative h-full"
						>
							<div
								id="3m"
								className="h-[0.75%] w-full bg-white/60 absolute top-[33.333%] pointer-events-none"
							/>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Court;
