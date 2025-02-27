import insertSort, {
	type InsertionSortInfo,
} from "~/algorithms/sorting/insertionsort";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
export function meta() {
	return [
		{ title: "Insertion Sort Visualization" },
		{
			name: "description",
			content: "Visualize and learn about insertion sort",
		},
	];
}

export default function InsertionSortAlgorithm() {
	const generateRandomArray = () => {
		return Array.from(
			{ length: 15 },
			() => Math.floor(Math.random() * 100) + 1,
		);
	};

	const [array, setArray] = useState<number[]>(generateRandomArray());

	// Find the maximum value in the array for scaling
	const maxValue = Math.max(...array);

	const startSorting = () => {
		const steps: InsertionSortInfo[] = [];
		const collectSteps = (info: InsertionSortInfo) => {
			steps.push({ ...info, array: [...info.array] });
		};

		insertSort([...array], collectSteps);
	};

	console.log(startSorting());

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Insertion Sort Visualization</h1>
			<p className="mb-4">
				Watch how insertion sort works by inserting elements into the correct
				position in the array.
			</p>
		</div>
	);
}
