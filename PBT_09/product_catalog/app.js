const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 3, name: "Xiaomi 14 Ultra", price: 22490000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 5, name: "Dell XPS 13", price: 38500000, category: "laptop", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 6, name: "Asus ROG Strix", price: 41990000, category: "laptop", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 18490000, category: "tablet", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 9, name: "Apple Watch Ultra 2", price: 21490000, category: "watch", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 10, name: "Garmin Fenix 7 Pro", price: 19990000, category: "watch", image: "https://placehold.co/200", rating: 4.6, inStock: false },
    { id: 11, name: "Huawei Watch GT 4", price: 5490000, category: "watch", image: "https://placehold.co/200", rating: 4.2, inStock: true },
    { id: 12, name: "Lenovo Legion Pad", price: 9500000, category: "tablet", image: "https://placehold.co/200", rating: 4.1, inStock: true }
];

let cartCount = 0;
let searchQuery = "";
let selectedCategory = "all";
let currentSortOrder = "default";
let productsGridEl;
let cartBadgeEl;

function initApp() {
    const body = document.body;

    const header = document.createElement("header");
    header.className = "catalog-header";
    
    const logo = document.createElement("h1");
    logo.textContent = "TechCatalog";
    
    const headerRight = document.createElement("div");
    headerRight.className = "header-right";
    
    const themeBtn = document.createElement("button");
    themeBtn.className = "theme-btn";
    themeBtn.textContent = "Dark Mode";
    themeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        themeBtn.textContent = body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });

    const cartWrapper = document.createElement("div");
    cartWrapper.className = "cart-icon-wrapper";
    cartWrapper.textContent = "🛒";
    cartBadgeEl = document.createElement("span");
    cartBadgeEl.className = "cart-badge";
    cartBadgeEl.textContent = "0";
    cartWrapper.appendChild(cartBadgeEl);

    headerRight.appendChild(themeBtn);
    headerRight.appendChild(cartWrapper);
    header.appendChild(logo);
    header.appendChild(headerRight);
    body.appendChild(header);

    const controlsPanel = document.createElement("div");
    controlsPanel.className = "controls-panel";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search-input";
    searchInput.placeholder = "Tìm kiếm sản phẩm theo tên...";
    searchInput.addEventListener("input", searchProducts);

    const categoryGroup = document.createElement("div");
    categoryGroup.className = "category-group";
    const categories = [
        { key: "all", label: "Tất cả" },
        { key: "phone", label: "Điện thoại" },
        { key: "laptop", label: "Máy tính" },
        { key: "tablet", label: "Máy tính bảng" },
        { key: "watch", label: "Đồng hồ" }
    ];
    categories.forEach(cat => {
        const catBtn = document.createElement("button");
        catBtn.className = `category-btn ${cat.key === "all" ? "active" : ""}`;
        catBtn.textContent = cat.label;
        catBtn.dataset.category = cat.key;
        catBtn.addEventListener("click", (e) => filterByCategory(e, cat.key));
        categoryGroup.appendChild(catBtn);
    });

    const sortSelect = document.createElement("select");
    sortSelect.className = "sort-select";
    const sortOptions = [
        { value: "default", text: "Sắp xếp mặc định" },
        { value: "price-asc", text: "Giá tăng dần ➔" },
        { value: "price-desc", text: "Giá giảm dần ➔" },
        { value: "name-az", text: "Tên từ A-Z" },
        { value: "rating-high", text: "Đánh giá cao nhất" }
    ];
    sortOptions.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        sortSelect.appendChild(option);
    });
    sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));

    controlsPanel.appendChild(searchInput);
    controlsPanel.appendChild(categoryGroup);
    controlsPanel.appendChild(sortSelect);
    body.appendChild(controlsPanel);

    productsGridEl = document.createElement("div");
    productsGridEl.className = "products-grid";
    body.appendChild(productsGridEl);

    productsGridEl.addEventListener("click", handleGridClick);

    processAndRenderCatalog();
}

