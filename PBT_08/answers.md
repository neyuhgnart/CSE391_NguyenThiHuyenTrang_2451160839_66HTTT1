## PHẦN A — KIỂM TRA ĐỌC HIỂU 
### Câu A1 — Function Declaration vs Expression vs Arrow
Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
1. Function Declaration
```js
function tinhThueBaoHiem(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
}

2. Function Expression
const tinhThueBaoHiem = function(luong) {
    let thue = 0;
    if (luong > 11000000) {
        thue = luong * 0.1;
    }
    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};

3. Arrow Function
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```
- 3 cách này có sự khác biệt rất lớn về cơ chế Hoisting:
+ Function Declaration: có hoisting. Trình biên dịch JavaScript tự động "đẩy" toàn bộ định nghĩa hàm lên đầu phạm vi trước khi chạy code. Vì vậy, bạn có thể gọi hàm trước khi khai báo nó mà không gặp bất kỳ lỗi nào
+ Function Expression & Arrow Function: không có hoisting. Bản chất của 2 cách này là gán hàm vào một biến (được khai báo bằng const hoặc let). Biến dẫu có được đưa vào vùng nhớ nhưng nằm trong vùng chết tạm thời (Temporal Dead Zone). Do đó, bạn bắt buộc phải khai báo hàm trước, rồi mới được phép gọi sử dụng

vd code minh họa với Function Declaration: 
```js
console.log(tinhThueBaoHiemDeclaration(15000000)); 
function tinhThueBaoHiemDeclaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}

Minh họa với Function Expression & Arrow Function:
console.log(tinhThueBaoHiemArrow(15000000)); 
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```


### Câu A2 — Scope & Closure
```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // Output: 1
console.log(c.increment());  // Output: 2
console.log(c.increment());  // Output: 3
console.log(c.decrement());  // Output: 2
console.log(c.getCount());   // Output: 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms:
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```
* `var` và `let` cho kết quả khác nhau trong vòng lặp setTimeout vì:
- Với vòng lặp dùng var:
+ Phạm vi (Scope): Từ khóa var có phạm vi hàm hoặc toàn cục (function-scoped / global-scoped), nó không có phạm vi khối lệnh (block scope). Do đó, trong suốt 3 lượt lặp của vòng lặp for, JavaScript chỉ tạo ra đúng 1 biến i duy nhất nằm ở phạm vi bên ngoài vòng lặp
+ Cơ chế chạy: Hàm setTimeout là tác vụ bất đồng bộ, nó sẽ ném các hàm console.log vào hàng đợi và đợi ít nhất 100ms sau mới chạy. Trong lúc đó, vòng lặp for chạy bằng tốc độ máy tính và kết thúc ngay lập tức. Sau khi kết thúc, biến i chung đã bị tăng lên đến giá trị 3
+ Kết quả: Khi hết 100ms, cả 3 hàm callback đồng loạt kích hoạt. Do tính chất Closure, chúng cùng tham chiếu về một biến i chung duy nhất lúc này đã bằng 3. Vì vậy, màn hình in ra 3 lần var: 3

- Với vòng lặp dùng let:
+ Phạm vi (Scope): Từ khóa let có phạm vi khối lệnh (block-scoped). Điều này nghĩa là ở mỗi lượt lặp của vòng lặp for, JavaScript sẽ tự động khởi tạo một biến j hoàn toàn mới, độc lập và nằm riêng biệt trong phạm vi của lượt lặp đó
+ Cơ chế chạy: Vòng lặp chạy 3 lần, tạo ra 3 biến j riêng biệt lưu giữ 3 giá trị tại thời điểm đó: j_lượt0 = 0, j_lượt1 = 1, j_lượt2 = 2
+ Kết quả: Khi hết 200ms, 3 hàm callback của setTimeout thực thi. Nhờ tính chất Closure, mỗi hàm callback đã tự "đóng gói" và ghi nhớ chính xác biến j riêng của lượt lặp tương ứng với nó. Do đó, màn hình in ra đúng thứ tự ban đầu: let: 0, let: 1, let: 2


### Câu A3 — Array Methods
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const tripled = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const total = nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allOver0 = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const descriptions = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse();


### Câu A4 — Object Destructuring & Spread
```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // Output: iPhone 16 25990000 8 Titan
console.log(specs);                     // Output: ReferenceError: specs is not defined

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // Output: 23990000
console.log(updated.sale);             // Output: true
console.log(product.price);            // Output: 25990000 (gốc không đổi)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16
```
- Giải thích vì sao lại là 16: toán tử spread chỉ tạo bản sao nông (shallow copy). Object specs bên trong vẫn được tham chiếu chung giữa product và copy. Khi thực hiện: `copy.specs.ram = 16;`
thì thuộc tính ram trong object specs chung bị thay đổi. Vì vậy: `product.specs.ram` cũng trở thành: 16


## PHẦN C — SUY LUẬN 
### Câu C1 — Refactor Code
Viết lại thành ≤ 10 dòng dùng `filter`, `map`, `sort`, destructuring, arrow functions:
```js
const processOrders = (orders) => 
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id, customer, total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Câu C2 — Thiết kế API
```js
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let hasInitialValue = initialValue !== undefined;
        let accumulator = hasInitialValue ? initialValue : arr[0];
        let startIndex = hasInitialValue ? 0 : 1;

        if (arr.length === 0 && !hasInitialValue) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

console.log("Test Map");
console.log(miniArray.map([1, 2, 3], x => x * 2));      

console.log("\nTest Filter");
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));     

console.log("\nTest Reduce");
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
```

