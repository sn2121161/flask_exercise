import {setupTaskList} from "./SetupTaskList.js";


function addNewTask(){
    
    const addNewTaskBtn = document.getElementById('add-task-btn');
    addNewTaskBtn.addEventListener('click', ()=>{
        clickAddNewTask();
    });

};

function clickAddNewTask() {
    const taskCount = document.querySelectorAll('.task-item').length + 1;
    
    
    const newTaskHTML = `
        <li class="task-item">
            <input type="checkbox" class="item-completed" id="task${taskCount}">
            <label for="task${taskCount}">New Task Title</label>
            <p>Task Description:</p>
            <ol></ol> <!-- Initially empty, details to be added via edit -->
            <button class="submit-btn" disabled>Submit</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </li>`;

    const tasksList = document.getElementById('tasks-list');
    tasksList.insertAdjacentHTML('beforeend', newTaskHTML);
    setupTaskList();
}

export {addNewTask};