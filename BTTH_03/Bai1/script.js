const btnAddTrigger = document.getElementById('btn-add-trigger');
const btnClosePopup = document.getElementById('btn-close-popup');
const btnCancel = document.getElementById('btn-cancel');
const formPopup = document.getElementById('form-popup');
const studentForm = document.getElementById('student-form');
const tableBody = document.getElementById('table-body');

const formTitle = document.querySelector('#form-title');
const btnSubmit = document.querySelector('#btn-submit');
const toastNotification = document.querySelector('#toast-notification');
const statTotal = document.querySelector('#stat-total');
const statAvg = document.querySelector('#stat-avg');

const txtId = document.getElementById('txt-id');
const txtName = document.getElementById('txt-name');
const txtDob = document.getElementById('txt-dob');
const txtClass = document.getElementById('txt-class');
const txtScore = document.getElementById('txt-score');
const txtEmail = document.getElementById('txt-email');

let studentsArray = [];

function loadDataFromStorage() {
    const dataString = localStorage.getItem('students_data');
    if (dataString) {
        studentsArray = JSON.parse(dataString);
    } else {
        studentsArray = [];
    }
}

function saveStudentsToStorage() {
    localStorage.setItem('students_data', JSON.stringify(studentsArray));
}

function updateStatistics() {
    const total = studentsArray.length;
    statTotal.textContent = total;

    if (total === 0) {
        statAvg.innerText = "0.00";
    } else {
        const sumScore = studentsArray.reduce((acc, current) => acc + parseFloat(current.score), 0);
        const avgScore = sumScore / total;
        statAvg.innerText = avgScore.toFixed(2);
    }
}

function renderStudents() {
    tableBody.innerHTML = "";

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
        tableBody.insertAdjacentHTML('beforeend', rowTemplate);
    });
}

function resetForm() {
    studentForm.reset();
    studentForm.dataset.mode = "add";
    txtId.removeAttribute('readonly'); 
}

function showToast(message) {
    toastNotification.textContent = message;
    toastNotification.classList.remove('hide'); 
    
    setTimeout(() => {
        toastNotification.classList.add('hide');
    }, 3000);
}

btnAddTrigger.addEventListener('click', () => {
    resetForm();
    formTitle.textContent = "Thêm Sinh Viên Mới";
    btnSubmit.textContent = "Lưu dữ liệu";
    formPopup.classList.remove('hide'); 
});

function hideModalPopup() {
    formPopup.classList.add('hide'); 
    resetForm();
}
btnClosePopup.addEventListener('click', hideModalPopup);
btnCancel.addEventListener('click', hideModalPopup);

txtId.addEventListener('change', (event) => {
    event.target.value = event.target.value.toUpperCase().trim();
});

studentForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const idValue = txtId.value.trim();
    const nameValue = txtName.value.trim();
    const dobValue = txtDob.value;
    const classValue = txtClass.value.trim();
    const scoreValue = parseFloat(txtScore.value);
    const emailValue = txtEmail.value.trim();

    const currentMode = studentForm.dataset.mode;

    if (currentMode === "add") {
        const checkExist = studentsArray.some(student => student.id === idValue);
        if (checkExist) {
            alert(`Lỗi trùng lặp: Mã sinh viên [${idValue}] đã có trong hệ thống.`);
            return;
        }

        const newStudentObject = {
            id: idValue,
            name: nameValue,
            dob: dobValue,
            class: classValue,
            score: scoreValue,
            email: emailValue
        };

        studentsArray.push(newStudentObject);
        showToast("Thêm mới thông tin sinh viên thành công!");

    } else if (currentMode === "edit") {
        const targetId = studentForm.dataset.targetId;
        
        const indexFound = studentsArray.findIndex(student => student.id === targetId);
        
        if (indexFound !== -1) {
            studentsArray[indexFound].name = nameValue;
            studentsArray[indexFound].dob = dobValue;
            studentsArray[indexFound].class = classValue;
            studentsArray[indexFound].score = scoreValue;
            studentsArray[indexFound].email = emailValue;
            
            showToast("Cập nhật thông tin sinh viên thành công!");
        }
    }

    saveStudentsToStorage();   
    renderStudents();          
    updateStatistics();        
    hideModalPopup();          
});

tableBody.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('btn-edit-inline')) {
        const parentRowTr = clickedElement.closest('tr');
        const idToEdit = parentRowTr.dataset.studentId;

        const studentObj = studentsArray.find(student => student.id === idToEdit);
        if (!studentObj) return;

        studentForm.dataset.mode = "edit";
        studentForm.dataset.targetId = studentObj.id; 

        formTitle.textContent = "Cập Nhật Thông Tin Sinh Viên";
        btnSubmit.textContent = "Cập nhật ngay";

        txtId.value = studentObj.id;
        txtId.setAttribute('readonly', 'true'); 
        txtName.value = studentObj.name;
        txtDob.value = studentObj.dob;
        txtClass.value = studentObj.class;
        txtScore.value = studentObj.score;
        txtEmail.value = studentObj.email;

        formPopup.classList.remove('hide');
    }

    if (clickedElement.classList.contains('btn-delete-inline')) {
        const parentRowTr = clickedElement.closest('tr');
        const idToDelete = parentRowTr.dataset.studentId;

        const studentNameFromDom = parentRowTr.children[1].textContent;

        const confirmDecision = confirm(`Bạn có chắc chắn muốn xóa sinh viên: [${studentNameFromDom}] mang mã số: ${idToDelete} khỏi hệ thống?`);
        
        if (confirmDecision === true) {
            studentsArray = studentsArray.filter(student => student.id !== idToDelete);
            
            showToast(`Đã xóa thành công sinh viên ${idToDelete}`);
            
            saveStudentsToStorage();
            renderStudents();
            updateStatistics();
        }
    }
});
loadDataFromStorage();
renderStudents();
updateStatistics();