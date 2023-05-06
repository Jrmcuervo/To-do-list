import getTasks from './helpers.js';
import { renderTasks, saveTasksToLocalStorage } from './tasks.js';

let tasks = getTasks();

export default function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);

  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }

  renderTasks();
  saveTasksToLocalStorage();
}