'use strict';

/* Third party libraries */
require( "dotenv/config" );
const express = require( "express" );

/* Get Other modules */
const config = require( "./config" );
const { initDb } = require( "./core/dbHelper" );

/* Get Routing modules */
const questionRoutes = require( "./routes/questions" );

const app = express();

// All requests will first hit this middleware.
// This will handle CORS requests.
const cors = require( 'cors' );
app.use( cors( { origin: '*' } ) );

/* Configure routes for the application */
app.use( "/questions", questionRoutes );

// always invoked if no other routes serve the request.
app.use( ( req, res ) => {
    
    console.log( 'LOG_ERROR :: Request ' + req.path + ' could not be handled by any existing routes.' );
    
    res.status( 500 );

    res.send({
        success: false,
        errorMessage: 'Invalid API Access Request'
    });
} );


/* Catch-all error handler for express */
const errorHandler = ( err, req, res, next ) => {

    if ( res.headersSent ) {
        return next( err );
    }

    console.log( 'LOG_ERROR :: Server errorHandler Function :' + err.message );

    res.status( 500 );

    res.send({
        success: false,
        errorMessage: err.message
    });
}

app.use( errorHandler );

const server = app.listen( config.HOST_PORT, async ( err ) => {

    if ( err ) {

        console.log( "LOG_ERROR :: Application failed to boot up >> ", err.message );
        return;
    }

    await initDb();

    console.log( ` *********** Application Server is listening on Port ${ config.HOST_PORT }  *********** ` );
} );

module.exports = server;