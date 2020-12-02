// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Defaults
todoInput.value = "";

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// asda
// asda
// asd

// Functions
function addTodo(event) {
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

function deleteCheck(event) {
  const item = event.target;

  //  Delete Item
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    // Animation
    todo.classList.add("deleted");

    todo.addEventListener("transitionend", () => {
      console.log(todo);
      todo.remove();
    });
  }

  //  Check mark
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
  sortTodo(filterOption.value);
}

function filterTodo(event) {
  console.log("event", event);
  sortTodo(event.target.value);
}

function sortTodo(val) {
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
