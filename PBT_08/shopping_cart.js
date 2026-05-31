function createCart() {
    let items = [];
    let currentDiscount = { type: "none", value: 0, code: "" };
    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id 
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng 
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            items = items.map(item => 
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        },

        // 4. Tính tổng tiền
        getTotal() {
            // Tính tổng tiền gốc trước khi giảm
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (currentDiscount.type === "percent") {
                return subtotal * (1 - currentDiscount.value);
            } else if (currentDiscount.type === "fixed") {
                const finalTotal = subtotal - currentDiscount.value;
                return finalTotal < 0 ? 0 : finalTotal; 
            }
            return subtotal;
        },

        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const upperCode = code.toUpperCase();
            if (upperCode === "SALE10") {
                currentDiscount = { type: "percent", value: 0.1, code: "SALE10" };
            } else if (upperCode === "SALE20") {
                currentDiscount = { type: "percent", value: 0.2, code: "SALE20" };
            } else if (upperCode === "FREESHIP") {
                currentDiscount = { type: "fixed", value: 30000, code: "FREESHIP" };
            } else {
                currentDiscount = { type: "none", value: 0, code: "" };
                console.log(`Mã giảm giá "${code}" không hợp lệ!`);
            }
        },

        // 6. In giỏ hàng dạng bảng 
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng         │");
            
            items.forEach((item, index) => {
                const stt = String(index + 1).padEnd(2);
                const name = item.name.padEnd(13);
                const qty = String(item.quantity).padStart(2);
                const unitPrice = item.price.toLocaleString("vi-VN").padStart(11);
                const totalRowPrice = (item.price * item.quantity).toLocaleString("vi-VN").padStart(12);
                
                console.log(`│ ${stt}│ ${name} │ ${qty} │ ${unitPrice} │ ${totalRowPrice} │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            
            const finalTotalStr = this.getTotal().toLocaleString("vi-VN") + "đ";
            let totalLabel = "Tổng cộng:";
            
            if (currentDiscount.type !== "none") {
                totalLabel = `Tổng (${currentDiscount.code}):`;
            }
            
            const spaceCount = 44 - totalLabel.length - finalTotalStr.length;
            const spaces = spaceCount > 0 ? " ".repeat(spaceCount) : "";
            
            console.log(`│ ${totalLabel}${spaces}${finalTotalStr} │`);
            console.log("└──────────────────────────────────────────────┘");
        },

        // 7. Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // 8. Xóa toàn bộ giỏ 
        clearCart() {
            items = [];
            currentDiscount = { type: "none", value: 0, code: "" };
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); 

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); 

cart.removeItem(3); 
console.log("Sau xóa:", cart.getItemCount()); 