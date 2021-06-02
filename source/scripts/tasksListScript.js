// tasks_list_script.js
// the js for tasks_list part only

import Task from './Task.js';


// for drag and drop to order tasks, (https://github.com/SortableJS/Sortable)
// Core SortableJS (without default plugins)
import Sortable from '../useful_node_modules/sortablejs/modular/sortable.core.esm.js';



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
    let spanCheckedOrCheckedStyle;
    if (Number(oneTask.checked) === 1){
      if (Number(oneTask.important) === 1){
        spanCheckedOrCheckedStyle = "tasks_list_item_span_checked_important";
      }else{
        spanCheckedOrCheckedStyle = "tasks_list_item_span_checked";
      }
    }else{
      if (Number(oneTask.important) === 1){
        spanCheckedOrCheckedStyle = "tasks_list_item_span_unchecked_important";
      }else{
        spanCheckedOrCheckedStyle = "tasks_list_item_span_unchecked";
      }
    }
    const taskID = oneTask.taskID;

    const oneTaskItem = document.createElement("li");// create new element
    oneTaskItem.setAttribute('class', `tasks_list_item`);
    oneTaskItem.innerHTML = `
        <input id=${taskID} type="checkbox" ${isChecked}/>
        <span class=${spanCheckedOrCheckedStyle} >${tasktext}</span>
        <button class="important_button">
          <svg><use href="#important-mark"></use></svg>
        </button>
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


function updateTasksListOrder(oldIndex, newIndex){
  // step 1 read from DOM localStorage
  let allTasksList = getExistedTasksFromLS();
  // step 2 get the selected item
  let selectedDragItem;
  let counterForOrder = 0;
  allTasksList.forEach(
    (onetask) => {
      if (counterForOrder === Number(oldIndex)){
        selectedDragItem = new Task(onetask.taskText, onetask.taskID, onetask.checked, onetask.important, onetask.order, onetask.date);
      }
      counterForOrder ++;
    }
  )
  console.log("selectedDragItem: ", selectedDragItem);
  
  // step 3: create a new taskslist and push reordered into it
  let newAllTasksListArray = [];
  console.log("allTasksList before reorder: ", allTasksList);
  if (allTasksList != null){
    counterForOrder = 0;
    for (let i = 0; i < allTasksList.length;  i++){
      if ( (counterForOrder === Number(oldIndex)) || (counterForOrder === Number(newIndex)) ){
        if (counterForOrder === Number(oldIndex)){ //skip
          i++; //skip 
        }else if (counterForOrder === Number(newIndex)){// inject
          newAllTasksListArray.push(selectedDragItem);
        }
      }
      newAllTasksListArray.push(allTasksList[i]);
      counterForOrder ++;
    }
  }
  console.log("newAllTasksListArray after reorder: ", newAllTasksListArray);

  // setp 4: replace LS and display again
  window.localStorage.setItem('tasksList', JSON.stringify(newAllTasksListArray));
  renderTasksList();
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
  
  
  
  // drag and drop to order tasks
  var el = document.getElementById('tasks_list_items_display');
  // List with handle
  Sortable.create(el, {
      ghostClass: 'blue-background-class',
      animation: 150,
      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        evt.to;    // target list
        evt.from;  // previous list
        evt.oldIndex;  // element's old index within old parent
        evt.newIndex;  // element's new index within new parent
        evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        evt.clone // the clone element
        evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving

        console.log("element's old index within old parent: ", evt.oldIndex);
        console.log("element's new index within new parent: ", evt.newIndex);
        if (evt.oldIndex != evt.newIndex){
          updateTasksListOrder(evt.oldIndex, evt.newIndex);
        }
      },
    });
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
  let aNewTask = new Task(usrInputText, tasksLocalStorageCounter, 0, 0, 0, getTodayDate());
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

function clickOneTaskUpdateTasksList(features, taskIdClickedOn){
  //read from LS - delete or check/uncheck - write back into LS - render again
  let myStorage = window.localStorage;

  let allTasksList = getExistedTasksFromLS();
  let newAllTasksListArray = [];
  if (allTasksList != null){
    if (features == "delete") { // update the taskslist when delete one task
      for (let i = 0; i < allTasksList.length;  i++){
        if (Number(allTasksList[i].taskID) !== taskIdClickedOn){
          newAllTasksListArray.push(allTasksList[i]);
        }
      }
    }else if (features == "checkuncheck"){ // update the taskslist when check or uncheck one task
      for (let i = 0; i < allTasksList.length;  i++){
        if (Number(allTasksList[i].taskID) !== taskIdClickedOn){
          newAllTasksListArray.push(allTasksList[i]);
        }else{
          let checkedOrNot = Number(allTasksList[i].checked) === 1 ? 0 : 1;
          let aNewTask = new Task(allTasksList[i].taskText, allTasksList[i].taskID, checkedOrNot, allTasksList[i].important, allTasksList[i].order, allTasksList[i].date);
          newAllTasksListArray.push(aNewTask);
        }
      }
    }else if (features == "important"){ // update the taskslist as important or cancel important
      for (let i = 0; i < allTasksList.length;  i++){
        if (Number(allTasksList[i].taskID) !== taskIdClickedOn){
          newAllTasksListArray.push(allTasksList[i]);
        }else{
          let isImportant = Number(allTasksList[i].important) === 1 ? 0 : 1;
          let aNewTask = new Task(allTasksList[i].taskText, allTasksList[i].taskID, allTasksList[i].checked, isImportant, allTasksList[i].order, allTasksList[i].date);
          newAllTasksListArray.push(aNewTask);
        }
      }
    }
  }

  console.log("newAllTasksListArray: ", newAllTasksListArray)
  myStorage.setItem('tasksList', JSON.stringify(newAllTasksListArray));

  if (features == "delete") {
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
  console.log("clickOneTask class name: ", event.target.className);
  let taskIdClickedOn = Number(event.target.parentElement.querySelector("input").id);
  console.log("taskIdClickedOn: ", taskIdClickedOn);
  if (event.target.tagName === "BUTTON" && event.target.className === "delete_task_button"){//delete
    console.log("taskIdToBeDeleted: ", taskIdClickedOn);
    clickOneTaskUpdateTasksList("delete", taskIdClickedOn);
  }else if (event.target.tagName === "INPUT") {//check or uncheck
    console.log("taskIdToBeCheckedOrUnChecked: ", taskIdClickedOn);
    clickOneTaskUpdateTasksList("checkuncheck", taskIdClickedOn);
  }else if (event.target.tagName === "BUTTON" && event.target.className === "important_button"){//important
    console.log("taskIdToBeDeleted: ", taskIdClickedOn);
    console.log("get span: ", event.target.parentElement.children[1]);
    clickOneTaskUpdateTasksList("important", taskIdClickedOn);
  }
}

// when usr delete a task
let tasksListUlTag = document.getElementById("tasks_list_items_display");
tasksListUlTag.addEventListener('click', event => clickOneTask(event));


