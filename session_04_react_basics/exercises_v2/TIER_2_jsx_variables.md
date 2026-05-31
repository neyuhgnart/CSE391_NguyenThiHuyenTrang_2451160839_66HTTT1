## 📝 Bài 2.1 — Hiển thị biến đơn giản (8 phút)
```js
import React from "react";
function SimpleVariablesChallenge() {
//1. Hiển thị thông tin cá nhân (tên, tuổi, quê quán)
    const ten = "Nguyễn Thị Huyền Trang";
    const tuoi = 20;
    const queQuan = "Bắc Ninh";

// 2. Hiển thị "Chào buổi sáng/chiều/tối" dựa vào giờ hiện tại
    const currentHour = new Date().getHours();
    let greeting = "";
    if (currentHour < 12) greeting = "Chào buổi sáng! 🌅";
    else if (currentHour < 18) greeting = "Chào buổi chiều! ☀️";
    else greeting = "Chào buổi tối! 🌙";

//3. Tính và hiển thị BMI (cân nặng / chiều cao²)
    const weightKg = 43;
    const heightM = 1.61;
    const bmi = (weightKg / (heightM * heightM)).toFixed(2); 

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>{greeting}</h2>
            
            <div style={{ background: "#f8fafc", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
                <h3>Thông tin cá nhân</h3>
                <p><strong>Họ và tên:</strong> {user.name}</p>
                <p><strong>Tuổi:</strong> {user.age} tuổi</p>
                <p><strong>Quê quán:</strong> {user.hometown}</p>
            </div>

            <div style={{ background: "#eff6ff", padding: "15px", borderRadius: "8px" }}>
                <h3>Chỉ số sức khỏe (BMI)</h3>
                <p>Cân nặng: {weightKg}kg | Chiều cao: {heightM}m</p>
                <p><strong>Chỉ số BMI của bạn:</strong> {bmi}</p>
            </div>
        </div>
    );
}
export default SimpleVariablesChallenge;
```

## 📝 Bài 2.2 — Conditional Rendering (Hiển thị có điều kiện) (10 phút)
```js
import React, { useState } from "react";

function ConditionalChallenge() {
    const [isOnline, setIsOnline] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const stock = 0; 

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Hệ thống Trạng thái & Điều kiện</h2>

            {/* Thử thách 1: Trạng thái Online/Offline */}
            <p>
                Trạng thái tài khoản: {isOnline ? "🟢 Đang hoạt động" : "🔴 Ngoại tuyến"}
                <button onClick={() => setIsOnline(!isOnline)} style={{ marginLeft: "10px" }}>
                    Đổi trạng thái mạng
                </button>
            </p>

            <hr style={{ margin: "15px 0" }} />

            {/* Thử thách 2: Ẩn/Hiện menu theo Đăng nhập */}
            <div style={{ marginBottom: "15px" }}>
                <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                    {isLoggedIn ? "Đăng xuất" : "Đăng nhập hệ thống"}
                </button>

                {isLoggedIn && (
                    <nav style={{ background: "#e0f2fe", padding: "10px", marginTop: "10px", borderRadius: "4px" }}>
                        <a href="#profile" style={{ marginRight: "15px" }}>Trang cá nhân</a>
                        <a href="#settings" style={{ marginRight: "15px" }}>Cài đặt tài khoản</a>
                        <a href="#dashboard">Bảng điều khiển</a>
                    </nav>
                )}
            </div>

            <hr style={{ margin: "15px 0" }} />

            {/* Thử thách 3: Hiện nhãn Hết hàng khi stock = 0 */}
            <div style={{ border: "1px solid #ccc", padding: "15px", width: "200px", borderRadius: "6px" }}>
                <h4>Sản phẩm: Giày Sneaker</h4>
                <p>Số lượng kho: {stock}</p>
                {stock === 0 ? (
                    <span style={{ color: "white", background: "red", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                        HẾT HÀNG
                    </span>
                ) : (
                    <span style={{ color: "white", background: "green", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                        Còn hàng
                    </span>
                )}
            </div>
        </div>
    );
}
export default ConditionalChallenge;
```

## 📝 Bài 2.3 — Render danh sách (List Rendering) (10 phút)
```js
import React from "react";

function ListRenderingChallenge() {
    const products = [
        { id: 101, name: "Chuột Máy Tính Không Dây", price: 350000 },
        { id: 102, name: "Bàn Phím Cơ AKKO", price: 1550000 }, 
        { id: 103, name: "Lót Chuột Cỡ Lớn", price: 120000 },
        { id: 104, name: "Tai Nghe Chống Ồn Sony", price: 4200000 }, 
        { id: 105, name: "Cáp Sạc Nhanh Type-C", price: 90000 }
    ];

    const totalCartValue = products.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.price;
    }, 0);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Giỏ Hàng Công Nghệ</h2>
            <ul style={{ paddingLeft: "20px", lineHeight: "2" }}>
                {products.map((product) => {
                    const isHighValue = product.price > 1000000;
                    return (
                        <li 
                            key={product.id} 
                            style={{ color: isHighValue ? "red" : "black", fontWeight: isHighValue ? "bold" : "normal" }}
                        >
                            {product.name} — {product.price.toLocaleString("vi-VN")} đ 
                            {isHighValue && " 🔥 (Hàng cao cấp)"}
                        </li>
                    );
                })}
            </ul>

            <div style={{ marginTop: "20px", padding: "12px", background: "#f1f5f9", borderRadius: "6px", display: "inline-block" }}>
                <strong>Tổng chi phí giỏ hàng: </strong>
                <span style={{ color: "#2563eb", fontSize: "1.2rem", fontWeight: "bold" }}>
                    {totalCartValue.toLocaleString("vi-VN")} đ
                </span>
            </div>
        </div>
    );
}
export default ListRenderingChallenge;
```





