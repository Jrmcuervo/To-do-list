// RENDER
export function render(tasks) {
  const todoListContainer = document.querySelector('#todo-list');
  todoListContainer.innerHTML = '';
  for (let i = 0; i < tasks.length; i += 1) {
    let checked = '';
    if (tasks[i].completed) checked = 'checked';
    const html = `<li class="taskContainer">
    <input class="checkBox" type="checkbox" ${checked}>
    <span class="taskText">${tasks[i].description}</span>
    <button class="removeBtn" type="button">remove</button></li>
    `;
    todoListContainer.innerHTML += html;
  }
}

// ADD
export function add(tasks, task) {
  tasks.push({ description: task, completed: false, index: tasks.length + 1 });
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE
export function remove(tasks, index) {
  tasks.splice(index, 1);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// COMPLETED
export function complete(tasks, index) {
  if (tasks[index].completed) tasks[index].completed = false;
  else tasks[index].completed = true;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR ALL COMPLETED
export function clearCompleted(tasks) {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].completed) {
      tasks.splice(i, 1);
      i -= 1;
    }
  }
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
