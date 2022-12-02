import raw_input from './input.js';

const elfWiseCalories = cook(raw_input);

console.log(getMaxTotalCalories(elfWiseCalories).calories); // 1st
console.log(top3TotalCalories(elfWiseCalories).sum); // 2nd

// Ans1: returns { calories, ofElf (elve's index) }
function getMaxTotalCalories(elvesCalories) {
    let maxTotalCalories = 0;
    let elfIndex = 0;
    
    for (let calories_i in elvesCalories) {
        let calories = elvesCalories[calories_i];
        let totalCalories = sumOfAllCalories(calories);
        
        if (totalCalories > maxTotalCalories) {
            maxTotalCalories = totalCalories;
            elfIndex = calories_i;
        };
    };
    
    return {calories: maxTotalCalories, ofElf: +elfIndex};
};

// Ans2: returns { sum, arr } 
function top3TotalCalories(elvesCalories, arr = []) {
    let top3 = arr;
    let maxCalories = getMaxTotalCalories(elvesCalories);
    top3.push(maxCalories.calories);
    
    if (top3.length === 3) {
        return {sum: sumOfAllCalories(top3), arr: top3 };
    };
    
    // the current max elf will be excluded from calculations
    elvesCalories.splice(maxCalories.ofElf 1);
    
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
