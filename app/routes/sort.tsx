import React, { useState } from "react";
import type { Route } from "./+types/sort";

// Import sorting algorithms
import { bubbleSort } from "../algorithms/sorting/bubblesort";
import { insertionSort } from "../algorithms/sorting/insertionsort";
import { selectionSort } from "../algorithms/sorting/selectionsort";
import { mergeSort } from "../algorithms/sorting/mergesort";
import { quickSort } from "../algorithms/sorting/quicksort";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Sorting Algorithms" },
		{
			name: "description",
			content: "Visualize and learn about sorting algorithms",
		},
	];
}

export default function Sort() {
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubble");
	const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
	const [sortedArray, setSortedArray] = useState<number[]>([]);
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const [executionTime, setExecutionTime] = useState<number | null>(null);

	const runAlgorithm = () => {
		setIsSorting(true);
		setSortedArray([]);
		setExecutionTime(null);

		// Use setTimeout to allow the UI to update before running the algorithm
		setTimeout(() => {
			const startTime = performance.now();
			let result: number[] = [];

			switch (selectedAlgorithm) {
				case "bubble":
					result = [...array];
					bubbleSort(result);
					break;
				case "insertion":
					result = [...array];
					insertionSort(result);
					break;
				case "selection":
					result = [...array];
					selectionSort(result);
					break;
				case "merge":
					result = mergeSort([...array]);
					break;
				case "quick":
					result = [...array];
					quickSort(result, 0, result.length - 1);
					break;
				default:
					result = [...array];
			}

			const endTime = performance.now();
			setSortedArray(result);
			setExecutionTime(endTime - startTime);
			setIsSorting(false);
		}, 100);
	};

	const generateRandomArray = (size: number = 10) => {
		const newArray = Array.from({ length: size }, () =>
			Math.floor(Math.random() * 100),
		);
		setArray(newArray);
		setSortedArray([]);
		setExecutionTime(null);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Sorting Algorithms</h1>

			<div className="mb-6">
				<label htmlFor="algorithm-select" className="block mb-2 font-semibold">
					Select Algorithm:
				</label>
				<select
					id="algorithm-select"
					className="border p-2 rounded w-full md:w-1/3"
					value={selectedAlgorithm}
					onChange={(e) => setSelectedAlgorithm(e.target.value)}
				>
					<option value="bubble">Bubble Sort</option>
					<option value="insertion">Insertion Sort</option>
					<option value="selection">Selection Sort</option>
					<option value="merge">Merge Sort</option>
					<option value="quick">Quick Sort</option>
				</select>
			</div>

			<div className="mb-6">
				<label htmlFor="array-input" className="block mb-2 font-semibold">
					Array (comma-separated):
				</label>
				<input
					id="array-input"
					type="text"
					className="border p-2 rounded w-full md:w-2/3"
					value={array.join(", ")}
					onChange={(e) => {
						const newArray = e.target.value
							.split(",")
							.map((item) => Number.parseInt(item.trim(), 10))
							.filter((num) => !Number.isNaN(num));
						setArray(newArray);
					}}
				/>
			</div>

			<div className="flex gap-4 mb-6">
				<button
					type="button"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					onClick={runAlgorithm}
					disabled={isSorting}
				>
					{isSorting ? "Sorting..." : "Sort Array"}
				</button>

				<button
					type="button"
					className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
					onClick={() => generateRandomArray(10)}
					disabled={isSorting}
				>
					Generate Random Array
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-4 bg-gray-100 rounded">
					<h2 className="text-xl font-semibold mb-2">Original Array:</h2>
					<div className="flex flex-wrap gap-2">
						{array.map((value, index) => (
							<div
								key={`original-${index}`}
								className="bg-white p-2 rounded shadow text-center min-w-[40px]"
							>
								{value}
							</div>
						))}
					</div>
				</div>

				{sortedArray.length > 0 && (
					<div className="p-4 bg-gray-100 rounded">
						<h2 className="text-xl font-semibold mb-2">Sorted Array:</h2>
						<div className="flex flex-wrap gap-2">
							{sortedArray.map((value, index) => (
								<div
									key={`sorted-${index}`}
									className="bg-green-100 p-2 rounded shadow text-center min-w-[40px]"
								>
									{value}
								</div>
							))}
						</div>
						{executionTime !== null && (
							<p className="mt-4 text-sm">
								Execution time: {executionTime.toFixed(2)} ms
							</p>
						)}
					</div>
				)}
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">Algorithm Description</h2>
				{selectedAlgorithm === "bubble" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Bubble Sort</h3>
						<p>
							Bubble Sort is a simple sorting algorithm that repeatedly steps
							through the list, compares adjacent elements and swaps them if
							they are in the wrong order.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1)
						</p>
					</div>
				)}
				{selectedAlgorithm === "insertion" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Insertion Sort</h3>
						<p>
							Insertion Sort builds the final sorted array one item at a time.
							It is much less efficient on large lists than more advanced
							algorithms such as quicksort, heapsort, or merge sort.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1)
						</p>
					</div>
				)}
				{selectedAlgorithm === "selection" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Selection Sort</h3>
						<p>
							Selection Sort divides the input list into two parts: a sorted
							sublist of items which is built up from left to right, and a
							sublist of the remaining unsorted items.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1)
						</p>
					</div>
				)}
				{selectedAlgorithm === "merge" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Merge Sort</h3>
						<p>
							Merge Sort is an efficient, stable, comparison-based, divide and
							conquer sorting algorithm. It divides the input array into two
							halves, recursively sorts them, and then merges the sorted halves.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(n log n)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(n)
						</p>
					</div>
				)}
				{selectedAlgorithm === "quick" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Quick Sort</h3>
						<p>
							Quick Sort is an efficient, in-place sorting algorithm that uses a
							divide-and-conquer strategy. It works by selecting a 'pivot'
							element and partitioning the array around the pivot.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> Average O(n log n), Worst O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(log n)
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
