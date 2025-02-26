import { Link } from "react-router";
import type { Route } from "./+types/sort";

export function meta() {
	return [
		{ title: "Sorting Algorithms" },
		{
			name: "description",
			content: "Visualize and learn about sorting algorithms",
		},
	];
}

export default function Sort() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Sorting Algorithms</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Bubble Sort</h2>
					<p className="text-gray-600 mb-4">
						Bubble Sort is a simple sorting algorithm that repeatedly steps
						through the list, compares adjacent elements and swaps them if they
						are in the wrong order.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1)
						</p>
						<Link
							to="/sort/bubble"
							className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Try It
						</Link>
					</div>
				</div>

				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Insertion Sort</h2>
					<p className="text-gray-600 mb-4">
						Insertion Sort builds the final sorted array one item at a time. It
						is much less efficient on large lists than more advanced algorithms
						such as quicksort, heapsort, or merge sort.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1)
						</p>
						<Link
							to="/sort/insertion"
							className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Try It
						</Link>
					</div>
				</div>

				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Selection Sort</h2>
					<p className="text-gray-600 mb-4">
						Selection Sort divides the input list into two parts: a sorted
						sublist of items which is built up from left to right, and a sublist
						of the remaining unsorted items.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1)
						</p>
						<Link
							to="/sort/selection"
							className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Try It
						</Link>
					</div>
				</div>

				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Merge Sort</h2>
					<p className="text-gray-600 mb-4">
						Merge Sort is an efficient, stable, comparison-based, divide and
						conquer sorting algorithm. It divides the input array into two
						halves, recursively sorts them, and then merges the sorted halves.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(n log n)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(n)
						</p>
						<Link
							to="/sort/merge"
							className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Try It
						</Link>
					</div>
				</div>

				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Quick Sort</h2>
					<p className="text-gray-600 mb-4">
						Quick Sort is an efficient, in-place sorting algorithm that uses a
						divide-and-conquer strategy. It works by selecting a 'pivot' element
						and partitioning the array around the pivot.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> Average O(n log n), Worst O(n²)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(log n)
						</p>
						<Link
							to="/sort/quick"
							className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Try It
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
