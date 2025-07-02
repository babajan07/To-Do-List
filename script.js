const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const countDisplay = document.getElementById("count");

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(t => createTask(t.text, t.completed));
  updateCount();
};

addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Enter a task");
  createTask(text);
  taskInput.value = "";
  saveTasks();
  updateCount();
};

function createTask(text, completed = false) {
  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;
  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
    updateCount();
  };

  const btns = document.createElement("div");
  btns.className = "task-buttons";

  const del = document.createElement("button");
  del.innerHTML = `<i class="fas fa-trash"></i>`;
  del.onclick = () => {
    li.remove();
    saveTasks();
    updateCount();
  };

  btns.appendChild(del);

  li.appendChild(span);
  li.appendChild(btns);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(item => {
    tasks.push({
      text: item.querySelector("span").innerText,
      completed: item.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
  const total = document.querySelectorAll(".task-item").length;
  const done = document.querySelectorAll(".task-item.completed").length;
  countDisplay.innerText = `${done}/${total}`;
}
