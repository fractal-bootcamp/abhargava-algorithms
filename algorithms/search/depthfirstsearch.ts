type Graph = {
  [vertex: string]: string[];
};

function depthFirstSearch(graph: Graph, startVertex: string): string[] {
  const visited: Set<string> = new Set();
  const result: string[] = [];

  // Helper function to recursively visit vertices
  function dfs(vertex: string): void {
    visited.add(vertex);
    result.push(vertex);

    // Visit all adjacent vertices that haven't been visited yet
    for (const neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }

  // Start DFS from the given vertex
  dfs(startVertex);
  return result;
}

export default depthFirstSearch;

// Example usage of depthFirstSearch
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
const traversalOrder = depthFirstSearch(exampleGraph, startVertex);
console.log(`DFS traversal starting from ${startVertex}:`, traversalOrder);

