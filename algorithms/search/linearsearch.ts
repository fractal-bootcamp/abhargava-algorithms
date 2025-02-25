//
// Linear Search
//

function linearSearch(arr: number[], value: number): number {
    const arrCopy = structuredClone(arr)
    // Find the value in the array. 
    for (let i = 0; i < arr.length; i++){
        if (arrCopy[i] === value) {
            return i
        }
    }
    return -1
}

// Example usage
const numbers = [5, 12, 8, 130, 44];

console.log(linearSearch(numbers, 12)); // Output: 1
console.log(linearSearch(numbers, 130)); // Output: 3
console.log(linearSearch(numbers, 10)); // Output: -1 (not found)

