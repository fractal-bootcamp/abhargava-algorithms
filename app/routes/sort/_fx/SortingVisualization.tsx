import React from "react";
import type { PartitionInfo } from "~/algorithms/sorting/quicksort";
import PartitionStep from "./PartitionStep";

// Component for displaying sorting visualization by depth
export const SortingVisualization = ({
	sortingSteps,
	currentStepIndex,
}: { sortingSteps: PartitionInfo[]; currentStepIndex: number }) => {
	// Get all steps up to the current step
	const visibleSteps = sortingSteps.slice(0, currentStepIndex + 1);

	// Group steps by depth
	const stepsByDepth = visibleSteps.reduce(
		(acc, step) => {
			if (!acc[step.depth]) {
				acc[step.depth] = [];
			}
			acc[step.depth].push(step);
			return acc;
		},
		{} as Record<number, PartitionInfo[]>,
	);

	// Sort depths numerically
	const depths = Object.keys(stepsByDepth)
		.map(Number)
		.sort((a, b) => a - b);

	return (
		<div className="flex flex-col space-y-8 w-full">
			{depths.map((depth) => (
				<div key={`depth-${depth}`} className="flex flex-col">
					<div className="text-sm font-semibold mb-2">Depth: {depth}</div>
					<div className="flex flex-wrap gap-2">
						{stepsByDepth[depth].map((step, stepIdx) => (
							<PartitionStep
								key={`partition-${depth}-${step.pivotIndex}-${stepIdx}`}
								step={step}
								depth={depth}
								stepIdx={stepIdx}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default SortingVisualization;
