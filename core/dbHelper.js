'use strict';

const config = require( "../config" );
const mongoDriver = require( "mongodb" );
const mongoClient = mongoDriver.MongoClient;

const dbInstance = new mongoClient( `mongodb://${ config.MONGODB_USER }:${ config.MONGODB_PASSWORD }@localhost:27017/?authSource=${ config.MONGODB_NAME }&readPreference=primary&ssl=false`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} );

exports.initDb = async () => {
    try {

      // Connect the client to the server
      await dbInstance.connect();
      
      // Establish and verify connection
      await dbInstance.db( config.MONGODB_NAME ).command( { ping: 1 } );
      console.log( " *********** Connected successfully to mongoDb Database *********** " );

    } catch {

        console.error( "LOG_ERROR :: connection to mongoDb failed." );
        
        await dbInstance.close();
        process.exit();

    } finally {

      // Ensures that the client will close when you finish/error
    }
};

exports.getDbInstance = () => dbInstance.db( config.MONGODB_NAME );
