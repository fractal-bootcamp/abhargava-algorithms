//
// Insertion Sort
//

function insertSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    // For every ahead of previous item in the array. 
    for (let b = 1; b < arr.length; b++) {
        // This is the index for the bth item, e.g. the one before the i'th value
        let a = b - 1
        
        // Store the current element that needs to be inserted
        const currentElement = arr[b]

        // 
        while (a >= 0 && currentElement < arr[a] ) {
           // Push the before item forward
           arr[a + 1] = arr[a]
           // Decrement the tracker for the "a"th item. 
           a = a - 1
        }
        
        // Set the item where "a" has landed at to be the value at "b"
        arr[a + 1] = currentElement
    }
    return arr;
}

const arr3 = [3, 6, 8, 10, 1, 2, 1, 4, 9, 10, 20, 25];

const result = insertSort(arr3)
console.log(result)

