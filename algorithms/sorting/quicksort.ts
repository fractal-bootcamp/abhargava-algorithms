//
// Quick Sort
//


const arr = [3, 6, 8, 10, 1, 2, 1, 4, 9, 10, 20, 25];

type SortLeaf = {
    value: number;
    left: SortLeaf | null;
    right: SortLeaf | null;
    array: number[];
}

function quickSort(arr: number[]): number[] {
    // Return if Array is 0-1 elements.
    if (arr.length <= 1) {
        return arr;
        // return {
        //     root: {
        //         value: arr[0],
        //         left: null,
        //         right: null,
        //         array: arr,
        //     }
        // };
    }

    // Choose a random pivot. 
    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];
    
    // Partition.
    const left = [];
    const equal = [];
    const right = [];

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

    // Run Recursively. 
    return [...quickSort(left), ...equal, ...quickSort(right)]

    // return {
    //     root: {
    //         value: pivot,
    //         left: quickSort(left),
    //         right: quickSort(right),
    //         array: [...quickSort(left), ...equal, ...quickSort(right)],
    //     }
    // };
}

const sortedArr = quickSort(arr);
console.log("QuickSort", sortedArr);

