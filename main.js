let form = document.querySelector("form");
let inputs = document.querySelectorAll(".form-control");
let toast = document.querySelector(".toast");
let btnToast = document.querySelector(".toast i");

// handle the close event of the toast
btnToast.addEventListener("click", () => {
  toast.classList.add("hide");
});

// add after-focus classe when the text content of the input is set
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.nextElementSibling.classList.add("after-focus");
    } else {
      input.nextElementSibling.classList.remove("after-focus");
    }
  });
});

let todos;
// remplissage du tableau avec les donnees du storage si ils exitent
if (localStorage.getItem("items") == null) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem("items"));
}

// handle the submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let taskInput = form.elements["task"];
  let taskDate = form.elements["date"];

  if (taskInput.value.trim() !== "" && taskDate.value.trim() !== "") {
    // store item in the local storage
    let task = {
      content: taskInput.value,
      date: taskDate.value,
    };
    todos.push(task);
    localStorage.setItem("items", JSON.stringify(todos));
    // createElement
    createTask(task, todos.length - 1);
    taskInput.value = "";
    taskDate.value = "";
    taskInput.nextElementSibling.classList.remove("after-focus");
  } else {
    toast.classList.remove("hide");
    setTimeout(() => {
      toast.classList.add("hide");
    }, 3000);
  }
});

/**
 * Create one element li and append it to the ul
 */
function createTask(task, position = 0) {
  let li = document.createElement("li");
  // get element from the local storage

  let spanContent = document.createElement("span");
  spanContent.textContent = task.content;

  let spanDate = document.createElement("span");
  spanDate.textContent = task.date;

  let button = document.createElement("button");
  button.className = "btn btn-danger";
  button.innerHTML = "<i class='bx bxs-trash'></i>";
  button.setAttribute("title", "Remove Item");
  button.addEventListener("click", () => {
    if (confirm("Are you sure to delete this item ???")) {
      button.parentElement.remove();
      todos.splice(position, 1);
      localStorage.setItem("items", JSON.stringify(todos));
    }
  });
  li.append(spanContent, spanDate, button);
  document.querySelector("ul").append(li);
}

function removeAllTask() {
  localStorage.removeItem("items");
  todos = [];
  document.querySelector(".task-list").innerHTML = "";
}

document.getElementById("clear").addEventListener("click", () => {
  if (confirm("Are you sure remove all the items ???")) {
    removeAllTask();
  }
});

// Display element of the list
for (let i = 0; i < todos.length; i++) {
  createTask(todos[i], i);
  console.log("Remplissage du contenu");
}
