//
// Quick Sort
//

export type PartitionInfo = {
  array: number[];
  pivot: number;
  pivotIndex: number;
  left: number[];
  equal: number[];
  right: number[];
  depth: number;
};

export function quickSort(
  arr: number[], 
  callback?: (info: PartitionInfo) => void, 
  depth = 0, 
): number[] {
    // Return if Array is 0-1 elements.
    if (arr.length <= 1) {
        return arr;
    }
    // Choose a random pivot. 
    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];
    
    // Partition.
    const left: number[] = [];
    const equal: number[] = [];
    const right: number[] = [];

    // Do the sort. 
    for (const element of arr) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }

    // Call the callback with partition information
    if (callback) {
        callback({
            array: [...arr],
            pivot,
            pivotIndex: pivotIndex,
            left: [...left],
            equal: [...equal],
            right: [...right],
            depth,
        });
    }

    // Run Recursively with updated depth and parent ID
    const sortedLeft = quickSort(left, callback, depth + 1);
    const sortedRight = quickSort(right, callback, depth + 1);
    
    return [...sortedLeft, ...equal, ...sortedRight];
}
