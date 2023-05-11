// describe('task manager', () => {
//   let tasks;
//   beforeEach(() => {
//     tasks = [{ description: 'task 1', completed: false, index: 1 },
//       { description: 'task 2', completed: false, index: 2 }];
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   });
//   afterEach(() => {
//     localStorage.clear();
//   });
//   describe('add', () => {
//     it('should add a new task to the tasks array', () => {
//       const newTask = 'task 3';
//       add(tasks, newTask);
//       expect(tasks.length).toBe(3);
//       expect(tasks[2].description).toBe(newTask);
//     });
//     it('should update the index of all tasks in the tasks array', () =>{
//     const newTask = 'task 3';
//     add(tasks, newTask);
//     expect(tasks[0].index).toBe(1);
//     expect(tasks[1].index).toBe(2);
//     expect(tasks[2].index).toBe(3);
//     })
//     it('should update the tasks in localStorage',() =>{
//         const newTask = 'task 3';
//         add(tasks, newTask);
//         const storgeTasks = JSON.parse(localStorage.getItem('tasks'));
//         expect(storgeTasks[2].description).toBe(newTask)
//     })
//   });
// });

// const localStorageMock = (() => {
//   let store = {};
//   return {
//     getItem: (key) => store[key] || null,
//     setItem: (key, value) => (store[key] = value.toString()),
//     clear: () => (store = {}),
//     removeItem: (key) => delete store[key],
//   };
// })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

import { add, remove } from './functions.js';
// import { screen } from '../../node_modules/@testing-library/dom/dist/screen.js';
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};


describe('add function', () => {
  test('adds one item to the tasks array', () => {
    const tasks = [];
    add(tasks, 'New task');
    expect(tasks.length).toBe(1);
  });

  test('adds a task object with the expected properties', () => {
    const tasks = [];
    add(tasks, 'New task');
    expect(tasks[0]).toEqual({
      description: 'New task',
      completed: false,
      index: 1,
    });
  });
});


describe('remove function', () => {
  test('removes one item from the tasks array', () => {
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];

    remove(tasks, 1);

    expect(tasks.length).toBe(2);
  });

  test('removes the correct task from the tasks array', () => {
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];

    remove(tasks, 1);

    expect(tasks).toEqual([
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
    ]);
  });

  test('updates the index property of remaining tasks in the array', () => {
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];

    remove(tasks, 1);

    expect(tasks[0].index).toBe(1);
    expect(tasks[1].index).toBe(2);
  });
});

// describe('add function', () => {
//   test('adds one <li> element to the DOM', () => {
//     const tasks = [];
//     add(tasks, 'New task');

//     const liElement = screen.getByText((content, element) => {
//       return (
//         element.tagName.toLowerCase() === 'li' &&
//         content.includes('New task')
//       );
//     }, { exact: false });

//     expect(liElement).toBeInTheDocument();
//   });
// });