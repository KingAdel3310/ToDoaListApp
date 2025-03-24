let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editIndex = -1;

const todoForm = document.querySelector('#taskForm');
const todoInput = document.querySelector('#task');
const todoList = document.querySelector('#taskList');
const completedTaskList = document.querySelector('#completedTaskList');
const addButton = document.querySelector('#add-btn');
const updateButton = document.querySelector('#update-button');

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";
    completedTaskList.innerHTML = "";
    
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "taskTemplate";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input w-5 h-5 mx-1";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodoCompleted(index));
        
        const spanText = document.createElement("span");
        spanText.className = `content flex-1 px-2 py-1 ${todo.completed ? 'line-through' : ''}`;
        spanText.textContent = `${todo.text} (${todo.date})`;

        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteTask bg-red-500 px-2 rounded py-2 text-white hover:bg-red-700";
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => deleteTodo(index));
        
        const editButton = document.createElement("button");
        editButton.className = "updateTask bg-blue-500 text-white px-2 py-2 mx-2 rounded hover:bg-blue-600";
        editButton.innerHTML = 'Edit';
        editButton.addEventListener("click", () => editTodo(index));

        li.appendChild(checkbox);
        li.appendChild(spanText);
        if (!todo.completed) {
            li.appendChild(editButton);
        }
        li.appendChild(deleteButton);

        if (todo.completed) {
            completedTaskList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    });
}

function addTodo(event) {
    event.preventDefault();
    const content = todoInput.value.trim();

    if (content !== "") {
        const currentDate = new Date().toLocaleString();

        if (editIndex === -1) {
            todos.push({
                text: content,
                completed: false,
                date: currentDate,
            });
        } else {
            todos[editIndex].text = content;
            todos[editIndex].date = currentDate;
            editIndex = -1;
            addButton.style.display = "inline";
            updateButton.style.display = "none";
        }

        saveTodos();
        renderTodos();
        todoInput.value = "";
    }
}

function toggleTodoCompleted(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function editTodo(index) {
    const content = todos[index].text;
    todoInput.value = content;
    editIndex = index;
    addButton.style.display = "none";
    updateButton.style.display = "inline";
}

todoForm.addEventListener("submit", addTodo);
updateButton.addEventListener("click", addTodo);
renderTodos();