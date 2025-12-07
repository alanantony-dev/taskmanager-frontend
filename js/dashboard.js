const token = localStorage.getItem("token");
let editTaskId = null;

const editModal = document.getElementById("editModal");
const editTitle = document.getElementById("editTitle");
const editDesc = document.getElementById("editDesc");
const editStatus = document.getElementById("editStatus");

// Redirect to login if token is missing
if (!token) {
  window.location.href = "index.html";
}

// Fetch tasks on load
document.addEventListener("DOMContentLoaded", loadTasks);

//Toast notification function

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Load tasks from backend
async function loadTasks() {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; // show spinner

  const status = document.getElementById("statusFilter").value;
  let url = "https://taskmanager-backend-7ms1.onrender.com/api/tasks";

  if (status) url += `?status=${status}`;

  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();

  loader.style.display = "none"; // hide spinner
  renderTasks(data.tasks);
}

// Render tasks into UI
function renderTasks(tasks) {
  const container = document.getElementById("taskList");
  const emptyMsg = document.getElementById("emptyMsg");

  container.innerHTML = "";

  // Show empty message if no tasks
  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  // Hide empty message if tasks exist
  emptyMsg.style.display = "none";

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.classList.add("task-card", "fade-in"); // animation class added

    card.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.description || ""}</p>
            </div>

            <div>
                <span class="status-badge ${
                  task.status === "pending"
                    ? "status-pending"
                    : "status-completed"
                }">
                    ${task.status}
                </span>
            </div>

            <div class="task-actions">
                <button class="btn-edit" onclick="openEditModal('${
                  task._id
                }', '${task.title}', '${task.description || ""}', '${
      task.status
    }')">Edit</button>
                <button class="btn-delete" onclick="deleteTask('${
                  task._id
                }')">Delete</button>
            </div>
        `;

    container.appendChild(card);
  });
}

// Add a new task
document.getElementById("addTaskBtn").addEventListener("click", async () => {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDesc").value.trim();

  if (!title) {
    alert("Task title is required.");
    return;
  }

  const response = await fetch(
    "https://taskmanager-backend-7ms1.onrender.com/api/tasks",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title, description }),
    }
  );

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";

  showToast("Task added successfully!");

  loadTasks();
});

// Filter by status
document.getElementById("statusFilter").addEventListener("change", loadTasks);

// Delete a task
async function deleteTask(id) {
  await fetch(`https://taskmanager-backend-7ms1.onrender.com/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  showToast("Task deleted.");

  loadTasks();
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

function openEditModal(id, title, desc, status) {
  editTaskId = id;

  editTitle.value = title;
  editDesc.value = desc;
  editStatus.value = status;

  editModal.style.display = "flex"; // show modal
}

//save button logic
document.getElementById("saveEditBtn").addEventListener("click", async () => {
  const updatedData = {
    title: editTitle.value.trim(),
    description: editDesc.value.trim(),
    status: editStatus.value,
  };

  const response = await fetch(
    `https://taskmanager-backend-7ms1.onrender.com/api/tasks/${editTaskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(updatedData),
    }
  );

  editModal.style.display = "none";

  showToast("Task updated.");

  loadTasks();
});

//cancel button logic
document.getElementById("cancelEditBtn").addEventListener("click", () => {
  editModal.style.display = "none";
});

//close modal box when clicking outside the box
window.addEventListener("click", (e) => {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
});
