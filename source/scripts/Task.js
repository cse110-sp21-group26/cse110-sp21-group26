/**
* This class is for taskslist. Each task item would be one instance of this class.
*/
export default class Task {
    constructor(taskText, taskID, checked, important, order, date){
        this.taskText = taskText;
        this.taskID = taskID;
        this.checked = checked;
        this.important = important;
        this.order = order;
        this.date = date;
    }
}