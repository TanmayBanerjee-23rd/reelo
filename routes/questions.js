'use strict';

const express = require( "express" );
const moment = require( "moment" );

const router = express.Router();
router.use( express.json( { type: 'application/json' } ) );

const controler = require( "../controlers/questions" );

router.get( "/filtered", ( req, res ) => {

    console.log( `${ moment().format( "YYYY-MM-DD hh:mm:ss" ) } :: ${ req.headers[ "user-agent" ] } :: 
        LOG_INFO :: Incoming request `, req.originalUrl );

    /*
    query parameters :: marks: int!, matchCriterion: string!, [matchCriterion]Criterions: Object { matchCriterionValue1: string, matchCriterionValue2: string, ... }!,
    groupBy: string (may or)?
    */
    controler.getfilteredQuestions( req.query )
    .then( results => res.status( 200 ).send( {
        success: true,
        data: results,
        errorMessage: ""
    } ) )
    .catch( err => {
        
        console.log( `${ moment().format( "YYYY-MM-DD hh:mm:ss" ) } :: ${ req.headers[ "user-agent" ] } :: 
        LOG_ERROR :: failed request ${ req.originalUrl } execution due to :: `, err.message );

        res.send( {
            success: false,
            data: [],
            errorMessage: err.message
        } );
    } );
    
} );

module.exports = router;