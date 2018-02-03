const path = require('path');

const BROWSER_LIST = require('./browserlist');
const ENV = require('./env');
const PATHS = require('./paths');
const TASKS_CONFIG = require('./tasks-config');

module.exports = {
    ...ENV,
    BROWSER_LIST,
    PATHS,
    TASKS_CONFIG
};
