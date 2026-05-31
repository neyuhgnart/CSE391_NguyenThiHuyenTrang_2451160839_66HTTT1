const mockImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop", alt: "Thung lũng núi cao xanh mướt tràn ngập ánh nắng" },
    { id: 2, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop", alt: "Cánh đồng sương mù ban mai huyền ảo bao phủ hàng cây" },
    { id: 3, src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop", alt: "Cây cầu gỗ cổ kính bắc ngang qua dòng suối mát trong rừng" },
    { id: 4, src: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=600&auto=format&fit=crop", alt: "Hoàng hôn buông xuống trên vách đá thung lũng phẳng lặng" }
];

const commandData = [
    { id: "next_img", text: "Xem ảnh tiếp theo", action: () => switchImage(currentImgIndex + 1), shortcut: "➔" },
    { id: "prev_img", text: "Xem ảnh trước đó", action: () => switchImage(currentImgIndex - 1), shortcut: "🠴" },
    { id: "play_slide", text: "Bật tự động trình chiếu ảnh (Slideshow)", action: () => startSlideshow(), shortcut: "Space" },
    { id: "stop_slide", text: "Tắt tự động trình chiếu ảnh (Slideshow)", action: () => stopSlideshow(), shortcut: "Space" },
    { id: "open_modal", text: "Phóng to toàn màn hình ảnh hiện tại", action: () => openModal(), shortcut: "Enter" }
];

let currentImgIndex = 0;
let slideshowInterval = null;
let activeCommandIndex = 0;
let filteredCommands = [...commandData];

const galleryViewer = document.querySelector("#galleryViewer");
const mainImage = document.querySelector("#mainImage");
const slideshowStatus = document.querySelector("#slideshowStatus");
const thumbnailList = document.querySelector("#thumbnailList");

const commandPalette = document.querySelector("#commandPalette");
const paletteInput = document.querySelector("#paletteInput");
const commandList = document.querySelector("#commandList");

const imageModal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const closeModalBtn = document.querySelector("#closeModalBtn");

function initGallery() {
    thumbnailList.innerHTML = "";
    
    mockImages.forEach((img, idx) => {
        const thumb = document.createElement("button");
        thumb.className = `thumb-item ${idx === 0 ? "selected" : ""}`;
        thumb.dataset.index = idx + 1;
        
        thumb.setAttribute("role", "option");
        thumb.setAttribute("aria-selected", idx === 0 ? "true" : "false");
        thumb.setAttribute("aria-label", `Xem ảnh số ${idx + 1}: ${img.alt}`);
        
        const thumbImg = document.createElement("img");
        thumbImg.src = img.src;
        thumbImg.alt = `Thumbnail ${img.alt}`;
        
        thumb.appendChild(thumbImg);
        thumbnailList.appendChild(thumb);
        
        thumb.addEventListener("click", () => switchImage(idx));
    });

    switchImage(0); 
}

function switchImage(index) {
    if (index >= mockImages.length) index = 0;
    if (index < 0) index = mockImages.length - 1;

    currentImgIndex = index;
    const targetImg = mockImages[index];

    mainImage.src = targetImg.src;
    mainImage.alt = targetImg.alt;

    const thumbs = document.querySelectorAll(".thumb-item");
    thumbs.forEach((thumb, idx) => {
        if (idx === index) {
            thumb.classList.add("selected");
            thumb.setAttribute("aria-selected", "true");
        } else {
            thumb.classList.remove("selected");
            thumb.setAttribute("aria-selected", "false");
        }
    });
}

function toggleSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

function startSlideshow() {
    if (slideshowInterval) return;
    slideshowInterval = setInterval(() => {
        switchImage(currentImgIndex + 1);
    }, 3000);
    slideshowStatus.textContent = "Slideshow: Đang Chạy ⏸";
}

function stopSlideshow() {
    if (!slideshowInterval) return;
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    slideshowStatus.textContent = "Slideshow: Đang Dừng ⏵";
}

function openCommandPalette() {
    stopSlideshow();
    commandPalette.classList.add("open");
    commandPalette.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    paletteInput.focus(); 
    filterCommands("");
}

function closeCommandPalette() {
    commandPalette.classList.remove("open");
    commandPalette.setAttribute("aria-hidden", "true");
    galleryViewer.focus(); 
}

function filterCommands(keyword) {
    filteredCommands = commandData.filter(cmd => 
        cmd.text.toLowerCase().includes(keyword.toLowerCase())
    );
    activeCommandIndex = 0;
    renderCommands();
}

function renderCommands() {
    commandList.innerHTML = "";
    
    if (filteredCommands.length === 0) {
        const noResult = document.createElement("li");
        noResult.className = "command-item";
        noResult.style.color = "var(--text-muted)";
        noResult.textContent = "Không tìm thấy lệnh nào phù hợp... 🔍";
        commandList.appendChild(noResult);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = `command-item ${idx === activeCommandIndex ? "active" : ""}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", idx === activeCommandIndex ? "true" : "false");
        
        const textSpan = document.createElement("span");
        textSpan.textContent = cmd.text;

        const shortcutKbd = document.createElement("kbd");
        shortcutKbd.className = "command-shortcut";
        shortcutKbd.textContent = cmd.shortcut;

        li.appendChild(textSpan);
        li.appendChild(shortcutKbd);
        commandList.appendChild(li);

        li.addEventListener("click", () => {
            cmd.action();
            closeCommandPalette();
        });
    });
}

paletteInput.addEventListener("input", (e) => {
    filterCommands(e.target.value);
});

function openModal() {
    stopSlideshow();
    modalImage.src = mockImages[currentImgIndex].src;
    modalImage.alt = mockImages[currentImgIndex].alt;
    imageModal.classList.add("open");
    imageModal.setAttribute("aria-hidden", "false");
    closeModalBtn.focus(); 
}

function closeModal() {
    imageModal.classList.remove("open");
    imageModal.setAttribute("aria-hidden", "true");
    galleryViewer.focus();
}

closeModalBtn.addEventListener("click", closeModal);
galleryViewer.addEventListener("click", openModal);

window.addEventListener("keydown", (e) => {
    const key = e.key;

    if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === "k") {
        e.preventDefault(); 
        openCommandPalette();
        return;
    }

    if (commandPalette.classList.contains("open")) {
        if (key === "Escape") {
            e.preventDefault();
            closeCommandPalette();
        } else if (key === "ArrowDown") {
            e.preventDefault();
            activeCommandIndex = (activeCommandIndex + 1) % filteredCommands.length;
            renderCommands();
        } else if (key === "ArrowUp") {
            e.preventDefault();
            activeCommandIndex = (activeCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommands();
        } else if (key === "Enter") {
            e.preventDefault();
            if (filteredCommands[activeCommandIndex]) {
                filteredCommands[activeCommandIndex].action();
                closeCommandPalette();
            }
        }
        return; 
    }

    if (imageModal.classList.contains("open")) {
        if (key === "Escape") {
            e.preventDefault();
            closeModal();
        }
        return;
    }

    if (document.activeElement === galleryViewer || document.activeElement === document.body) {
        if (key === "ArrowRight") {
            e.preventDefault();
            switchImage(currentImgIndex + 1);
        } else if (key === "ArrowLeft") {
            e.preventDefault();
            switchImage(currentImgIndex - 1);
        } else if (key === " ") { 
            e.preventDefault(); 
            toggleSlideshow();
        } else if (key === "Enter") {
            if (document.activeElement === galleryViewer) {
                e.preventDefault();
                openModal();
            }
        } else if (/^[1-9]$/.test(key)) {
            const numSelected = Number(key) - 1;
            if (numSelected < mockImages.length) {
                e.preventDefault();
                switchImage(numSelected);
            }
        }
    }
});
initGallery();