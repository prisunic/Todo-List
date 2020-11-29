// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoInput.value = "";
// Event Listeners
todoButton.addEventListener("click", print);

// Functions
function print(event) {
  // Prevents form from submitting
  event.preventDefault();

  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newTodo = document.createElement("li");
  if (todoInput.value == "") {
    alert("Task cannot be empty");
    console.warn("Please enter a task");
  } else {
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("new-todo");
    todoDiv.appendChild(newTodo);

    // Confirm Button
    const confirmButton = document.createElement("button");
    confirmButton.innerHTML = `<i class="fas fa-check"></i>`;
    confirmButton.classList.add("confirm-btn");
    todoDiv.appendChild(confirmButton);

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add();
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    // Adding todoDiv to list
    todoList.appendChild(todoDiv);

    // Clear previous Todo input
    todoInput.value = "";
  }
}
