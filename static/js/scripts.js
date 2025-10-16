let tempTask = null; // Variable to temporarily store task data during editing

// Open button event listener
document.getElementById("openForm").addEventListener("click", function () {
    console.log("Open button clicked");
    document.getElementById("taskFormPopup").classList.add("show");
});

// Close button event listener
document.querySelector(".close").addEventListener("click", function () {
    console.log("Close button clicked");

    // If editing is canceled, re-add the temporary task to the list
    if (tempTask) {
        console.log("Restoring canceled task");
        addTaskToList(tempTask.taskName, tempTask.assignedDate, tempTask.dueDate);
        tempTask = null; // Clear temporary task
    }

    document.getElementById("taskFormPopup").classList.remove("show");
    document.getElementById("taskForm").reset();
    clearError(); // Clear error message if any
});

// Handle Form Submission and Add Task to List
document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    // Get form data
    const taskName = document.getElementById("task_name").value;
    const assignedDate = document.getElementById("assigned_date").value;
    const dueDate = document.getElementById("due_date").value;

    // Validate dates
    if (!validateDates(assignedDate, dueDate)) {
        return; // Stop submission if validation fails
    }

    // Add task to the list
    addTaskToList(taskName, assignedDate, dueDate);

    // Clear form inputs and close the popup
    document.getElementById("taskForm").reset();
    document.getElementById("taskFormPopup").classList.remove("show");

    tempTask = null; // Clear the temporary task since the form was submitted
    clearError(); // Clear error message if any
});

// Function to Validate Dates
function validateDates(assignedDate, dueDate) {
    const assigned = new Date(assignedDate);
    const due = new Date(dueDate);

    if (assigned > due) {
        showError("Assigned date cannot be after the due date.");
        return false;
    }

    if (due < assigned) {
        showError("Due date cannot be before the assigned date.");
        return false;
    }

    return true;
}

// Function to Show Error Message
function showError(message) {
    let errorDiv = document.getElementById("formError");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "formError";
        errorDiv.style.color = "red";
        errorDiv.style.marginTop = "10px";
        document.getElementById("taskForm").appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Function to Clear Error Message
function clearError() {
    const errorDiv = document.getElementById("formError");
    if (errorDiv) {
        errorDiv.textContent = "";
    }
}

// Function to Add Task to the List
function addTaskToList(taskName, assignedDate, dueDate) {
    const taskItems = document.getElementById("taskItems");
    const li = document.createElement("li");

    li.innerHTML = ` 
        <div class="task-item">
            <div class="task-content">
                <strong>${taskName}</strong> 
                <br>Assigned: ${new Date(assignedDate).toLocaleString()} 
                <br>Due: ${new Date(dueDate).toLocaleString()}
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            </div>
        </div>`;

    //bootstrap 
        /*
    li.innerHTML = `
    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
            <strong class="mb-1">${taskName}</strong>
            <small>Due: ${new Date(dueDate).toLocaleDateString()}</small>
        </div>
        <p class="mb-1">Assigned: ${new Date(assignedDate).toLocaleDateString()}</p>
        <div class="task-actions d-flex justify-content-end gap-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="editTask(this)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(this)">Delete</button>
        </div>
    </a>`;
    */

    taskItems.appendChild(li);
}

// Function to Delete Task
function deleteTask(button) {
    const taskItem = button.closest("li");
    taskItem.remove();
}

// Function to Edit Task
function editTask(button) {
    const taskItem = button.closest("li");
    const taskContent = taskItem.querySelector(".task-content");

    // Extract current task details
    const [taskName, assignedText, dueText] = taskContent.innerText.split("\n");
    const assignedDate = new Date(assignedText.replace("Assigned: ", "")).toISOString().slice(0, 16);
    const dueDate = new Date(dueText.replace("Due: ", "")).toISOString().slice(0, 16);

    // Pre-fill the form with existing data
    document.getElementById("task_name").value = taskName;
    document.getElementById("assigned_date").value = assignedDate;
    document.getElementById("due_date").value = dueDate;

    // Show the popup using the same 'show' class method
    document.getElementById("taskFormPopup").classList.add("show");

    // Store the task temporarily in case of cancellation
    tempTask = { taskName, assignedDate, dueDate };

    // Remove the task from the list to avoid duplicates
    taskItem.remove();
}
