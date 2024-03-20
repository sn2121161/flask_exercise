import { updateClock } from "./Clock.js";
import { addNewTask } from "./AddTask.js";
import {setupTaskList, saveEditedTask, fetchTasks} from "./SetupTaskList.js";
import { unlockCheckboxesWithTime } from "./UnclockCheckBoxesWithTime.js";


document.getElementById('add-task-btn').onclick = function() {
    document.getElementById('addTaskModal').style.display = 'block';
};

function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
};


document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    // addNewTask();
    // setupTaskList();
    // unlockCheckboxesWithTime();
   
    fetchTasks();
    document.querySelector('.close').addEventListener('click', closeAddTaskModal);
    
});

// document.querySelector('.close').addEventListener('click', closeAddTaskModal);
// document.getElementById('editTaskForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     saveEditedTask();
// });


document.getElementById('addTaskForm').onsubmit = async function(e) {
    e.preventDefault(); 
    const title = document.getElementById('newTaskTitle').value;
    const description = document.getElementById('newTaskDescription').value;

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed: false }), 
    });

    if (response.ok) {
        closeAddTaskModal(); 
        fetchTasks(); 
    } else {
        alert('Failed to add task');
    }
};