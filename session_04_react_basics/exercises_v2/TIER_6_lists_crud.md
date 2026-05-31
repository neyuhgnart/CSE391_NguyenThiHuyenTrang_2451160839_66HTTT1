## 📝 Bài 6.1 — Render danh sách (8 phút)
### Thử thách
1. Hiển thị STT cho mỗi sinh viên
2. Hiển thị sinh viên tuổi >= 20 bằng màu xanh
3. Tính và hiển thị tuổi trung bình
```js
import { useState } from "react";
function ListBasicsChallenge() {
    const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    // Thử thách 3: Tính toán tuổi trung bình dựa trên mảng dữ liệu đầu vào
    const averageAge = students.reduce((sum, student) => sum + student.age, 0) / students.length;

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h2>Thử thách 6.1 — Render Danh Sách</h2>
            
            <h3>Danh sách trái cây</h3>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
            
            <hr />

            <h3>Danh sách sinh viên</h3>
            {students.map((student, index) => {
                // Thử thách 2: Xác định điều kiện màu sắc động
                const isSenior = student.age >= 20;

                return (
                    <div 
                        key={student.id} 
                        style={{ 
                            padding: "10px", 
                            margin: "6px 0",
                            borderRadius: "4px",
                            background: isSenior ? "#e6f4ea" : "#f9f9f9", 
                            color: isSenior ? "#137333" : "#333",       
                            borderLeft: isSenior ? "4px solid #137333" : "4px solid #ccc",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        {/* Thử thách 1: Hiển thị STT dựa trên index hệ 0 (+1) */}
                        <span><strong>#{index + 1}</strong>. {student.name}</span>
                        <span>{student.age} tuổi</span>
                    </div>
                );
            })}

            {/* Thử thách 3: Hiển thị kết quả tính toán */}
            <div style={{ marginTop: "15px", padding: "10px", background: "#f1f5f9", borderRadius: "4px", fontWeight: "bold" }}>
                📊 Tuổi trung bình của lớp: {averageAge.toFixed(1)} tuổi
            </div>
        </div>
    );
}
export default ListBasicsChallenge;
```

## 📝 Bài 6.2 — Thêm phần tử (CREATE) (10 phút)
### Thử thách
1. Validate: không cho thêm nếu tên trống
2. Hiển thị "Đã thêm thành công!" sau khi thêm
3. Focus lại vào input sau khi thêm
```js
import { useState, useRef } from "react";

function CreateItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    
    // Thử thách 2: Trạng thái hiển thị thông báo toast alert
    const [alertMessage, setAlertMessage] = useState("");
    
    // Thử thách 3: Con trỏ tham chiếu đến DOM nguyên bản của input
    const inputRef = useRef(null);

    function handleAdd() {
        // Thử thách 1: Loại bỏ khoảng trắng và validate đầu vào chặt chẽ
        if (newName.trim() === "") {
            setAlertMessage("⚠️ Vui lòng không để trống tên môn học!");
            return;
        }
        
        const newItem = {
            id: Date.now(),
            name: newName.trim()
        };
        
        setItems([...items, newItem]);
        setNewName(""); 
        
        // Thử thách 2: Thiết lập thông báo thành công
        setAlertMessage(`✅ Đã thêm môn "${newItem.name}" thành công!`);
        
        // Thử thách 3: Trả quyền Focus về cho ô nhập ngay tức thì
        inputRef.current.focus();
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") handleAdd();
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Thử thách 6.2 — Thêm Môn Học (Create)</h2>
            
            {alertMessage && (
                <div style={{ 
                    padding: "10px", 
                    marginBottom: "12px", 
                    borderRadius: "4px", 
                    backgroundColor: alertMessage.startsWith("✅") ? "#e6f4ea" : "#fce8e6",
                    color: alertMessage.startsWith("✅") ? "#137333" : "#c5221f"
                }}>
                    {alertMessage}
                </div>
            )}

            <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
                <input 
                    ref={inputRef} 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập tên môn học..."
                    style={{ padding: "8px", flex: 1, borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px", cursor: "pointer", background: "#1a73e8", color: "white", border: "none", borderRadius: "4px" }}>
                    ➕ Thêm
                </button>
            </div>
            
            <h3>Danh sách hiện tại ({items.length}):</h3>
            {items.map(item => (
                <div key={item.id} style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>
                    • {item.name}
                </div>
            ))}
        </div>
    );
}
export default CreateItemChallenge;
```


