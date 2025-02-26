import React from "react";
import Card from "./Card";

// Component for displaying the final sorted array
export const SortedArrayDisplay = ({
	sortedArray,
}: { sortedArray: number[] }) => {
	return (
		<div className="mt-6">
			<h2 className="text-xl font-bold mb-2">Final Sorted Array</h2>
			<div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md bg-gray-50">
				{sortedArray.map((num, idx) => {
					// Create a more unique identifier for each sorted number
					// Use the value and position to create a stable key
					const uniqueKey = `sorted-${num}-pos-${idx}`;
					return (
						<Card
							key={uniqueKey}
							value={num}
							className="w-12 h-14 bg-green-600"
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SortedArrayDisplay;
