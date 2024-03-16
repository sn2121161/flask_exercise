import { updateClock } from "./Clock.js";
import { addNewTask } from "./AddTask.js";
import {setupTaskList, saveEditedTask} from "./SetupTaskList.js";
import { unlockCheckboxesWithTime } from "./UnclockCheckBoxesWithTime.js";



document.addEventListener("DOMContentLoaded", function() {
    updateClock()
    addNewTask();
    setupTaskList();
    unlockCheckboxesWithTime();
    
});


document.getElementById('editTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveEditedTask();
});

