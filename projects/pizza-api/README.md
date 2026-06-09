## DB CONNECTIONS

1. Import mongoose
   - const mongoose = require("mongoose")

2. Create the connection function
   - async function wrapping mongoose.connect()
   - handle success and error inside it

3. Connect using process.env
   - access URI via process.env.DB_URI
   - call dbConnection() in your entry file before routes load

## INDEX.JS CONFIGURATION

1. Imports
  - import dotenv package
  - import express
  - import errorhandler
  - const app from express cons port from proccess env
  
  2. app.use(express.json) "convert to string from buffer form" → "parse incoming request body from binary to JSON"
  3. server config
   - create function called server
   - await while conncetDb() function
   - use try-catch or then-cath 
   - if  an error occurs server should be shut down 
   

   


NOTE:dont forget import -export