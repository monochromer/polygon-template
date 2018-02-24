process.on('uncaughtException', function(err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(`Unhandled Rejection at: ${p}, reason: ${reason}`);
    process.exit(255);
});

require('./build-tools');
