document.addEventListener("DOMContentLoaded", loadTasks);
        
function addTask() {
    // Adds a task.
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();
    if (taskText === "") return; // Empty case
    
    let li = document.createElement("li");
    li.innerHTML = `<span class="task-text">${taskText}</span>
                    <div class="task-actions">
                        <button class="finish-btn" onclick="finishTask(this)">Finish</button>
                        <button class="remove-btn" onclick="removeTask(this)">Remove</button>
                    </div>`;
    
    document.getElementById("task-list").appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function finishTask(button) {
    // Finishes a task, indicated by striked out text, and saves it.
    let li = button.parentElement.parentElement;
    let span = li.querySelector(".task-text");
    span.classList.add("completed");
    li.querySelector(".task-actions").innerHTML = '<button class="remove-btn" onclick="removeTask(this)">Remove</button>'; // Removes the "Finish button on a finished task"
    saveTasks();
}

function removeTask(button) {
    //removes the tasks, and saves the new list
    button.parentElement.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    // This function is responsible for saving the tasks to local storage.
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({ text: li.querySelector(".task-text").innerText, completed: li.querySelector(".task-text").classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    //Gets the data from localstorage, and creates a task item for every task present.
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                        <div class="task-actions">
                            ${task.completed ? '<button class="remove-btn" onclick="removeTask(this)">Remove</button>' : '<button class="finish-btn" onclick="finishTask(this)">Finish</button><button class="remove-btn" onclick="removeTask(this)">Remove</button>'}
                        </div>`;
        document.getElementById("task-list").appendChild(li);
    });
}