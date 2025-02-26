import { useState, useEffect, useRef } from "react";
import {
	bubbleSort,
	type BubbleSortInfo,
} from "~/algorithms/sorting/bubblesort";
import autoAnimate from "@formkit/auto-animate";

export function meta() {
	return [
		{ title: "BubbleSort Visualization" },
		{
			name: "description",
			content: "Visualize and learn about bubble sort",
		},
	];
}

// Main BubbleSort component
export default function BubbleSort() {
	// Generate a random array of 15 numbers between 1 and 100
	const generateRandomArray = () => {
		return Array.from(
			{ length: 15 },
			() => Math.floor(Math.random() * 100) + 1,
		);
	};

	const [array, setArray] = useState<number[]>(generateRandomArray());
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const [isSwapping, setIsSwapping] = useState<boolean>(false);
	const [swappedIndices, setSwappedIndices] = useState<number[]>([]);
	const [animationSpeed, setAnimationSpeed] = useState<number>(500); // Default 500ms delay
	const animationTimeoutRef = useRef<number | null>(null);
	const chartRef = useRef<HTMLDivElement>(null);

	// Apply auto-animate to the chart container
	useEffect(() => {
		if (chartRef.current) {
			autoAnimate(chartRef.current);
		}
	}, []);

	// Start the sorting process
	const startSorting = () => {
		if (isSorting) return;
		setIsSorting(true);

		// Keep track of the previous array state to detect changes
		let previousArray: number[] = [...array];

		// Collect all steps first
		const steps: BubbleSortInfo[] = [];
		const collectSteps = (info: BubbleSortInfo) => {
			steps.push({ ...info, array: [...info.array] });
		};

		// Run the algorithm to collect all steps
		bubbleSort([...array], collectSteps);

		// Now play back the steps with our desired delay
		let currentStep = 0;

		const playNextStep = () => {
			if (currentStep < steps.length) {
				const step = steps[currentStep];

				// Update the array state with the current step
				setArray([...step.array]);
				setIsSwapping(step.swap);

				// Find which indices were swapped by comparing with previous array
				if (step.swap) {
					const newSwappedIndices: number[] = [];
					for (let i = 0; i < step.array.length; i++) {
						if (step.array[i] !== previousArray[i]) {
							newSwappedIndices.push(i);
						}
					}
					setSwappedIndices(newSwappedIndices);
				} else {
					setSwappedIndices([]);
				}

				// Update previous array for next comparison
				previousArray = [...step.array];

				// Schedule the next step
				currentStep++;
				animationTimeoutRef.current = window.setTimeout(
					playNextStep,
					animationSpeed,
				);
			} else {
				// Sorting is complete
				setIsSorting(false);
				setSwappedIndices([]);
			}
		};

		// Start playing the steps
		playNextStep();
	};

	// Reset the sorting process
	const resetSorting = () => {
		setIsSorting(false);
		setIsSwapping(false);
		setSwappedIndices([]);
		setArray(generateRandomArray());

		if (animationTimeoutRef.current) {
			clearTimeout(animationTimeoutRef.current);
			animationTimeoutRef.current = null;
		}
	};

	// Find the maximum value in the array for scaling
	const maxValue = Math.max(...array);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">BubbleSort Visualization</h1>
			<p className="mb-4">
				Watch how bubble sort works by comparing adjacent elements and swapping
				them if they're in the wrong order.
			</p>

			{/* Bar chart visualization with auto-animate */}
			<div className="w-full bg-gray-100 p-4 rounded-lg mb-4">
				<div
					ref={chartRef}
					className="flex items-end justify-around h-64 gap-1"
				>
					{array.map((value: number, index: number) => {
						const isBeingSwapped = swappedIndices.includes(index);

						return (
							<div
								key={`${index}-${value}`}
								className={`w-full rounded-t-md flex flex-col items-center ${
									isBeingSwapped ? "bg-red-500" : "bg-blue-500"
								} transition-all duration-300`}
								style={{
									height: `${(value / maxValue) * 100}%`,
								}}
							>
								<span className="text-white text-xs font-bold">{value}</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Status message */}
			{isSorting && (
				<div className="mb-4 p-2 bg-gray-100 rounded">
					<p>
						{isSwapping
							? `Swapping elements at positions ${swappedIndices.join(" and ")}`
							: "No swaps needed in this pass - array is getting sorted!"}
					</p>
				</div>
			)}

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
					disabled={isSorting}
					className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
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
