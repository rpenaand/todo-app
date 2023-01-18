const singleTask = document.getElementById('single-task');
const taskContainer = document.querySelector('.task-list');
const addTaskBtn = document.querySelector('form .btn');
const filterOption = document.querySelector('select');

const getTaskArray = () => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
};

const saveTaskToStorage = (task) => {
  const tasks = getTaskArray();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskItem = (userInput) => {
  const taskItem = document.importNode(singleTask.content, true);
  taskItem.querySelector('h3').textContent = userInput;
  taskContainer.append(taskItem);
};

const addTaskItem = (e) => {
  e.preventDefault();
  const userInput = document.querySelector('input').value;
  const taskData = {
    name: userInput,
    status: 'incomplete',
  };
  createTaskItem(taskData.name);
  saveTaskToStorage(taskData);
};

const completeTaskItem = (e) => {
  const target = e.target.closest('.btn--complete');
  if (!target) {
    return;
  }
  const task = e.target.closest('.task-item');
  const taskName = task.querySelector('h3');
  task.classList.toggle('completed');
};

const deleteTaskItem = (e) => {
  const target = e.target.closest('.btn--delete');
  if (!target) return;
  const taskItem = e.target.closest('.task-item');
  removeTaskFromStorage(taskItem.querySelector('h3').textContent);
  taskItem.remove();
};

const removeTaskFromStorage = (taskItemName) => {
  const tasks = getTaskArray();
  tasks.forEach((task) => {
    if (task.name === taskItemName) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = () => {
  const tasks = getTaskArray();
  tasks.forEach((task) => {
    createTaskItem(task.name);
  });
};

const filterTodo = (e) => {
  const taskItems = taskContainer.children;
  const tasks = [...taskItems];
  tasks.forEach((task) => {
    switch (e.target.value) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'completed':
        if (task.classList.contains('completed')) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
    }
  });
};

renderTasks();

addTaskBtn.addEventListener('click', addTaskItem);
taskContainer.addEventListener('click', deleteTaskItem);
taskContainer.addEventListener('click', completeTaskItem);
filterOption.addEventListener('click', filterTodo);

