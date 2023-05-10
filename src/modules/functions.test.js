describe('task manager', () => {
  let tasks;
  beforeEach(() => {
    tasks = [{ description: 'task 1', completed: false, index: 1 },
      { description: 'task 2', completed: false, index: 2 }];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  afterEach(() => {
    localStorage.clear();
  });
  describe('add', () => {
    it('should add a new task to the tasks array', () => {
      const newTask = 'task 3';
      add(tasks, newTask);
      expect(tasks.length).toBe(3);
      expect(tasks[2].description).toBe(newTask);
    });
    it('should update the index of all tasks in the tasks array', () =>{
    const newTask = 'task 3';
    add(tasks, newTask);
    expect(tasks[0].index).toBe(1);
    expect(tasks[1].index).toBe(2);
    expect(tasks[2].index).toBe(3);
    })
    it('should update the tasks in localStorage',() =>{
        const newTask = 'task 3';
        add(tasks, newTask);
        const storgeTasks = JSON.parse(localStorage.getItem('tasks'));
        expect(storgeTasks[2].description).toBe(newTask)
    })
  });
});