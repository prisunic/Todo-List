// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Defaults
todoInput.value = "";

// Event Listeners

// On Load Listeners
document.addEventListener("DOMContentLoaded", getTodos);

// On Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", delComTodo);
filterOption.addEventListener("click", filterTodo);

/*



        Event Listener Functions 



*/

// Adds todo to list
function addTodo(event) {
  // Prevents form from submitting
  event.preventDefault();

  // Creates the todo
  // We use the trim function to check if the user input string is not just blanks
  if (todoInput.value.trim() == "") {
    alert("Task cannot be empty");
    console.warn("Please enter a task");
  } else {
    // Save Todo Locally
    // We use the trim method to get rid of unwanted spaces
    saveLocalTodos(todoInput.value.trim());

    // Creates Todo
    createTodo(todoInput.value);
  }
  // Clear previous Todo input
  todoInput.value = "";
}

// Deleted or Completed Todos
function delComTodo(event) {
  const item = event.target;

  //  Delete Todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    // Animation
    todo.classList.add("deleted");

    // Delete todo from local storage
    // We use todo.innertext to get the value of todo
    deleteLocalTodos(todo.innerText);

    // Delays deletion till animation ends
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  //  Completed Todo
  if (item.classList[0] === "confirm-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    if (todo.childNodes[2] != undefined) {
      todo.childNodes[2].remove();
    } else {
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
      deleteButton.classList.add();
      deleteButton.classList.add("delete-btn");
      todo.appendChild(deleteButton);
    }
  }
  filter(filterOption.value);
}

// Todo Filter Functions
function filterTodo(event) {
  filter(event.target.value);
}

/*



            Functions


*/

// Displays pre-existing Todos
function getTodos() {
  // Checks for previously existing todos
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    createTodo(todo);
  });
}

// Create Todo On Screen
function createTodo(todo) {
  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newTodo = document.createElement("li");

  newTodo.innerText = todo;
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
}

// Filter Function
function filter(val) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (val) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "remaining":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      default:
        todo.style.display = "flex";
        break;
    }
  });
}

// Saves Todos Locally
function saveLocalTodos(todo) {
  // Checks for previously existing todos
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Delete Todos Locally
function deleteLocalTodos(todo) {
  // Checks for previously existing todos
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
