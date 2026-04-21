
class CustomEventEmitter {
    constructor() {
        this.listners = {};
    }

    on(event, listner) {
        if(!this.listners[event]) {
            this.listners[event] = [];
        }

        this.listners[event].push(listner);
    }

    emit(event, ...args) {
        if(this.listners[event]) {
            this.listners[event].forEach(fn => {
                fn(...args);
            });
        }
    }

    off(event, listner) {
        if(!this.listners[event]) {
            return;
        }

        this.listners[event] = this.listners[event].filter(fn => {
            fn !== listner;
        })
    }
}   

const service = new CustomEventEmitter();

service.on('start', (user) => {
  console.log(`Service started for ${user}.`);
});

service.on('dataLoaded', (dataCount) => {
  console.log(`Loaded ${dataCount} records.`);
});

service.emit('start', 'Admin'); // Should print "Service started for Admin."
service.emit('dataLoaded', 42); // Should print "Loaded 42 records."

