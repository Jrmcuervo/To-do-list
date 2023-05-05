import { saveTasksToLocalStorage } from './localStorage.js';

function createTaskElement(task, index) {
  const li = document.createElement('li');
  const checkbox = `<input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>`;
  const icon = '<span class="material-symbols-outlined">more_vert</span>';
  const taskDescription = `<span class="task-description">${task.description}</span>`;
  li.innerHTML = `${checkbox} ${taskDescription} ${icon} <span class="material-symbols-outlined delete-button" style="display:none">delete</span> <span class="material-symbols-outlined edit-button" style="display:none">edit</span>`;
  li.classList.add('task-item');
  if (task.completed) {
    li.classList.add('completed');
  }
  const deleteButton = li.querySelector('.delete-button');
  const editButton = li.querySelector('.edit-button');
  const moreVertIcon = li.querySelector('.material-symbols-outlined');
  moreVertIcon.addEventListener('click', () => {
    deleteButton.style.display = 'inline';
    editButton.style.display = 'inline';
    moreVertIcon.style.display = 'none';
  });
  return li;
}

function replaceTaskDescriptionWithInput(li, taskDescription) {
  const taskDescriptionText = taskDescription.innerText;
  const input = document.createElement('input');
  input.value = taskDescriptionText;
  input.classList.add('edit-input');
  taskDescription.replaceWith(input);
  input.focus();
  return input;
}

function replaceInputWithTaskDescription(input, description, tasks, index) {
  const taskDescriptionElement = document.createElement('span');
  taskDescriptionElement.classList.add('task-description');
  taskDescriptionElement.innerText = description;
  input.replaceWith(taskDescriptionElement);
  tasks[index].description = description;
  saveTasksToLocalStorage();
}

export { createTaskElement, replaceTaskDescriptionWithInput, replaceInputWithTaskDescription };
