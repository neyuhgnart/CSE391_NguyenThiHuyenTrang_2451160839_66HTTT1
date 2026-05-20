/**
 * 1. KHAI BÁO & LẤY ĐẦY ĐỦ CÁC PHẦN TỬ DOM CẦN THIẾT
 */
// Sử dụng getElementById theo yêu cầu kiến thức tập trung
const btnAddTrigger = document.getElementById('btn-add-trigger');
const btnClosePopup = document.getElementById('btn-close-popup');
const btnCancel = document.getElementById('btn-cancel');
const formPopup = document.getElementById('form-popup');
const studentForm = document.getElementById('student-form');
const tableBody = document.getElementById('table-body');

// Sử dụng querySelector cho các thành phần đặc thù hiển thị văn bản
const formTitle = document.querySelector('#form-title');
const btnSubmit = document.querySelector('#btn-submit');
const toastNotification = document.querySelector('#toast-notification');
const statTotal = document.querySelector('#stat-total');
const statAvg = document.querySelector('#stat-avg');

// Lấy danh sách các ô nhập liệu (inputs) bên trong form
const txtId = document.getElementById('txt-id');
const txtName = document.getElementById('txt-name');
const txtDob = document.getElementById('txt-dob');
const txtClass = document.getElementById('txt-class');
const txtScore = document.getElementById('txt-score');
const txtEmail = document.getElementById('txt-email');

/**
 * 2. KHỞI TẠO BIẾN MẢNG TOÀN CỤC & ĐỌC DỮ LIỆU TỪ LOCALSTORAGE
 */
let studentsArray = [];

function loadDataFromStorage() {
    const dataString = localStorage.getItem('students_data');
    if (dataString) {
        studentsArray = JSON.parse(dataString);
    } else {
        studentsArray = [];
    }
}

/**
 * 3. HÀM LƯU MẢNG DỮ LIỆU XUỐNG LOCALSTORAGE
 */
function saveStudentsToStorage() {
    localStorage.setItem('students_data', JSON.stringify(studentsArray));
}

/**
 * 4. HÀM TÍNH TOÁN VÀ CẬP NHẬT KHU VỰC THỐNG KÊ (Dùng textContent & innerText)
 */
function updateStatistics() {
    const total = studentsArray.length;
    // Sử dụng textContent để thay đổi văn bản thuần an toàn
    statTotal.textContent = total;

    if (total === 0) {
        statAvg.innerText = "0.00";
    } else {
        // Áp dụng hàm giảm cấp toán học .reduce() để cộng tổng điểm số
        const sumScore = studentsArray.reduce((acc, current) => acc + parseFloat(current.score), 0);
        const avgScore = sumScore / total;
        // Ghi số thực dạng làm tròn hai chữ số thập phân
        statAvg.innerText = avgScore.toFixed(2);
    }
}

/**
 * 5. HÀM RENDER ĐỔ DỮ LIỆU TỪ JAVASCRIPT RA BẢNG HTML (Dùng innerHTML)
 */
function renderStudents() {
    // Xóa rỗng nội dung cũ trước khi dựng lại bảng mới
    tableBody.innerHTML = "";

    // Kiểm tra nếu chưa có dữ liệu, hiển thị dòng thông báo trống theo luồng xử lý
    if (studentsArray.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #94a3b8; font-style: italic;">
                    Danh sách hiện tại trống. Vui lòng bấm nút thêm mới!
                </td>
            </tr>
        `;
        return;
    }

    // Duyệt mảng để render từng dòng bằng việc tích lũy tạo thẻ chuỗi
    studentsArray.forEach(student => {
        const rowTemplate = `
            <tr data-student-id="${student.id}">
                <td><strong>${student.id}</strong></td>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.class}</td>
                <td>${student.score}</td>
                <td>${student.email}</td>
                <td>
                    <div class="action-buttons-group">
                        <button type="button" class="btn-edit-inline">Sửa</button>
                        <button type="button" class="btn-delete-inline">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
        // Chèn mã HTML vào cuối cấu trúc thân bảng
        tableBody.insertAdjacentHTML('beforeend', rowTemplate);
    });
}

/**
 * 6. HÀM LÀM SẠCH VÀ RESET DỮ LIỆU CŨ TRONG FORM
 */
function resetForm() {
    studentForm.reset();
    // Đưa Form trở về trạng thái thêm mới mặc định
    studentForm.dataset.mode = "add";
    txtId.removeAttribute('readonly'); // Hủy chế độ khóa chỉnh sửa khóa chính mã SV
}

