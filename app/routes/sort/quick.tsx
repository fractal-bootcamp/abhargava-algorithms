import { useState, useEffect, useRef } from "react";
import { quickSort, type PartitionInfo } from "~/algorithms/sorting/quicksort";
import {
	UnsortedCards,
	SortedArrayDisplay,
	SortingVisualization,
	useNumberInput,
} from "./_fx";

export function meta() {
	return [
		{ title: "QuickSort Visualization" },
		{
			name: "description",
			content: "Visualize and learn about quick sort",
		},
	];
}

// Main QuickSort component
export default function QuickSort() {
	const { cards, cardIds } = useNumberInput();
	const [sortingSteps, setSortingSteps] = useState<PartitionInfo[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const animationRef = useRef<number | null>(null);
	const [sortedArray, setSortedArray] = useState<number[]>([]);

	const startSorting = () => {
		if (cards.length <= 1 || isSorting) return;

		setIsSorting(true);
		const steps: PartitionInfo[] = [];

		const visualizationCallback = (info: PartitionInfo) => {
			steps.push(info);
		};

		// Run the algorithm to collect all steps
		const result = quickSort([...cards], visualizationCallback);
		setSortedArray(result);
		setSortingSteps(steps);
		setCurrentStepIndex(0);
	};

	const resetSorting = () => {
		setIsSorting(false);
		setCurrentStepIndex(-1);
		setSortingSteps([]);
		setSortedArray([]);
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}
	};

	// Advance to the next step with animation
	useEffect(() => {
		if (currentStepIndex >= 0 && currentStepIndex < sortingSteps.length) {
			const timer = setTimeout(() => {
				setCurrentStepIndex((prev) => prev + 1);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [currentStepIndex, sortingSteps]);

	// Render the current state of the cards based on sorting step
	const renderCards = () => {
		if (!isSorting || currentStepIndex === -1) {
			// Show original cards
			return <UnsortedCards cards={cards} cardIds={cardIds} />;
		}

		return (
			<SortingVisualization
				sortingSteps={sortingSteps}
				currentStepIndex={currentStepIndex}
			/>
		);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">QuickSort Visualization</h1>
			<p className="mb-4">Type numbers and press comma to add cards</p>

			<div
				className="flex justify-center items-center overflow-x-auto pb-4"
				style={{ minHeight: "100px" }}
			>
				{cards.length === 0 ? (
					<div className="text-gray-500 italic">
						No cards yet. Type numbers and press comma to add cards.
					</div>
				) : (
					renderCards()
				)}
			</div>

			<div className="flex justify-center mt-4 space-x-4">
				<button
					type="button"
					onClick={startSorting}
					disabled={isSorting || cards.length <= 1}
					className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
				>
					Start Sorting
				</button>
				<button
					type="button"
					onClick={resetSorting}
					disabled={!isSorting}
					className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400"
				>
					Reset
				</button>
			</div>

			{isSorting && (
				<div className="mt-4">
					{/* Show final sorted array when all steps are complete */}
					{currentStepIndex >= sortingSteps.length - 1 && (
						<SortedArrayDisplay sortedArray={sortedArray} />
					)}
				</div>
			)}
		</div>
	);
}
