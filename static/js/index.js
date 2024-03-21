import { updateClock } from "./Clock.js";
import { addTasks, closeAddTaskModal } from "./AddTask.js";
import {setupTaskList, saveEditedTask, fetchTasks} from "./SetupTaskList.js";
import { unlockCheckboxesWithTime } from "./UnclockCheckBoxesWithTime.js";
import { updateTaskItemOnPage, editTask } from "./UpdateTask.js";

document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    addTasks();
    closeAddTaskModal();
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('data-task-id'); // Assuming you add a 'data-task-id' attribute to your buttons
            editTask(taskId);
        });
    });
    
});


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



document.getElementById('editTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskId = document.getElementById('editingTaskId').value;
    
    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('taskDescription').value;
    
    fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    })
    .then(response => {
        // console.log(response.json());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
       
        updateTaskItemOnPage(taskId, title=data.title, description=data.description);
       
        document.getElementById('editTaskModal').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
});