/**
 * 7. HÀM HIỂN THỊ THÔNG BÁO POPUP NHANH (TOAST)
 */
function showToast(message) {
    toastNotification.textContent = message;
    toastNotification.classList.remove('hide'); // Xóa class ẩn để hiển thị thành phần
    
    // Đặt đồng hồ đếm ngược tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        toastNotification.classList.add('hide');
    }, 3000);
}

/**
 * 8. GẮN SỰ KIỆN CHO CÁC NÚT ĐIỀU HƯỚNG HIỂN THỊ / ẨN POPUP FORM
 */
// Sự kiện số 1: Bấm nút Thêm sinh viên để mở form
btnAddTrigger.addEventListener('click', () => {
    resetForm();
    formTitle.textContent = "Thêm Sinh Viên Mới";
    btnSubmit.textContent = "Lưu dữ liệu";
    formPopup.classList.remove('hide'); // Hiển thị popup modal
});

// Sự kiện số 2: Bấm nút Đóng/Hủy để ẩn form
function hideModalPopup() {
    formPopup.classList.add('hide'); // Thêm class ẩn để ẩn popup modal
    resetForm();
}
btnClosePopup.addEventListener('click', hideModalPopup);
btnCancel.addEventListener('click', hideModalPopup);

/**
 * 9. BẮT SỰ KIỆN CHANGE CHO CÁC Ô NHẬP LIỆU ĐỂ CHUẨN HÓA DỮ LIỆU ĐẦU VÀO
 */
txtId.addEventListener('change', (event) => {
    // Tự động chuẩn hóa mã sinh viên thành ký tự viết hoa loại bỏ khoảng trắng thừa
    event.target.value = event.target.value.toUpperCase().trim();
});

/**
 * 10. SỰ KIỆN SUBMIT FORM (Sử dụng chung cho cả Thêm mới và Cập nhật)
 */
studentForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn cơ chế tải lại trang mặc định của form submit

    // Lấy dữ liệu thuần túy từ thuộc tính value của các ô nhập liệu
    const idValue = txtId.value.trim();
    const nameValue = txtName.value.trim();
    const dobValue = txtDob.value;
    const classValue = txtClass.value.trim();
    const scoreValue = parseFloat(txtScore.value);
    const emailValue = txtEmail.value.trim();

    // Đọc trạng thái hoạt động hiện tại của form thông qua bộ dataset thuộc tính
    const currentMode = studentForm.dataset.mode;

    if (currentMode === "add") {
        // --- LUỒNG XỬ LÝ SỰ KIỆN SỐ 3: THÊM MỚI DỮ LIỆU ---
        // Kiểm tra validation nghiệp vụ: Không cho trùng khóa chính mã sinh viên
        const checkExist = studentsArray.some(student => student.id === idValue);
        if (checkExist) {
            alert(`Lỗi trùng lặp: Mã sinh viên [${idValue}] đã có trong hệ thống.`);
            return;
        }

        // Đóng gói dữ liệu thành một Thực thể Đối tượng Object theo yêu cầu
        const newStudentObject = {
            id: idValue,
            name: nameValue,
            dob: dobValue,
            class: classValue,
            score: scoreValue,
            email: emailValue
        };

        // Đẩy đối tượng mới vào mảng lưu trữ cục bộ
        studentsArray.push(newStudentObject);
        showToast("🎉 Thêm mới thông tin sinh viên thành công!");

    } else if (currentMode === "edit") {
        // --- LUỒNG XỬ LÝ SỰ KIỆN SỐ 5: SUBMIT CẬP NHẬT DỮ LIỆU ---
        const targetId = studentForm.dataset.targetId;
        
        // Tìm kiếm chỉ số của sinh viên cũ trong mảng
        const indexFound = studentsArray.findIndex(student => student.id === targetId);
        
        if (indexFound !== -1) {
            // Thay thế cập nhật lại các thông số dữ liệu của object trong mảng
            studentsArray[indexFound].name = nameValue;
            studentsArray[indexFound].dob = dobValue;
            studentsArray[indexFound].class = classValue;
            studentsArray[indexFound].score = scoreValue;
            studentsArray[indexFound].email = emailValue;
            
            showToast("✏️ Cập nhật thông tin sinh viên thành công!");
        }
    }

    // Đồng bộ hóa các thành phần sau sự thay đổi dữ liệu theo đúng luồng yêu cầu
    saveStudentsToStorage();   // Bước 1: Lưu mảng xuống localStorage
    renderStudents();          // Bước 2: Dựng lại bảng dữ liệu HTML ngay lập tức
    updateStatistics();        // Bước 3: Đánh giá và cập nhật lại khối thống kê số liệu
    hideModalPopup();          // Bước 4: Đóng cửa sổ popup và dọn dẹp form
});

