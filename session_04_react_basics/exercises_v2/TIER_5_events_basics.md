## 📝 Bài 5.1 — Click Events (10 phút)
### Thử thách
1. Tạo nút "Đổi màu ngẫu nhiên" cho một div
2. Đếm số lần click vào từng nút riêng biệt
3. Tạo nút "Like" với icon ❤️/🤍 toggle
```js
import { useState } from "react";

function ClickEventsChallenge() {
    const [bgColor, setBgColor] = useState("#34495e");
    
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    const [isLiked, setIsLiked] = useState(false);

    function generateRandomColor() {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        setBgColor(randomColor);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>Thử thách 5.1 — Click Events</h2>

            {/* Thử thách 1: Đổi màu nền ngẫu nhiên */}
            <div style={{
                width: "200px",
                height: "100px",
                backgroundColor: bgColor,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                marginBottom: "10px",
                transition: "background-color 0.3s ease"
            }}>
                Màu hiện tại: {bgColor}
            </div>
            <button onClick={generateRandomColor}>Đổi màu ngẫu nhiên</button>

            <hr style={{ margin: "20px 0" }} />

            {/* Thử thách 2: Bộ đếm riêng biệt */}
            <div style={{ marginBottom: "20px" }}>
                <p>Nút A: {countA} lần | Nút B: {countB} lần</p>
                <button onClick={() => setCountA(countA + 1)} style={{ marginRight: "10px" }}>Tăng nút A</button>
                <button onClick={() => setCountB(countB + 1)}>Tăng nút B</button>
            </div>

            <hr style={{ margin: "20px 0" }} />

            {/* Thử thách 3: Nút Like Toggle */}
            <div>
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    style={{
                        fontSize: "16px",
                        padding: "8px 16px",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        borderRadius: "20px",
                        background: isLiked ? "#ffeecf" : "#fff"
                    }}
                >
                    {isLiked ? "❤️ Đã Thích" : "🤍 Thích"}
                </button>
            </div>
        </div>
    );
}
export default ClickEventsChallenge;
```

## 📝 Bài 5.2 — Input Events (10 phút)
### Thử thách
1. Tạo ô nhập email với validation (có @ không)
2. Hiển thị preview khi nhập (giống Tier 2)
3. Đếm số từ (không phải ký tự)
```js
import { useState } from "react";

function InputEventsChallenge() {
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    // Thử thách 1: Validation email cơ bản
    const isEmailValid = email.includes("@");

    // Thử thách 3: Tính toán số lượng từ (Word Count) bằng Regex loại bỏ khoảng trắng thừa
    const countWords = (inputStr) => {
        const trimmed = inputStr.trim();
        if (trimmed === "") return 0;
        return trimmed.split(/\s+/).length; 
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Thử thách 5.2 — Input Events</h2>

            {/* Thử thách 1: Validate Email */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Nhập Email:</label>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@tlu.edu.vn"
                    style={{ padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                {email && (
                    <p style={{ color: isEmailValid ? "green" : "red", fontSize: "14px", marginTop: "5px" }}>
                        {isEmailValid ? "✓ Email hợp lệ" : "✗ Email thiếu ký tự định danh '@'"}
                    </p>
                )}
            </div>

            <hr />

            {/* Thử thách 2 & 3: Word Count & Realtime Preview */}
            <div style={{ marginTop: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Nhập đoạn văn tư duy:</label>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Gõ văn bản vào đây..."
                    rows={4}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <p style={{ fontSize: "14px", color: "#555" }}>
                    Ký tự: <strong>{text.length}</strong> | Số từ: <strong>{countWords(text)}</strong>
                </p>

                {/* Thử thách 2: Preview thời gian thực */}
                {text && (
                    <div style={{ background: "#f8fafc", padding: "10px", borderLeft: "4px solid #3498db", marginTop: "10px" }}>
                        <h5>Xem trước nội dung:</h5>
                        <p style={{ margin: 0, fontStyle: "italic", color: "#334155" }}>{text}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default InputEventsChallenge;
```


