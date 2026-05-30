console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===");

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(`${i}: FizzBuzz`); 
    } else if (i % 3 === 0) {
        console.log(`${i}: Fizz`);
    } else if (i % 5 === 0) {
        console.log(`${i}: Buzz`);
    } else {
        console.log(i);
    }
}


console.log("=== VERSION 2: CUSTOM FIZZBUZZ ===");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let resultStr = ""; 

        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            if (i % rule.divisor === 0) {
                resultStr += rule.word; 
            }
        }

        if (resultStr === "") {
            console.log(i); 
        } else {
            console.log(`${i} = "${resultStr}"`); 
        }
    }
}

customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);