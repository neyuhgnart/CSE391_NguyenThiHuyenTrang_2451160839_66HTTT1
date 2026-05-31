let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all"; 

const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const pendingCount = document.querySelector("#pendingCount");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");

function updateAppState() {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
}

function render() {
    todoList.innerHTML = ""; 
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.done;
        if (currentFilter === "completed") return todo.done;
        return true;
    });

    if (filteredTodos.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-message";
        emptyLi.textContent = currentFilter === "completed" ? "Chưa có việc nào hoàn thành!" : "Hôm nay chưa có việc gì hết!";
        todoList.appendChild(emptyLi);
    } else {
        filteredTodos.forEach(todo => {
            const li = document.createElement("li");
            li.className = `todo-item ${todo.done ? "completed" : ""}`;
            li.dataset.id = todo.id;

            const span = document.createElement("span");
            span.className = "todo-item-content";
            span.textContent = todo.text; 

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "❌";

            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }
    const activeCount = todos.filter(t => !t.done).length;
    pendingCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const text = todoInput.value.trim();
    if (!text) return; 
    const newTodo = {
        id: Date.now(), 
        text: text,
        done: false
    };
    todos.push(newTodo);
    todoInput.value = ""; 
    todoInput.focus();
    updateAppState();
});

todoList.addEventListener("click", (e) => {
    const todoItem = e.target.closest(".todo-item");
    if (!todoItem) return; 
    const id = Number(todoItem.dataset.id);
    if (e.target.closest(".delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        updateAppState();
        return;
    }
    if (e.target.closest(".todo-item-content")) {
        todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
        updateAppState();
    }
});

todoList.addEventListener("dblclick", (e) => {
    const textSpan = e.target.closest(".todo-item-content");
    if (!textSpan) return; 
    const todoItem = textSpan.closest(".todo-item");
    const id = Number(todoItem.dataset.id);
    const targetTodo = todos.find(t => t.id === id);
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = targetTodo.text;
    todoItem.replaceChild(editInput, textSpan);
    editInput.focus();
    const saveEdit = () => {
        const newText = editInput.value.trim();
        if (newText) {
            targetTodo.text = newText;
            updateAppState();
        } else {
            todos = todos.filter(t => t.id !== id);
            updateAppState();
        }
    };
    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") saveEdit();
        if (event.key === "Escape") render(); 
    });
    editInput.addEventListener("blur", saveEdit);
});

const filterContainer = document.querySelector(".todo-filters");
filterContainer.addEventListener("click", (e) => {
    const clickedBtn = e.target.closest(".filter-btn");
    if (!clickedBtn) return;
    document.querySelector(".filter-btn.active").classList.remove("active");
    clickedBtn.classList.add("active");
    currentFilter = clickedBtn.dataset.filter;
    render();
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.done);
    updateAppState();
});
render();