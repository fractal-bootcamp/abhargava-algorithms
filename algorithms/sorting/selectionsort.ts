//
// Selection Sort
//

function selectionSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    // Structured Clone
    const arrCopy = structuredClone(arr)

    for (let i = 0; i < arrCopy.length - 1; i++) {
        let currMinimum = i;
        
        // Find the minimum element in the unsorted portion
        for (let j = i + 1; j < arrCopy.length; j++) {
            if (arrCopy[j] < arrCopy[currMinimum]) {
                currMinimum = j;
            }
        }
        
        // Swap the found minimum element with the first element of unsorted portion
        if (currMinimum !== i) {
            [arrCopy[i], arrCopy[currMinimum]] = [arrCopy[currMinimum], arrCopy[i]];
        }
    }
    
    return arrCopy;
}


console.log(selectionSort([3, 6, 8, 10, 1, 2, 1, 4, 9, 10, 20, 25]))
