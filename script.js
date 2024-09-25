let taskList = [];

function addTask() {
    const taskInput = document.getElementById('new-task').value;
    const taskDate = document.getElementById('task-date').value;

    if (taskInput.trim()) {
        taskList.push({ text: taskInput, date: taskDate, isEditing: false });
        document.getElementById('new-task').value = '';  // Clear input
        document.getElementById('task-date').value = ''; // Clear date
        renderTasks();
    }
}

function renderTasks() {
    const taskUl = document.getElementById('task-list');
    taskUl.innerHTML = '';

    taskList.forEach((task, index) => {
        const taskLi = document.createElement('li');

        if (task.isEditing) {
            taskLi.innerHTML = `
                <input type="text" class="edit-input" id="edit-${index}" value="${task.text}">
                <input type="date" class="edit-input" id="date-${index}" value="${task.date}">
                <button class="edit-btn" onclick="saveEdit(${index})">💾 Save</button>
                <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
            `;
        } else {
            taskLi.innerHTML = `
                <span>${task.text}</span>
                <span>${task.date || 'No Date'}</span>
                <button class="edit-btn" onclick="editTask(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
            `;
        }
        taskUl.appendChild(taskLi);
    });
}

function editTask(index) {
    taskList[index].isEditing = true;
    renderTasks();
}

function saveEdit(index) {
    const newText = document.getElementById(`edit-${index}`).value;
    const newDate = document.getElementById(`date-${index}`).value;
    taskList[index].text = newText;
    taskList[index].date = newDate;
    taskList[index].isEditing = false;
    renderTasks();
}

function deleteTask(index) {
    taskList.splice(index, 1);
    renderTasks();
}
