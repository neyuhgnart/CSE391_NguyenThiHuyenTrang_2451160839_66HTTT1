let tasks = [];
let isEditMode = false;

const btnOpenForm = document.getElementById('btn-open-form');
const btnCloseForm = document.getElementById('btn-close-form');
const formPopup = document.getElementById('form-popup');
const taskForm = document.getElementById('task-form');
const formTitle = document.getElementById('form-title');

const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskDeadlineInput = document.getElementById('task-deadline');
const taskPriorityInput = document.getElementById('task-priority');
const taskStatusInput = document.getElementById('task-status'); 

const taskListContainer = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const toastMessage = document.getElementById('toast-message');

const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');

function loadTasks() {
    const storedTasks = localStorage.getItem('personal_tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
    updateTaskSummary();
}

function saveTasks() {
    localStorage.setItem('personal_tasks', JSON.stringify(tasks));
}

function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

function showMessage(message) {
    toastMessage.textContent = message;
    toastMessage.classList.remove('hidden');
    
    setTimeout(() => {
        toastMessage.classList.add('hidden');
    }, 3000);
}

function renderTasks() {
    if (tasks.length === 0) {
        taskListContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    taskListContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.completed ? 'completed-status' : ''}`;
        
        const deadlineText = task.deadline ? `Hạn: ${task.deadline}` : 'Không có hạn';

        taskCard.innerHTML = `
            <div class="task-info">
                <div class="task-info-title">${task.title}</div>
                <div class="task-info-desc">${task.desc || 'Không có mô tả.'}</div>
                <div class="task-meta">
                    <span>${deadlineText}</span>
                    <span class="priority-badge">Ưu tiên: ${task.priority}</span>
                </div>
            </div>
            <div class="task-actions">
                <input type="checkbox" class="status-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <button class="btn btn-edit" data-id="${task.id}">Sửa</button>
                <button class="btn btn-danger" data-id="${task.id}">Xóa</button>
            </div>
        `;

        taskListContainer.appendChild(taskCard);
    });

    attachDynamicEvents();
}

btnOpenForm.addEventListener('click', () => {
    isEditMode = false;
    formTitle.textContent = "Thêm công việc mới";
    taskForm.reset();
    taskIdInput.value = "";
    taskStatusInput.value = "false"; 
    formPopup.classList.remove('hidden');
});

btnCloseForm.addEventListener('click', () => {
    formPopup.classList.add('hidden');
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const desc = taskDescInput.value.trim();
    const deadline = taskDeadlineInput.value;
    const priority = taskPriorityInput.value;
    const completed = taskStatusInput.value === "true"; 

    if (isEditMode) {
        const idToUpdate = taskIdInput.value;
        const taskIndex = tasks.findIndex(t => t.id === idToUpdate);
        
        if (taskIndex !== -1) {
            tasks[taskIndex].title = title;
            tasks[taskIndex].desc = desc;
            tasks[taskIndex].deadline = deadline;
            tasks[taskIndex].priority = priority;
            tasks[taskIndex].completed = completed; 
            showMessage("Cập nhật công việc thành công!");
        }
    } else {
        const newTask = {
            id: Date.now().toString(),
            title: title,
            desc: desc,
            deadline: deadline,
            priority: priority,
            completed: completed 
        };
        tasks.push(newTask);
        showMessage("Thêm mới công việc thành công!");
    }
    saveTasks();
    renderTasks();
    updateTaskSummary();
    formPopup.classList.add('hidden');
});

function attachDynamicEvents() {
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const idToEdit = e.target.getAttribute('data-id');
            const task = tasks.find(t => t.id === idToEdit);

            if (task) {
                isEditMode = true;
                formTitle.textContent = "Chỉnh sửa công việc";
                taskIdInput.value = task.id;
                taskTitleInput.value = task.title;
                taskDescInput.value = task.desc;
                taskDeadlineInput.value = task.deadline;
                taskPriorityInput.value = task.priority;
                taskStatusInput.value = task.completed ? "true" : "false"; 
                formPopup.classList.remove('hidden');
            }
        });
    });

    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const idToDelete = e.target.getAttribute('data-id');
            const isConfirmed = confirm("Bạn có chắc chắn muốn xóa công việc này không?");
            if (isConfirmed) {
                tasks = tasks.filter(task => task.id !== idToDelete);
                saveTasks();
                renderTasks();
                updateTaskSummary();
                showMessage("Đã xóa công việc thành công!");
            }
        });
    });

    const checkboxes = document.querySelectorAll('.status-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const idToToggle = e.target.getAttribute('data-id');
            const task = tasks.find(t => t.id === idToToggle);

            if (task) {
                task.completed = e.target.checked;
                saveTasks();
                renderTasks();
                updateTaskSummary();
                const statusMessage = task.completed ? "Đã đánh dấu hoàn thành!" : "Đã chuyển về chưa hoàn thành!";
                showMessage(statusMessage);
            }
        });
    });
}
window.addEventListener('DOMContentLoaded', loadTasks);