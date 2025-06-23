import Link from "next/link";

export default function Home() {
	return (
		<div className="">
			Hello world
			<div className="mt-20 p-4">
				<Link href={"/teams"}>Teams</Link>
			</div>
		</div>
	);
}
