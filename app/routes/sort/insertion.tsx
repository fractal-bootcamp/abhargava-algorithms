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
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const [currentIndex, setCurrentIndex] = useState<number>(-1);
	const [previousIndex, setPreviousIndex] = useState<number>(-1);
	const [animationSpeed, setAnimationSpeed] = useState<number>(500);
	const animationTimeoutRef = useRef<number | null>(null);
	const chartRef = useRef<HTMLDivElement>(null);

	// Find the maximum value in the array for scaling
	const maxValue = Math.max(...array);

	// Apply auto-animate to the chart container
	useEffect(() => {
		if (chartRef.current) {
			autoAnimate(chartRef.current);
		}
	}, []);

	const startSorting = () => {
		if (isSorting) return;
		setIsSorting(true);

		const steps: InsertionSortInfo[] = [];
		const collectSteps = (info: InsertionSortInfo) => {
			steps.push({ ...info, array: [...info.array] });
		};

		insertSort([...array], collectSteps);

		let stepIndex = 0;

		const processStep = () => {
			if (stepIndex < steps.length) {
				const step = steps[stepIndex];
				setArray([...step.array]);
				setCurrentIndex(step.currentIndex);
				setPreviousIndex(step.previousIndex);

				stepIndex++;
				animationTimeoutRef.current = window.setTimeout(
					processStep,
					animationSpeed,
				);
			} else {
				setIsSorting(false);
				setCurrentIndex(-1);
				setPreviousIndex(-1);
			}
		};

		processStep();
	};

	const resetSorting = () => {
		if (animationTimeoutRef.current) {
			clearTimeout(animationTimeoutRef.current);
		}
		setArray(generateRandomArray());
		setIsSorting(false);
		setCurrentIndex(-1);
		setPreviousIndex(-1);
	};

	useEffect(() => {
		return () => {
			if (animationTimeoutRef.current) {
				clearTimeout(animationTimeoutRef.current);
			}
		};
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Insertion Sort Visualization</h1>
			<p className="mb-4">
				Watch how insertion sort works by inserting elements into the correct
				position in the array.
			</p>

			{/* Bar chart visualization with auto-animate */}
			<div className="w-full bg-gray-100 p-4 rounded-lg mb-4">
				<div
					ref={chartRef}
					className="flex items-end justify-around h-64 gap-1"
				>
					{array.map((value: number, index: number) => {
						const isBeingSwapped = currentIndex === index;

						return (
							<div
								key={`${index}-${value}`}
								className={`w-full rounded-t-md flex flex-col items-center ${
									isBeingSwapped ? "bg-red-500" : "bg-blue-500"
								} transition-all duration-300`}
								style={{
									height: `${(value / maxValue) * 100}%`,
								}}
							/>
						);
					})}
				</div>
			</div>

			{/* Animation speed control */}
			<div className="mb-4">
				<label
					htmlFor="speed-control"
					className="block text-sm font-medium mb-1"
				>
					Animation Speed: {animationSpeed}ms
				</label>
				<input
					id="speed-control"
					type="range"
					min="100"
					max="2000"
					step="100"
					value={animationSpeed}
					onChange={(e) => setAnimationSpeed(Number(e.target.value))}
					disabled={isSorting}
					className="w-full"
				/>
				<div className="flex justify-between text-xs text-gray-500">
					<span>Fast</span>
					<span>Slow</span>
				</div>
			</div>

			{/* Controls */}
			<div className="flex justify-center mt-4 space-x-4">
				<button
					type="button"
					onClick={startSorting}
					className="px-4 py-2 bg-blue-600 text-white rounded"
				>
					Start Sorting
				</button>
				<button
					type="button"
					onClick={resetSorting}
					className="px-4 py-2 bg-red-600 text-white rounded"
				>
					Reset
				</button>
			</div>
		</div>
	);
}