/**
 * 11. ÁP DỤNG EVENT DELEGATION (ỦY QUYỀN SỰ KIỆN TRÊN DANH SÁCH ĐỘNG BẢNG)
 * LÀM VIỆC VỚI CẤU TRÚC CHA - CON - ANH EM TRONG DOM ĐỂ PHÂN BIỆT THAO TÁC NÚT BẤM
 */
tableBody.addEventListener('click', (event) => {
    // Sử dụng event.target để kiểm tra nút nào thực sự được người dùng click trúng
    const clickedElement = event.target;

    // KỊCH BẢN XỬ LÝ SỰ KIỆN SỐ 4: BẤM NÚT SỬA ĐỂ NẠP LẠI DỮ LIỆU LÊN FORM
    if (clickedElement.classList.contains('btn-edit-inline')) {
        // Đi từ nút con, tìm ngược cấu trúc cha gần nhất là dòng thẻ <tr> bằng .closest()
        const parentRowTr = clickedElement.closest('tr');
        // Trích xuất mã ID sinh viên lưu tại thẻ cha
        const idToEdit = parentRowTr.dataset.studentId;

        // Định vị tìm kiếm ra đối tượng dữ liệu đích trong mảng JavaScript
        const studentObj = studentsArray.find(student => student.id === idToEdit);
        if (!studentObj) return;

        // Chuyển cấu hình form sang trạng thái Cập nhật thông tin
        studentForm.dataset.mode = "edit";
        studentForm.dataset.targetId = studentObj.id; // Lưu vết ID mục tiêu để xử lý khi submit

        // Thay đổi nội dung tiêu đề popup dạng văn bản thô qua thuộc tính textContent
        formTitle.textContent = "Cập Nhật Thông Tin Sinh Viên";
        btnSubmit.textContent = "Cập nhật ngay";

        // Nạp dữ liệu của đối tượng lên các trường input tương ứng của Form
        txtId.value = studentObj.id;
        txtId.setAttribute('readonly', 'true'); // Khóa ô nhập mã sinh viên, không cho sửa Key chính
        txtName.value = studentObj.name;
        txtDob.value = studentObj.dob;
        txtClass.value = studentObj.class;
        txtScore.value = studentObj.score;
        txtEmail.value = studentObj.email;

        // Kích hoạt hiển thị popup modal lên màn hình
        formPopup.classList.remove('hide');
    }

    // KỊCH BẢN XỬ LÝ SỰ KIỆN SỐ 6: BẤM NÚT XÓA DỮ LIỆU ĐÒNG XÁC NHẬN
    if (clickedElement.classList.contains('btn-delete-inline')) {
        const parentRowTr = clickedElement.closest('tr');
        const idToDelete = parentRowTr.dataset.studentId;

        // Minh họa giao tiếp cấu trúc Anh-Em trong DOM: Lấy họ tên sinh viên tại ô cột thứ 2 (Index 1) của dòng cha
        const studentNameFromDom = parentRowTr.children[1].textContent;

        // Hiển thị hộp thông báo xác nhận từ hệ thống trước khi thực hiện xóa
        const confirmDecision = confirm(`Bạn có chắc chắn muốn xóa sinh viên: [${studentNameFromDom}] mang mã số: ${idToDelete} khỏi hệ thống?`);
        
        if (confirmDecision === true) {
            // Lọc loại bỏ phần tử có mã trùng khỏi mảng lưu trữ JavaScript
            studentsArray = studentsArray.filter(student => student.id !== idToDelete);
            
            showToast(`❌ Đã xóa thành công sinh viên ${idToDelete}`);
            
            // Đồng bộ cập nhật lại toàn bộ ứng dụng ngay lập tức
            saveStudentsToStorage();
            renderStudents();
            updateStatistics();
        }
    }
});

/**
 * 12. KHỞI CHẠY HỆ THỐNG KHI TẢI TRANG LẦN ĐẦU
 */
loadDataFromStorage();
renderStudents();
updateStatistics();