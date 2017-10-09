process.on('exit', function () {
    console.log('Good Bye...');
});

process.on('uncaughtException', function (error) {
    console.log('An exception occurred.');
});

var count = 0;

var id = setInterval(function () {
    count++;
    
    if (count == 3) {
        clearInterval(id);
    }
    
    error.error.error();
}, 2000);

// ---------- // ---------- // ---------- // ---------- 

var onUncaughtException = function (error) {
    console.log('An exception occurred.');
    process.removeListener('uncaughtException2', onUncaughtException);
};  

process.on('uncaughtException2', onUncaughtException);

setInterval(function () {
    error.error.error('good bye');
}, 2000);

// ---------- // ---------- // ---------- // ---------- 

process.once('uncaughtException3', function (error) {
    console.log('An exception occurred.');
});

setInterval(function () {
    error.error.error();
}, 2000);

// ---------- // ---------- // ---------- // ---------- 

