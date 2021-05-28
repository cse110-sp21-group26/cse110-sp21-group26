export default class Task {
    constructor(taskText, taskID, checked, order, date){
        this.taskText = taskText;
        this.taskID = taskID;
        this.checked = checked;
        this.order = order;
        this.date = date;
    }
}