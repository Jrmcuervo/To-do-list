import {
  addTask, deleteTask, clearCompletedTasks, editTask, renderTasks,
} from './modules/tasks.js';
import { replaceInputWithTaskDescription } from './modules/helpers.js';
import { saveTasksToLocalStorage } from './modules/localStorage.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();

  const list = document.querySelector('#todo-list');
  const input = document.querySelector('#new-task-input');
  const clearCompletedButton = document.querySelector('#clear-completed');

  list.addEventListener('click', (event) => {
    const { target } = event;
    if (target.tagName === 'SPAN' && target.innerText === 'more_vert') {
      const li = target.parentNode;
      const index = parseInt(li.querySelector('input').id.split('-')[1], 10);
      const deleteButton = li.querySelector('.delete-button');
      const editButton = li.querySelector('.edit-button');
      const taskDescription = li.querySelector('.task-description');
      deleteButton.style.display = 'inline';
      editButton.style.display = 'inline';
      target.style.display = 'none';
      deleteButton.addEventListener('click', (event) => {
        deleteTask(event, index);
      });
      taskDescription.addEventListener('click', (event) => {
        editTask(event, index);
      });
    } else if (target.classList.contains('delete-button')) {
      const li = target.parentNode;
      const index = parseInt(li.querySelector('input').id.split('-')[1], 10);
      deleteTask(event, index);
    } else if (target.classList.contains('edit-button')) {
      const li = target.parentNode;
      const index = parseInt(li.querySelector('input').id.split('-')[1], 10);
      editTask(event, index);
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

  list.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.querySelector('input.edit-input')) {
      const index = parseInt(document.querySelector('input.edit-input').parentNode.querySelector('input').id.split('-')[1], 10);
      const li = document.querySelector(`#task-${index}`).parentNode;
      const taskDescription = li.querySelector('.task-description');
      const input = li.querySelector('.edit-input');
      replaceInputWithTaskDescription(li, taskDescription, input);
      saveTasksToLocalStorage();
      renderTasks();
    }
  });

  list.addEventListener('click', (event) => {
    if (!event.target.classList.contains('edit-input') && document.querySelector('input.edit-input')) {
      const index = parseInt(document.querySelector('input.edit-input').parentNode.querySelector('input').id.split('-')[1], 10);
      const li = document.querySelector(`#task-${index}`).parentNode;
      const taskDescription = li.querySelector('.task-description');
      const input = li.querySelector('.edit-input');
      replaceInputWithTaskDescription(li, taskDescription, input);
      saveTasksToLocalStorage();
      renderTasks();
    }
  });
});
