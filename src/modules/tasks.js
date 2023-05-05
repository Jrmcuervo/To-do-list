import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from './localStorage.js';
import { createTaskElement, replaceInputWithTaskDescription } from './helpers.js';

let tasks = [];

function editTask(event, index) {
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
        saveTasksToLocalStorage(tasks);
        document.dispatchEvent(new Event('taskEdited'));
      } else {
        replaceInputWithTaskDescription(li, taskDescription, input);
      }
    } else if (event.key === 'Escape') {
      replaceInputWithTaskDescription(li, taskDescription, input);
    }
  });
}

function renderTasks() {
  const list = document.querySelector('#todo-list');

  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = createTaskElement(task, index);
    list.appendChild(li);

    const checkboxInput = li.querySelector(`#task-${index}`);
    checkboxInput.addEventListener('change', (event) => {
      const checkbox = event.target;
      const index = parseInt(checkbox.id.split('-')[1], 10);
      tasks[index].completed = checkbox.checked;
      renderTasks();
      saveTasksToLocalStorage(tasks);
    });

    const taskDescriptionElement = li.querySelector('.task-description');
    taskDescriptionElement.addEventListener('click', (event) => {
      editTask(event, index);
    });
  });
}

function addTask(description) {
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
  saveTasksToLocalStorage(tasks);
}

function deleteTask(event, index) {
  event.stopPropagation();
  tasks.splice(index, 1);

  for (let i = index; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  renderTasks();
  saveTasksToLocalStorage(tasks);
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);

  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }

  renderTasks();
  saveTasksToLocalStorage(tasks);
}

tasks = loadTasksFromLocalStorage();

export {
  addTask, deleteTask, clearCompletedTasks, editTask, renderTasks,
};