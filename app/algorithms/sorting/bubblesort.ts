//
// Bubble Sort
// 

export type BubbleSortInfo = {
    array: number[];
    swap: boolean;
}

export function bubbleSort(arr: number[], callback?: (info: BubbleSortInfo) => void): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    // Structured Clone
    const arrCopy = structuredClone(arr)

    // Outer loop for 1th indexed item
    for (let i = 1; i < arrCopy.length; i++){
        let swap = false;
        // Inner loop for the 0th indexed item to the 2nd last element
        for (let j = 0; j < arrCopy.length - i; j++){
            // If the 1st number (in J loop) is less than the 2nd number
            if (arrCopy[j + 1] < arrCopy[j]) {
                // Change the order of the numbers.
                [arrCopy[j], arrCopy[j+1]] = [arrCopy[j+1], arrCopy[j]]
                swap = true
                callback?.({ array: arrCopy, swap: true })
            }
        }
        if (!swap) {
            callback?.({ array: arrCopy, swap: false })
            return arrCopy
        }
    }
    return arrCopy;
}