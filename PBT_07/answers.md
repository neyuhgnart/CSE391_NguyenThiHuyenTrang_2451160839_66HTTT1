## PHẦN A — KIỂM TRA ĐỌC HIỂU 
### Câu A1 — var / let / const
```javascript
// Đoạn 1
console.log(x);
var x = 5;
- Dự đoán output: undefined

// Đoạn 2
console.log(y);
let y = 10;
- Dự đoán output: ReferenceError: Cannot access 'y' before initialization

// Đoạn 3
const z = 15;
z = 20;
console.log(z);
- Dự đoán output: TypeError: Assignment to constant variable

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
- Dự đoán output: [1, 2, 3, 4]


// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
- Dự đoán output: 
Trong block: 2
Ngoài block: 1
```
- Giải thích kết quả:
+ Đoạn 1: Biến var được hoisting nên có thể truy cập trước khi khai báo, nhưng giá trị ban đầu là undefined
+ Đoạn 2: Biến let nằm trong Temporal Dead Zone (TDZ), nên truy cập trước khi khởi tạo sẽ gây ReferenceError
+ Đoạn 3: Biến const không cho phép gán lại giá trị sau khi được khởi tạo, nên phát sinh TypeError
+ Đoạn 4: Mặc dù const không cho phép gán lại biến, nhưng vẫn cho phép thay đổi nội dung của mảng hoặc object mà biến đó tham chiếu tới
+ Đoạn 5: let có phạm vi khối (block scope), vì vậy biến a bên trong khối {} là một biến khác với biến a bên ngoài


### Câu A2 — Data Types & Coercion
```javascript
console.log(typeof null);         => "object"
console.log(typeof undefined);    => "undefined"
console.log(typeof NaN);          => "number"
console.log("5" + 3);             => "53"
console.log("5" - 3);             => 2
console.log("5" * "3");           => 15
console.log(true + true);         => 2
console.log([] + []);             => ""
console.log([] + {});             => "[object Object]"
console.log({} + []);             => 0
```
- Giải thích `"5" + 3` và `"5" - 3` cho kết quả khác nhau vì:
+ Dấu + vừa có chức năng cộng số vừa có chức năng nối chuỗi
+ Khi một toán hạng là chuỗi, JavaScript ưu tiên nối chuỗi
Nên: "5" + 3 => "5" + "3" => "53"
Ngược lại, dấu - chỉ có chức năng toán học, nên:
"5" - 3 => 5 - 3 => 2


### Câu A3 — So sánh == vs ===
```javascript
console.log(5 == "5");                => true
console.log(5 === "5");               => false
console.log(null == undefined);       => true
console.log(null === undefined);      => false
console.log(NaN == NaN);              => false
console.log(0 == false);              => true
console.log(0 === false);             => false
console.log("" == false);             => true
```
**Quy tắc:** Từ giờ trở đi, bạn nên dùng `==` hay `===`? Tại sao?
- Nên dùng `===` vì: chúng không thực hiện ép kiểu ngầm, giúp chương trình rõ ràng, dễ hiểu và tránh các lỗi không mong muốn khi so sánh dữ liệu


### Câu A4 (5đ) — Truthy & Falsy
- Tất cả các giá trị Falsy trong JavaScript:
false
0
-0
0n (BigInt)
"" (chuỗi rỗng)
null
undefined
NaN

```javascript
if ("0") console.log("A");           // In A
if ("") console.log("B");            // Không in
if ([]) console.log("C");            // In C
if ({}) console.log("D");            // In D
if (null) console.log("E");          // Không in
if (0) console.log("F");             // Không in
if (-1) console.log("G");            // In G
if (" ") console.log("H");           // In H
```


### Câu A5 — Template Literals
Viết lại 3 cách nối chuỗi sau bằng **template literal** (backtick):
```javascript
// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
=> var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
=> var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
=> var html = `<div class="card"> 
                    <h2>${title}</h2> 
                    <p>${description}</p> 
                    <span>Giá: ${price}đ</span> 
                </div> `;
```

## PHẦN C — SUY LUẬN 
### Câu C1 — Debug JavaScript
1. Lỗi dùng nhầm toán tử gán = trong câu lệnh if (Dòng 9): if (giaSauGiam = 0)
- Giải thích: Thay vì so sánh, bạn đang thực hiện gán giá trị 0 cho biến giaSauGiam. Trong JavaScript, biểu thức gán này trả về 0 (một giá trị Falsy), khiến khối lệnh if bên trong không bao giờ được chạy, đồng thời làm mất đi giá trị thực tế của giaSauGiam
- Sửa lại: if (giaSauGiam === 0)

2. Lỗi truyền sai kiểu dữ liệu (String thay vì Number) (Dòng 17): tinhGiaGiamGia("100000", 20)
- Giải thích: Giá trị "100000" đang là một chuỗi (String). Dù JavaScript có cơ chế ép kiểu ngầm giúp phép tính toán không bị lỗi ngay lập tức, nhưng việc truyền sai kiểu dữ liệu rất dễ gây ra các bug toán học nghiêm trọng về sau và làm code thiếu minh bạch
- Sửa: tinhGiaGiamGia(100000, 20)

3. Lỗi logic không kiểm tra đầu vào của giaBan (Dòng 1): hàm chỉ kiểm tra phanTramGiam mà bỏ qua điều kiện của giaBan
- Giải thích: Nếu người dùng truyền vào giaBan là một số âm (ví dụ: -50000), hàm vẫn tính toán bình thường, dẫn đến kết quả vô lý
- Sửa: bổ sung điều kiện kiểm tra giaBan < 0 ở đầu hàm

4. Lỗi thiếu dấu chấm phẩy ";" 
- Giải thích: Mặc dù JavaScript có cơ chế tự động chèn dấu chấm phẩy (ASI), nhưng việc thiếu dấu chấm phẩy rất dễ gây ra lỗi biên dịch khi gộp/nén code (minify) hoặc khi viết các câu lệnh phức tạp liên tiếp
- Sửa: thêm ; vào cuối các câu lệnh đơn

5. Lỗi: sử dụng từ khóa cũ var cho biến nội bộ (Dòng 7): var giamGia = ...
- Giải thích: Từ khóa var có cơ chế hoisting và phạm vi hàm (function-scoped), dễ gây rò rỉ biến ra ngoài khối lệnh ({})
- Sửa: Thay thế hoàn toàn bằng let hoặc const => const giamGia = ...

6. Lỗi "ẩn": `var` trong vòng lặp setTimeout (Dòng 23)
- Giải thích: Từ khóa var không có phạm vi khối (block-scope), do đó biến i trong vòng lặp for thực chất là một biến toàn cục duy nhất được dùng chung cho cả 5 lần lặp. Hàm setTimeout là một tác vụ bất đồng bộ (Asynchronous). Nó sẽ đợi đúng 1000ms (1 giây) sau mới chạy hàm console.log. Trong 1 giây chờ đợi đó, vòng lặp for đã chạy xong từ lâu và đẩy giá trị của biến i chung lên đến 5 (điều kiện dừng 5 < 5 là sai). Khi hết 1 giây, cả 5 hàm setTimeout đồng loạt kích hoạt và chúng cùng nhìn vào biến i chung lúc này đã bằng 5. Do đó, màn hình in ra 5 lần chữ Item 5
- Sửa bằng `let`:
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}