## 📝 Bài 6.3 — Xóa phần tử (DELETE) (10 phút)
### Thử thách
1. Hiển thị "Đã xóa [tên]" sau khi xóa
2. Thêm nút "Hoàn tác" trong 5 giây
3. Chỉ cho xóa khi confirm
```js
import { useState, useRef } from "react";

function DeleteItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    
    const [toast, setToast] = useState("");
    
    const backupItemsRef = useRef([]);
    const timerRef = useRef(null);

    function handleDelete(targetItem) {
        // Thử thách 3: Kiểm tra ý chí người dùng trước khi phá hủy dữ liệu
        const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sinh viên "${targetItem.name}"?`);
        if (!isConfirmed) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        backupItemsRef.current = items;

        setItems(items.filter(item => item.id !== targetItem.id));
        
        // Thử thách 1 & 2: Kích hoạt Toast thông báo kèm nút Hoàn tác
        setToast(`Đã xóa sinh viên "${targetItem.name}"`);

        timerRef.current = setTimeout(() => {
            setToast("");
            backupItemsRef.current = [];
        }, 5000);
    }

    function handleUndo() {
        if (backupItemsRef.current.length > 0) {
            setItems(backupItemsRef.current); 
            setToast("");                    
            backupItemsRef.current = [];   
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}>
            <h2>Thử thách 6.3 — Quản Lý Xóa (Delete & Undo)</h2>

            {/* Thử thách 1 & 2: Thanh thông báo động và Nút Hoàn tác */}
            {toast && (
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    padding: "10px 14px", 
                    marginBottom: "15px", 
                    background: "#323232", 
                    color: "white", 
                    borderRadius: "4px",
                    fontSize: "14px"
                }}>
                    <span>{toast}</span>
                    <button 
                        onClick={handleUndo} 
                        style={{ background: "none", border: "none", color: "#f4b400", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}
                    >
                        HOÀN TÁC (5s)
                    </button>
                </div>
            )}

            {items.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center" }}>Hộp danh sách trống rỗng.</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", margin: "5px 0", background: "#f8fafc", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                        <span>{item.name}</span>
                        <button onClick={() => handleDelete(item)} style={{ background: "#ea4335", color: "white", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}>
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
export default DeleteItemChallenge;
```

## 📝 Bài 6.4 — Sửa phần tử (UPDATE) (15 phút)
### Thử thách
1. Highlight ô input khi đang sửa
2. Không cho lưu nếu tên trống
3. Hiển thị "Đã lưu!" sau khi sửa
```js
import { useState } from "react";

function UpdateItemChallenge() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 }
    ]);
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    
    const [recentlySavedId, setRecentlySavedId] = useState(null);

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
        setRecentlySavedId(null); 
    }

    function saveEdit() {
        // Thử thách 2: Chặn đứng hành vi lưu dữ liệu rỗng
        if (editName.trim() === "" || editAge === "") return;
        
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName.trim(), age: parseInt(editAge) }
                : item
        ));
        
        // Thử thách 3: Đánh dấu phần tử vừa cập nhật thành công
        setRecentlySavedId(editingId);
        setEditingId(null); // Thoát khỏi chế độ Edit Inline

        setTimeout(() => setRecentlySavedId(prev => prev === item.id ? null : prev), 3000);
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
            <h2>Thử thách 6.4 — Chỉnh Sửa Tối Ưu (Update)</h2>
            
            {items.map(item => {
                const isEditing = editingId === item.id;
                const isJustSaved = recentlySavedId === item.id;

                return (
                    <div 
                        key={item.id} 
                        style={{ 
                            padding: "12px", 
                            margin: "8px 0", 
                            borderRadius: "6px",
                            // Thử thách 1: Thay đổi giao diện nền của dòng đang sửa đổi để tăng trải nghiệm người dùng
                            background: isEditing ? "#e8f0fe" : "#f8fafc",
                            border: isEditing ? "1.5px dashed #1a73e8" : "1px solid #e2e8f0",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {isEditing ? (
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <input 
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Tên không được trống..."
                                    autoFocus
                                    style={{ 
                                        padding: "6px", 
                                        flex: 2,
                                        // Thử thách 1 & 2: Đổi màu viền đỏ cảnh báo trực quan nếu xóa hết ký tự
                                        border: editName.trim() === "" ? "1.5px solid red" : "1px solid #70757a",
                                        borderRadius: "4px"
                                    }}
                                />
                                <input 
                                    type="number"
                                    value={editAge}
                                    onChange={(e) => setEditAge(e.target.value)}
                                    style={{ padding: "6px", flex: 1, borderRadius: "4px", border: "1px solid #70757a" }}
                                />
                                
                                <button 
                                    onClick={saveEdit} 
                                    // Thử thách 2: Thuộc tính disabled ngăn chặn click chuột khi tên trống
                                    disabled={editName.trim() === "" || editAge === ""}
                                    style={{ 
                                        background: editName.trim() === "" ? "#bdc3c7" : "#27ae60", 
                                        color: "white", border: "none", padding: "6px 10px", borderRadius: "4px",
                                        cursor: editName.trim() === "" ? "not-allowed" : "pointer" 
                                    }}
                                >
                                    Lưu
                                </button>
                                <button onClick={() => setEditingId(null)} style={{ background: "#7f8c8d", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}>
                                    Hủy
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <span>{item.name} — <strong>{item.age}</strong> tuổi</span>
                                    {/* Thử thách 3: Nhãn hiển thị trạng thái cập nhật thành công */}
                                    {isJustSaved && (
                                        <span style={{ marginLeft: "10px", fontSize: "12px", color: "#27ae60", fontWeight: "bold", background: "#e8f5e9", padding: "2px 6px", borderRadius: "4px" }}>
                                            ✨ Đã lưu!
                                        </span>
                                    )}
                                </div>
                                <button onClick={() => startEdit(item)} style={{ background: "#1a73e8", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                                    ✏️ Sửa
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
export default UpdateItemChallenge;
```