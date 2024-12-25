document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const clearAllBtn = document.getElementById("clear-all-btn");
    const createTaskBtn = document.getElementById("create-task");
    const landingPage = document.getElementById("landing-page");
    const createTaskPage = document.getElementById("create-task-sec");
    const backBtn = document.getElementById("back-btn");

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();

    createTaskBtn.addEventListener("click", function () {
        landingPage.style.display = "none";
        createTaskPage.style.display = "block";
    });

    backBtn.addEventListener("click", function () {
        landingPage.style.display = "block";
        createTaskPage.style.display = "none";
    });

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasksToLocalStorage();
            taskInput.value = "";
            clearAllBtn.style.display = "inline-block";
        } else {
            alert("Task form could not be empty!!");
        }
    });

    function addTask(taskText, expectedCompletion = "") {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="flex justify-between items-center">
                <span>${taskText}</span>
                <input type="datetime-local" class="expected-completion" value="${expectedCompletion}">
                <button class="complete-btn bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded">Completed</button>
                <button class="delete-btn bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Delete</button>
            </div>
        `;

        const completeBtn = li.querySelector(".complete-btn");
        completeBtn.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasksToLocalStorage();
        });

        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveTasksToLocalStorage();
            if (taskList.children.length === 0) {
                clearAllBtn.style.display = "none";
            }
        });

        const expectedCompletionInput = li.querySelector(".expected-completion");
        expectedCompletionInput.addEventListener("change", function () {
            saveTasksToLocalStorage();
        });

        setTimeout(function () {
            li.classList.add("task-entry");
        }, 10);

        taskList.appendChild(li);
    }

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskBtn.click();
        }
    });

    clearAllBtn.addEventListener("click", function () {
        taskList.innerHTML = "";
        clearAllBtn.style.display = "none";
        saveTasksToLocalStorage();
    });

    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll("li");

        taskItems.forEach((task) => {
            const taskText = task.querySelector("span").textContent;
            const expectedCompletion = task.querySelector(".expected-completion").value;
            const isCompleted = task.classList.contains("completed");

            tasks.push({ taskText, expectedCompletion, isCompleted });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks.forEach((task) => {
            addTask(task.taskText, task.expectedCompletion);
            const taskItems = taskList.querySelectorAll("li");
            const lastTask = taskItems[taskItems.length - 1];
            if (task.isCompleted) {
                lastTask.classList.add("completed");
            }
        });

        if (tasks.length > 0) {
            clearAllBtn.style.display = "inline-block";
        }
    }
});
