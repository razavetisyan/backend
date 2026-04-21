
const EventEmitter = require("events");

class TaskManger extends EventEmitter {
    #count = 0;

    addTask(taskName) {
        this.emit("taskAdded", taskName);

        console.log(`Task Added: ${taskName}`);
    }

    completeTask(taskName) {
        ++this.#count;

        this.emit("taskCompleted", taskName, this.#count);
    }
}

module.exports = TaskManger;