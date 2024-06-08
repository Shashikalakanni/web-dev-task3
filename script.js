document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task').addEventListener('click', function() {
    const taskText = document.getElementById('new-task').value;
    if (taskText) {
        addTask(taskText);
        document.getElementById('new-task').value = '';
        saveTasks();
    }
});

function addTask(text, completed = false) {
    const taskList = document.getElementById('task-list');
    
    const taskItem = document.createElement('li');
    if (completed) taskItem.classList.add('completed');

    const taskContent = document.createElement('span');
    taskContent.textContent = text;
    taskContent.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const text = taskItem.querySelector('span').textContent;
        const completed = taskItem.classList.contains('completed');
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}
