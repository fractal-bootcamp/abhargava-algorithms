import React, { useState } from "react";
import type { Route } from "./+types/search";

// Import search algorithms
import { linearSearch } from "../algorithms/search/linearsearch";
import { binarySearch } from "../algorithms/search/binarysearch";
import { depthFirstSearch } from "../algorithms/search/depthfirstsearch";
import { breadthFirstSearch } from "../algorithms/search/breadthfirstsearch";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Search Algorithms" },
		{
			name: "description",
			content: "Visualize and learn about search algorithms",
		},
	];
}

export default function Search() {
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("linear");
	const [array, setArray] = useState<number[]>([
		1, 3, 5, 7, 9, 11, 13, 15, 17, 19,
	]);
	const [target, setTarget] = useState<number>(7);
	const [result, setResult] = useState<string>("");

	const runAlgorithm = () => {
		let searchResult: number | undefined;
		let resultMessage: string;

		switch (selectedAlgorithm) {
			case "linear":
				searchResult = linearSearch(array, target);
				resultMessage =
					searchResult !== -1
						? `Found ${target} at index ${searchResult}`
						: `${target} not found in the array`;
				break;
			case "binary":
				searchResult = binarySearch(array, target);
				resultMessage =
					searchResult !== -1
						? `Found ${target} at index ${searchResult}`
						: `${target} not found in the array`;
				break;
			case "dfs":
				// For demonstration purposes - would need a graph structure
				resultMessage =
					"DFS requires a graph structure. Implementation pending.";
				break;
			case "bfs":
				// For demonstration purposes - would need a graph structure
				resultMessage =
					"BFS requires a graph structure. Implementation pending.";
				break;
			default:
				resultMessage = "Please select an algorithm";
		}

		setResult(resultMessage);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Search Algorithms</h1>

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
					<option value="linear">Linear Search</option>
					<option value="binary">Binary Search</option>
					<option value="dfs">Depth-First Search</option>
					<option value="bfs">Breadth-First Search</option>
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

			<div className="mb-6">
				<label htmlFor="target-input" className="block mb-2 font-semibold">
					Target Value:
				</label>
				<input
					id="target-input"
					type="number"
					className="border p-2 rounded w-full md:w-1/3"
					value={target}
					onChange={(e) => setTarget(Number.parseInt(e.target.value, 10))}
				/>
			</div>

			<button
				type="button"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				onClick={runAlgorithm}
			>
				Run Algorithm
			</button>

			{result && (
				<div className="mt-6 p-4 bg-gray-100 rounded">
					<h2 className="text-xl font-semibold mb-2">Result:</h2>
					<p>{result}</p>
				</div>
			)}

			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">Algorithm Description</h2>
				{selectedAlgorithm === "linear" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Linear Search</h3>
						<p>
							Linear search is the simplest search algorithm that checks each
							element in the array sequentially until it finds the target value
							or reaches the end of the array.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(n)
						</p>
					</div>
				)}
				{selectedAlgorithm === "binary" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Binary Search</h3>
						<p>
							Binary search is an efficient algorithm for finding an item from a
							sorted list. It works by repeatedly dividing the search interval
							in half.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(log n)
						</p>
					</div>
				)}
				{selectedAlgorithm === "dfs" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Depth-First Search</h3>
						<p>
							DFS is an algorithm for traversing or searching tree or graph data
							structures. It starts at a selected node and explores as far as
							possible along each branch before backtracking.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(V + E) where V is vertices and
							E is edges
						</p>
					</div>
				)}
				{selectedAlgorithm === "bfs" && (
					<div>
						<h3 className="text-xl font-medium mb-2">Breadth-First Search</h3>
						<p>
							BFS is an algorithm for traversing or searching tree or graph data
							structures. It starts at a selected node and explores all neighbor
							nodes at the present depth before moving on to nodes at the next
							depth level.
						</p>
						<p className="mt-2">
							<strong>Time Complexity:</strong> O(V + E) where V is vertices and
							E is edges
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
