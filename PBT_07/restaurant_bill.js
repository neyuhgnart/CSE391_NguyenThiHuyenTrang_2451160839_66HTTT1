 function inHoaDonNhaHang(items, includeTip = true) {
    let rawTotal = 0;
    const itemRows = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemTotal = item.price * item.quantity;
        rawTotal += itemTotal;
        
        const unitPriceK = `${item.price / 1000}k`;
        const totalK = `${itemTotal / 1000}k`;
        
        itemRows.push({
            stt: i + 1,
            name: item.name,
            qty: `x${item.quantity}`,
            unitPrice: `@${unitPriceK}`,
            totalPrice: `= ${totalK}`
        });
    }

    let discountPercent = 0;
    if (rawTotal > 1000000) {
        discountPercent = 15; 
    } else if (rawTotal > 500000) {
        discountPercent = 10; 
    }

    const today = new Date();
    if (today.getDay() === 2) { 
        discountPercent += 5;
    }

    const discountAmount = (rawTotal * discountPercent) / 100;
    const totalAfterDiscount = rawTotal - discountAmount;

    const vatAmount = totalAfterDiscount * 0.08;

    const tipAmount = includeTip ? (totalAfterDiscount * 0.05) : 0;

    const finalPayment = totalAfterDiscount + vatAmount + tipAmount;

    const formatVND = (num) => {
        return num.toLocaleString('vi-VN') + "đ";
    };

    const width = 38; 
    
    const makeRow = (leftText, rightText) => {
        const spaceCount = width - leftText.length - rightText.length;
        const spaces = spaceCount > 0 ? " ".repeat(spaceCount) : "";
        return `║ ${leftText}${spaces}${rightText} ║`;
    };

    console.log("╔" + "═".repeat(width + 2) + "╗");
    console.log(`║          HÓA ĐƠN NHÀ HÀNG            ║`);
    console.log("╠" + "═".repeat(width + 2) + "╣");

    for (let i = 0; i < itemRows.length; i++) {
        const r = itemRows[i];
        const leftPart = `${r.stt}. ${r.name.padEnd(10)} ${r.qty.padEnd(4)} ${r.unitPrice.padEnd(5)}`;
        console.log(makeRow(leftPart, r.totalPrice));
    }

    console.log("╠" + "═".repeat(width + 2) + "╣");

    console.log(makeRow("Tổng cộng:", formatVND(rawTotal)));
    console.log(makeRow(`Giảm giá (${discountPercent}%):`, formatVND(discountAmount)));
    console.log(makeRow("VAT (8%):", formatVND(vatAmount)));
    console.log(makeRow(`Tip (${includeTip ? '5%' : '0%'}):`, formatVND(tipAmount)));

    console.log("╠" + "═".repeat(width + 2) + "╣");
    console.log(makeRow("THANH TOÁN:", formatVND(finalPayment)));
    console.log("╚" + "═".repeat(width + 2) + "╝");
}
const cart = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

inHoaDonNhaHang(cart, true);