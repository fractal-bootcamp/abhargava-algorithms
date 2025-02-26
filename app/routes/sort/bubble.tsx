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
	const [sortingSteps, setSortingSteps] = useState<BubbleSortInfo[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const animationTimeoutRef = useRef<number | null>(null);

	// Start the sorting process
	const startSorting = () => {
		if (isSorting) return;

		setIsSorting(true);
		const steps: BubbleSortInfo[] = [];

		const visualizationCallback = (info: BubbleSortInfo) => {
			steps.push({ ...info, array: [...info.array] });
		};

		// Run the algorithm to collect all steps
		bubbleSort([...array], visualizationCallback);
		setSortingSteps(steps);
		setCurrentStepIndex(0);
	};

	// Reset the sorting process
	const resetSorting = () => {
		setIsSorting(false);
		setCurrentStepIndex(-1);
		setSortingSteps([]);
		setArray(generateRandomArray());

		if (animationTimeoutRef.current) {
			clearTimeout(animationTimeoutRef.current);
			animationTimeoutRef.current = null;
		}
	};

	// Advance to the next step with animation
	useEffect(() => {
		if (
			isSorting &&
			currentStepIndex >= 0 &&
			currentStepIndex < sortingSteps.length
		) {
			animationTimeoutRef.current = window.setTimeout(() => {
				setCurrentStepIndex((prev) => prev + 1);
			}, 500); // Animation speed - 500ms between steps

			return () => {
				if (animationTimeoutRef.current) {
					clearTimeout(animationTimeoutRef.current);
				}
			};
		}

		// Animation complete
		if (isSorting && currentStepIndex >= sortingSteps.length) {
			setIsSorting(false);
		}
	}, [currentStepIndex, sortingSteps.length, isSorting]);

	// Get the current array state to display
	const currentArray = () => {
		if (!isSorting || currentStepIndex === -1) {
			return array;
		}

		if (currentStepIndex >= sortingSteps.length) {
			return sortingSteps[sortingSteps.length - 1]?.array || array;
		}

		return sortingSteps[currentStepIndex]?.array || array;
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

			{/* Bar chart visualization */}
			<div className="w-full bg-gray-100 p-4 rounded-lg mb-4">
				<div className="flex items-end justify-around h-64 gap-1">
					{currentArray().map((value: number, index: number) => {
						// Determine if this bar is being swapped in the current step
						const isSwapping =
							isSorting &&
							currentStepIndex >= 0 &&
							currentStepIndex < sortingSteps.length &&
							sortingSteps[currentStepIndex].swap &&
							(index === findSwappingIndices(currentStepIndex)[0] ||
								index === findSwappingIndices(currentStepIndex)[1]);

						return (
							<div
								key={`bar-${index}-${value}`}
								className={`w-full rounded-t-md flex flex-col items-center ${
									isSwapping ? "bg-red-500" : "bg-blue-500"
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
			{isSorting &&
				currentStepIndex >= 0 &&
				currentStepIndex < sortingSteps.length && (
					<div className="mb-4 p-2 bg-gray-100 rounded">
						<p>
							{sortingSteps[currentStepIndex].swap
								? `Swapping elements at positions ${findSwappingIndices(currentStepIndex).join(" and ")}`
								: "No swaps needed in this pass - array is getting sorted!"}
						</p>
					</div>
				)}

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

	// Helper function to find which indices are being swapped in the current step
	function findSwappingIndices(stepIndex: number): [number, number] {
		if (!sortingSteps[stepIndex]?.swap) {
			return [-1, -1]; // No swapping in this step
		}

		// Compare the current step array with the previous step array to find what changed
		const currentArray = sortingSteps[stepIndex].array;
		const previousArray =
			stepIndex > 0
				? sortingSteps[stepIndex - 1].array
				: stepIndex === 0
					? array
					: currentArray;

		for (let i = 0; i < currentArray.length - 1; i++) {
			if (
				currentArray[i] !== previousArray[i] &&
				currentArray[i + 1] !== previousArray[i + 1]
			) {
				return [i, i + 1];
			}
		}

		return [-1, -1]; // Fallback
	}
}
