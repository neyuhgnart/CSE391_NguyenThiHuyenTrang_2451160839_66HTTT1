// 1. pipe() — Nối chuỗi functions 
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((currentValue, currentFn) => currentFn(currentValue), initialValue);
    };
}

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key]; 
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId = null;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    let attempts = 0;
    while (attempts < maxAttempts) {
        try {
            attempts++;
            return await fn(); 
        } catch (error) {
            if (attempts >= maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn thất bại: ${error.message}`);
            }
            console.log(`Lần thử ${attempts} thất bại. Đang thử lại...`);
        }
    }
}

console.log("=== TEST 1: PIPE ===");
const processInput = pipe(
    x => x * 2,         
    x => x + 10,        
    x => x.toString(),  
    x => "Kết quả: " + x
);
console.log(processInput(5)); 

console.log("\n=== TEST 2: MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("Chạy lần 1:");
console.log(expensiveCalc(1000000)); 

console.log("Chạy lần 2 (Lấy từ Cache):");
console.log(expensiveCalc(1000000)); 


console.log("\n=== TEST 3: DEBOUNCE ===");
const search = debounce((query) => {
    console.log("[API Call] Searching:", query);
}, 500);

search("j");
search("java");
search("javascr");
search("javascript"); 

let networkCount = 0;
const mockFetchData = () => {
    return new Promise((resolve, reject) => {
        networkCount++;
        if (networkCount < 3) {
            reject(new Error("Lỗi mất kết nối mạng Gateway Timeout"));
        } else {
            resolve({ status: 200, data: "Dữ liệu máy chủ HT" });
        }
    });
};

setTimeout(async () => {
    console.log("\n=== TEST 4: RETRY ===");
    try {
        const result = await retry(mockFetchData, 3);
        console.log("Thành công!", result);
    } catch (err) {
        console.error("Thất bại!", err.message);
    }
}, 600); 