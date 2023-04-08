import './style.css';

let tasks = [];

function renderTasks() {
  const list = document.querySelector('#todo-list');

  // Clear the previous content of the list
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = `<input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>`;
    const icon = '<span class="material-symbols-outlined">more_vert</span>';
    li.innerHTML = `${checkbox} ${task.description} ${icon}`;
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
    });
  });
}

function addTask(description) {
  // Check if a task with the same description (ignoring case) already exists in the tasks array
  const existingTask = tasks.find(
    (task) => task.description.toLowerCase() === description.toLowerCase(),
  );
  if (existingTask) {
    // Display an error message to the user
    const error = document.createElement('p');
    error.innerText = 'This task is already on the list';
    error.classList.add('error');
    const input = document.querySelector('#new-task-input');
    input.parentNode.insertBefore(error, input.nextSibling);
    // Remove the error message after 3 seconds
    setTimeout(() => {
      error.remove();
    }, 3000);
    return; // Don't add the new task if it already exists
  }

  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  renderTasks();
}

function deleteTask(event, index) {
  event.stopPropagation(); // Prevent the click event from propagating
  tasks.splice(index, 1);
  renderTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

function editTask(event, index) {
  event.stopPropagation(); // Prevent the click event from propagating
  const li = event.target.closest('li');
  const taskDescription = li.querySelector('span:nth-of-type(2)');
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
        renderTasks();
      }
    } else if (event.key === 'Escape') {
      input.replaceWith(taskDescription);
    }
  });
  input.addEventListener('blur', () => {
    const newDescription = input.value.trim();
    if (newDescription) {
      tasks[index].description = newDescription;
      renderTasks();
    } else {
      input.replaceWith(taskDescription);
    }
  });
}

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
      const deleteButton = document.createElement('span');
      deleteButton.innerHTML = 'delete';
      deleteButton.classList.add('material-symbols-outlined', 'delete-button');
      const icon = li.querySelector('span');
      icon.replaceWith(deleteButton); // Replace the more_vert icon with the delete button
      deleteButton.addEventListener('click', (event) => {
        deleteTask(event, index);
      });
      const editButton = document.createElement('span');
      editButton.innerHTML = 'edit';
      editButton.classList.add('material-symbols-outlined', 'edit-button');
      deleteButton.after(editButton); // Add the edit button after the delete button
      editButton.addEventListener('click', (event) => {
        editTask(event, index);
      });
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
});
