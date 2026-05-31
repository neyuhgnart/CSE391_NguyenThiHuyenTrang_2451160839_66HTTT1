1. Ở **Phần A**, mỗi lần thêm/xóa/toggle 1 todo, bạn phải gọi bao nhiêu hàm? Liệt kê.
Mỗi khi có bất kỳ thao tác thay đổi dữ liệu nào xảy ra (`addTodo`, `toggleTodo`, `deleteTodo`), hệ thống phải gọi **tối thiểu 2 hàm**:
- **Hàm xử lý sự kiện/logic:** Chính nó (`addTodo()`, `toggleTodo(id)`, hoặc `deleteTodo(id)`) để thay đổi nội dung của mảng dữ liệu `todos`.
- **Hàm cập nhật giao diện:** Bắt buộc phải gọi thủ công hàm `renderTodos()` ở ngay cuối đoạn logic.

2. Ở **Phần B**, khi `setTodos(...)` chạy, React tự động làm gì giúp bạn?
Khi hàm kích hoạt trạng thái `setTodos(...)` được thực thi, bạn không cần phải gọi bất kỳ hàm render nào nữa. Thay vào đó, React sẽ tự động vận hành một chu trình khép kín giúp bạn:
1. Ghi nhận giá trị mới của trạng thái `todos`.
2. Tự động chạy lại (re-run) component `TodoApp` để tính toán ra một cấu trúc giao diện mới (Virtual DOM mới).
3. React đối chiếu cây Virtual DOM mới này với cây Virtual DOM ngay trước đó để tìm ra chính xác điểm khác biệt (ví dụ: chỉ có 1 thẻ `<div>` vừa được thêm vào hoặc 1 class `.done` vừa được cập nhật).
4. Thay vì xóa sạch và vẽ lại từ đầu bằng `innerHTML = ""` (gây tốn hiệu năng), React chỉ can thiệp và thay đổi đúng node phần tử HTML cụ thể ngoài giao diện thực tế (Real DOM).

3. Nếu Portfolio của Minh có 50 project, cách nào quản lý danh sách an toàn hơn? Tại sao?
Khi quy mô ứng dụng tăng lên 50 projects (hoặc nhiều hơn), quản lý bằng **React (State-driven UI)** an toàn và tối ưu hơn vượt trội so với Vanilla JS vì:
- **Bảo vệ hiệu năng trình duyệt:** Thao tác gán `innerHTML` liên tục trên diện rộng buộc trình duyệt phải tính toán lại toàn bộ kích thước, hình khối hình học của trang (`Reflow`) và vẽ lại giao diện (`Repaint`), gây hiện tượng giật lag cực kỳ rõ rệt. React giải quyết điều này bằng Virtual DOM.
- **Tránh bẫy logic (Single Source of Truth):** Trong React, dữ liệu là nguồn chân lý duy nhất. Bạn chỉ cần tập trung tư duy: *"Mảng dữ liệu của tôi đang có gì?"*, giao diện tự động chạy theo dữ liệu đó. Bạn không cần phải viết code dò tìm phần tử qua ID, xóa class, thêm class thủ công cho 50 phần tử.
- **An toàn bảo mật:** `innerHTML` của Vanilla JS mở ra lỗ hổng tấn công chèn mã độc `XSS` (Cross-Site Scripting) nếu chuỗi nhập vào chứa mã script độc hại. Trong khi đó, JSX của React mặc định tự động mã hóa (escape) tất cả các giá trị trước khi render, giúp ứng dụng an toàn hơn.

4. **Kết nối Portfolio:** Tưởng tượng `ProjectCard` thay cho `TodoItem` — mỗi project cũng cần hiển thị, lọc theo category, xóa bỏ. Bạn thấy `useState` + `.map()` + `.filter()` sẽ áp dụng như thế nào cho Portfolio?
Sự dịch chuyển tư duy từ ứng dụng Todo sang ứng dụng Portfolio thực tế sẽ được tổ chức thông qua bộ ba quyền lực `useState` + `.filter()` + `.map()` như sau:
- **Khởi tạo trạng thái dữ liệu (`useState`):**
  Thay vì mảng công việc, ta quản lý mảng chứa danh sách các Object dự án, đi kèm một trạng thái để lưu trữ danh mục (Category) đang được chọn để lọc.
- Lọc danh mục linh hoạt (.filter()):
Trước khi hiển thị ra giao diện, mảng dự án gốc sẽ được lọc qua một bộ lọc động dựa trên selectedCategory mà không hề làm mất đi dữ liệu gốc trong State.
- Tái sử dụng Component để kết xuất (.map()):
Thay vì lặp chuỗi HTML thô như ở Todo, ta tiến hành map mảng đã lọc và truyền dữ liệu trực tiếp vào một Component tái sử dụng là ProjectCard thông qua props. Mỗi phần tử bắt buộc phải có một key duy nhất (ví dụ: project.id).
- 

