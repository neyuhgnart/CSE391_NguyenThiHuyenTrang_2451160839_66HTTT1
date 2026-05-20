## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
### Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí  | Cuộn theo trang? | Use case |
|----------|---------------------------|--------------------|------------------|----------|
| `static` | có  | Không dùng top/left  | Có  | layout mặc định |
| `relative` | Có | Vị trí gốc của chính nó | Có | Dịch nhẹ element, làm mốc cho absolute |
| `absolute` | không | Cha relative gần nhất | có | Badge, dropdown, tooltip |
| `fixed` | không | Viewport | không | Chat button, modal |
| `sticky`| ✅ → ❌ khi dính | Viewport khi đạt ngưỡng | Có (Nhưng sẽ dính khi | Sticky header, sidebar |
                                                        |   đạt ngưỡng đặt sẵn) | 

Câu hỏi thêm: Khi nào `absolute` tham chiếu `body`? Khi nào tham chiếu parent? Giải thích khái niệm "nearest positioned ancestor".
- absolute tham chiếu parent khi parent gần nhất có position khác static (relative, absolute, fixed, sticky). Parent đó gọi là nearest positioned ancestor.
Nếu không có ancestor nào được positioning, absolute sẽ tham chiếu body (viewport/trang web)


### Câu A2 — Flexbox vs Grid
```css
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */
Dự đoán: 4 items nằm trên 1 hàng, mỗi item rộng bằng nhau
Sơ đồ: 
| Item 1 | Item 2 | Item 3 | Item 4 |

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = ??? (mấy hàng, mấy cột?) */
Dự đoán: mỗi item ≈ 50% chiều ngang, 1 hàng chứa 2 item, 6 item → 3 hàng × 2 cột
Sơ đồ:
| Item 1 | Item 2 |
| Item 3 | Item 4 |
| Item 5 | Item 6 |

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */
Dự đoán: 3 items nằm trên 1 hàng, item đầu sát trái, item cuối sát phải, item giữa nằm giữa, 
các item căn giữa theo chiều dọc
Sơ đồ:
| Item 1          Item 2          Item 3 |

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */
Dự đoán: Grid có 3 cột: cột 1 = 200px, cột 2 = co giãn (1fr), cột 3 = 200px, 3 item nằm trên 1 hàng
Sơ đồ:
| 200px | flexible space | 200px |
| Item1 |     Item2      | Item3 |

/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) */
```
Dự đoán: Grid có 3 cột bằng nhau: 7 items → hàng 1: 3 item, hàng 2: 3 item, hàng 3: còn 1 item
->Tổng: 3 hàng
Sơ đồ:
| Item1 | Item2 | Item3 |
| Item4 | Item5 | Item6 |
| Item7 |       |       |


## PHẦN C — SUY LUẬN 
### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?
Cho 5 tình huống layout thực tế. Với mỗi tình huống, trả lời: dùng **Flexbox**, **Grid**, hay **kết hợp cả hai**? Giải thích ngắn gọn tại sao.

1. Navigation bar ngang (logo + menu + buttons)
- Dùng Flexbox
Vì layout 1 chiều theo hàng ngang, dễ căn giữa và tạo khoảng cách giữa logo, menu, button

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Dùng Grid
Vì cần chia nhiều cột đều nhau theo dạng lưới 2 chiều (hàng + cột)

3. Layout blog: main content + sidebar
- Dùng Grid
Vì cần chia layout thành các cột rõ ràng (content lớn + sidebar nhỏ)

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
- Dùng Grid
Vì cần bố trí nhiều cột đều nhau và dễ responsive

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Kết hợp cả hai:
Dùng Flexbox để sắp xếp nội dung dọc và đẩy button xuống đáy
Có thể dùng Grid cho toàn bộ danh sách card sản phẩm


### Câu C2 — Debug Flexbox
**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```
- Mô tả lỗi: Các card có lượng text khác nhau nên chiều cao khác nhau. Nút "Mua" nằm ngay sau nội dung nên bị nhảy lên/xuống
- Sửa:
```css
.card-container{ display: flex; flex-wrap: wrap;}
.card{ width: 30%; margin: 1.5%; display: flex; flex-direction: column;}
.card img{ width: 100%;}
.card h3{font-size: 18px;}
.card .btn{padding: 10px; margin-top: auto;}
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```
- Mô tả lỗi: Container có display: flex nhưng chưa dùng: justify-content, align-items nên item mặc định nằm góc trái trên
- Sửa:
```css
.hero{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero-content{
    text-align: center;
}
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài
```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```
- Mô tả lỗi: Trong Flexbox, items mặc định có thể bị co (flex-shrink: 1). Khi content quá dài: 
.content chiếm nhiều chỗ
.sidebar bị ép nhỏ lại
- Sửa:
```css
.layout{
    display: flex;
}
.sidebar{
    width: 250px;
    flex-shrink: 0;
}
.content{
    flex: 1;
}
```

