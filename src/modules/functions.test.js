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
  });
});