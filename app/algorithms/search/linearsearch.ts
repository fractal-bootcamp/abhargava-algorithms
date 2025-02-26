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

export default linearSearch;