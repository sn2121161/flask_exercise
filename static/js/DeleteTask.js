function deleteTask(taskId) {
    
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        // Remove the task item from the DOM
        const taskItem = document.querySelector(`button[onclick='deleteTask(${taskId})']`).closest('.task-item');
        if (taskItem) {
            taskItem.remove();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.deleteTask = deleteTask;

export {deleteTask};