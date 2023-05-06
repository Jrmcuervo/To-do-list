import './style.css';
import {
  render, add, remove, complete, clearCompleted,
} from './modules/functions.js';

const task = document.querySelector('#new-task-input');
const addBtn = document.querySelector('#addBtn');

// RENDER
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  render(tasks);
});

// ADD
addBtn.addEventListener('click', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (task.value) {
    add(tasks, task.value);
    render(tasks);
  }
  task.value = '';
});

// REMOVE AND COMPLETED
document.addEventListener('click', (event) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // REMOVE
  if (event.target && event.target.matches('.removeBtn')) {
    const removeBtns = document.querySelectorAll('.removeBtn');
    const index = Array.prototype.indexOf.call(removeBtns, event.target);
    remove(tasks, index);
  }
  // COMPLETED
  if (event.target && event.target.matches('.checkBox')) {
    const checkBoxes = document.querySelectorAll('.checkBox');
    const index = Array.prototype.indexOf.call(checkBoxes, event.target);
    complete(tasks, index);
  }
  render(tasks);
});

// CLEAR ALL COMPLETED
const clearCompletedBtn = document.querySelector('#clear-completed');
clearCompletedBtn.addEventListener('click', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  clearCompleted(tasks);
  render(tasks);
});
