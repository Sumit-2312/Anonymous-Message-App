
 ---------------------------------------------------- E X P O R T  M E T H O D S-------------------------------------------------

 we have two methods to export -> module.export and export ( es6 )
 1- module.exports = {userModel,messageModle}  ||  module.exports = {Users:userModel,Messages:messageModle}
 2- export {userModel,messageModle}   || export {userModel as Users,messageModle as Messages}


 how to import them 

 - in case of the module.exports
 const { userModle , messageModle } = require('./model/user.ts')  ||   const { Users , Messages } = require('./model/user.ts') ||  const { userModle: Users , messageModle: Messages } = require('./model/user.ts') 


- in case of the export
 import {userModel,messageModel} from './model/user.ts' || import {Users,Messages} from './model/user.ts' || import {userModel as Users,messageModel as Messages} from './model/user.ts'


 --------------------------------------------- C O N S T R A I N T S   I N   M O N G O O S E  ----------------------------------------------

 - type    => defined the type of the field at the defination, when different type input is given then automatically converted to given type  
 - required => mandatory field , error while creating or saving the document, can catch error in try-catch block
 - unique   => needs to be unique ,  error while creating or saving the document, can catch error in try-catch block 
 - default  => sets the default value of the field
 - enum     => defined the set of value that can be filled for a field, if any other value if filled -> error -> creating or saving or updating
 - minlength => sets the minimul length for the field -> error at creation or saving or updating
 - MaxLength => sets the maximum length for the field -> error at creation or saving or updating
 - min  =>   sets the minimal value in number that can be added 
 - max  => sets the maximum value in number that can be added
 - match => used to match the regex -> can be used at creation, updation , finding , deletion 
 - immutable  => can not be updated
 - select  => when false the field will be automatically hidden when the document is fetched
 - ref  => tells the the primary field for which it is acting a foreign field => used in .populate()


 --------------------------------- W H Y   Z O D   I F   H A V E   C O N S T A I N T S    I N    M O N G O O S E ? ------------------------------

Even though Mongoose provides schema validation, Zod offers additional benefits, especially for input validation before it reaches the database

- The invalid data reaches the database layer before being rejected.
- This can cause unnecessary database operations and bad user experience.

- Bad data is caught before reaching MongoDB → Saves database operations
- Better error handling & custom messages
- Improved security & performance


---------------------------------------------  What do we have in mongoose.connect() -------------------------------------------

- mongoose.connection ---> the instance of Connection class in mongoose 
  - it contains some properties and events
- mongoose.models ---> contains all the models
- mongoose.disconnect ---> to disconnect the database


-> inside mongoose.connection

        Property	                Description

        readyState	        Connection state: 0 (disconnected), 1 (connected), 2 (connecting), 3 (disconnecting)
        name	            Name of the connected database
        host	            Hostname (e.g., localhost)
        port	            Port used (e.g., 27017)
        user,pass       	Username/password (if using auth)
        client	            The underlying MongoDB native driver client
        models	            Object containing all the registered Mongoose models
        collections	        Object of all collections Mongoose knows about



        mongoose.connect('mongodb://localhost:27017/mydb')
        .then(() => {
            const conn = mongoose.connection;
            console.log("Connected to DB:");
            console.log("Host:", conn.host);
            console.log("Port:", conn.port);
            console.log("DB Name:", conn.name);
            console.log("State:", conn.readyState); // 1 = connected
        })
        .catch(err => {
            console.error("Connection error:", err);
        });


- Events in mongoose.connect

Triggered when the connection to the database is successfully established.
    mongoose.connection.on('connected', () => {
         console.log('✅ Mongoose connected to the database');
    });

Triggered when a connection error occurs.
    mongoose.connection.on('error', (err) => {
         console.error('❌ Mongoose connection error:', err);
    });

Emitted when Mongoose is in the process of connecting.
    mongoose.connection.on('connecting', () => {
        console.log('🔄 Mongoose is connecting...');
    });

Triggered when the connection is lost.
    mongoose.connection.on('disconnected', () => {
        console.log('⚠️ Mongoose disconnected from MongoDB');
    });

Emitted when the connection is manually closed.
    mongoose.connection.on('close', () => {
        console.log('🔒 Mongoose connection closed');
    });

Triggered once when the connection is fully open (useful for initial setup).
    mongoose.connection.once('open', () => {
        console.log("🚀 Mongoose connection open and ready");
    });



//------------------------------------------------------------------------------------------------------------------------------







