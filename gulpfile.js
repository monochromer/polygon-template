process.on('uncaughtException', function(err) {
    console.log('\n================\n');
    console.error(err.message, err.stack, err.errors);
    console.log('\n================\n');
    process.exit(255);
});

// require('babel-register');
require('./gulp');
