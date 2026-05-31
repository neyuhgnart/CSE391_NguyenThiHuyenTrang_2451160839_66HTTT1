## PHẦN A — KIỂM TRA ĐỌC HIỂU 
### Câu A1 — DOM Tree
1. Vẽ DOM tree (sơ đồ cây) cho HTML trên:
document
└── div#app
    ├── header
    │   ├── h1
    │   │   └── text: "Todo App"
    │   └── nav
    │       ├── a.active (href="#")
    │       │   └── text: "All"
    │       ├── a (href="#")
    │       │   └── text: "Active"
    │       └── a (href="#")
    │           └── text: "Completed"
    └── main
        ├── form#todoForm
        │   ├── input#todoInput (type="text")
        │   └── button (type="submit")
        │       └── text: "Add"
        └── ul#todoList
            ├── li.todo-item
            │   └── text: "Learn HTML"
            └── li.todo-item.completed
                └── text: "Learn CSS"

2. Viết **querySelector** cho mỗi yêu cầu:
   - Chọn thẻ `<h1>`: const title = document.querySelector("h1");
   - Chọn input trong form: const todoInput = document.querySelector("#todoForm input");
   - Chọn tất cả `.todo-item`: const allTodoItems = document.querySelectorAll(".todo-item");
   - Chọn link đang active: const activeLink = document.querySelector("nav a.active");
   - Chọn `<li>` đầu tiên trong `#todoList`: 
   const firstTodoItem = document.querySelector("#todoList li");
   - Chọn tất cả `<a>` bên trong `<nav>`: const navLinks = document.querySelectorAll("nav a");


### Câu A2 — innerHTML vs textContent
Giải thích sự khác nhau. Cho ví dụ khi nào dùng mỗi cái:
- innerHTML:
+ Cơ chế hoạt động: đọc hoặc ghi toàn bộ mã HTML bên trong phần tử. Trình duyệt sẽ parse chuỗi thành các thẻ DOM
+ Tốc độ xử lý: chậm hơn (vì trình duyệt phải phá hủy DOM cũ, parse chuỗi HTML mới)
+ Độ an toàn: nguy hiểm nếu chèn dữ liệu chưa được kiểm duyệt từ người dùng
- Vd: khi muốn render danh sách sản phẩm từ một mảng dữ liệu có sẵn
```html
<ul id="product-list">
    </ul>
```
```js
const products = [
    { id: 101, name: "iPhone 16", price: 25990000 },
    { id: 102, name: "MacBook Pro", price: 45990000 },
    { id: 103, name: "AirPods Pro", price: 6990000 }
];
const productListContainer = document.querySelector("#product-list");

productListContainer.innerHTML = products.map(product => `
    <li class="product-item" data-id="${product.id}">
        <span class="prod-name">${product.name}</span>
        <strong class="prod-price">${product.price.toLocaleString("vi-VN")}đ</strong>
        <button class="add-to-cart-btn">Thêm vào giỏ</button>
    </li>
`).join("");
```

- textContent:
+ Cơ chế hoạt động: chỉ đọc hoặc ghi văn bản thuần túy (text literal). Bỏ qua toàn bộ thẻ HTML
+ Tốc độ xử lý: nhanh hơn (vì trình duyệt không mất công phân tích cú pháp HTML)
+ Độ an toàn: an toàn tuyệt đối với dữ liệu từ người dùng gõ vào
- Vd: khi muốn cập nhật số lượng sản phẩm trong giỏ hàng và hiển thị thông báo lỗi khi nhập trống
```html
<div class="cart-box">
    Giỏ hàng: <span id="cart-count">0</span> sản phẩm
</div>

<input id="username-input" type="text" placeholder="Nhập tên của bạn">
<p id="error-message"></p>
```
```js
//Cập nhật số lượng giỏ hàng
const countEl = document.querySelector("#cart-count");
let totalQuantity = 5; 
countEl.textContent = totalQuantity; 
// Hiển thị thông báo lỗi 
const errorEl = document.querySelector("#error-message");
const inputEl = document.querySelector("#username-input");
if (inputEl.value.trim() === "") {
    errorEl.textContent = "Lỗi: Tên người dùng không được để trống!";
}
```

**Câu hỏi bảo mật:** Tại sao `innerHTML` có thể gây lỗ hổng **XSS**? Viết 1 ví dụ code minh họa:
- Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi kẻ tấn công lừa trình duyệt thực thi các đoạn mã độc JavaScript trong ngữ cảnh trang web của bạn. Khi bạn truyền một chuỗi có chứa các thẻ HTML đặc biệt (như <script> hoặc các thẻ có thuộc tính bắt sự kiện như onerror, onload) vào innerHTML, trình duyệt sẽ hiểu nhầm đó là lệnh thiết kế giao diện hợp pháp từ lập trình viên. Nó sẽ lập tức đưa đoạn mã đó vào cây DOM và kích hoạt thực thi mã JavaScript độc hại đó ngay trên máy của nạn nhân. Hậu quả là kẻ tấn công có thể đánh cắp Cookie, Token, session hoặc điều hướng trang web
- Vd code minh hoạ:
```html
<input type="text" id="search-input" placeholder="Nhập từ khóa tìm kiếm...">
<button id="search-btn">Tìm kiếm</button>
<div id="search-result">
    </div>
```
```js
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resultContainer = document.querySelector("#search-result");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value; 
    resultContainer.innerHTML = `Bạn vừa tìm kiếm từ khóa: <b>${query}</b>`;
});
```
```html
<img src="duong-dan-loi.jpg" onerror="alert('Trang web đã bị tấn công XSS!')">
```

