'use strict';
/*jslint node: true */
/*jshint esversion: 6 */

let envConstants = process.env;

const ALL_CONSTANTS = {

    APP_VERSION: "1.0.0",
    HOST_PORT: envConstants.HOST_PORT,

    MONGODB_NAME: envConstants.MONGODB_NAME,
    MONGODB_USER: envConstants.MONGODB_USER,
    MONGODB_PASSWORD: envConstants.MONGODB_PASSWORD
    
}

module.exports = ALL_CONSTANTS;
