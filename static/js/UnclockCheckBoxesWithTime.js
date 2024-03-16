function unlockCheckboxesWithTime() {
    const currentHour = new Date().getHours();
    
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach((item, index) => {
        const checkbox = item.querySelector('.item-completed');
        
        const submitBtn = item.querySelector('.submit-btn');
        
        const unlockHour = 9 + index;
        
        if (currentHour >= unlockHour) {
            checkbox.disabled = false;
            checkbox.addEventListener('change', function() {
                submitBtn.disabled =! this.checked;
            });
        }
    });
};



unlockCheckboxesWithTime();
setInterval(unlockCheckboxesWithTime, 60000);


export {unlockCheckboxesWithTime};