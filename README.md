
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


---------------------------------------------  H O W    T O    U S E    Z O D    V A L I D A T I O N -------------------------------------------

