const express = require( "express" );
const app = express();
const port = 8000; // default port to listen

// start the Express server
app.listen(port, () => {
    console.log( `Server started at http://localhost:${ port }` );
} );