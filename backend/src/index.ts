import { PrismaClient } from '@prisma/client';

const express = require( "express" );
const app = express();
const port = 8000; // default port to listen
const prisma = new PrismaClient();

// start the Express server
app.listen(port, () => {
    console.log( `Server started at http://localhost:${ port }` );
});

app.get('/listAllLocations', async (req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany()
    res.json(locations)
})