function processAndRenderCatalog() {
    let processedList = products.filter(prod => {
        const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || prod.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    if (currentSortOrder === "price-asc") {
        processedList.sort((a, b) => a.price - b.price);
    } else if (currentSortOrder === "price-desc") {
        processedList.sort((a, b) => b.price - a.price);
    } else if (currentSortOrder === "name-az") {
        processedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSortOrder === "rating-high") {
        processedList.sort((a, b) => b.rating - a.rating);
    }
    renderProducts(processedList);
}

function renderProducts(items) {
    productsGridEl.innerHTML = ""; 
    if (items.length === 0) {
        const noProductMsg = document.createElement("div");
        noProductMsg.className = "no-products";
        noProductMsg.textContent = "Không tìm thấy sản phẩm nào phù hợp yêu cầu!";
        productsGridEl.appendChild(noProductMsg);
        return;
    }

    items.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = prod.id; 

        const img = document.createElement("img");
        img.src = prod.image;
        img.alt = prod.name;

        const infoWrap = document.createElement("div");
        infoWrap.className = "product-info";

        const title = document.createElement("h3");
        title.textContent = prod.name;

        const rating = document.createElement("div");
        rating.className = "product-rating";
        rating.textContent = `⭐ ${prod.rating}`;

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = prod.price.toLocaleString("vi-VN") + " đ";

        const addBtn = document.createElement("button");
        addBtn.className = "add-cart-btn";
        addBtn.textContent = prod.inStock ? "Thêm vào giỏ" : "Hết hàng";
        addBtn.disabled = !prod.inStock;

        infoWrap.appendChild(title);
        infoWrap.appendChild(rating);
        infoWrap.appendChild(price);
        
        card.appendChild(img);
        card.appendChild(infoWrap);
        card.appendChild(addBtn);

        productsGridEl.appendChild(card);
    });
}

function searchProducts(e) {
    searchQuery = e.target.value;
    processAndRenderCatalog();
}

function filterByCategory(e, catKey) {
    document.querySelector(".category-btn.active").classList.remove("active");
    e.target.classList.add("active");
    selectedCategory = catKey;
    processAndRenderCatalog();
}

function sortProducts(sortValue) {
    currentSortOrder = sortValue;
    processAndRenderCatalog();
}

function handleGridClick(e) {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const prodId = Number(card.dataset.id);
    const product = products.find(p => p.id === prodId);

    if (e.target.closest(".add-cart-btn")) {
        e.stopPropagation(); 
        cartCount++;
        cartBadgeEl.textContent = cartCount;
        return;
    }
    openProductModal(product);
}

function openProductModal(prod) {
    const body = document.body;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal-btn";
    closeBtn.textContent = "×";
    
    const closeModal = () => body.removeChild(overlay);
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    const title = document.createElement("h2");
    title.style.marginBottom = "15px";
    title.textContent = prod.name;

    const details = document.createElement("p");
    details.style.lineHeight = "1.6";
    details.style.marginBottom = "15px";
    details.innerHTML = `
        <strong>Danh mục:</strong> ${prod.category.toUpperCase()}<br>
        <strong>Đánh giá:</strong> ⭐ ${prod.rating} / 5.0<br>
        <strong>Trạng thái:</strong> ${prod.inStock ? "🟢 Còn hàng trong kho" : "Tạm hết hàng"}<br>
        <strong>Giá bán niêm yết:</strong> <span style="color:var(--primary); font-weight:bold;">${prod.price.toLocaleString("vi-VN")} đ</span>
    `;

    const desc = document.createElement("p");
    desc.style.color = "var(--text-muted)";
    desc.textContent = "Mô tả sản phẩm: Đây là dòng thiết bị công nghệ thế hệ mới, sở hữu hiệu năng mạnh mẽ, thiết kế tinh tế và trải nghiệm người dùng hàng đầu thị trường.";
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(details);
    content.appendChild(desc);
    overlay.appendChild(content);
    body.appendChild(overlay);
}
initApp();