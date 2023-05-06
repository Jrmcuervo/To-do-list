import './style.css';
import {
  loadTasksFromLocalStorage, renderTasks, deleteTask, addTask, saveTasksToLocalStorage,
} from './modules/tasks.js';
import clearCompletedTasks from './modules/clearAll.js';
import getTasks from './modules/helpers.js';

const tasks = getTasks();

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  renderTasks();

  const list = document.querySelector('#todo-list');
  const input = document.querySelector('#new-task-input');
  const clearCompletedButton = document.querySelector('#clear-completed');

  list.addEventListener('click', (event) => {
    const { target } = event;
    if (target.tagName === 'SPAN' && target.innerText === 'more_vert') {
      const li = target.parentNode;
      const index = parseInt(li.querySelector('input').id.split('-')[1], 10);
      const deleteButton = document.createElement('span');
      deleteButton.innerHTML = 'delete';
      deleteButton.classList.add('material-symbols-outlined', 'delete-button');
      const icon = li.querySelector('span');
      icon.replaceWith(deleteButton); // Replace the more_vert icon with the delete button
      deleteButton.addEventListener('click', (event) => {
        deleteTask(event, index);
      });
    } else if (target.classList.contains('delete-button')) {
      const li = target.parentNode;
      const index = parseInt(li.querySelector('input').id.split('-')[1], 10);
      deleteTask(event, index);
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const description = input.value.trim();
      if (description) {
        addTask(description);
        input.value = '';
      }
    }
  });

  clearCompletedButton.addEventListener('click', () => {
    clearCompletedTasks();
  });

  function saveEditedTask(index) {
    const li = document.querySelector(`#task-${index}`).parentNode;
    const taskDescription = li.querySelector('.edit-input');
    const taskDescriptionText = taskDescription.value.trim();
    const taskDescriptionElement = document.createElement('span');
    taskDescriptionElement.classList.add('task-description');
    taskDescriptionElement.innerText = taskDescriptionText;

    if (tasks[index]) {
      tasks[index].description = taskDescriptionText;
      renderTasks();
      saveTasksToLocalStorage();
    }

    taskDescription.replaceWith(taskDescriptionElement);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.querySelector('input.edit-input')) {
      const index = parseInt(document.querySelector('input.edit-input').parentNode.querySelector('input').id.split('-')[1], 10);
      saveEditedTask(index);
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('edit-input') && document.querySelector('input.edit-input')) {
      const index = parseInt(document.querySelector('input.edit-input').parentNode.querySelector('input').id.split('-')[1], 10);
      saveEditedTask(index);
    }
  });
});