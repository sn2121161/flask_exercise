import {setupTaskList} from "./SetupTaskList.js";


// function addNewTask(){
    
//     const addNewTaskBtn = document.getElementById('add-task-btn');
//     addNewTaskBtn.addEventListener('click', ()=>{
//         clickAddNewTask();
//     });

// };

// function clickAddNewTask() {
//     const taskCount = document.querySelectorAll('.task-item').length + 1;
    
    
//     const newTaskHTML = `
//         <li class="task-item">
//             <input type="checkbox" class="item-completed" id="task${taskCount}">
//             <label for="task${taskCount}">New Task Title</label>
//             <p>Task Description:</p>
//             <ol></ol> <!-- Initially empty, details to be added via edit -->
//             <button class="submit-btn" disabled>Submit</button>
//             <button class="edit-btn">Edit</button>
//             <button class="delete-btn">Delete</button>
//         </li>`;

//     const tasksList = document.getElementById('tasks-list');
//     tasksList.insertAdjacentHTML('beforeend', newTaskHTML);
//     setupTaskList();
// }

async function addTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const tasksList = document.getElementById('tasks-list');
    let pointColor = "red";  // 增加red初始颜色
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" class="item-completed" id="task${task.id}" ${task.completed ? 'checked' : ''}>
            <label for="task${task.id}"><strong>${task.title}</strong></label>
            <p>Task Description:</p>
            <ol id = "task-desc">
            ${task.description.split('\n').map(desc => `
            <li><span class="color-point" style="background-color: ${pointColor};"></span>
            <span> &nbsp; </span>
            ${desc}</li>
            `).join('')}
            </ol>
            <button class="submit-btn" onclick="submitTask(${task.id}, ${task.id})">Submit</button>
            <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        // 开放一个submit-btn的窗口可以让人点击
        tasksList.appendChild(taskItem);
    });
}

document.getElementById('add-task-btn').onclick = function() {
    document.getElementById('addTaskModal').style.display = 'block';
};

function closeAddTaskModal() {
    
    const modal = document.getElementById("addTaskModal");
    modal.style.display = 'none';
    
    const span = document.getElementsByClassName("close")[1];
    span.onclick = function() {
        modal.style.display = "none";
    }

};

export {addTasks, closeAddTaskModal};