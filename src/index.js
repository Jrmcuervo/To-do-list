import './style.css';

const tasks = [
  {
    description: 'Complete Microverse project',
    completed: false,
    index: 1,
  },
  {
    description: 'Go to the gym',
    completed: true,
    index: 2,
  },
  {
    description: 'Buy groceries',
    completed: false,
    index: 3,
  },
];

function renderTasks() {
  const list = document.querySelector('#todo-list');

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
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});
