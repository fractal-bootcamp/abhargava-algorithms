import { useState, useEffect, useRef } from "react";
import { quickSort, type PartitionInfo } from "~/algorithms/sorting/quicksort";

export function meta() {
	return [
		{ title: "  " },
		{
			name: "description",
			content: "Visualize and learn about quick sort",
		},
	];
}

export default function QuickSort() {
	const [cards, setCards] = useState<number[]>([]);
	const [currentInput, setCurrentInput] = useState<string>("");
	const [cardIds, setCardIds] = useState<string[]>([]);
	const [sortingSteps, setSortingSteps] = useState<PartitionInfo[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		// Function to handle keyboard events
		const handleKeyDown = (e: KeyboardEvent) => {
			// Check if the key is a number (0-9) or a comma
			if (/^[0-9]$/.test(e.key)) {
				setCurrentInput((prev) => prev + e.key);
			} else if (e.key === ",") {
				if (currentInput.trim() !== "") {
					const number = Number.parseFloat(currentInput);
					if (!Number.isNaN(number)) {
						setCards((prevCards) => [...prevCards, number]);
						setCardIds((prevIds) => [...prevIds, crypto.randomUUID()]);
					}
					setCurrentInput("");
				}
			}
		};

		// Add event listener
		document.addEventListener("keydown", handleKeyDown);

		// Clean up
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentInput]);

	const startSorting = () => {
		if (cards.length <= 1 || isSorting) return;

		setIsSorting(true);
		const steps: PartitionInfo[] = [];

		const visualizationCallback = (info: PartitionInfo) => {
			steps.push(info);
		};

		// Run the algorithm to collect all steps
		quickSort([...cards], visualizationCallback);
		setSortingSteps(steps);
		setCurrentStepIndex(0);
	};

	const resetSorting = () => {
		setIsSorting(false);
		setCurrentStepIndex(-1);
		setSortingSteps([]);
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
			return cards.map((card, index) => (
				<div
					key={cardIds[index]}
					className="flex-shrink-0 w-12 h-14 bg-blue-500 text-white rounded-md shadow-md flex items-center justify-center text-2xl font-bold mr-2"
				>
					{card}
				</div>
			));
		}

		// Show cards in their current sorting state
		const currentStep =
			sortingSteps[Math.min(currentStepIndex, sortingSteps.length - 1)];
		const allCards = [
			...currentStep.left,
			...currentStep.equal,
			...currentStep.right,
		];

		return allCards.map((card, index) => {
			// Determine if this card is the pivot
			const isPivot =
				currentStep.equal.includes(card) && index === currentStep.left.length;

			// Determine which group this card belongs to
			let groupClass = "bg-blue-500"; // Default
			if (currentStep.left.includes(card)) {
				groupClass = "bg-yellow-500"; // Left partition
			} else if (currentStep.right.includes(card)) {
				groupClass = "bg-green-500"; // Right partition
			} else if (currentStep.equal.includes(card)) {
				groupClass = "bg-purple-500"; // Equal to pivot
			}

			// If it's the pivot, override with red
			if (isPivot) {
				groupClass = "bg-red-500";
			}

			return (
				<div
					key={`${card}-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						index
					}`}
					className={`flex-shrink-0 w-12 h-14 ${groupClass} text-white rounded-md shadow-md flex items-center justify-center text-2xl font-bold mr-2 transition-all duration-500`}
				>
					{card}
				</div>
			);
		});
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
					<p>
						Step: {currentStepIndex + 1} of {sortingSteps.length}
					</p>
					<p>
						Depth:{" "}
						{currentStepIndex >= 0
							? sortingSteps[
									Math.min(currentStepIndex, sortingSteps.length - 1)
								].depth
							: 0}
					</p>
				</div>
			)}
		</div>
	);
}
