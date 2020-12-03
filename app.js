// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearButton = document.querySelector(".todo-clear");
/*
 *
 *
 *            Defaults
 *
 *
 */

// Clears input bar
todoInput.value = "";

// Sets default filter option to all
filterOption.selectedIndex = 0;

/**
 *
 *
 *            Event Listeners
 *
 *
 */
// On Load Listeners
document.addEventListener("DOMContentLoaded", getTodos);

// On Event Listeners

// Add todo button
todoButton.addEventListener("click", addTodo);

// Todo  complete\delete button
todoList.addEventListener("click", delComTodo);

// Select options
filterOption.addEventListener("change", filterTodo);

// Clear todo button
clearButton.addEventListener("click", clearTodo);

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
    createTodo(todoInput.value, 0);
  }
  // Clear previous Todo input
  todoInput.value = "";
}

// Deleted or Completed Todos
function delComTodo(event) {
  //  Delete Todo
  if (event.target.classList[0] === "delete-btn") {
    deleteTodo(event.target.parentElement);
  }

  //  Completed Todo
  if (event.target.classList[0] === "confirm-btn") {
    completeTodo(event.target.parentElement);
  }

  // Filters the class after task modification
  filter(filterOption.value);
}

// Todo Filter Functions
function filterTodo(event) {
  event.preventDefault();
  console.log(event.target.value);
  filter(event.target.value);
}

// Clears all todos
function clearTodo(event) {
  if (todoList.children.length === 0) {
    alert("There are no Todos to clear");
  } else {
    let userIn =
      prompt(
        `This clear all locally stored todos. Please type "confirm" to continue`
      ) + " ";
    userIn = userIn.toUpperCase();
    if (userIn.trim() === "CONFIRM") {
      localStorage.clear();
    }
  }
  getTodos();
}
/*



            Functions



*/

// Displays pre-existing Todos
function getTodos() {
  // Checks for previously existing todos
  let todosRem, todosDone;
  if (localStorage.getItem("remaining") == null) {
    todosRem = [];
  } else {
    todosRem = JSON.parse(localStorage.getItem("remaining"));
  }

  // Checks for existing completed todos
  if (localStorage.getItem("completed") == null) {
    todosDone = [];
  } else {
    todosDone = JSON.parse(localStorage.getItem("completed"));
  }

  // Combines the two todos
  // let todos = todosRem.concat(todosDone);
  todosRem.forEach((todo) => {
    createTodo(todo, 0);
  });
  todosDone.forEach((todo) => {
    newTodo = createTodo(todo, 1);

    // Adding completed class to newTodo and appending it to list
    newTodo.classList.add("completed");

    // Adding todoDiv to list
    todoList.appendChild(newTodo);
  });
}

// Create Todo On Screen, The second para is to return the obj if required
function createTodo(todo, retObj) {
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

  // if retObj is true then  creates returns the div
  if (retObj) {
    return todoDiv;
  }
  // Adding todoDiv to list
  todoList.appendChild(todoDiv);
}

// Delete Todo
function deleteTodo(todo) {
  // Animation
  todo.classList.add("deleted");

  // Delete todo from local storage
  // We use todo.innertext to get the value of todo
  deleteLocalTodos(todo);

  // Delays deletion till animation ends
  todo.addEventListener("transitionend", () => {
    todo.remove();
  });
}

// Complete Todo
function completeTodo(todo) {
  todo.classList.toggle("completed");
  updateLocalStatus(todo);
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
  if (localStorage.getItem("remaining") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("remaining"));
  }
  todos.push(todo);
  localStorage.setItem("remaining", JSON.stringify(todos));
}

// Checks if Completed or Not
function updateLocalStatus(todo) {
  let todos, todosDone;
  todos = JSON.parse(localStorage.getItem("remaining"));
  if (localStorage.getItem("completed") == null) {
    todosDone = [];
  } else {
    todosDone = JSON.parse(localStorage.getItem("completed"));
  }
  if (todo.classList[1] === "completed") {
    todos.splice(todos.indexOf(todo.innerText), 1);
    localStorage.setItem("remaining", JSON.stringify(todos));
    todosDone.push(todo.innerText);
    localStorage.setItem("completed", JSON.stringify(todosDone));
  } else {
    todosDone.splice(todosDone.indexOf(todo.innerText), 1);
    localStorage.setItem("completed", JSON.stringify(todosDone));
    todos.push(todo.innerText);
    localStorage.setItem("remaining", JSON.stringify(todos));
  }
}

// Delete Todos Locally
function deleteLocalTodos(todo) {
  // Gets all existing todos
  if (todo.classList[1] === "completed") {
    let todos = JSON.parse(localStorage.getItem("completed"));
    todos.splice(todos.indexOf(todo.innerText), 1);
    localStorage.setItem("completed", JSON.stringify(todos));
  } else {
    let todos = JSON.parse(localStorage.getItem("remaining"));
    todos.splice(todos.indexOf(todo.innerText), 1);
    localStorage.setItem("remaining", JSON.stringify(todos));
  }
}

/* 



            Additional Functions



*/

// // Checks if todo pre-exists
// function todoExist(todo) {
//   // Gets all existing todos
//   let todos;
//   if (localStorage.getItem("todos") == null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
// }
