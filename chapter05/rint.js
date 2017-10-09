exports.timer = new process.EventEmitter();

setInterval(function () {
    exports.timer.emit('tick');
}, 1000);