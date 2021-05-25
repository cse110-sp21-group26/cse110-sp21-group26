// tasks_list_script.js
// the js for tasks_list part only

import Task from './Task.js';

function clearDisplayedTasksItems(){
  //delete old displayed tasks items
  let tasksListDisplayTag = document.querySelectorAll(".tasks_list_item");
  tasksListDisplayTag.forEach(element => {
    element.remove();
  });
  //delete no task prompt
  let noTaskPrompt = document.querySelectorAll(".task_nofound_prompt");
  if (noTaskPrompt){
    noTaskPrompt.forEach(element => {
      element.remove();
    });
  }
}


function renderOneTaskItem(oneTask){
    const tasksListModuleForm =  document.getElementById("tasks_list_items_display");//locate where to add
    const tasktext = oneTask.taskText;
    const isChecked = Number(oneTask.checked) === 1 ? "checked" : "unchecked";
    const spanCheckedOrCheckedStyle = Number(oneTask.checked) === 1 ? "tasks_list_item_span_checked" : "tasks_list_item_span_unchecked";
    const taskID = oneTask.taskID;

    const oneTaskItem = document.createElement("li");// create new element
    oneTaskItem.setAttribute('class', `tasks_list_item`);
    oneTaskItem.innerHTML = `
        <input id=${taskID} type="checkbox" ${isChecked}/>
        <span class=${spanCheckedOrCheckedStyle} >${tasktext}</span>
        <button class="delete_task_button">
          <svg><use href="#delete-icon"></use></svg>
        </button>
    `;
    tasksListModuleForm.appendChild(oneTaskItem);//inject
}



function getExistedTasksFromLS(){
  let myStorage = window.localStorage;
  let allTasksList =  JSON.parse(myStorage.getItem("tasksList"));
  console.log("localStorage allTasksList: ", allTasksList);
  return allTasksList;
}

function renderTasksList(){
  clearDisplayedTasksItems();
  // step 1 read from DOM localStorage
  let allTasksList = getExistedTasksFromLS();
  // step 2: if no task, then show  prompt
  if (allTasksList == null || allTasksList.length === 0){
    console.log("show no task prompt");
    let tasksListModuleTitle =  document.getElementById("tasks_list_title");//locate where to add
    const noTaskFoudnPrompt = document.createElement("div");// create new element
    noTaskFoudnPrompt.setAttribute('class', `task_nofound_prompt`);
    noTaskFoudnPrompt.textContent = "No tasks found yet. Let's create a task now:";
    tasksListModuleTitle.appendChild(noTaskFoudnPrompt);//inject into 
  }else{
    // step 3: if has task, then show tasks
    console.log("allTasksList.length: ", allTasksList.length);
    allTasksList.forEach(
      (onetask) => {
        console.log("read onetask: ", onetask)
        renderOneTaskItem(onetask);
      }
    )
  }  
}

// starts here
document.addEventListener('DOMContentLoaded', renderTasksList);

function getTodayDate(){
  let today = new Date();
  let dd = today.getDate();
  let mm =  today.getMonth()+1;
  let yyyy = today.getFullYear();

  today = mm +'/' + dd + '/' + yyyy;
  console.log("today: ", today);
  return today;
}

// when user create a new task
document.getElementById("tasks_list_form").addEventListener("submit", event => {
  event.preventDefault();
  let myStorage = window.localStorage;
  let tasksLocalStorageCounter = Number(myStorage.getItem("tasksLocalStorageCounter"));
  myStorage.setItem("tasksLocalStorageCounter", tasksLocalStorageCounter+1);

  //get usr input
  const usrInput = document.getElementById("tasks_list_input");
  const usrInputText = usrInput.value.trim();
  console.log("usrInputText: ", usrInputText);
  if (usrInputText === ''){
    return;
  }else {//delete after usr enter
    usrInput.value = "";
    usrInput.focus();
  }
  // create a new task 
  let aNewTask = new Task(usrInputText, tasksLocalStorageCounter, 0, 0, getTodayDate());
  console.log("aNewTask: ", aNewTask)
  //  combine existing tasks and the created task into an array
  let allTasksList = getExistedTasksFromLS();
  let newAllTasksListArray = [];
  if (allTasksList != null){
    for (let i = 0; i < allTasksList.length;  i++){
      newAllTasksListArray.push(allTasksList[i]);
    }
  }
  newAllTasksListArray.push(aNewTask);
  console.log("newAllTasksListArray: ", newAllTasksListArray)
  myStorage.setItem('tasksList', JSON.stringify(newAllTasksListArray));

  renderTasksList();

});

function clickOneTaskUpdateTasksList(isDeleteOneTask, taskIdClickedOn){
  //read from LS - delete - write back into LS - render again
  let myStorage = window.localStorage;

  let allTasksList = getExistedTasksFromLS();
  let newAllTasksListArray = [];
  if (allTasksList != null){
    if (isDeleteOneTask) { // update the taskslist when delete one task
      for (let i = 0; i < allTasksList.length;  i++){
        if (Number(allTasksList[i].taskID) !== taskIdClickedOn){
          newAllTasksListArray.push(allTasksList[i]);
        }
      }
    }else{ // update the taskslist when check or uncheck one task
      for (let i = 0; i < allTasksList.length;  i++){
        if (Number(allTasksList[i].taskID) !== taskIdClickedOn){
          newAllTasksListArray.push(allTasksList[i]);
        }else{
          let checkedOrNot = Number(allTasksList[i].checked) === 1 ? 0 : 1;
          let aNewTask = new Task(allTasksList[i].taskText, allTasksList[i].taskID, checkedOrNot, allTasksList[i].order, allTasksList[i].date);
          newAllTasksListArray.push(aNewTask);
        }
      }
    }
  }

  console.log("newAllTasksListArray: ", newAllTasksListArray)
  myStorage.setItem('tasksList', JSON.stringify(newAllTasksListArray));

  if (isDeleteOneTask) {
    // reset counter to 0 after all tasks  have been delted
    allTasksList = getExistedTasksFromLS();
    if (allTasksList == null || Number(allTasksList.length) == 0){
      window.localStorage.setItem("tasksLocalStorageCounter", 0);
    }
  }

  renderTasksList();
}

function clickOneTask(event){
  console.log("clickOneTask: ", event.target);
  console.log("clickOneTask on Tag: ", event.target.tagName);
  let taskIdClickedOn = Number(event.target.parentElement.querySelector("input").id);
  console.log("taskIdClickedOn: ", taskIdClickedOn);
  if (event.target.tagName === "BUTTON"){//delete
    console.log("taskIdToBeDeleted: ", taskIdClickedOn);
    clickOneTaskUpdateTasksList(true, taskIdClickedOn);
  }else if (event.target.tagName === "INPUT") {//check or uncheck
    console.log("taskIdToBeCheckedOrUnChecked: ", taskIdClickedOn);
    clickOneTaskUpdateTasksList(false, taskIdClickedOn);
  }
}

// when usr delete a task
let tasksListUlTag = document.getElementById("tasks_list_items_display");
tasksListUlTag.addEventListener('click', event => clickOneTask(event));