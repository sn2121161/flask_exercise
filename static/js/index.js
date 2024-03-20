import { updateClock } from "./Clock.js";
import { addNewTask } from "./AddTask.js";
import {setupTaskList, saveEditedTask, fetchTasks, openEditTaskModal} from "./SetupTaskList.js";
import { unlockCheckboxesWithTime } from "./UnclockCheckBoxesWithTime.js";


document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    // addNewTask();
    // setupTaskList();
    // unlockCheckboxesWithTime();
   
    fetchTasks();
    closeAddTaskModal();
});

// editButton.addEventListener('click', () => 
//     openEditTaskModal(task.id, task.title, task.description)
//     );

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



document.getElementById('editTaskForm').onsubmit = async function(e) {
    e.preventDefault(); // Prevent default form submission

    const taskId = document.getElementById('editingTaskId').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    const response = await fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description })
    });

    if (response.ok) {
        
        document.getElementById('editTaskModal').style.display = 'none';
        fetchTasks(); 
    } else {
        
        alert('Failed to update task.');
    }
};

