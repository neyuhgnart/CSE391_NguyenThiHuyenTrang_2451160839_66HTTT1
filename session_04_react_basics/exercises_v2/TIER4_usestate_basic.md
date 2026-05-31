## 📝 Bài 4.1 — useState với số (Đếm) (10 phút)
### Thử thách
1. Thêm nút "Tăng 5" (count += 5)
2. Hiển thị "Số dương" hoặc "Số âm" dựa vào count
3. Thay đổi màu: xanh khi > 0, đỏ khi < 0, đen khi = 0
```js
import { useState } from "react";

function NumberStateChallenge() {
    const [count, setCount] = useState(0);
    let statusText = "Bằng không";
    let textColor = "black";

    if (count > 0) {
        statusText = "Số dương";
        textColor = "#27ae60"; 
    } else if (count < 0) {
        statusText = "Số âm";
        textColor = "#c0392b"; 
    }

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
            <h2 style={{ color: textColor }}>Giá trị hiện tại: {count}</h2>
            <p>Trạng thái: <strong>{statusText}</strong></p>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>
                <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>
                <button onClick={() => setCount(count + 5)} style={{ background: "#f39c12", color: "white" }}>
                    Tăng (+5)
                </button>
                <button onClick={() => setCount(count * 2)}>Nhân đôi</button>
                <button onClick={() => setCount(0)} style={{ background: "#7f8c8d", color: "white" }}>
                    Reset
                </button>
            </div>
        </div>
    );
}
export default NumberStateChallenge;
```

## 📝 Bài 4.2 — useState với chuỗi (Input) (10 phút)
1. Đếm số ký tự đã nhập (hiển thị X/100)
2. Hiển thị "Email hợp lệ" nếu có ký tự "@"
3. Tạo ô nhập mật khẩu với nút ẩn/hiện
```js
import { useState } from "react";

function PasswordInputChallenge() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const maxLength = 100;

    return (
        <div style={{ padding: "20px", maxWidth: "350px", fontFamily: "sans-serif" }}>
            <h3>Ô nhập bảo mật (Password Input)</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", position: "relative" }}>
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={maxLength}
                    placeholder="Nhập mật khẩu an toàn..."
                    style={{ padding: "8px", width: "100%", paddingRight: "70px" }}
                />
                <button 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: "absolute",
                        right: "5px",
                        background: "#e2e8f0",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                    }}
                >
                    {showPassword ? "Ẩn" : "Hiện"}
                </button>
            </div>
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "5px", textAlign: "right" }}>
                Độ dài: {password.length} / {maxLength} ký tự
            </p>
        </div>
    );
}
export default PasswordInputChallenge;
```


## 📝 Bài 4.3 — useState với boolean (Toggle) (10 phút)
### Thử thách
1. Tạo nút "Hiện/Ẩn mật khẩu" (input type password/text)
2. Tạo accordion (click tiêu đề để mở/đóng nội dung)
3. Tạo nút "Bật/Tắt" với icon bóng đèn 💡
```js
import React, { useState } from "react";

function BooleanStateChallenge() {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Thử thách Toggle (Boolean)</h2>

            <div style={{ border: "1px solid #ccc", borderRadius: "5px", marginBottom: "30px" }}>
                <div 
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    style={{ 
                        background: "#f1f2f6", 
                        padding: "15px", 
                        cursor: "pointer", 
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <span>Câu hỏi thường gặp: React là gì?</span>
                    <span>{isAccordionOpen ? "▲" : "▼"}</span>
                </div>
                {isAccordionOpen && (
                    <div style={{ padding: "15px", borderTop: "1px solid #ccc", background: "#fff" }}>
                        React là một thư viện JavaScript mã nguồn mở được sử dụng để xây dựng giao diện người dùng (UI), đặc biệt là cho các ứng dụng trang đơn (SPA).
                    </div>
                )}
            </div>

            <div style={{ textAlign: "center", padding: "20px", background: isLightOn ? "#fff9c4" : "#2c3e50", borderRadius: "10px", transition: "background 0.3s" }}>
                <h3 style={{ color: isLightOn ? "#333" : "#fff" }}>Phòng làm việc</h3>
                
                <div style={{ fontSize: "80px", margin: "20px 0" }}>
                    {isLightOn ? "💡" : "💡"}
                    <span style={{ 
                        position: "absolute", 
                        marginLeft: "-60px", 
                        color: isLightOn ? "transparent" : "rgba(0,0,0,0.7)", 
                        filter: "blur(2px)" 
                    }}>
                        {isLightOn ? "" : "💡"}
                    </span>
                    <div style={{ fontSize: "100px", textShadow: isLightOn ? "0 0 50px yellow" : "none", opacity: isLightOn ? 1 : 0.3 }}>
                        💡
                    </div>
                </div>

                <button 
                    onClick={() => setIsLightOn(!isLightOn)}
                    style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px",
                        cursor: "pointer",
                        background: isLightOn ? "#e74c3c" : "#2ecc71",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    {isLightOn ? "Tắt Đèn" : "Bật Đèn"}
                </button>
            </div>
        </div>
    );
}
export default BooleanStateChallenge;
```

