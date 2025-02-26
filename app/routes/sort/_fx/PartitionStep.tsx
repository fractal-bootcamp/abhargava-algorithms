import React from "react";
import type { PartitionInfo } from "~/algorithms/sorting/quicksort";
import Card from "./Card";

// Component for displaying a single partition step
export const PartitionStep = ({
	step,
	depth,
	stepIdx,
}: { step: PartitionInfo; depth: number; stepIdx: number }) => {
	const allCards = [...step.left, ...step.equal, ...step.right];

	return (
		<div className="flex flex-col items-center border border-gray-200 rounded p-2 mb-2">
			<div className="text-xs text-gray-500 mb-1">Partition {stepIdx + 1}</div>
			<div className="flex">
				{allCards.map((card, index) => {
					// Determine if this card is the pivot
					const isPivot =
						step.equal.includes(card) && index === step.left.length;

					// Determine which group this card belongs to
					let groupClass = "bg-blue-500"; // Default
					if (step.left.includes(card)) {
						groupClass = "bg-yellow-500"; // Left partition
					} else if (step.right.includes(card)) {
						groupClass = "bg-green-500"; // Right partition
					} else if (step.equal.includes(card)) {
						groupClass = "bg-purple-500"; // Equal to pivot
					}

					// If it's the pivot, override with red
					if (isPivot) {
						groupClass = "bg-red-500";
					}

					// Create a more unique key that doesn't rely solely on index
					const position = isPivot
						? "pivot"
						: step.left.includes(card)
							? `left-${step.left.indexOf(card)}`
							: step.right.includes(card)
								? `right-${step.right.indexOf(card)}`
								: `equal-${step.equal.indexOf(card)}`;

					return (
						<Card
							key={`card-${card}-${depth}-${stepIdx}-${position}`}
							value={card}
							className={`w-10 h-12 ${groupClass} mr-1 transition-all duration-500`}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PartitionStep;
