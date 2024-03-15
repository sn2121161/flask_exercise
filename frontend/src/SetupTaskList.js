
function submitTask(taskItem, index) {
    
    alert(`Task ${index + 1} submitted!`);
    
};


function deleteTask(taskItem) {
    
    taskItem.remove();
    
};



function editTask(taskItem) {
    const modal = document.getElementById("editTaskModal");
    const span = document.getElementsByClassName("close")[0];
    const form = document.getElementById('editTaskForm');

    
    const taskId = taskItem.querySelector('.item-completed').id;;
    const taskTitle = taskItem.querySelector('label').textContent;
    let taskDescriptionItems = taskItem.querySelectorAll('ol li');
    let taskDescription = Array.from(taskDescriptionItems).map(li => li.textContent).join("\n");

    
    document.getElementById('editingTaskId').value = taskId;
    document.getElementById('taskTitle').value = taskTitle;
    document.getElementById('taskDescription').value = taskDescription;

    
    modal.style.display = "block";

   
    span.onclick = function() {
        modal.style.display = "none";
    }

    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    
};






function setupTaskList() {
    
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach((taskItem, index) => {
        
        const submitBtn = taskItem.querySelector('.submit-btn');
        const editBtn = taskItem.querySelector('.edit-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');
        const checkbox = taskItem.querySelector('.item-completed');
        
        checkbox.addEventListener('change', () => submitBtn.disabled = !checkbox.checked);

        submitBtn.addEventListener('click', () => submitTask(taskItem, index));
        editBtn.addEventListener('click', () => editTask(taskItem));
        deleteBtn.addEventListener('click', () => deleteTask(taskItem));
    });

    
};


function saveEditedTask() {
    const taskId = document.getElementById('editingTaskId').value;
    
    const taskItem = document.querySelector(`input[id="${taskId}"]`).closest('.task-item');

    if (taskItem) {
        const newTitle = document.getElementById('taskTitle').value.trim();
        const newDescription = document.getElementById('taskDescription').value;

       
        taskItem.querySelector('label').textContent = newTitle;
        
       
        const descriptionOl = taskItem.querySelector('ol');
        descriptionOl.innerHTML = newDescription.split("\n").map(item => `<li>${item}</li>`).join("");

        
        document.getElementById("editTaskModal").style.display = "none";
    } else {
        console.error('Task item not found for ID:', taskId);
    }
    
};

// function loadTasks() {
//     const savedTasks = localStorage.getItem('tasksList');
//     if (savedTasks) {
//         document.getElementById('tasks-list').innerHTML = savedTasks;
//     }
//     setupTaskList(); 
// }

export {setupTaskList, saveEditedTask};