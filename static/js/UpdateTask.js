function openEditModal(taskId) {
    const taskItem = document.querySelector(`#task${taskId}`);
    const title = taskItem.querySelector('label').textContent;
    
    const descriptionItems = taskItem.querySelectorAll('ol li');
    let description = '';
    descriptionItems.forEach((item) => {
        description += `${item.textContent}\n`;
    });

    
    document.getElementById('editingTaskId').value = taskId;
    document.getElementById('taskTitle').value = title;
    document.getElementById('taskDescription').value = description.trim();
    document.getElementById('editTaskModal').style.display = 'block';
};



function updateTaskItemOnPage(taskId, title, description) {
    
    const editButton = document.querySelector(`button.edit-btn[onclick='editTask(${taskId})']`);
    const taskItem = editButton.closest('.task-item');
    if (taskItem) {
        
        let label = taskItem.querySelector(`label[for='task${taskId}']`);
        
        if (label) {
            label.innerHTML = `<strong>${title}</strong>`;
        }else{
            console.error('label is not found.')
        }
        
        let ol = taskItem.querySelector('ol');
        
        if (ol) {
            ol.innerHTML = description.split('\n').map(desc => `<li>${desc}</li>`).join('');
        }
    } else {
        console.error(`Task ${title} not found.`);
    }
};

function editTask(taskId) {
    
    fetch(`/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
        
        document.getElementById('editingTaskId').value = taskId;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        
        
        document.getElementById('editTaskModal').style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching task details:', error);
    });
}

window.editTask = editTask;

export {updateTaskItemOnPage, openEditModal, editTask};