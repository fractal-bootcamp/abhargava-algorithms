//
// Merge Sort
//

function splitInHalf(arr: number[]): [number[], number[]]{
    const halfWay = Math.ceil(arr.length / 2);
    const leftHalf = arr.slice(0, halfWay)
    const rightHalf = arr.slice(halfWay)
    return [leftHalf, rightHalf]
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Compare elements from both arrays and add the smaller one to result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            // Update the left pointer
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            // Update the right pointer
            rightIndex++;
        }
    }
    
    // Add any remaining elements from the left array
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }
    
    // Add any remaining elements from the right array
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }
    
    return result;
}

function mergeSort(arr: number[]): number[] {
    // Return if array is 0-1 elements
    if (arr.length <= 1) {
        return arr;
    }
    
    // Get halved arrays
    const [left, right] = splitInHalf(arr);

    return merge(
        mergeSort(left),
        mergeSort(right),
    )
}

const arr2 = [3, 6, 8, 10, 1, 2, 1, 4, 9, 10, 20, 25];
const mergedSortArray = mergeSort(arr2);
console.log(mergedSortArray);