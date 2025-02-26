//
// Insertion Sort
//

export type InsertionSortInfo = {       
    array: number[];
    currentIndex: number;
    previousIndex: number;
}

export default function insertSort(arr: number[], callback?: (info: InsertionSortInfo) => void): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const arrCopy = structuredClone(arr)

    // For every ahead of previous item in the array. 
    for (let b = 1; b < arrCopy.length; b++) {
        // This is the index for the bth item, e.g. the one before the i'th value
        let a = b - 1
        
        // Store the current element that needs to be inserted
        const currentElement = arrCopy[b]

        // 
        while (a >= 0 && currentElement < arrCopy[a] ) {
           // Push the before item forward
           arrCopy[a + 1] = arrCopy[a]
           // Decrement the tracker for the "a"th item. 
           a = a - 1
        }
        // Set the item where "a" has landed at to be the value at "b"
        arrCopy[a + 1] = currentElement
        callback?.({ array: arrCopy, currentIndex: b, previousIndex: a })
    }
    return arrCopy;
}

const visualizeInsertionSort = (arr: number[]) => {
    const steps: InsertionSortInfo[] = [];
    const collectSteps = (info: InsertionSortInfo) => {
        steps.push({ ...info, array: [...info.array] });
    };
    insertSort([...arr], collectSteps);
    return steps;
}

const arr3 = [3, 6, 8, 10, 1, 2, 1, 4, 9, 10, 20, 25];

const result = visualizeInsertionSort(arr3);
console.log(result);