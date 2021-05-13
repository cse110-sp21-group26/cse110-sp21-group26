// tasks_list_script.js
// the js for tasks_list part only

class TasksList {
    //field:
    //id
    //text
    //checked
    //order

    constructor(text) {
      this.text = text;
     
    }
  }


function showTasksItem(oneTask){

    const tasksListModuleForm =  document.getElementById("tasks_list_form");//locate where to add
    const tasktext = oneTask.text;
    const isChecked = oneTask.checked === 1 ? true : false;
    const taskID = oneTask.id;

    const oneTaskItem = document.createElement("li");// create new element
    oneTaskItem.setAttribute('class', `tasks_list_item ${isChecked}`);
    oneTaskItem.innerHTML = `
        <input id=${taskID} type="checkbox"/>
        <label for="1" class="tick js-tick"></label>
        <span>${tasktext}</span>
        <button class="delete-task">
          <svg><use href="#delete-icon"></use></svg>
        </button>
    `;
    tasksListModuleForm.appendChild(oneTaskItem);//inject
}


//  js starts here
document.addEventListener('DOMContentLoaded', () => {

    // step 1 read from json
    fetch("./tasks_list/tasks_list_all_tasks.json")// the return value of fetch() is response object
    .then( /* FILL IN RESPONSE HANDLING HERE */ 
      function(response){
        const response_json =  response.json();
        console.log("response_json.length: ", response_json.length);
        console.log("Object.keys(response_json).length: ", Object.keys(response_json).length);
        if (response.ok){
           return response_json;
        }else{
          console.log("Fetch err: ", response.error);
        }
      }
    )
    .then(
        alltasks => {
          // step 2: if no task, then show  prompt
          console.log("alltasks.length: ", alltasks.length);
          if (alltasks.length === 0 ){
              console.log(1);
              let tasksListModuleTitle =  document.getElementById("tasks_list_title");//locate where to add
              const noTaskFoudnPrompt = document.createElement("div");// create new element
              noTaskFoudnPrompt.setAttribute('class', `task_nofound_prompt`);
              noTaskFoudnPrompt.textContent = "No tasks found yet. Let's create a task now:";
              tasksListModuleTitle.appendChild(noTaskFoudnPrompt);//inject into 
              console.log(2);
          }
          // step 3: if has task, then show tasks
          alltasks.forEach(
            (onetask) => {
              console.log("onetask: ", onetask)
              showTasksItem(onetask);
            }
          )
        }
    )
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });
    



});


