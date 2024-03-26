import { updateClock } from "./Clock.js";
import { addTasks, closeAddTaskModal } from "./AddTask.js";
import { unlockCheckboxesWithTime } from "./UnclockCheckBoxesWithTime.js";
import { updateTaskItemOnPage, editTask } from "./UpdateTask.js";
import { deleteTask } from "./DeleteTask.js";
import { submitTask } from "./submitTask.js";

document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    addTasks();
    closeAddTaskModal();

    // 监听.submit-btn的情况
    document.querySelectorAll('.submit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('data-task-id');
            submitTask(taskId);
        });
    });

    // 监听.edit-btn的
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('data-task-id'); // Assuming you add a 'data-task-id' attribute to your buttons
            editTask(taskId);
        });
    });

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('editTaskModal').style.display = 'none';
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = button.getAttribute('data-task-id');
            deleteTask(taskId);
        });
    });
});

// document.addEventListener('click', function(event) {
//     if (event.target && event.target.classList.contains('delete-btn')) {
//         const taskId = event.target.getAttribute('data-task-id');
//         deleteTask(taskId);
//     }
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
        body: JSON.stringify({ title, description, completed:false, status:false }), 
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
        
        const task = data[0];
        updateTaskItemOnPage(taskId, title=task.title, description=task.description);
        document.getElementById('editTaskModal').style.display = 'none';
    
    })
    .catch(error => console.error('Error:', error));
});