const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  // Для облегчения доступа к таскам приводим массив к объекту объектов.
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {})

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';

  //Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const container = document.querySelector('.tasks-list-section .container');
  const themeSelect = document.getElementById('themeSelect');
  let activeFilter = 1; // 1 - show all tasks ; 2 - show unfinished tasks;
  setTheme(lastSelectedTheme);
  // Events
  checkTaskListEmpty();
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', onCompletedHandler);
  container.addEventListener('click', taskFilter)
  themeSelect.addEventListener('change', onThemeSelectHandler);

  function renderAllTasks(taskList) {
    if (!taskList) {
      console.error('Не передан список задач!');
      return
    };
    const fragment = document.createDocumentFragment();
    const taskListSort = taskListSortFromCompleted(taskList);
    Object.values(taskListSort).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    })
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body, completed } = {}) {
    const li = document.createElement('li');
    li.classList.add("list-group-item", "d-flex", "align-items-center", "flex-wrap", "mt-2");
    li.setAttribute('data-task-id', _id);
    if (completed) {
      li.style.background = '#00d500';
    }
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn")
    deleteBtn.textContent = 'Delete task';
    const completedBtn = document.createElement('button');
    completedBtn.classList.add("btn", "btn-success", "ml-auto", "completed-btn")
    completedBtn.textContent = 'Completed';
    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add("mt-2", "w-100");
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);
    li.appendChild(completedBtn);
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Введите title и body');
      return;
    }
    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
    checkTaskListEmpty();
    taskListSortFromCompleted(objOfTasks);
    clearListContainer();
    renderAllTasks(objOfTasks);
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    }

    objOfTasks[newTask._id] = newTask;
    return { ...newTask };
  }

  function deleteTask(id) {
    const isConfirm = confirm(`Вы действительно хотите удалить задачу ${objOfTasks[id].title}?`);
    if (!isConfirm) return;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, element) {
    if (!confirmed) return;
    element.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      checkTaskListEmpty();
    };
  }

  function onCompletedHandler({ target }) {
    if (target.classList.contains('completed-btn')) {
      const parent = target.parentElement;
      const id = parent.dataset.taskId;
      completedTask(id);
      completedTaskFroHtml(id, parent);
      if (activeFilter === 2) {
        parent.style.display = 'none';
        parent.classList.remove('d-flex');
      }
      if (activeFilter === 1) {
        clearListContainer();
        const taskListSort = taskListSortFromCompleted(objOfTasks);
        renderAllTasks(taskListSort);
      }
    }
  }

  function completedTaskFroHtml(id, parent) {
    if (objOfTasks[id].completed) {
      parent.style.background = '#00d500';
    } else {
      parent.style.background = '';
    }
  }

  function completedTask(id) {
    objOfTasks[id].completed === false ? objOfTasks[id].completed = true : objOfTasks[id].completed = false;
  }

  function checkTaskListEmpty() {
    const msg = document.createElement('p');
    msg.textContent = 'Список задач пуст';
    msg.classList.add('msg-no-task');
    const msgElement = listContainer.querySelector('.msg-no-task');
    if (Object.keys(objOfTasks).length === 0 & listContainer.querySelector('.msg-no-task') === null) {
      listContainer.appendChild(msg);
      return;
    }
    msgElement ? msgElement.remove() : null;
  }

  function taskFilter({ target }) {
    const tasks = [...listContainer.children];
    const tasksCompleted = tasks.filter(task => objOfTasks[task.dataset.taskId].completed);

    if (target.classList.contains('btn-show-all-tasks')) {
      activeFilter = 1;
      tasks.forEach(task => {
        task.classList.add('d-flex');
      })
    }

    if (target.classList.contains('btn-active-tasks')) {
      activeFilter = 2;
      tasksCompleted.forEach(task => {
        task.classList.remove('d-flex');
        task.style.display = 'none';
      });
    }
  }

  function taskListSortFromCompleted(taskList) {
    return Object.values(taskList).sort((prev, next) => prev.completed - next.completed);
  }

  function clearListContainer() {
    listContainer.textContent = '';
  }

  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(`Вы действительно хотите изменить тему ${selectedTheme} ?`);
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    };
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme);
  }
  function setTheme(name) {
    const selectedThemObj = themes[name];
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    }) 
  }
})(tasks);
