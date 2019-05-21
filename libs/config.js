'use strict';

const nconf = require('nconf');

module.exports = function(configFilename) {
    return nconf
        .argv()
        .env()
        .file({ file: configFilename });
}