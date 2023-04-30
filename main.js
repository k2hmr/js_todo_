const taskValue = document.getElementsByClassName("task_value")[0];
const taskSubmit = document.getElementsByClassName("task_submit")[0];
const taskList = document.getElementsByClassName("task_list")[0];
const modal = document.getElementById("modal");
const deleteCancelButton = document.getElementById("delete_cancel");
const deleteOKButton = document.getElementById("delete_ok");
let deletedTask;

const reloadTaskStatus = () => {
  const tasksCount = taskList.childElementCount;
  const checkboxArr = taskList.children ?? [];
  let checkboxCount = 0;
  for (let i = 0; i < checkboxArr.length; i++) {
    checkboxArr[i].children[0].children[0].checked && checkboxCount++;
  }
  const taskStatusMessage = `全てのタスク：${tasksCount} 完了済み：${checkboxCount} 未完了：${
    tasksCount - checkboxCount
  }`;
  document.getElementsByClassName("task_status")[0].innerHTML =
    taskStatusMessage;
};

reloadTaskStatus();

const addTasks = (task) => {
  const listItem = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = task;
  checkbox.addEventListener("change", () => {
    reloadTaskStatus();
  });

  listItem.append(label);
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(`${task}`));

  const editButton = document.createElement("button");
  editButton.innerHTML = "編集";
  listItem.appendChild(editButton);
  let isEditted = false;
  let updatedTask;
  let chosenTaskLabel = editButton.closest("li").children[0];

  const openModalButton = document.createElement("button");
  openModalButton.innerHTML = "削除";
  listItem.appendChild(openModalButton);

  taskList.appendChild(listItem);
  reloadTaskStatus();

  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    isEditted = !isEditted;
    updatedTask = isEditted
      ? editTasks(editButton, updatedTask, chosenTaskLabel)
      : updateTasks(editButton, updatedTask, chosenTaskLabel);

    reloadTaskStatus();
  });

  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    deletedTask = openModalButton.closest("li");
  });
};

const editTasks = (editButton, updatedTask, chosenTaskLabel) => {
  let chosenTask = chosenTaskLabel.children[0];
  chosenTaskLabel.removeChild(chosenTask);
  chosenTaskLabel.lastChild.remove();
  updatedTask = document.createElement("input");
  const preText = chosenTask.value;
  updatedTask.type = "text";
  updatedTask.value = preText;
  chosenTaskLabel.appendChild(updatedTask);
  editButton.innerHTML = "保存";

  return updatedTask;
};

const updateTasks = (editButton, updatedTask, chosenTaskLabel) => {
  const updatedValue = updatedTask.value;
  updatedTask.type = "checkbox";
  updatedTask.addEventListener("change", () => {
    reloadTaskStatus();
  });
  updatedTask.value = updatedValue;
  chosenTaskLabel.appendChild(updatedTask);
  chosenTaskLabel.appendChild(document.createTextNode(`${updatedValue}`));
  editButton.innerHTML = "編集";

  return updatedTask;
};

const deleteTasks = (targetTask) => {
  taskList.removeChild(targetTask);
};

addEventListener("click", outsideClose);
function outsideClose(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

deleteOKButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
  deleteTasks(deletedTask);
  reloadTaskStatus();
});

deleteCancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});

taskSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const task = taskValue.value;
  if(task && task.match(/\S/g)) addTasks(task);
  taskValue.value = "";
});
