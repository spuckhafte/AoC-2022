import raw_input from './input.js';

const elveWiseCalories = cook(raw_input);

console.log(getMaxTotalCalories(elveWiseCalories).calories); // 1st
console.log(top3TotalCalories(elveWiseCalories).sum); // 2nd

// Ans1: returns { calories, ofElve (elve's index) }
function getMaxTotalCalories(elvesCalories) {
    let maxTotalCalories = 0;
    let elveIndex = 0;
    
    for (let calories_i in elvesCalories) {
        let calories = elvesCalories[calories_i];
        let totalCalories = sumOfAllCalories(calories);
        
        if (totalCalories > maxTotalCalories) {
            maxTotalCalories = totalCalories;
            elveIndex = calories_i;
        };
    };
    
    return {calories: maxTotalCalories, ofElve: +elveIndex};
};

// Ans2: returns { sum, arr } 
function top3TotalCalories(elvesCalories, arr = []) {
    let top3 = arr;
    let maxCalories = getMaxTotalCalories(elvesCalories);
    top3.push(maxCalories.calories);
    
    if (top3.length === 3) {
        return {sum: sumOfAllCalories(top3), arr: top3 };
    };
    
    // the current max elve will be excluded from calculations
    elvesCalories.splice(maxCalories.ofElve, 1);
    
    return top3TotalCalories(elvesCalories, top3);
}

function sumOfAllCalories(calArray) {
    return calArray.reduce(
        (prev, currentCalorie) => +prev + +currentCalorie, 0
    );
}

function cook(raw) {
    return raw.split('\n\n').map(inp => inp.split('\n'));
}