## 📝 Bài 4.4 — Kết hợp nhiều useState (10 phút)
### Thử thách
1. Thêm trường "Email" vào form
2. Validate: tuổi phải > 0 và < 100
3. Hiển thị "Xin chào [tên]!" khi nhập xong
```js
import { useState } from "react";

function IntegratedFormChallenge() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit() {
        // Kiểm tra rỗng toàn diện các trường thông tin
        if (!name.trim() || !age || !email.trim()) {
            alert("Vui lòng không để trống bất kỳ trường thông tin nào!");
            return;
        }

        // Thử thách 2: Ràng buộc logic nghiệp vụ tuổi
        const parsedAge = parseInt(age, 10);
        if (parsedAge <= 0 || parsedAge >= 100) {
            alert("Hệ thống từ chối! Tuổi phải lớn hơn 0 và nhỏ hơn 100.");
            return;
        }

        // Kiểm tra nhanh định dạng email đơn giản
        if (!email.includes("@")) {
            alert("Email không đúng định dạng quy chuẩn!");
            return;
        }

        setSubmitted(true);
    }

    return (
        <div style={{ padding: "20px", maxWidth: "450px", fontFamily: "sans-serif" }}>
            <h2>Form Đăng Ký Hệ Thống</h2>

            {/* Thử thách 3: Preview lời chào mừng thời gian thực */}
            {name.trim() && (
                <div style={{ color: "#2563eb", marginBottom: "15px", fontWeight: "500" }}>
                    👋 Xin chào, hệ thống đang ghi nhận thông tin của: <strong>{name}</strong>
                </div>
            )}

            {!submitted ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px" }}>Họ và tên: </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "6px" }} />
                    </div>

                    {/* Thử thách 1: Thêm trường dữ liệu Email */}
                    <div>
                        <label style={{ display: "block", marginBottom: "4px" }}>Địa chỉ Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "6px" }} />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "4px" }}>Tuổi tác: </label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "100%", padding: "6px" }} />
                    </div>

                    <div>
                        <label style={{ cursor: "pointer" }}>
                            <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} style={{ marginRight: "6px" }} />
                            Xác nhận là sinh viên trường TLU
                        </label>
                    </div>

                    <button onClick={handleSubmit} style={{ padding: "8px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        Xác nhận thông tin
                    </button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "6px", border: "1px solid #c3e6cb" }}>
                    <h3 style={{ color: "#155724", margin: "0 0 10px 0" }}>✅ Ghi nhận dữ liệu thành công!</h3>
                    <p><strong>Họ tên:</strong> {name}</p>
                    <p><strong>Email đăng ký:</strong> {email}</p>
                    <p><strong>Tuổi:</strong> {age} tuổi</p>
                    <p><strong>Đối tượng sinh viên:</strong> {isStudent ? "Đúng" : "Không"}</p>
                    <button 
                        onClick={() => { setSubmitted(false); setName(""); setAge(""); setEmail(""); setIsStudent(false); }}
                        style={{ marginTop: "10px", padding: "6px 12px" }}
                    >
                        Tạo tài khoản mới
                    </button>
                </div>
            )}
        </div>
    );
}
export default IntegratedFormChallenge;
```




