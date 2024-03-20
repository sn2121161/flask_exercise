import { updateClock } from "./Clock.js";
import { addTasks, closeAddTaskModal } from "./AddTask.js";
import {setupTaskList, saveEditedTask, fetchTasks} from "./SetupTaskList.js";
import { unlockCheckboxesWithTime } from "./UnclockCheckBoxesWithTime.js";


document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    addTasks();
    closeAddTaskModal();
});

// editButton.addEventListener('click', () => 
//     openEditTaskModal(task.id, task.title, task.description)
//     );






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
        addTasks(); 
    } else {
        alert('Failed to add task');
    }
};



// async function fetchTaskDetails(taskId) {
//     try {
        
//         const response = await fetch(`/tasks/${taskId}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const task = await response.json();

        
//         document.getElementById('editingTaskId').value = task.id;
//         document.getElementById('taskTitle').value = task.title;
//         document.getElementById('taskDescription').value = task.description;

        
//         document.getElementById('editTaskModal').style.display = 'block';
//     } catch (error) {
//         console.error("Could not fetch task details: ", error);
       
//     }
// }

// document.querySelectorAll('.edit-btn').forEach(button => {
//     button.onclick = function() {
//         const taskId = this.getAttribute('data-task-id');
//         fetchTaskDetails(taskId);
//     };
// });