```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
// Sửa:
document.querySelector("#result").textContent = userInput;
```


### Câu A3 — Event Bubbling
- Khi click vào button, output = 
BUTTON
INNER
OUTER
- Nếu uncomment `stopPropagation()`, output = BUTTON


## PHẦN C — DEBUG & PHÂN TÍCH 
### Câu C1 — Debug DOM Code
1. li.addEventListener("click", ...)
Sửa: xóa listener inline này đi, chuyển sang bind duy nhất 1 lần tại #history

2. addEventListener("onclick", ...) 
Sửa: thay "onclick" bằng "click"

3. countDisplay = count; (trong #resetBtn)
Sửa: gán qua thuộc tính: countDisplay.textContent = count;

4. countDisplay.innerHTML = ...
Sửa: thay .innerHTML bằng .textContent

5. historyList.innerHTML = null;
Sửa: thay bằng chuỗi rỗng: historyList.innerHTML = "";

6. item.remove; (trong #clearHistory)
Sửa: item.remove();

7. localStorage.getItem("count") (khi Load)
Sửa: ép kiểu số: Number(localStorage.getItem("count")) || 0

8. localStorage.setItem("history", ...)
Sửa: tạo một mảng historyData = [] độc lập để lưu chuỗi chữ và render


### Câu C2 — Performance
1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là **BAD PRACTICE**? Event Delegation giải quyết thế nào?
- bind event lên 1000 elements riêng lẻ là BAD PRACTICE vì:
+ Tốn bộ nhớ (Memory Consumption): Mỗi lần bạn gọi addEventListener, trình duyệt phải khởi tạo và duy trì một đối tượng hàm (Event Listener Object) trong bộ nhớ RAM. Bind cho 1000 phần tử đồng nghĩa với việc tạo ra 1000 đối tượng độc lập, gây lãng phí tài nguyên nghiêm trọng
+ Giảm hiệu năng và tốc độ khởi chạy: Trình duyệt mất nhiều thời gian hơn để duyệt qua vòng lặp và đăng ký listener khi trang web vừa tải xong
+ Khó quản lý dữ liệu động (CRUD): Khi bạn thêm mới phần tử thứ 1001 vào DOM, bạn lại phải viết code bind event cho riêng nó. Ngược lại, khi xóa phần tử, nếu không gỡ bỏ listener (removeEventListener) một cách cẩn thận, nó sẽ gây ra hiện tượng Memory Leak (Rò rỉ bộ nhớ)

- Giải pháp từ Event Delegation:
Thay vì bắt từng phần tử con làm việc, Event Delegation tận dụng cơ chế Event Bubbling (Sự kiện nổi bọt). Chúng ta chỉ cần gắn 1 listener duy nhất lên một phần tử cha bọc ngoài (chẳng hạn như thẻ <ul>, <div> cha hoặc thậm chí là document.body). Khi bất kỳ phần tử con nào bị click, sự kiện sẽ tự động nổi bọt (bay ngược lên) qua các tầng cha. Tại thẻ cha, chúng ta chỉ cần dùng thuộc tính e.target kết hợp với hàm .closest() hoặc kiểm tra .classList để nhận diện chính xác phần tử con nào vừa được tương tác và xử lý logic cho nó.

2. Cho code:
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
```
Refactor dùng `DocumentFragment` để chỉ gây 1 lần reflow. Nhanh hơn vì:
- DocumentFragment hoạt động giống như một "vùng nhớ nháp" hoặc một chiếc khay chứa tạm thời. Nó là một nút DOM tối giản, không có phần tử cha và quan trọng nhất: Nó không nằm trên cây DOM thật của trình duyệt
- Do đó, khi bạn thực hiện thêm 1000 phần tử con vào bên trong fragment, trình duyệt hoàn toàn không phải tính toán hay vẽ lại bất cứ thứ gì trên màn hình (0 lần Reflow). Đến cuối cùng, khi bạn append fragment vào document.body, trình duyệt sẽ trút toàn bộ các thẻ con bên trong chiếc khay đó vào trang web cùng một lúc. Trình duyệt chỉ mất đúng 1 lần duy nhất để tính toán lại layout hiển thị cho toàn bộ 1000 phần tử đó





