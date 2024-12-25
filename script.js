document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const clearAllBtn = document.getElementById("clear-all-btn");

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
            clearAllBtn.style.display = "inline-block";
        }
        else{
            alert("Task form could not be empty!!")
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="flex justify-between items-center">
                <span>${taskText}</span>
                <input type="datetime-local" class="expected-completion">
                <button class="complete-btn bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded">Completed</button>
                <button class="delete-btn bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Delete</button>
            </div>
        `;

        const completeBtn = li.querySelector(".complete-btn");
        completeBtn.addEventListener("click", function () {
            li.classList.toggle("completed");
        });

        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function () {
            li.remove();
            if (taskList.children.length === 0) {
                clearAllBtn.style.display = "none";
            }
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
    });
});
