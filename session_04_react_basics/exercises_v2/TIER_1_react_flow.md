## 📝 Bài 1.1 — Component render lần đầu (8 phút)
### Câu hỏi
1. Tại sao component chỉ render 1 lần?
Vì khi ứng dụng khởi chạy, React chỉ cần gọi hàm LifecycleDemo() một lần để lấy cấu trúc JSX ban đầu, biên dịch nó thành phần tử DOM thật và gắn (Mount) lên màn hình. Khi không có bất kỳ yếu tố nào kích thích làm thay đổi dữ liệu, React sẽ giữ nguyên giao diện đó.

2. Khi nào nó sẽ render lại?
Component sẽ render lại khi xảy ra một trong các trường hợp sau:
- Trạng thái nội bộ của nó thay đổi (Gọi hàm thay đổi trạng thái của useState).
- Dữ liệu truyền từ component cha vào thay đổi (Props thay đổi).
- Component cha bọc ngoài nó bị ép buộc phải re-render.


## 📝 Bài 1.2 — Biến "bình thường" vs useState (12 phút)
1. Chạy `BadCounter` → nhấn nút → thấy gì?
- Màn hình: Số hiển thị bộ đếm giữ nguyên là 0, không hề thay đổi.
- Console: Log giá trị vẫn tăng đều đặn Count: 1, Count: 2, Count: 3... khi bạn nhấn nút.

2. Chạy `GoodCounter` → nhấn nút → thấy gì?
Màn hình: Số trên giao diện lập tức nhảy tăng tiến theo mỗi lần click chuột (1, 2, 3...).
