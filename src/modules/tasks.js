import getTasks from './helpers.js';

let tasks = getTasks();

export function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

export function editTask(event, index) {
  event.stopPropagation();
  const li = event.target.closest('li');
  const taskDescription = li.querySelector('.task-description');
  if (!taskDescription) {
    return;
  }
  const taskDescriptionText = taskDescription.innerText;
  const input = document.createElement('input');
  input.value = taskDescriptionText;
  input.classList.add('edit-input');
  taskDescription.replaceWith(input);
  input.focus();
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const newDescription = input.value.trim();
      if (newDescription) {
        tasks[index].description = newDescription;
        saveTasksToLocalStorage();
      } else {
        input.replaceWith(taskDescription);
      }
    } else if (event.key === 'Escape') {
      input.replaceWith(taskDescription);
    }
  });
  input.addEventListener('blur', () => {
    const newDescription = input.value.trim();
    if (newDescription) {
      tasks[index].description = newDescription;
    } else {
      input.replaceWith(taskDescription);
    }
  });
}

export function renderTasks() {
  const list = document.querySelector('#todo-list');

  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = `<input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>`;
    const icon = '<span class="material-symbols-outlined">more_vert</span>';
    const taskDescription = `<span class="task-description">${task.description}</span>`;
    li.innerHTML = `${checkbox} ${taskDescription} ${icon} <span class="material-symbols-outlined delete-button" style="display:none">delete</span> <span class="material-symbols-outlined edit-button" style="display:none">edit</span>`;
    li.classList.add('task-item');
    if (task.completed) {
      li.classList.add('completed');
    }
    list.appendChild(li);

    const checkboxInput = li.querySelector(`#task-${index}`);
    checkboxInput.addEventListener('change', (event) => {
      const checkbox = event.target;
      const index = parseInt(checkbox.id.split('-')[1], 10);
      tasks[index].completed = checkbox.checked;
      renderTasks();
      saveTasksToLocalStorage();
    });

    const taskDescriptionElement = li.querySelector('.task-description');
    taskDescriptionElement.addEventListener('click', (event) => {
      editTask(event, index);
    });
  });
}

export function addTask(description) {
  const existingTask = tasks.find(
    (task) => task.description.toLowerCase() === description.toLowerCase(),
  );
  if (existingTask) {
    const error = document.createElement('p');
    error.innerText = 'This task is already on the list';
    error.classList.add('error');
    const input = document.querySelector('#new-task-input');
    input.parentNode.insertBefore(error, input.nextSibling);
    setTimeout(() => {
      error.remove();
    }, 3000);
    return;
  }

  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  renderTasks();
  saveTasksToLocalStorage();
}

export function deleteTask(event, index) {
  event.stopPropagation();
  tasks.splice(index, 1);

  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  renderTasks();
  saveTasksToLocalStorage();
}
