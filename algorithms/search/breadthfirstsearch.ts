type Graph = {
  [vertex: string]: string[];
};

function breadthFirstSearch(graph: Graph, startVertex: string): string[] {
  const visited: Set<string> = new Set();
  const result: string[] = [];
  const queue: string[] = [];

  // Start with the initial vertex
  visited.add(startVertex);
  queue.push(startVertex);
  
  // Process vertices in queue order (FIFO)
  while (queue.length > 0) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const currentVertex = queue.shift()!;
    result.push(currentVertex);
    
    // Add all unvisited neighbors to the queue
    for (const neighbor of graph[currentVertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

export default breadthFirstSearch;

// Example usage of breadthFirstSearch
const exampleGraph: Graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [],
  'E': ['F'],
  'F': []
};

// Test the function
const startVertex = 'A';
const traversalOrder = breadthFirstSearch(exampleGraph, startVertex);
console.log(`BFS traversal starting from ${startVertex}:`, traversalOrder);
