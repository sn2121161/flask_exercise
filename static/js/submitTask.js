function submitTask(taskId, index) {
    
    if (!confirm('Are you sure you want to submit all the task?')) {
        return;
    }

    fetch(`/tasks/${taskId}`, {
        // get方法使用api去获取
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        // const taskItem = document.querySelector(`button[onclick='submitTask(${taskId}, ${taskId})']`);
        const tasksList = document.getElementById('tasks-list');
        
        
    })
    
    .catch(error => {
        console.error('Error:', error);
    });
}

window.submitTask = submitTask;

export {submitTask};